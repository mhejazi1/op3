import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { DropdownWrapper } from '../../Components/DropdownWrapper';
import { PropertySkeleton } from '../../Components/PropertySkeleton';
import { API } from '../../Services/API';

export const Properties = () => {
    const location = useLocation();
    const [filtered, setFiltered] = useState([]);
    const [properties, setProperties] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [typeFilter, setTypeFilter] = useState();
    const [sizeFilter, setSizeFilter] = useState({ min: null, max: null });
    const [bedFilter, setBedFilter] = useState();
    const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
    const [status, setstatus] = useState(null);
    const [types, setTypes] = useState([{ name: 'Apartment' }, { name: 'Office' }, { name: 'Land' }, { name: 'Villa' }])
    const [sortedBy, setSortBy] = useState('');

    const bedrooms = Array.from(Array(10).keys());

    useEffect(() => {
        API.getProperties().then((res) => {
            const { data } = res;
            if (location.state && location.state.filter) {
                console.log(location.state.filter);
                if (location.state.filter === 'sale' || location.state.filter === 'rent') {
                    setTypes([{ name: 'Apartment' }, { name: 'Office' }, { name: 'Villa' }]);
                }
                onFilterByStatus(location.state.filter, data);
            }
            else {
                setProperties(data)
                setFiltered(data)
            }
            setIsLoaded(true)
        })
    }, [setProperties, setFiltered, setstatus])

    const onSearch = (value: String) => {
        if (value === '') {
            setFiltered(properties)
            return;
        }
        const found = properties.filter(p => p.location.toLowerCase().includes(value.toLowerCase().trim()) || p.name.toLowerCase().includes(value.toLowerCase().trim()));
        setFiltered(found)
    }

    function onFilterByStatus(status, data) {
        setstatus(status)
        const filtered = data.filter(p => p.status === status);
        setProperties(data)
        setFiltered(filtered)
    }

    function ontypeFilter(value) {
        if (value) {
            setTypeFilter(value);
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.type === value.toLowerCase() && p.status === status);
            else fileredProps = [...properties].filter(p => p.type === value.toLowerCase());
            setFiltered(fileredProps);
        }
        else {
            setTypeFilter('');
            if (status) onFilterByStatus(status, properties);
            else setFiltered(properties);
        }
    }

    function onbedFilter(value) {
        if (value) {
            setBedFilter(value);
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.bedrooms >= value && p.status === status);
            else fileredProps = [...properties].filter(p => p.bedrooms >= value);
            setFiltered(fileredProps);
        }
        else {
            setBedFilter('');
            if (status) onFilterByStatus(status, properties);
            else setFiltered(properties);
        }
    }

    function onsizeFilter({ min, max, shouldNull }) {
        console.log(max)
        if (shouldNull) { // reset
            setSizeFilter((e) => ({ ...e, min: null, max: null }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status);
            else fileredProps = [...properties];
            setFiltered(fileredProps);
            return;
        }
        if (min && min !== '') {
            setSizeFilter((e) => ({ ...e, min: min }));
            let fileredProps = [];
            if (status) {
                fileredProps = properties.filter(p => p.status === status && (p.squareFeet >= JSON.parse(min)))
                if (sizeFilter.max) fileredProps = properties.filter(p => p.status === status && (p.squareFeet >= JSON.parse(min)) && (p.squareFeet <= sizeFilter.max));
            }
            else fileredProps = properties.filter(p => (p.squareFeet >= min));
            setFiltered(fileredProps);
            return;
        }
        if (max && max !== '') {
            setSizeFilter((e) => ({ ...e, max: max }));
            let fileredProps = [];
            if (status) {
                fileredProps = properties.filter(p => p.status === status && (p.squareFeet <= JSON.parse(max)));
                if (sizeFilter.min) fileredProps = filtered.filter(p => (p.squareFeet >= sizeFilter.min) && (p.squareFeet <= max) && (p.status === status));
            }
            else {
                if (sizeFilter.min) fileredProps = filtered.filter(p => (p.squareFeet >= sizeFilter.min) && (p.squareFeet <= max) && (p.status === status));
                else fileredProps = properties.filter(p => (p.squareFeet <= max));
            }
            setFiltered(fileredProps);
            return;
        }
        if (!min && sizeFilter.max) {
            setSizeFilter((e) => ({ ...e, min: min }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status && (p.squareFeet <= sizeFilter.max));
            else fileredProps = properties.filter(p => (p.squareFeet <= sizeFilter.max));
            setFiltered(fileredProps);
            return;
        }
        if (!max && sizeFilter.min) {
            setSizeFilter((e) => ({ ...e, max: max }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status && (p.squareFeet >= sizeFilter.min));
            else fileredProps = properties.filter(p => (p.squareFeet >= sizeFilter.min));
            setFiltered(fileredProps);
            return;
        }
    }

    function onpriceFilter({ min, max, shouldNull }) {
        if (shouldNull) { // reset
            setPriceFilter((e) => ({ ...e, min: null, max: null }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status);
            else fileredProps = [...properties];
            setFiltered(fileredProps);
            return;
        }
        if (min && min !== '') {
            setPriceFilter((e) => ({ ...e, min: min }));
            let fileredProps = [];
            if (status) {
                fileredProps = properties.filter(p => p.status === status && (p.price >= JSON.parse(min)))
                if (priceFilter.max) fileredProps = properties.filter(p => p.status === status && (p.price >= JSON.parse(min)) && (p.price <= priceFilter.max));
            }
            else fileredProps = properties.filter(p => (p.price >= min));
            setFiltered(fileredProps);
            return;
        }
        if (max && max !== '') {
            setPriceFilter((e) => ({ ...e, max: max }));
            let fileredProps = [];
            if (status) {
                fileredProps = properties.filter(p => p.status === status && (p.price <= JSON.parse(max)));
                if (priceFilter.min) fileredProps = filtered.filter(p => (p.price >= priceFilter.min) && (p.price <= max) && (p.status === status));
            }
            else {
                if (priceFilter.min) fileredProps = filtered.filter(p => (p.squareFeet >= priceFilter.min) && (p.price <= max) && (p.status === status));
                else fileredProps = properties.filter(p => (p.price <= max));
            }
            setFiltered(fileredProps);
            return;
        }
        if (!min && priceFilter.max) {
            setPriceFilter((e) => ({ ...e, min: min }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status && (p.price <= priceFilter.max));
            else fileredProps = properties.filter(p => (p.price <= priceFilter.max));
            setFiltered(fileredProps);
            return;
        }
        if (!max && priceFilter.min) {
            setPriceFilter((e) => ({ ...e, max: max }));
            let fileredProps = [];
            if (status) fileredProps = properties.filter(p => p.status === status && (p.price >= priceFilter.min));
            else fileredProps = properties.filter(p => (p.price >= priceFilter.min));
            setFiltered(fileredProps);
            return;
        }
    }

    function onRemovestatus() {
        setFiltered(properties);
        setstatus(null);
        setTypeFilter(null);
        setBedFilter(null);
        setSizeFilter({ min: null, max: null });
        setPriceFilter({ min: null, max: null });
    }

    return (
        <div className="mb-32">
            {/* Search and Filter bar */}
            <div className="bg-black w-full">
                <div className="flex items-center justify-between bg-black px-4 text-white flex-row xl:w-11/12 2xl:w-11/12 m-auto " style={{ minHeight: 50 }}>
                    <div className="flex items-center w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input onChange={(e) => onSearch(e.target.value)} placeholder="Search area any or development" className="pl-4 outline-none ring-none border-none bg-black w-full" />
                    </div>

                    {/* Filters */}
                    <div className="border-l pl-4 h-full flex items-center justify-between hidden sm:flex" style={{ minHeight: 50 }}>
                        {/* Type */}
                        <div className="ml-3">
                            <DropdownWrapper
                                trigger={
                                    <div className="whitespace-nowrap text-sm flex items-center">
                                        <span className="mr-4">Type</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                }
                                dropDown={
                                    <div className="absolute bg-black min-w-max right-0 w-full">
                                        <label className="flex items-center space-x-3  cursor-pointer px-2">
                                            <div className="flex items-center">
                                                <div className="bg-black right-0">
                                                    {
                                                        types.map((t, i) => (
                                                            <div onClick={() => ontypeFilter(t.name.toLowerCase())} key={i} className="flex items-center flex-row justify-start my-4">
                                                                {
                                                                    typeFilter === t.name.toLowerCase() &&
                                                                    <div className="absolute left-0 pl-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                }
                                                                <span className="mx-4 text-sm">{t.name}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                }
                            />
                        </div>
                        {/* Size */}
                        <div className="ml-3">
                            <DropdownWrapper
                                trigger={
                                    <div className="whitespace-nowrap text-sm flex items-center">
                                        <span className="mr-4">Size</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                }
                                dropDown={
                                    <div className="absolute bg-black min-w-max right-0 w-full">
                                        <label className="flex items-center space-x-3 mb-2 cursor-pointer px-4 py-2">
                                            <div className="flex items-center">
                                                <select
                                                    onChange={(e) => onsizeFilter({ min: e.target.value })}
                                                    className="block w-32 py-2 px-3 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-black text-white" name="minSize">
                                                    <option value="">Min. size </option>
                                                    <option value="1000">1000 sq ft</option>
                                                    <option value="2000">2000 sq ft</option>
                                                    <option value="3000">3000 sq ft</option>
                                                    <option value="4000">4000 sq ft</option>
                                                    <option value="5000">5000 sq ft</option>
                                                    <option value="6000">6000 sq ft</option>
                                                    <option value="7000">7000 sq ft</option>
                                                    <option value="8000">8000 sq ft</option>
                                                    <option value="9000">9000 sq ft</option>
                                                    <option value="10000">10000 sq ft</option>
                                                </select>
                                                <select
                                                    onChange={(e) => onsizeFilter({ max: e.target.value })}
                                                    className="block w-32 py-2 px-3 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-black text-white ml-1" name="maxSize">
                                                    <option value="">Max. size </option>
                                                    <option value="1000">1000 sq ft</option>
                                                    <option value="2000">2000 sq ft</option>
                                                    <option value="3000">3000 sq ft</option>
                                                    <option value="4000">4000 sq ft</option>
                                                    <option value="5000">5000 sq ft</option>
                                                    <option value="6000">6000 sq ft</option>
                                                    <option value="7000">7000 sq ft</option>
                                                    <option value="8000">8000 sq ft</option>
                                                    <option value="9000">9000 sq ft</option>
                                                    <option value="10000">10000 sq ft</option>
                                                </select>
                                            </div>
                                        </label>
                                    </div>
                                }
                            />
                        </div>
                        {/* Bed */}
                        <div className="ml-3">
                            <DropdownWrapper
                                trigger={
                                    <div className="whitespace-nowrap text-sm flex items-center">
                                        <span className="mr-4">Beds</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                }
                                dropDown={
                                    <div className="absolute bg-black min-w-max right-0 w-full">
                                        <label className="flex items-center space-x-3  cursor-pointer px-2">
                                            <div className="flex items-center">
                                                <div className="bg-black right-0">
                                                    {
                                                        bedrooms.map((t, i) => (
                                                            <div onClick={() => onbedFilter(t + 1)} key={i} className="flex items-center flex-row justify-start my-4">
                                                                {
                                                                    (bedFilter == t + 1) &&
                                                                    <div className="absolute left-0 pl-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                }
                                                                { (t + 1 === 1) && <span className="mx-4 text-sm">{t + 1} Bedroom</span>}
                                                                { (t + 1 > 1) && <span className="mx-4 text-sm">{t + 1} Bedrooms</span>}

                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                }
                            />
                        </div>
                        {/* Price */}
                        <div className="ml-3">
                            <DropdownWrapper
                                trigger={
                                    <div className="whitespace-nowrap text-sm flex items-center">
                                        <span>Price</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                }
                                dropDown={
                                    <div className="absolute bg-black min-w-max right-0 w-full">
                                        <label className="flex items-center space-x-3 mb-2 cursor-pointer px-4 py-2">
                                            <div className="flex items-center">
                                                <select
                                                    onChange={(e) => onpriceFilter({ min: e.target.value })}
                                                    className="block w-32 py-2 px-3 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-black text-white" name="minPrice">
                                                    <option value="">Min. price </option>
                                                    <option value="200000">200,000 AED</option>
                                                    <option value="500000">500,000 AED</option>
                                                    <option value="1000000">1,000,000 AED</option>
                                                    <option value="5000000">5,000,000 AED</option>
                                                    <option value="10000000">10,000,000 AED</option>
                                                    <option value="15000000">15,000,000 AED</option>
                                                    <option value="20000000">20,000,000 AED</option>
                                                    <option value="25000000">25,000,000 AED</option>

                                                </select>
                                                <select
                                                    onChange={(e) => onpriceFilter({ max: e.target.value })}
                                                    className="block w-32 py-2 px-3 border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-black text-white ml-1" name="maxPrice">
                                                    <option value="">Max. price </option>
                                                    <option value="200000">200,000 AED</option>
                                                    <option value="500000">500,000 AED</option>
                                                    <option value="1000000">1,000,000 AED</option>
                                                    <option value="5000000">5,000,000 AED</option>
                                                    <option value="10000000">10,000,000 AED</option>
                                                    <option value="15000000">15,000,000 AED</option>
                                                    <option value="20000000">20,000,000 AED</option>
                                                    <option value="25000000">25,000,000 AED</option>
                                                </select>
                                            </div>
                                        </label>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Location  / Selected Filters */}
            {
                (status || typeFilter || bedFilter || (sizeFilter.min || sizeFilter.max) || (priceFilter.min || priceFilter.max || (sortedBy === '' || sortedBy !== ''))) &&
                <div className="capitalize text-xs px-4 p-2 text-white flex flex-row relative justify-between">
                    <div className="flex flex-row">
                        {/* Location  */}
                        {
                            status &&
                            <div className="bg-black w-min px-3 py-2 rounded-2xl flex flex-row items-center cursor-pointer" onClick={() => onRemovestatus()}>
                                <span>{status}</span>
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        }
                        {/* Type  */}
                        {
                            typeFilter &&
                            <div className="bg-black w-min px-3 py-2 rounded-2xl flex flex-row items-center cursor-pointer mx-2" onClick={() => ontypeFilter('')}>
                                <span>{typeFilter}</span>
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        }
                        {/* Bedrooms */}
                        {
                            bedFilter &&
                            <div className="bg-black w-min px-3 py-2 rounded-2xl flex flex-row items-center cursor-pointer mx-2 whitespace-pre" onClick={() => onbedFilter('')}>
                                <span>{bedFilter} {bedFilter > 0 ? 'Bedrooms' : 'Bedroom'}</span>
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        }
                        {/* Size Range */}
                        {
                            (sizeFilter.min || sizeFilter.max) &&
                            <div className="bg-black w-min px-3 py-2 rounded-2xl flex flex-row items-center cursor-pointer mx-2 whitespace-pre" onClick={() => onsizeFilter({ shouldNull: true })}>
                                <span>
                                    {sizeFilter.min && sizeFilter.min + ' sq ft  -  '}
                                    {sizeFilter.max && sizeFilter.max + ' sq ft'}
                                </span>
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        }
                        {/* Price Range */}
                        {
                            (priceFilter.min || priceFilter.max) &&
                            <div className="bg-black w-min px-3 py-2 rounded-2xl flex flex-row items-center cursor-pointer mx-2 whitespace-pre" onClick={() => onpriceFilter({ shouldNull: true })}>
                                <span>
                                    {priceFilter.min && priceFilter.min + ' sq ft  -  '}
                                    {priceFilter.max && priceFilter.max + ' sq ft'}
                                </span>
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                    {/* Sort By */}
                    <div className="">
                        <DropdownWrapper
                            trigger={<div className="font-sm text-black flex flex-row items-center"> <span className="mr-1">Sort By</span>  <span className="font-bold">{sortedBy}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>}
                            dropDown={
                                <div className="text-black absolute border shadoww-auto whitespace-nowrap right-0 bg-white">
                                    <div onClick={() => {
                                        const _filtered = [...filtered].sort((a, b) => b.price - a.price);
                                        setFiltered(_filtered);
                                        setSortBy('Price Highest to Lowest')
                                    }}
                                        className="hover:bg-gray-100 px-4 py-2">
                                        <div className="flex flex-row">
                                            <div>Price Highest to Lowest</div>
                                            {
                                                sortedBy === 'Price Highest to Lowest' &&
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            }
                                        </div>
                                    </div>

                                    <div onClick={() => {
                                        const _filtered = [...filtered].sort((a, b) => a.price - b.price);
                                        setFiltered(_filtered);
                                        setSortBy('Price Lowest to Highest')
                                    }}
                                        className="hover:bg-gray-100 px-4 py-2"
                                    >
                                        <div className="flex flex-row">
                                            <div> Price Lowest to Highest</div>
                                            {
                                                sortedBy === 'Price Lowest to Highest' &&
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            }
            {/* Route based display */}
            {
                status &&
                <div className="w-full text-center px-4 py-8">
                    {
                        status === 'sale' &&
                        <div className="tracking-wider font-bold text-3xl">  PROPERTIES FOR SALE</div>
                    }
                    {
                        status === 'rent' &&
                        <div className="tracking-wider font-bold text-3xl">  PROPERTIES FOR RENT</div>
                    }
                    {
                        status === 'offplan' &&
                        <div className="tracking-wider font-bold text-3xl"> OFF PLAN PROPERTIES</div>
                    }
                    {
                        status === 'featured' &&
                        <div className="tracking-wider font-bold text-3xl"> FEATURED PROPERTIES</div>
                    }
                </div>
            }



            <div className="w-full bg-white p-4 xl:w-11/12 2xl:w-11/12 m-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 h-full">
                    {
                        !isLoaded &&
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((_, i) => (
                            <div key={i}><PropertySkeleton /> </div>
                        ))
                    }
                    {
                        isLoaded &&
                        filtered?.map((f, i) => (
                            <div key={i} className="rounded-sm cursor-pointer m-auto w-full h-full border">
                                <Link to={{ pathname: 'property/' + f._id, state: { property: f } }} className="w-full block">
                                    <img
                                        alt={f?.originalname}
                                        src={`${API.main}/uploads/${f.images[0]?.filename}`}
                                        className="h-60 w-full object-cover " />
                                    <div className="bg-white dark:bg-gray-800 w-full p-3">
                                        <p className="text-black text-md font-medium">{f.currency} {f.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        <p className="text-gray-800 dark:text-white text-xl font-medium ">{f.name}</p>
                                        <div className="text-sm mt-1">
                                            <p className="text-gray-400 dark:text-gray-300 tracking-wider"> {f.area} </p>
                                            <p className="text-gray-400 dark:text-gray-300 tracking-widest font-extralight capitalize">
                                                {
                                                    f.type && <span>{f.type} {f.bedrooms ? ' | ' : ''}</span>
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
                                </Link>
                            </div>
                        ))
                    }
                </div>

                {
                    filtered && filtered.length > 11 &&
                    <div className="w-full flex items-center justify-center mt-8 cursor-pointer">
                        <div to={{ pathname: '/properties', state: { filter: 'featured' } }} className="text-center p-4 font-semibold block border tracking-widest">VIEW MORE</div>
                    </div>
                }
            </div>
        </div>
    )
}
