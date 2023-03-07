import React, { useEffect, useRef, useState } from "react"
function useOutsideAlerter(ref, setStatus) {
  useEffect(() => {
    function handleClickOutside(event) {
      let stat = ""
      if (ref.current && !ref.current.contains(event.target)) {
        stat = "Benim dışımda tıkladın!"
      } else {
        stat = "bana tıkladın"
      }

      return stat
    }

    // Bind the event listener
    document.addEventListener("mousedown", (ev) => {
      setStatus(handleClickOutside(ev))
    })
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", (ev) => {
        setStatus(handleClickOutside(ev))
      })
    }
  }, [ref])
}

export default function OutsideAlerter() {
  const wrapperRef = useRef(null)
  const [status, setStatus] = useState("Tıkla")
  useOutsideAlerter(wrapperRef, setStatus)
  return (
    <div className={"container mx-auto mt-28 w-1/2"}>
      <div className="bg-gray-300 p-4 text-center hover:bg-gray-500" ref={wrapperRef}>
        {status}
      </div>
      <p className={"mt-4 border p-4 "}>
        Bu modül sayfasında yukarı da " Bana tıkla " elamanına tıkladığınız ve dışına tıklandığının
        yakalandığı modül vardır
      </p>
    </div>
  )
}
