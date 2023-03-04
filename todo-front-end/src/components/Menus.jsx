import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {MobileCloseIcon, MobileMenuIcon} from "elements/Icons";
import classNames from "classnames";
import {useSelector} from "react-redux";

export default function Menus() {
    const states = useSelector((state) => state)
    const menus = states.menu
    const path = useLocation()
    const [isMobileMenu, setIsMobileMenu] = useState(false)
    useEffect(() => {
        console.log(isMobileMenu)
    }, [isMobileMenu])
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
                    <button className={"hover:text-zinc-500 transition-colors"}
                            onClick={() => setIsMobileMenu(!isMobileMenu)}>
                        <MobileMenuIcon size={48}/>
                    </button>
                    <div className={classNames({
                        "fixed w-full h-full top-0 p-4  bg-zinc-300 transition-all duration-1000": true,
                        "left-full": !isMobileMenu,
                        "left-0": isMobileMenu
                    })}>
                        <div className={"relative flex flex-1 flex-col justify-center content-center items-center gap-2 w-full"}>
                          <button className={"absolute left-0 top-0 bg-zinc-500 hover:bg-zinc-400 w-7 h-7 rounded-full flex text-center justify-center items-center "}
                                  onClick={() => setIsMobileMenu(!isMobileMenu)}
                          >
                              <MobileCloseIcon size={24} className={"text-zinc-100 hover:text-zinc-200"}/>
                          </button>
                            <div className={"flex flex-1 flex-col justify-center content-center items-center gap-2 mt-10 w-full"}>
                                {
                                    menus.map((menu, i) => {
                                        return (
                                            <NavLink to={menu.to} key={i}
                                                     className={classNames({
                                                         "flex flex-col justify-center content-center items-center  bg-zinc-100 rounded-full w-1/2 hover:text-zinc-300 hover:bg-zinc-400 p-2": true,
                                                         "text-zinc-300 bg-zinc-400": path.pathname === menu.to
                                                     })}
                                                     onClick={() => setIsMobileMenu(false)}
                                            >
                                                {menu.icon} {menu.name}
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}