import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import largeFlatImage from '../../asset/largeFlatImage.jpg';
import { API } from '../../Services/API';
import { PropertySkeleton } from '../../Components/PropertySkeleton';

export const Featured = ({ }) => {
    const [featured, setFeatured] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        API.getFeaturedProperties().then((res) => {
            const { data } = res;
            setFeatured(data)
            setIsLoaded(true)
        })
    }, [setFeatured])

    return (
        <div className="w-full bg-white p-4">
            <div className="header flex items-center justify-center my-12 pb-4">
                <div className="title">
                    <p className="text-4xl font-bold text-gray-800 tracking-widest uppercase">Featured Properties</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {
                    !isLoaded &&
                    [1, 2, 3, 4, 5, 5].map((_, i) => (
                        <PropertySkeleton key={i} />
                    ))
                }
                {
                    isLoaded &&
                    featured.map((f, i) => (
                        <div key={i} className="overflow-hidden rounded-sm cursor-pointer m-auto w-full h-full border">
                            <Link to={{ pathname: 'property/' + f._id, state: { property: f } }} className="w-full block h-full">
                                <img
                                    alt={f?.originalname}
                                    src={`${API.main}/uploads/${f.images[0]?.filename}`}
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-3">
                                    <p className="text-black text-md font-medium"> {f.currency} {f.price?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium tracking-wider">{f.name}</p>
                                    <div className="text-sm mt-1">
                                        <p className="text-gray-400 dark:text-gray-300 tracking-wider"> {f.location} </p>
                                        <p className="text-gray-400 dark:text-gray-300 tracking-widest">  {f.type}  |  {f.bedrooms}BD  |  {f.squareFeet}SQFT </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>

            <div className="w-full flex items-center justify-center mt-8">
                <Link to={{ pathname: 'properties', state: { filter: 'featured' } }} className="text-center p-4 font-semibold block border tracking-widest">VIEW ALL PROPERTIES</Link>
            </div>
        </div>

    )
}
