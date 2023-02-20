import React from "react";
import {NavLink, useLocation} from "react-router-dom";

export default function Menus() {
    const path = useLocation()
    console.log(path.pathname)
    const menus = [
        {
            to: "/",
            name: "Anasayfa"
        },
        {
            to: "/counter",
            name: "Sayaç"
        },
        {
            to: "/About",
            name: "Hakkımda"
        }
    ]
    return (
        <div className="text-zinc-400 flex items-center justify-center gap-2">
            {
                menus.map((menu,i)=>{
                    return (
                        <NavLink to={menu.to} key={i} className={menu.to===path.pathname ? `text-amber-600` : ``}>{menu.name}</NavLink>
                    )
                })
            }
        </div>
    )
}