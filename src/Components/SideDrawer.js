import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom";

export const SideDrawer = ({ children, cssClasses }) => {
    const [routes, setRoutes] = useState(
        [
            {
                title: 'Sales',
                route: 'properties',
                status: 'sale'
            },
            {
                title: 'Leasing',
                route: 'properties',
                status: 'rent'
            },
            {
                title: 'Off Plan',
                route: 'properties',
                status: 'offplan'
            },
        ]
    )

    const [routes2, setRoutes2] = useState(
        [
            {
                title: 'Property Management',
                route: 'propertymanagement',
            },
            {
                title: 'Our Team',
                route: 'team',
            },
            {
                title: 'Career',
                route: 'career',
            },
            {
                title: 'Contact Us',
                route: 'contact',
            }
        ]
    )


    const history = useHistory();

    function onNavigate(data) {
        history.push(data);
        window.location.reload();
    }


    const ref = useRef();
    const [menuActive, setMenuActive] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!ref.current?.contains(event.target)) {
                setMenuActive(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    return (
        <>
            <div ref={ref} onClick={() => setMenuActive(true)} className={cssClasses}>{children}</div>
            {
                menuActive &&
                <div className={`bg-black absolute right-0 z-50 w-full sm:w-72 top-0 transition delay-150 duration-300 ease-in-out`}>
                    <div className="flex flex-col sm:flex-row sm:justify-around">
                        <div className="h-screen w-full sm:w-72">
                            <div onClick={() => setMenuActive(false)} className="p-4 flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-white cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <nav className="mt-4 px-6">
                                {
                                    routes.map((r, i) => (
                                        <div key={i} onClick={() => onNavigate({ pathname: r.route, state: { filter: r.status } })} className="cursor-pointer">
                                            <div className="text-gray-400 hover:text-white text-base uppercase font-sans p-3 font-light tracking-widest flex items-center justify-between">
                                                <div>
                                                    {r.title}
                                                </div>

                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    routes2.map((r, i) => (
                                        <Link key={i} to={r.route} className="cursor-pointer">
                                            <div className="text-gray-400 hover:text-white text-base uppercase font-sans p-3 font-light tracking-widest flex items-center justify-between">
                                                <div>
                                                    {r.title}
                                                </div>

                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
