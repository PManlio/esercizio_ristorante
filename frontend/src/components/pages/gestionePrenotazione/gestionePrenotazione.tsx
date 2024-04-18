import { useQuery } from "@tanstack/react-query"
import Navbar from "../../shared/Navbar"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import { Ristorante } from "../../../interfaces/ristorante";
import { useState } from "react";

export default function GestionePrenotazione() {

    const location = useLocation();
    const navigate = useNavigate();

    const [fasciaOraria, setFasciaOraria] = useState('');
    const [numeroPersone, setNumeroPersone] = useState('');

    const { data: ristorante } = useQuery({
        queryKey: ["ristorante"],
        queryFn: async () => {
            return await fetch("http://localhost:4321/ristorante/ristorante/" + location.state.ristoranteId, {
                method: 'GET',
                headers: {
                    'pass-ristorante': 'ristorante-bodyguard',
                }
            }).then(res => res.json()).then(data => data as Ristorante | undefined)
        }
    })

    /*const { data: prenotazione } = useQuery({
        queryKey: ['prenotazione'],
        queryFn: async () => {
            return await fetch('http://localhost:4321/prenotazione/prenotazioniutente/'+localStorage.getItem('userId'), {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer '+localStorage.getItem('token')
                },
            }).then(res => res.json()).then(data => {
                switch (data["statusCode"]) {
                    case 500:
                        alert("qualcosa è andato storto");
                        break;

                    case 401:
                        alert("token non valido");
                        localStorage.clear();
                        navigate('/');
                        break;
                
                    default:
                        return data as Prenotazione | undefined;
                        break;
                }
            })
        }
    })*/

    return (
        <>
            <Navbar />
            <div className="mt-24 mx-auto w-8/12 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 text-white">
                <div className="grid grid-cols-2 items-baseline">
                    <h2 className="text-white mb-4 text-4xl">Prenota per {ristorante?.nome}</h2>
                    <a onClick={async () => navigate('/')} className="justify-self-end hover:cursor-pointer border-b-indigo-500 text-indigo-500 border-b-2 hover:boder-b-white-500 hover:text-white-500">Torna indietro</a>
                </div>
                <p className="text-white">{ristorante?.indirizzo}</p>
                <p className="text-white">Orari:<br/>{
                                        ristorante?.fasce_orarie.map(fo => (
                                            <>
                                                <span>{fo}</span> <br/>
                                            </>
                                        ))
                                    }</p>

                <form className="mt-8">
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="numero">
                                Quanti siete
                            </label>
                            <input name="numeroPersone" onChange={(e) => setNumeroPersone(e.target.value)} className="appearance-none block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-city" type="text" placeholder="n°" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="fascia_oraria">
                                Scegli la fascia oraria:
                            </label>
                            <div className="relative">
                                <select name="fasciaOraria" onChange={(e) => { setFasciaOraria(e.target.value) }} className="block appearance-none w-full bg-gray-800 border border-gray-700 text-gray-300 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="grid-state">
                                    <option value="">--:--</option>
                                    {
                                        ristorante?.fasce_orarie.map(fo => (
                                            <option value={fo}>{fo}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={async () => postPrenotazione(fasciaOraria, numeroPersone, location.state.ristoranteId, navigate)} className="center w-full md:w-1/8 bg-transparent hover:bg-sky-500 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                        Prenota
                    </button>
                </form>
            </div>
        </>
    )
}

function postPrenotazione(fasciaOraria: string, numeroPersone: number | string, ristoranteId: number, navigate: NavigateFunction) {
    if(fasciaOraria === '' || numeroPersone === '') {
        alert("i campi devono essere compilati");
        return;
    }
    fetch('http://localhost:4321/prenotazione/crea', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prenotante: Number(localStorage.getItem('userId')),
                    numeroPersone: +numeroPersone, 
                    ristorante: +ristoranteId,
                    fasciaOraria
                })
            }).then(res => res.json()).then(data => {
                switch (data["statusCode"]) {
                    case 500:
                        alert("qualcosa è andato storto");
                        break;

                    case 401:
                    case 403:
                        alert("token non valido");
                        localStorage.clear();
                        navigate('/');
                        break;
                
                    default:
                        if(!data) {
                            alert("Superi la soglia dei coperti! Non puoi prenotare per questa fascia oraria") 
                            break;
                        }
                        alert('prenotazione effettuata con successo')
                        navigate('/home')
                        break;
                }
            })
}