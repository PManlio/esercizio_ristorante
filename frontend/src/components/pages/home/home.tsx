import { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar"
import CardRistorante from "../../shared/CardRistorante";

export default function Home() {

    const [ristoranti, setRistoranti] = useState([]);

    const [tipoCucina, setTipoCucina] = useState<string[]>([]);
    const [fasceOrarie, setFasceOrarie] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://localhost:4321/ristorante/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "tipo_cucina": tipoCucina, "fasce_orarie": fasceOrarie })
        }).then(res => res.json()).then((data) => {
            console.log(data)
            setRistoranti(data);
        });
    }, [tipoCucina, fasceOrarie])

    return (
        <>
            <Navbar />
            <div className="mt-24 mx-auto w-8/12 p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 text-white">
                <h2 className="text-white mb-4 text-4xl">Cerca un ristorante</h2>
                <div className="grid w-fill gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="fasceOrarie" className="block mb-2 text-sm font-medium text-gray-900 text-white">Seleziona una fascia Oraria:</label>
                        <select value={fasceOrarie} onChange={(e) => { e.target.value !== '' ? setFasceOrarie([e.target.value]) : setFasceOrarie([]) }} id="fasceOrarie" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                            <option selected value=''>--:--</option>
                            <option value="13:00 - 15:00">13:00 - 15:00</option>
                            <option value="18:00 - 21:00">18:00 - 21:00</option>
                            <option value="19:00 - 23:00">19:00 - 23:00</option>
                            <option value="h24">h24</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="tipoCucina" className="block mb-2 text-sm font-medium text-gray-900 text-white">Scrivi un tipo di cucina:</label>
                        <input type="text" value={tipoCucina} onChange={(e) =>{ e.target.value !== '' ? setTipoCucina([e.target.value]) : setTipoCucina([]) }} id="tipoCucina" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                </div>

                <h2 className="text-white mb-4 text-3xl">Elenco ristoranti</h2>

                <div className="grid grid-rows-1 grid-cols-3 gap-4">
                    <>
                        {
                            ristoranti.map((ristorante) => {
                                return (
                                        <CardRistorante ristorante={ristorante}  />
                                    
                                )    
                            })
                        }
                    </>
                </div>
            </div>
        </>
    )
}