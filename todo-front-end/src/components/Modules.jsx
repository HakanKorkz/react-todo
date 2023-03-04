import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "react-redux";

export default function Modules() {
    const modules = [
        {
            title: "Tıklama kontrol Modülü",
            description: "bu modül içerisinde belirlenen alanın içine yada dışına tıklandığı kontrol edilir",
            href: "/out"
        },
        {
            title: "not tutma Modülü",
            description: "bu modül içerisinde not tutma işlevi yapılıyor basit düzeyde",
            href: "/note"
        },
        {
            title: "Bcrypt Modülü",
            description: "Bcrypt Modülü ile şifre oluşturma ve şifre kontrol modülü",
            href: "/bcrypt-generator"
        }
    ]
    const modulesCount = modules.length
    const windowSize = useSelector((state) => state.windowSize.size)
    return (
        <div className="flex flex-wrap">

            {
                modules.map((modules, index) => (
                    <Fragment key={index}>
                        {/*card*/}


                        <div key={index} className={classNames({
                            "mb-4 px-2": true,
                            "w-1/2 ": modulesCount <= 2,
                            "w-1/3 ": modulesCount === 3,
                            "w-1/4 ": modulesCount > 3 && modulesCount <=4,
                            "w-1/5 ": modulesCount === 5,
                            "w-1/6 ": modulesCount > 5,
                            "max-sm:w-full": true,
                            "max-md:w-1/2": modulesCount <= 2 && windowSize < 768,
                            "max-md:w-1/3": modulesCount > 2 && windowSize < 768,

                        })}>
                            <div className="h-full flex flex-col rounded-lg overflow-hidden bg-white shadow">
                                {/*card header*/}
                                <div
                                    className="font-bold text-xl mb-2 px-6 py-4 bg-gray-100 flex justify-center">
                                    {
                                        modules.title
                                    }
                                </div>
                                {/*end card header*/}

                                {/*card content*/}
                                <div className="flex-1 px-6 py-4">
                                    <p className="text-gray-700 text-base">
                                        {
                                            modules.description
                                        }
                                    </p>
                                </div>
                                {/*end card content*/}

                                {/*card footer*/}
                                <div className="px-6 py-4 bg-gray-100 flex justify-center">
                                    <Link to={modules.href}
                                          type="button"
                                          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none w-2/3 text-center">
                                        Modüle Git
                                    </Link>
                                </div>
                                {/*end card footer*/}
                            </div>
                        </div>
                        {/*end card*/}
                    </Fragment>

                ))
            }
        </div>
    )
}