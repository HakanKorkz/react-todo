import Home from "pages/home/Home";
import About from "pages/home/About";
import Counter from "pages/home/Counter";
import PageNotFound from "pages/home/PageNotFound";
import OutsideAlerter from "pages/home/OutsideAlerter";
const Routers = {
    Home: <Home/>,
    About: <About/>,
    Counter: <Counter/>,
    OutSide: <OutsideAlerter/>,
    PageNotFound: <PageNotFound/>
}

export default Routers