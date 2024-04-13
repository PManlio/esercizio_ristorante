import Login from "./forms/login";
import Signin from "./forms/signin";

export default function AuthPage() {

    return (
        <>
            <div className="h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="flex items-center justify-center h-screen">

                    <Login></Login>

                    <div style={{ height:"50vh", width:"1px", marginLeft: "40px", marginRight: "40px",backgroundColor:'white' }} ></div>

                    <Signin></Signin>

                </div>
            </div>
        </>
    )
}