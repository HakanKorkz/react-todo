import React, {Fragment} from "react";
import {Link} from "react-router-dom";

export default function Modules() {
    const modules = [
        {
            title: "Tıklama kontrol Modülü",
            description: "bu modül içerisinde belirlenen alanın içine yada dışına tıklandığı kontrol edilir",
            href: "/out"
        }
    ]
    return (
        <div className="flex flex-wrap">
            {
                modules.map((modules, index) => (
                    <Fragment  key={index}>
                        {/*card*/}
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
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