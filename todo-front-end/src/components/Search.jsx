import React, {useEffect, useRef, useState} from "react";
import {SearchIcon} from "elements/Icons";

export default function Search() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [searchIconBoolean, setsSearchIconBoolean] = useState(true);
    const searchInput = useRef(null)
    useEffect(() => {
        window.addEventListener("load", (ev) => {
            setWindowWidth(ev?.currentTarget?.innerWidth)
        })
        window.addEventListener("resize", (ev) => {
            setWindowWidth(ev?.currentTarget?.innerWidth)
        })
        console.log(windowWidth)
        //searchInput.current.focus()
    }, [windowWidth, searchIconBoolean])
    return (
        <div className="w-[25%] flex sm:justify-center items-center gap-2 sm:relative">
            <input
                type="text"
                ref={searchInput}
                className={
                    "w-full p-2 outline-none bg-transparent max-sm:hidden"
                }
                placeholder={
                    "Arama alanı"
                }/>
            <SearchIcon
                className={
                    `sm:absolute sm:right-0 max-sm:m-auto hover:cursor-pointer hover:text-zinc-500 hover:transition-all`
                }
                size={28}/>
        </div>

    )
}