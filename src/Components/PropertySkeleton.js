import React from 'react'
import { Link } from 'react-router-dom'

export const PropertySkeleton = () => {
    return (
        <div className="overflow-hidden rounded-sm cursor-pointer m-auto w-full h-full border animate-pulse">
            <Link to={'properties'} className="w-full block h-full">
                <div className="h-40 w-full object-cover bg-gray-100" ></div>
                <div className="bg-white dark:bg-gray-800 w-full p-3 space-y-2">
                    <p className="text-indigo-500 text-md font-medium bg-gray-100 h-4 "></p>
                    <p className="text-gray-800 dark:text-white text-xl font-medium bg-gray-100 h-4 w-3/4"></p>
                    <div className="text-sm mt-1 space-y-2">
                        <p className="text-gray-400 dark:text-gray-300 bg-gray-100 h-4 "> </p>
                        <p className="text-gray-400 dark:text-gray-300 bg-gray-100 h-4 w-5/6">  </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
