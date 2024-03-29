import { SiTodoist } from "react-icons/si"
import { ImSearch } from "react-icons/im"
import { RxCounterClockwiseClock } from "react-icons/rx"
import { AiFillContacts, AiOutlineClose, AiOutlineHome } from "react-icons/ai"
import { GrTextAlignRight } from "react-icons/gr"
import { MdAccountBox, MdEmail, MdLockOpen, MdLockOutline } from "react-icons/md"

const TodoLogo = ({ ...props }) => {
  return <SiTodoist {...props} />
}
const SearchIcon = ({ ...props }) => {
  return <ImSearch {...props} />
}
const CounterIcon = ({ ...props }) => {
  return <RxCounterClockwiseClock {...props} />
}
const HomeIcon = ({ ...props }) => {
  return <AiOutlineHome {...props} />
}
const AboutIcon = ({ ...props }) => {
  return <AiFillContacts {...props} />
}
const MobileMenuIcon = ({ ...props }) => {
  return <GrTextAlignRight {...props} />
}

const MobileCloseIcon = ({ ...props }) => {
  return <AiOutlineClose {...props} />
}
const AuthLockOpen = ({ ...props }) => {
  return <MdLockOpen {...props} />
}
const AuthEmail = ({ ...props }) => {
  return <MdEmail {...props} />
}
const AuthUserIcon = ({ ...props }) => {
  return <MdAccountBox {...props} />
}
const AuthLockClosed = ({ ...props }) => {
  return <MdLockOutline {...props} />
}

export {
  TodoLogo,
  SearchIcon,
  CounterIcon,
  HomeIcon,
  AboutIcon,
  MobileMenuIcon,
  MobileCloseIcon,
  AuthUserIcon,
  AuthEmail,
  AuthLockClosed,
  AuthLockOpen,
}
