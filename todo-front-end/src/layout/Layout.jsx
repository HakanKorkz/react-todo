import React from "react";
import Header from "layout/Header";
import Footer from "layout/Footer";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className={"min-h-screen flex flex-col"}>
            <Header/>
            <main className={"flex-1 p-2"}>
            <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}