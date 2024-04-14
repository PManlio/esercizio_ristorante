import { useState } from "react"

export default function Signin() {

    const [username, setUsername]               = useState('')
    const [password, setPassword]               = useState('')
    const [repeatPassword, setRepeatPassword]   = useState('')
    const [email, setEmail]                     = useState('')

    function signin() {
        const body = {username, email, password};
        if(password === repeatPassword) {
            fetch("http://localhost:4321/utente/signin", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(data => {
                // console.log(data)
                if(data["id"] && data["username"]) {
                    alert("utente creato correttamente, effettua il login");
                    setPassword('');
                    setRepeatPassword('');
                    setEmail('');
                    setUsername('');
                } else alert("qualcosa è andato storto");
            })
        } else {
            alert("la password non coincide con la password ripetuta");
            setPassword('');
            setRepeatPassword('');
        }
    }
    

    return (
        <div className="h-84 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">Registrati</h5>

            <p className="mb-3 font-normal text-gray-700 text-gray-400">Inserisci le credenziali per iscriverti</p>


            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="register_username" className="block mb-2 text-sm font-medium text-gray-900 text-white">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="register_username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="register_email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="register_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="register_password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="register_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="rep_register_password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Ripeti password</label>
                        <input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" id="rep_register_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                    </div>
                </div>

                <button onClick={signin} type="button" className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-800">Registrati</button>

            </form>

        </div>
    )
}