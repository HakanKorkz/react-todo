import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {AboutIcon, CounterIcon, HomeIcon} from "elements/Icons";
import classNames from "classnames";

export default function Menus() {
    const path = useLocation()
    console.log(path.pathname)
    const menus = [
        {
            to: "/",
            name: "Anasayfa",
            icon: <HomeIcon size={24}/>
        },
        {
            to: "/counter",
            name: "Sayaç",
            icon: <CounterIcon size={24}/>
        },
        {
            to: "/About",
            name: "Hakkımda",
            icon: <AboutIcon size={24}/>
        }
    ]
    return (
        <div className="text-zinc-400 flex items-center justify-center text-center gap-2">
            {
                menus.map((menu, i) => {
                    return (
                        <NavLink to={menu.to} key={i}
                                 className={classNames({
                                     "flex-row justify-center items-center text-center": true,
                                     "text-zinc-600": path.pathname===menu.to
                                 })}
                        >
                            {menu.icon} {menu.name}
                        </NavLink>
                    )
                })
            }
        </div>
    )
}