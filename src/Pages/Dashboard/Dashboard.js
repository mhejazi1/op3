import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import logo from '../../asset/logo.png';
import { API } from '../../Services/API';
import { auth, logout } from '../../Services/Auth/firebase';
import { AddEditDrawer } from './AddEditDrawer';
import { Metrics } from './Metrics';
import RotateLoader from "react-spinners/RotateLoader";

export const Dashboard = () => {
    const location = useLocation();
    const [admin, setAdmin] = useState(null);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);

    const [metrics, setMetrics] = useState(
        [
            { name: 'Office', counts: 0 },
            { name: 'Villa', counts: 0 },
            { name: 'Apartment', counts: 0 },
            { name: 'Land', counts: 0 },
        ]
    );

    const history = useHistory();

    useEffect(() => {
        // remove tidio
        if (document.getElementById('tidio-chat')) {
            document.getElementById('tidio-chat').style.display = "none";
        }

        auth.onAuthStateChanged(res => {
            if (!res) {
                history.push('/login')
            }
            if (res) {
                setAdmin(res);
                getProperties();
            }
        })
    }, [setFilteredProperties, setProperties, setMetrics])

    function getProperties() {
        API.getProperties().then(res => {
            const { data } = res;
            const sorted = data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
            setProperties(sorted);
            setFilteredProperties(sorted);
            const Villa = data.filter(p => p?.type === 'villa');
            const Apartment = data.filter(p => p?.type === 'apartment');
            const Office = data.filter(p => p?.type === 'office');
            const Land = data.filter(p => p?.type === 'land');

            const _metrics = [...metrics];

            _metrics[0].counts = Office.length;
            _metrics[1].counts = Villa.length;
            _metrics[2].counts = Apartment.length;
            _metrics[3].counts = Land.length;

            setMetrics(_metrics)
        })
    }

    const onSearch = (value: String) => {
        if (value === '') {
            setFilteredProperties(properties)
            return;
        }
        const found = properties.filter(p => p.location.toLowerCase().includes(value.toLowerCase().trim()) || p.name.toLowerCase().includes(value.toLowerCase().trim()));
        setFilteredProperties(found)
    }

    function saveProperty(e) {
        if (selectedProperty.name === '' || selectedProperty.description === '') {
            toast.warn("Fill all required fields");
            return;
        }
        else {
            if (e._id) {
                setLoadingOverlay(true)
                API.updateProperty(e, e._id)
                    .then(() => {
                        getProperties();
                        toast.success("Property updated");
                        setOpenDrawer(false);
                        setLoadingOverlay(false);
                    }).catch(err => {
                        toast.error("Error saving property");
                        console.log(err);
                        setLoadingOverlay(false);
                    })
            }
            else {
                API.createProperty(e)
                    .then(() => {
                        getProperties();
                        toast.success("Property Saved");
                        setOpenDrawer(false);
                        setLoadingOverlay(false);
                    }).catch(err => {
                        toast.error("Error saving property");
                        console.log(err);
                        setLoadingOverlay(false);
                    })
            }
        }
    }

    function onDelete(id) {
        API.deleteProperty(id).then(() => {
            getProperties();
            toast.success("Property Deleted");
            setSelectedProperty({ name: '', description: '', price: '' });
            setOpenDrawer(false);
        }).catch(err => {
            toast.error("Error deleting property");
            console.log(err)
        })
    }

    return (
        <>
            {
                admin &&
                <main className="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden relative">
                    <div className="flex items-start justify-between">
                        <div className="h-screen hidden lg:block shadow-lg relative w-80">
                            <div className="bg-white h-full dark:bg-gray-700">
                                <div className="flex items-center justify-center pt-6">
                                    <img src={logo} className="h-16" />
                                </div>

                                <nav className="">
                                    <div>
                                        <a className="w-full font-thin uppercase black flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-gray-100 border-r-4 border-black dark:from-gray-700 dark:to-gray-800 border-r-4 border-black" href="#">
                                            <span className="text-left">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            </span>
                                            <span className="mx-4 text-sm font-normal"> Properties</span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div className="flex flex-col w-full pl-0 md:space-y-4">
                            <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 z-40">
                                <div className=" z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                                    <div className=" items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                                        <div className="container left-0 z-50 flex w-3/4 h-auto h-full items-center">
                                            <div className="mr-4">
                                                <button className="rounded-lg text-white bg-black px-4 py-2 outline-none ring-none flex items-center" onClick={() => {
                                                    setSelectedProperty({ name: '', description: '', price: '' })
                                                    setOpenDrawer(true);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="whitespace-nowrap"> Add Property</span>
                                                </button>
                                            </div>

                                            <div className="relative flex items-center w-full lg:w-64 h-full group">
                                                <svg className="absolute left-0 z-20  w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                                    </path>
                                                </svg>
                                                <input onChange={(e) => onSearch(e.target.value)} type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input" placeholder="Search Properties" />
                                            </div>

                                        </div>
                                        <div
                                            onClick={() => logout()}
                                            className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto"> <button>Logout</button> </div>
                                    </div>
                                </div>
                            </header>

                            <div className="overflow-auto h-screen pb-24 pr-2 pl-2 md:pr-0 md:pl-0">
                                {/* Metrics */}
                                <Metrics metrics={metrics} />
                                {/* Property listings goes here */}
                                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                                    {
                                        filteredProperties.map((f, i) => (
                                            <div key={i} className="rounded-sm cursor-pointer m-auto w-full h-full border" onClick={() => {
                                                setOpenDrawer(true);
                                                setSelectedProperty(f);
                                            }}>
                                                <div className="w-full block h-full">
                                                    <img alt={f?.originalname}
                                                        src={`${API.main}/uploads/${f.images[0]?.filename}`}
                                                        className="max-h-40 w-full object-cover" />
                                                    <div className="bg-white dark:bg-gray-800 w-full p-3">
                                                        <p className="text-black text-md font-medium">{f.price?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                        <p className="text-gray-800 dark:text-white text-xl font-medium">{f?.name}</p>
                                                        <div className="text-sm mt-1">
                                                            <p className="text-gray-400 dark:text-gray-300"> {f.area} </p>
                                                            <p className="text-gray-400 dark:text-gray-300">
                                                                {
                                                                    f.type && <span>{f.type} {(f.bedrooms || f.squareFeet) ? ' | ' : ''}</span>
                                                                }
                                                                {
                                                                    f.bedrooms &&
                                                                    <span>{f.bedrooms} BD {f.squareFeet ? ' | ' : ''} </span>
                                                                }
                                                                {
                                                                    f.squareFeet &&
                                                                    <span>{f.squareFeet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} sq ft</span>
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            }
            {
                openDrawer && <AddEditDrawer property={selectedProperty} setProperty={setSelectedProperty} onSave={(e) => saveProperty(e)} closeMenu={() => setOpenDrawer(false)} onDelete={onDelete} />
            }

            {
                loadingOverlay &&
                <div className="absolute top-0 w-full h-full flex items-center justify-center pointer-event-none z-50 flex-col" style={{ background: '#1f293735' }}
                    onClick={() => setLoadingOverlay(false)}>
                    <RotateLoader color={'#000'} loading={true} size={20} />
                    <div className="text-xs font-semibold mt-4"> Please wait...</div>
                </div>
            }
        </>
    )
}
