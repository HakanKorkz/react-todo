import React, { useRef } from "react"
import { Link, Outlet, useOutlet } from "react-router-dom"
import { Helmet } from "react-helmet"
import tittleLocation from "utils/TittleLocation"
import { UserServices } from "services/"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginFetch } from "services/users"

export default function AuthLayout() {
  const tittle = tittleLocation()
  const outletContext = useOutlet()
  const outletName = outletContext.props.children.props.children.type.name
  const buttonRef = useRef()
  const formAction = async (e, outletName) => {
    e.preventDefault()
    //  buttonRef.current.disabled = true
    let conclusion
    switch (outletName) {
      case "Login":
        conclusion = await UserServices.loginFetch(e)
          .then((result) => result)
          .catch((error) => error)
        break
      case "Register":
        conclusion = await UserServices.registerFetch(e)
          .then((result) => result)
          .catch((error) => error)

        break
      default:
        conclusion = {
          messages: "",
          confirm: "",
        }
    }
    console.log(conclusion?.conclusion)
    toast(conclusion.messages, {
      type: conclusion.confirm,
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  return (
    <>
      <Helmet>
        <title>Todo App & {tittle}</title>
        <meta name="description" content="Todo App login" />
      </Helmet>
      {outletName !== "PageNotFound" ? (
        <div className={"flex h-full items-center justify-center bg-gray-50 p-4"}>
          <div
            className={
              "max-smaller:w-full flex h-auto w-1/4 flex-col items-center gap-6 rounded-[50px] bg-neutral-200 p-4  max-2xl:w-1/3 max-xl:w-2/3 max-xl:p-6 max-lg:w-2/3 max-md:w-2/3 max-sm:w-[100%]"
            }
          >
            <div
              className={
                "flex items-center justify-center gap-2 break-all text-center text-neutral-700 max-xl:mt-2"
              }
            >
              <span className={"text-3xl font-bold"}>Todo</span>
              <div className={"text-4xl font-bold"}>&</div>
              <b className={"text-2xl"}>App</b>
              <div className={"text-4xl font-bold"}>&</div>
              <b className={"text-2xl"}>{tittle}</b>
            </div>
            <p className="font-semibold tracking-wider">
              Sisteme {outletName === "Login" ? "Kayıt olmak" : "Giriş Yapmak"} için &nbsp;
              <Link
                to={outletName === "Login" ? "register" : "login"}
                className={"font-bold text-neutral-800 hover:text-neutral-600"}
              >
                Tıklayınız
              </Link>
            </p>
            <form
              id={outletName === "Login" ? "login" : "register"}
              method={"post"}
              onSubmit={(event) => formAction(event, outletName)}
              className={"flex justify-center max-xl:mb-4"}
            >
              <Outlet />
            </form>
            <div className={"flex w-2/3 items-center justify-center text-center"}>
              <button
                type="submit"
                form={outletName === "Login" ? "login" : "register"}
                className="w-full rounded-lg border border-transparent bg-zinc-400 py-2 px-4 text-sm font-medium text-white focus:outline-none disabled:cursor-not-allowed hover:bg-zinc-500"
                ref={buttonRef}
              >
                {outletName === "Login" ? "Giriş yap" : "Kayıt Ol"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={"flex h-full items-center justify-center bg-gray-50 p-4"}>
          <div
            className={
              "max-smaller:w-full flex h-auto w-1/4 flex-col items-center gap-6 rounded-full bg-neutral-200 p-4 max-2xl:w-1/3  max-xl:w-2/3 max-xl:p-6 max-lg:w-2/3 max-md:w-2/3 max-sm:w-[100%]"
            }
          >
            <div className={"flex justify-center max-xl:mb-4"}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
