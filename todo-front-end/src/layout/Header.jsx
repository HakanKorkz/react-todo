import React from "react";
import Logo from "components/Logo";
import Search from "components/Search";
import Menus from "components/Menus";

export default function Header() {


    return (
        <div className="w-full h-20 bg-gray-300 p-2 flex items-center gap-4 text-zinc-400">
            {/*Logo alanı*/}
            <Logo/>
            {/*Search  alanı*/}
            <Search/>
            {/*Menü alanı*/}
            <Menus/>

        </div>

    )
}