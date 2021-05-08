import React from 'react'

import "../../src/Slick-css/slick-theme.css"
import "../../src/Slick-css/slick.css"

import { Link } from "react-router-dom";

import videoPoster from '../asset/videoPoster.jpg';
import mainVideo from '../asset/mainVideo.mp4';


export const CarouselComponent = () => {
    return (
        <div className="flex items-center justify-center relative">
            {/* Absolute video */}
            <video autoPlay muted loop playsInline poster={videoPoster}>
                <source src={mainVideo} type="video/mp4" />
            </video>

            {/* Home CTA */}
            <div className="tracking-widest absolute homeOptionButton">
                <Link to={{ pathname: 'properties', state: { filter: 'sale' } }}> Property For Sale</Link>
                <Link to={{ pathname: 'properties', state: { filter: 'rent' } }}> Property For Rent</Link>
            </div>
        </div>
    )
}
