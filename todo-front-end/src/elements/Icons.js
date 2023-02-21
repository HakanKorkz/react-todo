import {SiTodoist} from "react-icons/si";
import {ImSearch} from "react-icons/im";
import {RxCounterClockwiseClock} from "react-icons/rx";
import {GrHomeRounded} from "react-icons/gr";
import {AiFillContacts} from "react-icons/ai";

const TodoLogo = ({...props}) => {
    return  <SiTodoist {...props}/>
}
const SearchIcon = ({...props}) => {
    return  <ImSearch {...props}/>
}
const CounterIcon = ({...props}) => {
    return  <RxCounterClockwiseClock {...props}/>
}
const HomeIcon = ({...props}) => {
    return  <GrHomeRounded {...props}/>
}
const AboutIcon = ({...props}) => {
    return  <AiFillContacts {...props}/>
}

export {
    TodoLogo,
    SearchIcon,
    CounterIcon,
    HomeIcon,
    AboutIcon
}