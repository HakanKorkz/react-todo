import React, {useEffect, useState} from "react";
import bcrypt from "bcryptjs"

export default function Bcrypt() {
    const [pass, setPass] = useState("")
    const [retryPass, setRetryPass] = useState("")
    const [verified, setVerified] = useState(false)
    useEffect(() => {
        setVerified(bcrypt.compareSync(retryPass, pass)) // şifre doğru mu? yanlış mı? anlık döner sonuç ilk değer alanına şifrelenmemiş veri ikinci değer alanına şifrelenen veri yazılır
        bcrypt.compare(retryPass, pass, function (err, isMatch) { // Estra işlem edilecekse bu tarz işlem kullanılır
            if (err) {
                throw err
            } else if (!isMatch) {
                console.log("Şifre yanlış")
            } else {
                console.log("Şifre Doğru")
            }
        })

    }, [pass, retryPass])


    return (
        <>
            <div
                className={"mx-auto container bg-gray-50 p-4 rounded flex flex-col gap-2 text-center justify-items-center justify-center items-center w-full"}>
                {
                    pass.length > 1 && (
                        <>
                            <div className={"border p-2 w-full"}>
                                {
                                    pass
                                }
                            </div>
                        </>
                    )
                }
                <div className={"border w-1/2 p-2"}>
                    {
                        verified && (
                            <>
                                şifre Doğru
                            </>
                        )
                    }
                    {
                        !verified && (
                            <>
                                şifre Yanlış
                            </>
                        )
                    }
                </div>
                <div className={"flex flex-1 gap-2  w-full"}>
                    <input type="password" className={"outline-none bg-zinc-500 p-2 w-1/2"}
                           onChange={(event) => setPass(bcrypt.hashSync(event.target.value, 8))} placeholder={"Şifre"}/>
                    <input type="text" className={"outline-none bg-zinc-500 p-2 w-1/2"}
                           onChange={(event) => setRetryPass(event.target.value)} placeholder={"Şifre kontrol"}/>
                </div>

            </div>
        </>
    )
}