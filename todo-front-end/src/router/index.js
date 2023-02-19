import {createBrowserRouter, Outlet} from "react-router-dom";
import Routers from "./Routers";
import Layout from "layout/Layout";

const {
    Home,
    Counter,
    About,
    PageNotFound,
} = Routers


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                element: Home,
                index: true
            },
            {
                path: "counter",
                element: Counter
            },
            {
                path: "about",
                element: About,
            },
            {
                path: "*",
                element: PageNotFound,
            },
        ]
    },
    {
        path: "/admin",
        element: <>
            Layout Admin
            <Outlet/>
        </>,
        children: [
            {
                element: "Home",
                index: true
            }
        ]
    },
]);
