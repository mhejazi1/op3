import React, { useState } from 'react'

export const Metrics = ({ metrics }) => {

    return (
        <div className="grid grid-flow-row gap-2 md:grid-cols-4 px-4">
            {
                metrics.map((m, i) => (
                    <div className="pb-0" key={i}>
                        <div className="shadow-sm rounded-2xl p-4 bg-white dark:bg-gray-800 border-gray-100 border-2">
                            <div className="flex items-center">
                                <p className=" text-gray-700 dark:text-gray-100 text-4xl text-left font-bold knack-darkblue-text"> {m.counts}</p>
                            </div>
                            <div className="flex flex-col justify-start mt-2">
                                <p className="text-md text-gray dark:text-gray knack-darkblue-text">{m.name}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
