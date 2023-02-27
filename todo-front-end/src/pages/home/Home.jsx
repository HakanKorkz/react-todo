import {users} from "services/users";
import React, {Fragment, useEffect} from "react";
import {Link} from "react-router-dom";
import Modules from "components/Modules";

export default function Home() {
    useEffect(() => {
        users().then(r => r)
    }, [])
    const data = [{"userName": "hakan"}, {"userLastName": "KORKMAZ"}]
    return (
        <Modules/>
    );
}