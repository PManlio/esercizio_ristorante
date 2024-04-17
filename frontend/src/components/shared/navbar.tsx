import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    function logout () {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <nav className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between items-center mx-auto max-w-screen-xl p-4">

                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white space-x-3 rtl:space-x-reverse">Esercizio Ristoranti</span>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-white">
                            <li className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 hover:cursor-pointer">
                                <a className={location.pathname == '/home' ? "text-indigo-700 boder border-b border-indigo-700" : "text-white"} onClick={async () => navigate("/home")}>Home</a>
                            </li>
                            <li className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 hover:cursor-pointer">
                                <a className={location.pathname == '/account' ? "text-indigo-700 boder border-b border-indigo-700" : "text-white"} onClick={async () => navigate("/account")}>Account</a>
                            </li>
                            <li>
                                <button onClick={logout} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                                        Logout
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}