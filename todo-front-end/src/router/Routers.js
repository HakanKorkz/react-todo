import Home from "pages/home/Home"
import About from "pages/home/About"
import Counter from "pages/home/Counter"
import PageNotFound from "pages/home/PageNotFound"
import OutsideAlerter from "pages/home/OutsideAlerter"
import Notes from "pages/home/Notes"
import Bcrypt from "pages/home/Bcrypt"
import Blank from "pages/home/Blank"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
const Routers = {
  Home: <Home />,
  Login: <Login />,
  Register: <Register />,
  About: <About />,
  Counter: <Counter />,
  OutSide: <OutsideAlerter />,
  Notes: <Notes />,
  BcryptGenerator: <Bcrypt />,
  Blank: <Blank />,
  PageNotFound: <PageNotFound />,
}

export default Routers
