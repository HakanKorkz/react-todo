import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {MobileMenuIcon} from "elements/Icons";
import classNames from "classnames";
import {useSelector} from "react-redux";

export default function Menus() {
    const menus=useSelector((state)=>state.menu)
    const path = useLocation()
    return (
        <>
            <div
                className="text-zinc-400 flex gap-2 flex-1  overflow-y-auto scrollbar-thin scrollbar-rounded-2 scrollbar-thumb-zinc-400  scroll-smooth h-full">
                <div className={"max-md:hidden flex gap-2 flex-1 justify-around"}>
                    {
                        menus.map((menu, i) => {
                            return (
                                <NavLink to={menu.to} key={i}
                                         className={classNames({
                                             "group-hidden flex gap-2 justify-center items-center text-center": true,
                                             "text-zinc-600": path.pathname === menu.to
                                         })}
                                >
                                    {menu.icon} {menu.name}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div className={"md:hidden flex gap-2 flex-1 justify-end"}>
                    <button className={"hover:text-zinc-500 transition-colors"}>
                        <MobileMenuIcon size={48}/>
                    </button>
                </div>
                <div className={"fixed w-full h-full left-full top-0 p-4  bg-amber-800 transition-all duration-1000  "}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet dicta dolorem, eum
                    exercitationem illo incidunt molestiae nam numquam quo repellat, repudiandae voluptate. Atque
                    inventore libero magnam pariatur provident?
                </div>
            </div>

        </>
    )
}