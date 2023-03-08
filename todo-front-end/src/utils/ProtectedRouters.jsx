import React, { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import Layout from "layout/Layout"
import AuthLayout from "layout/auth/AuthLayout"

export default function ProtectedRouters() {
  const [user, setUser] = useState([
    // {
    //   name: "Hakan",
    //   lastName: "Korkmaz",
    // },
  ])
  // setUser([
  //   {
  //     name: "Hakan",
  //     lastName: "Korkmaz",
  //   },
  // ])
  const location = useLocation()
  const locationControl = location.pathname.split("/")
  const locationAuthControl = locationControl.at(1)

  // const regex = new RegExp(/^[a-zA-Z/]*$/)
  // console.log(user.length)
  // console.log(locationAuthControl)
  // console.log(regex.test(locationAuthControl))

  return user.length !== 0 ? (
    // burada user state doluysa sayfalar gözükür
    locationAuthControl !== "auth" ? (
      // burada sayfa auth den gelmemişse direkt görüntüler
      <Layout />
    ) : (
      // burada sayfa auth den gelmişse ana dizine yönlendirilir
      <Navigate to={"/"} />
    )
  ) : locationAuthControl !== "auth" ? (
    // burada user state boşsa ve auth den gelmemişse auth/login yönlendirilir
    <Navigate to={"auth/login"} />
  ) : locationControl.length > 2 ? (
    // burada sadece auth  control yapılır
    user.length === 0 ? (
      // burada user state boşsa sayfalar gözükür
      <AuthLayout />
    ) : (
      // burada user state doluysa ana dizine yönlendiilir
      <Navigate to={"/"} />
    )
  ) : (
    // burada sadece auth ise istek login yönlendirilir
    <Navigate to={"login"} />
  )
}
