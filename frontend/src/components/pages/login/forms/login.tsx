import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState(""); // inizializzo a stringa vuota, in quanto l'username è stringa vuota
    const [password, setPassword] = useState("");
    const navigate                = useNavigate()

    /**
     * Per accedere alle funzioni che modificano i dati (che possiamo richiamare dove ci serve),
     * possiamo destrutturare il return di
     * useMutation in {mutate, mytateAsync}, che fanno la stessa cosa MA il secondo è asincrono
     * e quindi puoi eseguire l'await della response
     * 
     * inoltre, dopo il mutateAsync mettiamo "setToken" che ci fungerà da alias: potresti dover
     * aver bisogno di più mutation per roba differente nel componente
     * */ 
    const { mutate: setToken } = useMutation({
        mutationFn: addTokenToLocalStorage,
    });

    function addTokenToLocalStorage(body: {username: string; password: string}) {
        // window.localStorage.setItem("token", token);
        return fetch("http://localhost:4321/utente/login", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body),
            }).then(res => res.json()).then(data => {
                console.log(data);
                if(data["user"] && data["token"]) {
                    localStorage.setItem("token", data["token"]);
                    localStorage.setItem("userId", data["user"]["id"]);
                    setUsername(""); 
                    setPassword("");
                    navigate('/home')
                }
                else alert("Utente non trovato");
            });
    }


    function login() {
        if(username && password) {
            const body = { username, password };
            setToken(body);
        } else {
            alert("username o password non impostati");
        }

    }

    return (
        <div className="h-84 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700" style={{ height: "362px" }}>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">Effettua il Login</h5>

            <p className="mb-3 font-normal text-gray-700 text-gray-400">Se hai già un account, inserisci le credenziali</p>
            <form>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-white">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                </div>

                <button onClick={login} type="button" className="w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-emerald-800">Login</button>
            </form>
        </div>
    )
}
