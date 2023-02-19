import {SiTodoist} from "react-icons/si";
import {ImSearch} from "react-icons/im";

const TodoLogo = ({...props}) => {
    return  <SiTodoist {...props}/>
}
const SearchIcon = ({...props}) => {
    return  <ImSearch {...props}/>
}

export {TodoLogo,SearchIcon}