import { createSlice } from "@reduxjs/toolkit";
import {AboutIcon, CounterIcon, HomeIcon} from "elements/Icons";
import React from "react";

const initialState=[
    {
        to: "/",
        name: "Anasayfa",
        icon: <HomeIcon size={24}/>
    },
    {
        to: "/counter",
        name: "Sayaç",
        icon: <CounterIcon size={24}/>
    },
    {
        to: "/About",
        name: "Hakkımda",
        icon: <AboutIcon size={24}/>
    },
]

export const menuSlice=createSlice({
    name: "menus",
    initialState,
})

export default menuSlice.reducer