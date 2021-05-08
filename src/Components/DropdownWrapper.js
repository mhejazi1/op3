import React, { useEffect, useRef, useState } from 'react'

export const DropdownWrapper = ({ trigger, dropDown }) => {
    const [menuActive, setMenuActive] = useState(false)
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => { if (!ref.current?.contains(event.target)) { setMenuActive(false) } }
        document.addEventListener("click", handleClickOutside);
        return () => { document.removeEventListener("click", handleClickOutside); }
    })
    return (
        <div ref={ref} className="cursor-pointer relative z-50">
            <div onClick={() => setMenuActive(true)}>{trigger}</div>
            {
                menuActive &&
                <div style={{transform:'translateY(14px)'}} className="z-50">{dropDown}</div>
            }
        </div>
    )
}
