import React, { useEffect, useState } from 'react'
import { CarouselComponent } from '../../Components/Carousel';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Featured } from './Featured';
import largeFlatImage from '../../asset/largeFlatImage.jpg';

export const Home = () => {
    return (
        <div>
            <CarouselComponent />

            <div className="xl:w-9/12 2xl:w-7/12 m-auto">
                <Featured />
            </div>

            <div className="h-full relative my-6 " style={{ overflow: 'hidden', maxHeight: 450 }}>
                <section className="px-4 py-32 mx-auto sm:px-6 lg:px-8 absolute w-full h-full" style={{ backgroundColor: '#000000c9' }}>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold leading-9 text-white sm:text-4xl sm:leading-10 tracking-wider"> Search Properties for your family, friends, holiday and business purposes</h2>
                        <div className="w-full flex items-center justify-center mt-8">
                            <Link to="properties" className="text-center p-4 font-semibold block border text-white tracking-widest">SEARCH PROPERTIES</Link>
                        </div>
                    </div>
                </section>

                <img src={largeFlatImage} style={{ objectFit: 'cover', height: '100vh', width: '100vw' }} />
            </div>
        </div>
    )
}
