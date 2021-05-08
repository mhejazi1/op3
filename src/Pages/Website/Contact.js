import React, { useState } from 'react'

export const Contact = () => {
    const [feedback, setFeedback] = useState({ name: '', phone: '', email: '', message: '' });

    function onSend() {

    }

    return (
        <section className="text-gray-600 body-font relative pt-16 tracking-widest">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Microsysnet%20Middle%20East%20FZE,%20Suite%20508,%205th%20Floor,%20The%20Fairmont%20Dubai%D8%8C%20Sheikh%20Zayed%20Road%20-%20Dubai+(Own%20Properties)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}>
                    </iframe>

                    <div className="bg-white relative flex flex-wrap py-6 ">
                        <div className="lg:w-1/2 px-6">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                            <p className="mt-1">405 Sama Tower, Sheikh Zayed RoadTrade Center Area, Dubai, United Arab Emirates</p>
                        </div>
                        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                            <a className="text-black leading-relaxed">info@ownproperties.net</a>
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                            <p className="leading-relaxed">04 355 9779</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-4  ">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font uppercase">Leave Feedback</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">We're here to Help you</p>
                    <div className="relative mb-4">
                        <input placeholder="Your Name" type="text" id="name" name="name" className="w-full bg-white  border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <input placeholder="Telephone" type="phone" id="phone" name="phone" className="w-full bg-white  border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <input placeholder="Email" type="email" id="email" name="email" className="w-full bg-white  border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        <div className="relative mb-4 mt-4">
                            <textarea placeholder="Your Message here..." id="message" name="message" className="w-full bg-white  border border-gray-300 focus:border-black focus:ring-2 focus:ring-black h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>

                        <button className="text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black  text-lg">SEND</button>
                        <p className="text-xs text-gray-500 mt-3">We will reach out to you as soon as possible.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
