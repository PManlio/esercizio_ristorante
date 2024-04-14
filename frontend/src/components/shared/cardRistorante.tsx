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
    return (
        <>
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.ristorante.nome}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">{
                    props.ristorante.fasce_orarie.map(fo => {
                        return (
                            <span className="border rounded-lg border-indigo-500 mr-2 px-2 py-1">{fo}</span>
                        )
                    })
                }</p>

                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">{
                    props.ristorante.tipo_cucina.map(tc => {
                        return (
                            <span className="border rounded-lg border-emerald-500 mr-2 px-2 py-1">{tc}</span>
                        )
                    })
                }</p>

                <p className="font-normal text-gray-700 dark:text-gray-400">{props.ristorante.indirizzo}</p>
            </a>
        </>

    )
}