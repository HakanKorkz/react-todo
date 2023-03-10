import React from "react"

export default function Login() {
  return (
    <div
      className={
        "flex h-auto w-1/2 flex-col gap-2 p-1 text-center text-2xl font-bold text-neutral-700"
      }
    >
      <input type="text" className={"w-full p-1 text-lg outline-none"} placeholder={"Kadi"} />

      <input type="password" className={"w-full p-1 text-lg outline-none"} placeholder={"Pass"} />
    </div>
  )
}
