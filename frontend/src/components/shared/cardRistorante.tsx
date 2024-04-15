import { useNavigate } from "react-router-dom";
import { Ristorante } from "../../interfaces/ristorante";

/* interface Ristorante {
    id: number;
    nome: string;
    indirizzo: string;
    tipo_cucina: string[];
    max_coperti: number;
    fasce_orarie: string[];
} */

export default function CardRistorante(props: { ristorante: Ristorante }) {

    const navigate = useNavigate();

    return (
        <>
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">

                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 text-white">{props.ristorante.nome}</h5>
                <p className="font-normal text-gray-700 text-gray-400 mb-4">{
                    props.ristorante.fasce_orarie.map(fo => {
                        return (
                            <span className="border rounded-lg border-indigo-500 mr-2 px-2 py-1">{fo}</span>
                        )
                    })
                }</p>

                <p className="font-normal text-gray-700 text-gray-400 mb-4">{
                    props.ristorante.tipo_cucina.map(tc => {
                        return (
                            <span className="border rounded-lg border-emerald-500 mr-2 px-2 py-1">{tc}</span>
                        )
                    })
                }</p>

                <p className="font-normal text-gray-700 text-gray-400 mb-4">{props.ristorante.indirizzo}</p>
                <div>
                    <a onClick={async() => navigate('/prenotazione')} type="button" className="bg-transparent hover:bg-sky-500 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                        Prenota {/** @TODO: cambia il navigate dell'onClick in una funzione che prima si salva lo stato del ristorante e poi fa il navigate */}
                    </a>
                </div>
            </a>
        </>

    )
}