import React, {useEffect, useRef} from "react";

function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("Benim dışımda tıkladın!");
            } else {
                console.log("bana tıkladın")
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function OutsideAlerter() {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <div ref={wrapperRef}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi doloremque eos illo iusto
            laboriosam laborum nam necessitatibus nulla quae quas quasi quisquam repellendus reprehenderit sapiente
            sequi temporibus, unde vel.
        </div>
    )
}