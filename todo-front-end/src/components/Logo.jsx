import React from "react";
import {TodoLogo} from "elements/Icons";


export default function Logo() {
    return (
        <div className="max-md:w-[40%] max-sm:w-1/6 w-[25%] text-zinc-400">
            <div className="flex items-center gap-2">
                <TodoLogo size={48} className="hover:text-zinc-500 hover:transition-all"/>
                <div className="hover:text-zinc-500 hover:transition-all">
                    <span className="text-2xl max-sm:hidden pointer-events-none">
                        Todo App
                    </span>
                </div>
            </div>
        </div>
    )
}