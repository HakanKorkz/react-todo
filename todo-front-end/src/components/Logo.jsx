import React from "react"
import { TodoLogo } from "elements/Icons"
import { useNavigate } from "react-router-dom"

export default function Logo() {
  const navigate = useNavigate()
  const clickHandle = () => {
    navigate("/")
  }
  return (
    <div className="w-[25%] text-zinc-400 max-md:w-[40%] max-sm:w-1/6 ">
      <div className="flex items-center gap-2">
        <TodoLogo
          onClick={clickHandle}
          size={48}
          className="cursor-pointer hover:text-zinc-500 hover:transition-all"
        />
        <div onClick={clickHandle} className="hover:text-zinc-500 hover:transition-all">
          <span className="cursor-pointer text-2xl max-sm:hidden">Todo App</span>
        </div>
      </div>
    </div>
  )
}
