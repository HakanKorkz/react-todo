import {users} from "services/users";
import React, {useEffect, useRef, useState} from "react";
import {SearchIcon, TodoLogo} from "elements/Icons";

export default function Home() {


    useEffect(() => {
        users().then(r => r)
    }, [])

    const data = [{"userName": "hakan"}, {"userLastName": "KORKMAZ"}]
    return (
        <div className="">
            {
                process.env.REACT_APP_URL
            }
        </div>
    );
}