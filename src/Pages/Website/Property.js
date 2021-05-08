import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { API } from '../../Services/API';
import "../../Slick-css/slick-theme.css";
import "../../Slick-css/slick.css";
import Slider from "react-slick";

export const Property = () => {
    const location = useLocation();
    const history = useHistory();
    const [property, setProperty] = useState({});

    useEffect(() => {
        if (location.state) {
            setProperty(location.state.property)
        }
        else {
            const propertyId = location.pathname.replace('/', '');
            API.getProperty(propertyId).then((res) => {
                const { data } = res;
                console.log(data);
                setProperty(data);
            })
                .catch((err) => {
                    console.log("Error fetching data")
                    console.log(err)
                })
        }
    }, [setProperty])

    const settings = {
        arrows: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden mb-32">
            <div className="flex items-center xl:w-11/12 2xl:w-11/12 mx-auto flex flex-wrap cursor-pointer mt-4" onClick={() => history.goBack()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <div>Properties</div>
            </div>

            <div className="text-center">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {property.name}</h1>
            </div>

            <div className="container px-5 py-8 mx-auto">
                <div className="xl:w-11/12 2xl:w-11/12 mx-auto flex flex-wrap border-t">
                    <div className="lg:w-8/12 w-full lg:h-auto">
                        <div className="propertyDetailsSlider" >
                            <Slider {...settings}>
                                {
                                    property.images?.map((m, i) => (<img key={i} className="w-full object-cover object-center" alt={'Own Properties'} src={`${API.main}/uploads/${m.filename}`} style={{ maxHeight: 550 }} />))
                                }
                            </Slider>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium title-font text-black tracking-wider uppercase my-4">ABOUT THIS PROPERTY</h2>
                            <div className="whitespace-pre-line	">{property.description}</div>
                        </div>
                    </div>

                    <div className="lg:w-4/12 w-full lg:pl-5 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{property?.status}</h2>
                        <h1 className="text-gray-900 text-2xl title-font font-semibold mb-3"> {property.currency} {property.price?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h1>

                        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">Property</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {property.name}</h1>

                        <button className="min-w-min bg-black py-2 px-4 my-4 text-white text-sm tracking-wider border border-black hover:bg-white hover:text-black outline-none ring-none">REQUEST INFORMATION</button>

                        <div className="w-full bg-black" style={{ height: 0.5 }}></div>

                        <h2 className="text-lg font-medium title-font text-black tracking-wider uppercase my-4">Location</h2>
                        <div className="my-4">
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>City</div>
                                <div>{property.city}</div>
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Area</div>
                                <div>{property.area}</div>
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Development</div>
                                <div>{property.development}</div>
                            </div>
                        </div>

                        <div className="w-full bg-black" style={{ height: 0.5 }}></div>

                        <div className="my-4">
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Reference</div>
                                <div>{property.reference}</div>
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Type</div>
                                <div>{property.type}</div>
                            </div>
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Availability</div>
                                <div>{property.availability}</div>
                            </div>
                            {
                                property.bedrooms > 0 &&
                                <div className="grid grid-flow-col grid-cols-2 gap-4">
                                    <div>Bedrooms</div>
                                    <div>{property.bedrooms} bedrooms</div>
                                </div>
                            }
                            <div className="grid grid-flow-col grid-cols-2 gap-4">
                                <div>Plot size</div>
                                <div>{property.squareFeet?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} sq ft</div>
                            </div>
                        </div>

                        <div className="w-full bg-black" style={{ height: 0.5 }}></div>
                        <h2 className="text-lg font-medium title-font text-black tracking-wider uppercase my-4">Agent</h2>
                        <div className="my-4">
                            <div className="text-base font-semibold">{property.agentName}</div>
                            <div className="text-sm">{property.agentTitle}</div>
                            <div className="font-bold">{property.agentPhone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
