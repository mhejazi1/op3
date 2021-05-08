import React from 'react'
import abstracvase from '../asset/abstracvase.jpg';

export const NotificationSection = () => {
    return (
        <div className="bg-gray-200">
            <div className="relative px-4 py-6 overflow-hidden sm:px-6 sm:py-8 lg:p-12 xl:p-16 flex items-center justify-center flex-col text-center">
                <h2 className="text-2xl font-semibold font-display text-black dark:text-white sm:text-3xl"> Newsletter</h2>
                <p className="mt-2 max-w-xl text-base text-gray-400">Be inspired. Sign up to get the latest market updates and our freshest selection of properties.</p>

                <div className="sm:flex jusitfy-start mt-6">
                    <form className="flex w-full max-w-sm space-x-3">
                        <div className=" relative ">
                            <input type="text" id="&quot;form-subscribe-Subscribe" className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Email" />
                        </div>
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 focus:outline-none">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
