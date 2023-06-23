import React, { useState } from "react"
import { AuthLockClosed, AuthLockOpen, AuthUserIcon } from "elements/Icons"

export default function Login() {
  const [passwordShow, setPasswordShow] = useState(false)
  return (
    <div
      className={
        "flex h-auto w-1/2 flex-1 flex-col gap-2 p-1 text-center text-2xl font-bold text-neutral-700 max-sm:w-full"
      }
    >
      <div className={"flex justify-center"}>
        <input
          type="text"
          name={"kadi"}
          className={"flex-1 rounded-l bg-gray-100 p-1 text-lg outline-none max-sm:w-full"}
          placeholder={"Kullanıcı adı"}
        />
        <div className={"flex w-10 items-center justify-center rounded-r bg-gray-100 text-center"}>
          <AuthUserIcon size={28} />
        </div>
      </div>
      <div className={"flex justify-center"}>
        <input
          type={!passwordShow ? "password" : "text"}
          name={"pass"}
          className={"flex-1 rounded-l bg-gray-100 p-1 text-lg outline-none max-sm:w-full "}
          placeholder={"Şifre"}
        />
        <div
          onClick={() => setPasswordShow(!passwordShow)}
          className={
            "flex w-10 cursor-pointer items-center justify-center rounded-r bg-gray-100 text-center"
          }
        >
          {!passwordShow ? <AuthLockClosed size={28} /> : <AuthLockOpen size={28} />}
        </div>
      </div>
    </div>
  )
}
