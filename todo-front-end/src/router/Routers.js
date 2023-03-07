import Home from "pages/home/Home"
import About from "pages/home/About"
import Counter from "pages/home/Counter"
import PageNotFound from "pages/home/PageNotFound"
import OutsideAlerter from "pages/home/OutsideAlerter"
import Notes from "pages/home/Notes"
import Bcrypt from "pages/home/Bcrypt"
const Routers = {
  Home: <Home />,
  About: <About />,
  Counter: <Counter />,
  OutSide: <OutsideAlerter />,
  Notes: <Notes />,
  BcryptGenerator: <Bcrypt />,
  PageNotFound: <PageNotFound />,
}

export default Routers
