import { useEffect, useRef, useState } from "react"
import { SearchIcon } from "elements/Icons"
import classNames from "classnames"
import autoAnimate from "@formkit/auto-animate"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useDispatch } from "react-redux"
import { windowSizeChange } from "features/window-size/windowSizeSlice"
export default function Search() {
  const dispatch = useDispatch()
  const [windowWidth, setWindowWidth] = useState(0)
  const [searchIconBoolean, setsSearchIconBoolean] = useState(true)
  const [search, setsSearch] = useState("")
  const [searchInputFocused, setsSearchInputFocused] = useState(false)
  const searchRef = useRef(null)
  const [parent] = useAutoAnimate()
  const searchInputRef = useRef(null)
  useEffect(() => {
    window.addEventListener("load", (ev) => {
      setWindowWidth(ev?.currentTarget?.innerWidth)
      if (!searchResizeStatus(windowWidth)) {
        setsSearchIconBoolean(true)
      }
    })
    dispatch(windowSizeChange(windowWidth))
  }, [])
  useEffect(() => {
    window.addEventListener("resize", (ev) => {
      setWindowWidth(ev?.currentTarget?.innerWidth)
      if (!searchResizeStatus(windowWidth)) {
        setsSearchIconBoolean(true)
      }
    })
    dispatch(windowSizeChange(windowWidth))
  }, [windowWidth])

  useEffect(() => {
    document.addEventListener("mousedown", (ev) => {
      const res = refHandle(ev)
      searchPlaceholderHandle(res, search)
    })

    searchRef.current && autoAnimate(searchRef.current)
    if (searchInputFocused) {
      searchInputRef.current.focus()
    }
  }, [searchRef, search])
  const refHandle = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      const res = false
      setsSearchInputFocused(res)
      return res
    } else {
      const res = true
      setsSearchInputFocused(res)
      return res
    }
  }
  const searchChange = (value) => {
    setsSearch(value)
    searchPlaceholderHandle(true, value)
  }
  const searchPlaceholderHandle = (...options) => {
    const [status, search] = options
    const placeholder = document.getElementById("placeholder")
    if (status) {
      if (placeholder.innerText !== "Arama yapmak için lütfen Enter tuşunu kullanınız") {
        if (search.trim() === "" && search.length <= 1) {
          placeholder.innerHTML = "<span> Arama yapmak için lütfen Enter tuşunu kullanınız </span>"
        } else {
          placeholder.innerHTML = ""
        }
      } else {
        if (search.trim() !== "") {
          placeholder.innerHTML = ""
        }
      }
    } else {
      if (placeholder.innerText !== "Arama" && search.trim() === "") {
        if (search.trim() === "" && search.length <= 1) {
          if (placeholder.innerText !== "") {
            placeholder.innerHTML = "<span> Arama</span>"
          }
        } else {
          placeholder.innerHTML = ""
        }
      }
    }
  }

  const searchResizeStatus = (windowWidth) => {
    return windowWidth <= 639
  }

  const searchMobileClickHandle = () => {
    if (searchResizeStatus(windowWidth)) {
      setsSearchIconBoolean(!searchIconBoolean)
    }
  }

  return (
    <div
      className={classNames({
        "w-[25%]": !searchResizeStatus(windowWidth),
        "w-[50%]": searchResizeStatus(windowWidth),
      })}
      ref={parent}
    >
      <form
        className={classNames({
          "flex items-center gap-2 ": true,
          "sm:relative sm:justify-center sm:rounded-b sm:border-b ": searchIconBoolean,
          "relative justify-center rounded-b border-b ": !searchIconBoolean,
          "sm:group  transition-colors sm:border-b-zinc-400 sm:hover:border-b-zinc-500":
            !searchInputFocused,
          "sm:border-b-zinc-500": searchInputFocused,
          "group  border-b-zinc-400 transition-colors hover:border-b-zinc-500":
            !searchInputFocused && !searchIconBoolean,
          "border-b-zinc-500": searchInputFocused && !searchIconBoolean,
          "h-14 pb-2": searchInputFocused && !searchIconBoolean && searchResizeStatus(windowWidth),
          "font-medium": true,
          "break-normal text-sm": searchResizeStatus(windowWidth),
        })}
        ref={searchRef}
      >
        <input
          type="text"
          ref={searchInputRef}
          className={classNames({
            "w-full bg-transparent p-2 pr-8 outline-none": true,
            "max-sm:hidden": searchIconBoolean,
          })}
          onChange={(event) => searchChange(event.target.value)}
        />
        <div
          className={classNames({
            "pointer-events-none absolute left-2 w-4/5": true,
            "max-sm:hidden": searchIconBoolean,
          })}
          ref={parent}
          id="placeholder"
        >
          <span> Arama </span>
        </div>
        {searchIconBoolean && (
          <button
            type="button"
            className={classNames({
              "hover:cursor-pointer hover:text-zinc-500 hover:transition-all max-sm:m-auto sm:absolute sm:right-0": true,
              "group-hover:text-zinc-500": !searchInputFocused,
              "text-zinc-500": searchInputFocused,
            })}
            onClick={searchMobileClickHandle}
          >
            <SearchIcon size={28} />
          </button>
        )}
      </form>
    </div>
  )
}
