import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "../pages/login/AuthPage";
import Home from "../pages/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GestionePrenotazione from "../pages/gestionePrenotazione/GestionePrenotazione";
import DettaglioAccount from "../pages/dettaglioAccount/DettaglioAccount";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage/>
    },
    {
        path: '/home',
        element: <Home/>,
    },
    {
        path: '/prenotazione',
        element: <GestionePrenotazione/>
    },
    {
        path: '/account',
        element: <DettaglioAccount />
    }
])

export default function PageWrapper() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </>
    )
}