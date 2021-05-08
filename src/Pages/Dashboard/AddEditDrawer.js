import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { API } from '../../Services/API';
import RotateLoader from "react-spinners/RotateLoader";

export const AddEditDrawer = ({ onSave, property, closeMenu, setProperty, onDelete }) => {
    const [loadingOverlay, setLoadingOverlay] = useState(false);

    function handleOnSave(p) {
        if (p.name === '' || p.description === '' || p.price === '') {
            toast.warn("Fill all required fields");
            return
        }
        else {
            onSave(p);
            // closeMenu();
        }
    }

    function onChangeImageFiles(e) {
        setLoadingOverlay(true)
        const Files = e.target.files;
        let _images;
        if (property.images) {
            _images = [...property.images];
        }
        else {
            _images = [];
        }

        Array.from(Files).map((f) => {
            const formData = new FormData();
            formData.append('img', f);
            API.uploadImages(formData)
                .then(response => response.json())
                .then(data => {
                    _images.push(data);
                    setProperty((p) => ({ ...p, images: _images }));
                    setLoadingOverlay(false)
                });
        });
    }

    // pass file name to remove image
    const onRemoveImage = (image, index) => {
        const _images = [...property.images];
        const spliced = _images.splice(index, 1)
        setProperty((p) => ({ ...p, images: _images }));
        // delete from db
        console.log(image.id)
        API.deleteImage(image.id)
            .then(() => console.log(image.id, 'deleted'))
            .catch((err) => console.log("delete err", err));
    }

    return (
        <div>
            {
                <div className={`bg-white absolute right-0 z-50 w-full  top-0 transition delay-150 duration-300 ease-in-out`} style={{ maxWidth: 500 }}>
                    <div className="flex flex-col sm:flex-row sm:justify-around">
                        <div className="h-screen w-full overflow-y-scroll">
                            <div onClick={() => closeMenu()} className="p-4 flex justify-end sticky top-0 bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <nav className="px-6">
                                <h1 className="font-semibold ">{property ? 'Edit Property' : 'Add Property'}</h1>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, summary: e.target.value }))}
                                        placeholder="Property Summary" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.summary} />
                                </label>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, name: e.target.value }))}
                                        placeholder="Property Name" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.name} />
                                </label>

                                <label className="block border px-4 py-2 my-4">
                                    <textarea style={{ minHeight: 200 }}
                                        onChange={(e) => setProperty((p) => ({ ...p, description: e.target.value }))}
                                        placeholder="Property Description" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.description} />
                                </label>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, reference: e.target.value }))}
                                        placeholder="Reference" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.reference} />
                                </label>

                                <label className="block">
                                    <select
                                        onChange={(e) => setProperty((p) => ({ ...p, type: e.target.value }))}
                                        defaultValue={property?.type}
                                        className="p-2 h-full w-full block w-32 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="Type">
                                        <option value="">Type </option>
                                        <option value="villa">Villa</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="office">Office</option>
                                        <option value="land">Land</option>
                                    </select>
                                </label>

                                <label className="block my-4">
                                    <select
                                        onChange={(e) => setProperty((p) => ({ ...p, status: e.target.value }))}
                                        defaultValue={property?.status}
                                        className="block w-32 p-2 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 w-full" name="Construction Status">
                                        <option value="">Property Status </option>
                                        <option value="offplan">Offplan</option>
                                        <option value="sale">Sale</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </label>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input type="number"
                                        onChange={(e) => setProperty((p) => ({ ...p, squareFeet: e.target.value }))}
                                        placeholder="Square Feet" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.squareFeet} />
                                </label>

                                <label className="block my-4">
                                    <select
                                        onChange={(e) => setProperty((p) => ({ ...p, bedrooms: e.target.value }))}
                                        defaultValue={property?.bedrooms}
                                        className="block w-32 p-2  border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 w-full" name="Bedrooms">
                                        <option value="">Bedrooms</option>
                                        <option value="0">Studio</option>
                                        <option value="1">1 Bedrooms</option>
                                        <option value="2">2 Bedrooms</option>
                                        <option value="3">3 Bedrooms</option>
                                        <option value="4">4 Bedrooms</option>
                                        <option value="5">5 Bedrooms</option>
                                        <option value="6">6 Bedrooms</option>
                                        <option value="7">7 Bedrooms</option>
                                        <option value="8">8 Bedrooms</option>
                                        <option value="9">9 Bedrooms</option>
                                        <option value="10">10 Bedrooms</option>
                                        <option value="11">11 Bedrooms</option>
                                    </select>
                                </label>

                                <label className="block border my-4 flex items-center">
                                    <span className="pl-2">AED</span>
                                    <input
                                        type="number"
                                        onChange={(e) => setProperty((p) => ({ ...p, price: e.target.value }))}
                                        placeholder="Price in AED" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.price} />
                                </label>

                                <label className="block border my-4">
                                    <input onChange={(e) => setProperty((p) => ({ ...p, area: e.target.value }))}
                                        placeholder="Area e.g Al Barsha 1" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.area} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, location: e.target.value }))}
                                        placeholder="Location" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.location} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, city: e.target.value }))}
                                        placeholder="City" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.city} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, development: e.target.value }))}
                                        placeholder="Developement e.g Mina Rashid" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.development} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, amenities: e.target.value }))}
                                        placeholder="Amenities e.g Parking, Pool" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.amenities} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, views: e.target.value }))}
                                        placeholder="Views e.g Marina Beach" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.views} />
                                </label>

                                <label className="block border my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, map: e.target.value }))}
                                        placeholder="Map Location" className="w-full h-full outline-none ring-none border-none p-2" defaultValue={property?.map} />
                                </label>

                                <label className="flex items-center my-4">
                                    <input type="checkbox"
                                        onChange={(e) => setProperty((p) => ({ ...p, featured: e.target.checked }))}
                                        placeholder="featured" className="form-checkbox w-5 h-5 outline-none ring-none border-none p-2" defaultChecked={property?.featured ? JSON.parse(property?.featured) : false}
                                    />
                                    <span className="ml-2 font-semibold">Set as Featured</span>
                                </label>

                                {/* Selected Images */}
                                {
                                    property.images && property.images.length > 0 &&
                                    <div className="border p-4 block my-4">
                                        <div className="grid grid-flow-row grid-cols-2 gap-4">
                                            {
                                                property &&
                                                property.images?.map((im, i) => (
                                                    <div key={i} className="relative">
                                                        <div className="absolute top-0 right-0 bg-white shadow-lg border cursor-pointer" onClick={() => onRemoveImage(im, i)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="black">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <img src={`${API.main}/uploads/${im.filename}`} className="" />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }

                                <label className="border-dashed border-4  p-4 block my-4 cursor-pointer">
                                    <input name="pictures" type="file" id="pictures" accept="image/x-png,image/jpeg" multiple="multiple" placeholder="Select Images" className="" onChange={(e) => onChangeImageFiles(e)} style={{ display: 'none' }} />
                                    <span>Select Images</span>
                                </label>

                                {/* Agent Info */}
                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, agentName: e.target.value }))}
                                        placeholder="Agent Name" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.agentName} />
                                </label>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, agentTitle: e.target.value }))}
                                        placeholder="Agent Title" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.agentTitle} />
                                </label>

                                <label className="block border h-16 px-4 py-2 my-4">
                                    <input
                                        onChange={(e) => setProperty((p) => ({ ...p, agentPhone: e.target.value }))}
                                        placeholder="Agent Phone Number" className="w-full h-full outline-none ring-none border-none" defaultValue={property?.agentPhone} />
                                </label>

                            </nav>

                            <div className="sticky bottom-0 p-4 bg-white border-t flex items-center justify-between">
                                <div>
                                    <button className="bg-black px-4 py-2 text-white" onClick={() => handleOnSave(property)}>SAVE</button>
                                    <button className="px-4 py-2 text-black" onClick={() => closeMenu()}>CANCEL</button>
                                </div>

                                {
                                    property && property._id &&
                                    <div><button className="px-4 py-2 text-black" onClick={() => onDelete(property._id)}>DELETE</button></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                loadingOverlay &&
                <div className="absolute top-0 w-full h-full flex items-center justify-center pointer-event-none z-50 flex-col" style={{ background: '#1f293735' }}
                    onClick={() => setLoadingOverlay(false)}>
                    <RotateLoader color={'#000'} loading={true} size={20} />
                    <div className="text-xs font-semibold mt-4"> Uploading Images...</div>
                </div>
            }
        </div>
    )
}
