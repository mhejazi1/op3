import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import logo from '../asset/Logo.svg';
import { SideDrawer } from './SideDrawer';

export const Header = () => {
    const [showSidebar, setShowSideBar] = useState(true);

    return (
        <header style={{ position: 'sticky', zIndex: 9999999999999, top: 0 }} id="mainHeader" className="bg-white text-black flex justify-center items-center border-b">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                className="p-4 lg:px-8 lg:mr-6 2xl:px-80 relative">
                <div>
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>

                <div className="HeaderIconWrapper">
                    {/* contact button */}
                    <a to="contact" className="mr-4" href="tel:009714 355 9779">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </a>
                    {/* get in touch btn */}
                    <Link to="contact" className="sm:m-2 bg-black text-white px-4 py-2 text-sm tracking-wider"> <div> GET IN TOUCH </div> </Link>
                </div>
            </div>

            {/* side drawer btn */}
            <SideDrawer cssClasses="lg:absolute lg:right-0 sm:mr-4 mr-4">
                <div className="my-2 sm:ml-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" style={{ color: '#000' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>
            </SideDrawer>
        </header>
    )
}
