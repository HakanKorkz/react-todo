import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames"
import { useSelector } from "react-redux"

export default function Modules() {
  const modules = [
    {
      title: "Tıklama kontrol Modülü",
      description:
        "bu modül içerisinde belirlenen alanın içine yada dışına tıklandığı kontrol edilir",
      href: "/out",
    },
    {
      title: "not tutma Modülü",
      description: "bu modül içerisinde not tutma işlevi yapılıyor basit düzeyde",
      href: "/note",
    },
    {
      title: "Bcrypt Modülü",
      description: "Bcrypt Modülü ile şifre oluşturma ve şifre kontrol modülü",
      href: "/bcrypt-generator",
    },
  ]
  const modulesCount = modules.length
  const windowSize = useSelector((state) => state.windowSize.size)
  return (
    <div className="flex flex-wrap">
      {modules.map((modules, index) => (
        <Fragment key={index}>
          {/*card*/}

          <div
            key={index}
            className={classNames({
              "mb-4 px-2": true,
              "w-1/2 ": modulesCount <= 2,
              "w-1/3 ": modulesCount === 3,
              "w-1/4 ": modulesCount > 3 && modulesCount <= 4,
              "w-1/5 ": modulesCount === 5,
              "w-1/6 ": modulesCount > 5,
              "max-sm:w-full": true,
              "max-md:w-1/2": modulesCount <= 2 && windowSize < 768,
              "max-md:w-1/3": modulesCount > 2 && windowSize < 768,
            })}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow">
              {/*card header*/}
              <div className="mb-2 flex justify-center bg-gray-100 px-6 py-4 text-xl font-bold">
                {modules.title}
              </div>
              {/*end card header*/}

              {/*card content*/}
              <div className="flex-1 px-6 py-4">
                <p className="text-base text-gray-700">{modules.description}</p>
              </div>
              {/*end card content*/}

              {/*card footer*/}
              <div className="flex justify-center bg-gray-100 px-6 py-4">
                <Link
                  to={modules.href}
                  type="button"
                  className="w-2/3 rounded-lg border border-transparent bg-blue-600 py-2 px-4 text-center text-sm font-medium text-white focus:outline-none hover:bg-blue-700"
                >
                  Modüle Git
                </Link>
              </div>
              {/*end card footer*/}
            </div>
          </div>
          {/*end card*/}
        </Fragment>
      ))}
    </div>
  )
}
