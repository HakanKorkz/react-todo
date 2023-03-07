import { users } from "services/users"
import React, { useEffect } from "react"
import Modules from "components/Modules"

export default function Home() {
  useEffect(() => {
    users().then((r) => r)
  }, [])
  return <Modules />
}
