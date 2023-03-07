import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { MobileCloseIcon, MobileMenuIcon } from "elements/Icons"
import classNames from "classnames"
import { useSelector } from "react-redux"

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
      <div className="scrollbar-rounded-2 flex h-full flex-1  gap-2 overflow-y-auto scroll-smooth text-zinc-400  scrollbar-thin scrollbar-thumb-zinc-400">
        <div className={"flex flex-1 justify-around gap-2 max-md:hidden"}>
          {menus.map((menu, i) => {
            return (
              <NavLink
                to={menu.to}
                key={i}
                className={classNames({
                  "group-hidden flex items-center justify-center gap-2 text-center": true,
                  "text-zinc-600": path.pathname === menu.to,
                })}
              >
                {menu.icon} {menu.name}
              </NavLink>
            )
          })}
        </div>

        <div className={"flex flex-1 justify-end gap-2 md:hidden"}>
          <button
            className={"transition-colors hover:text-zinc-500"}
            onClick={() => setIsMobileMenu(!isMobileMenu)}
          >
            <MobileMenuIcon size={48} />
          </button>
          <div
            className={classNames({
              "fixed top-0 h-full w-full bg-zinc-300  p-4 transition-all duration-1000": true,
              "left-full": !isMobileMenu,
              "left-0": isMobileMenu,
            })}
          >
            <div
              className={
                "relative flex w-full flex-1 flex-col content-center items-center justify-center gap-2"
              }
            >
              <button
                className={
                  "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-500 text-center hover:bg-zinc-400 "
                }
                onClick={() => setIsMobileMenu(!isMobileMenu)}
              >
                <MobileCloseIcon size={24} className={"text-zinc-100 hover:text-zinc-200"} />
              </button>
              <div
                className={
                  "mt-10 flex w-full flex-1 flex-col content-center items-center justify-center gap-2"
                }
              >
                {menus.map((menu, i) => {
                  return (
                    <NavLink
                      to={menu.to}
                      key={i}
                      className={classNames({
                        "flex w-1/2 flex-col content-center items-center  justify-center rounded-full bg-zinc-100 p-2 hover:bg-zinc-400 hover:text-zinc-300": true,
                        "bg-zinc-400 text-zinc-300": path.pathname === menu.to,
                      })}
                      onClick={() => setIsMobileMenu(false)}
                    >
                      {menu.icon} {menu.name}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
