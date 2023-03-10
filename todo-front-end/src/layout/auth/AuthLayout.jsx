import React from "react"
import { Outlet } from "react-router-dom"
import { Helmet } from "react-helmet"
import tittleLocation from "utils/TittleLocation"

export default function AuthLayout() {
  const tittle = tittleLocation()

  return (
    <>
      <Helmet>
        <title>Todo App & {tittle}</title>
        <meta name="description" content="Todo App login" />
      </Helmet>
      <div className={"flex h-full flex-1 items-center justify-center bg-gray-50 p-4"}>
        <div
          className={
            "flex h-auto w-1/2 flex-col items-center gap-6 rounded-full bg-neutral-200 p-4"
          }
        >
          <div className={"flex items-center justify-center gap-2 text-center text-neutral-700"}>
            <span className={"text-3xl font-bold"}>Todo</span>
            <div className={"text-4xl font-bold"}>&</div>
            <b className={"text-2xl"}>App</b>
            <div className={"text-4xl font-bold"}>&</div>
            <b className={"text-2xl"}>{tittle}</b>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
