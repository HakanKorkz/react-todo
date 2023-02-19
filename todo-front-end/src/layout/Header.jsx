import React, {useEffect, useRef, useState} from "react";
import {SearchIcon, TodoLogo} from "elements/Icons";

export default function Header() {
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
        <div className="w-full h-20 bg-gray-300 p-2 flex flex-1 items-center gap-4 text-zinc-400">
            <div className="max-md:w-[40%] max-sm:w-1/6 w-[25%] text-zinc-400">
                {/*Logo alanı*/}
                <div className="flex items-center gap-2 flex-1 hover:text-zinc-500 hover:transition-all">
                    <TodoLogo size={48}/>
                    <span className="text-2xl max-sm:hidden pointer-events-none">
                        Todo App
                    </span>
                </div>
            </div>
            <div className="w-[25%] flex sm:justify-center items-center gap-2 sm:relative">
                {/*Search  alanı*/}
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
            <div className="text-zinc-400 flex items-center justify-center gap-2">
                {/*Menü alanı*/}
                Menüler
            </div>

        </div>

    )
}