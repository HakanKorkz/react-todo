import React, {useEffect, useState} from "react";
import bcrypt from "bcryptjs"

export default function Bcrypt() {
    const [pass,setPass]=useState("")
    const p="1234"
    useEffect(()=>{
        console.log(bcrypt.compareSync(p,pass)) // şifre doğru mu? yanlış mı? anlık döner sonuç
        bcrypt.compare(p,pass,function (err,isMatch) { // Estra işlem edilecekse bu tarz işlem kullanılır
            if (err) {
                throw err
            } else if (!isMatch) {
                console.log("Şifre yanlış")
            } else {
                console.log("Şifre Doğru")
            }
        })
    },[pass])


    return (
        <>
        <div className={"mx-auto container bg-gray-50 p-4 rounded flex flex-col gap-2 text-center justify-items-center justify-center w-full"}>
            {
                pass
            }

            <input type="text" className={"outline-none bg-zinc-500 p-2"} onChange={(event)=>setPass(bcrypt.hashSync(event.target.value,8))}/>

        </div>
        </>
    )
}