import Navbar from "../../shared/Navbar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Prenotazione } from "../../../interfaces/prenotazione";

export default function DettaglioAccount() {

    const queryClient = useQueryClient();

    const { data: prenotazioniUtente } = useQuery({
        queryKey: ['prenotazioni'],
        queryFn: async () => {
            return await fetch('http://localhost:4321/prenotazione/prenotazioniutente/' + localStorage.getItem("userId"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => data as Prenotazione[] | undefined);
        },
        
    });

    const { mutateAsync: deletePrenotazione } = useMutation({
        mutationKey: ['prenotazioni'],
        mutationFn: async (id: number) => {
            return await fetch('http://localhost:4321/prenotazione/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => data as Prenotazione | undefined);
        },
        onSuccess: () => { return queryClient.invalidateQueries({queryKey: ["prenotazioni"]}) }
    })


    return (
        <>
            <Navbar />
            <div className="mt-24 mx-auto w-8/12 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 text-white">
                <h2 className="text-white mb-4 text-4xl">Le tue prenotazioni</h2>
                {
                    prenotazioniUtente?.map(pre => {
                        return (
                            <>
                                <div className="w-auto border boder-solid rounded-md border-gray-500 mb-8 p-4">
                                    <div className="grid grid-cols-2">
                                        <h2 className="text-white mb-4 text-3xl">{pre.ristorante.nome}</h2>
                                        <button type="button" onClick={async () => deletePrenotazione(pre.id)} className="w-1/3 justify-self-end text-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border border-solid border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">Cancella prenotazione</button>
                                    </div>
                                    <p className="text-white-700">{pre.ristorante.indirizzo}, prenotato per la fascia oraria <span className="text-indigo-500">{pre.fasciaOraria}</span></p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}