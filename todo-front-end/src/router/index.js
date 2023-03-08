import { createBrowserRouter, Outlet } from "react-router-dom"
import Routers from "./Routers"
import ProtectedRouters from "utils/ProtectedRouters"
import AuthLayout from "layout/auth/AuthLayout"

const { Home, Counter, About, OutSide, Notes, BcryptGenerator, Blank, PageNotFound } = Routers

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRouters />,
    children: [
      {
        element: Home,
        index: true,
      },
      {
        path: "counter",
        element: Counter,
      },
      {
        path: "about",
        element: About,
      },
      {
        path: "out",
        element: OutSide,
      },
      {
        path: "note",
        element: Notes,
      },
      {
        path: "bcrypt-generator",
        element: BcryptGenerator,
      },
      {
        path: "*",
        element: PageNotFound,
      },
    ],
  },
  {
    path: "/auth",
    element: <ProtectedRouters />,
    children: [
      {
        path: "login",
        element: <>Login</>,
        index: true,
      },
      {
        path: "register",
        element: <>Register</>,
      },
      {
        path: "*",
        element: <>Aranılan bulunamadı</>,
      },
    ],
  },
  // {
  //   path: "/auth",
  //   element: <ProtectedRouters />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <> sayfa</>,
  //       index: true,
  //     },
  //     {
  //       path: "/login",
  //       element: <> Login sayfası</>,
  //     },
  //     {
  //       path: "/register",
  //       element: <> Register sayfası</>,
  //     },
  //     {
  //       path: "*",
  //       element: <> notFound sayfası</>,
  //     },
  //   ],
  // },
  // {
  //   path: "/blank",
  //   element: Blank,
  // },
  // {
  //   path: "/admin",
  //   element: (
  //     <>
  //       Layout Admin
  //       <Outlet />
  //     </>
  //   ),
  //   children: [
  //     {
  //       element: "Home",
  //       index: true,
  //     },
  //   ],
  // }
])
