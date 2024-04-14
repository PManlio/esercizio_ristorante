import { useNavigate } from "react-router-dom";
import Login from "./forms/Login";
import Signin from "./forms/Signin";
import Home from "../home/Home";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AuthPage() {

    const navigate = useNavigate();

    const {data: token} = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            return localStorage.getItem('token');
        }
    })

    useEffect(() => {
        if(token) navigate('/home');
        else navigate('/')
    }, [token]);

    return (
        <>

            {!token && <div className="h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="flex items-center justify-center h-screen">

                    <Login></Login>

                    <div style={{ height:"50vh", width:"1px", marginLeft: "40px", marginRight: "40px",backgroundColor:'white' }} ></div>

                    <Signin></Signin>

                </div>
            </div>}
            {token && <Home/> }
        </>
    )
}