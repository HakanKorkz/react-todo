import React from "react"
import Logo from "components/Logo"
import Search from "components/Search"
import Menus from "components/Menus"

export default function Header() {
  return (
    <div className="flex h-20 w-full items-center gap-4 bg-gray-300 p-2 text-zinc-400">
      {/*Logo alanı*/}
      <Logo />
      {/*Search  alanı*/}
      <Search />
      {/*Menü alanı*/}
      <Menus />
    </div>
  )
}
