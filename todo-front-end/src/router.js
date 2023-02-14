import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "counter",
        element: <Counter/>
    },
    {
        path: "about",
        element: <About/>,
    },
]);