import Image from 'next/image';
import React from 'react';
import { FacilitiesAction } from './FacilitiesAction';

const MyFacilitiesCard = ({ facilities }) => {
   
    const {
        _id,
        availableSlot,
        booking_count,
        capacity,
        closingTime,
        description,
        facilityName,
        facilityType,
        image,
        location,
        openingTime,
        ownerEmail,
        pricePerHour
    } = facilities;

    return (
        <div className='bg-[#0b101a] border border-gray-800/60 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 text-white  mx-auto w-full relative shadow-xl'>
            
            {/* বাম পাশের ইমেজ সেকশন */}
            <div className='relative w-full md:w-[150px] h-[110px] rounded-xl overflow-hidden shrink-0'>
                <Image 
                    
                    src={image} 
                    alt={facilityName || 'Facility Image'} 
                    fill 
                    className='object-cover'

                />
            </div>
            
            {/* ডান পাশের মেইন কনটেন্ট এরিয়া */}
            <div className='flex flex-col justify-between w-full gap-5 md:gap-4'>
                
                {/* উপরের অংশ: টাইটেল, ব্যাজ এবং লোকেশন */}
                <div className='border-b border-gray-800/80 pb-3 flex flex-col gap-2 relative'>
                    <div className='flex items-center gap-2'>
                        <span className='bg-[#133024] text-[#22c55e] text-[11px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider'>
                            Active
                        </span>
                        <span className='bg-[#1e293b] text-gray-400 text-[11px] px-2 py-0.5 rounded-md capitalize'>
                            {facilityType}
                        </span>
                    </div>
                    
                    <h2 className='text-xl font-bold tracking-wide text-gray-100'>
                        {facilityName}
                    </h2>
                    
                    <div className='flex items-center gap-1 text-gray-400 text-xs sm:text-sm'>
                        {/* লোকেশন পিন আইকন (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>{location}</span>
                    </div>

                    {/* থ্রি-ডট অ্যাকশন মেনু (ইমেজের মতো হুবহু ডান কোনায় বসানোর জন্য) */}
                    <div className='absolute top-0 right-0 text-gray-500 hover:text-white transition-colors'>
                        <FacilitiesAction id={_id}></FacilitiesAction>
                    </div>
                </div>
                
                {/* নিচের অংশ: গ্রিড স্ট্যাটস (Price, Capacity, Opening, Closing) */}
                <div className='grid grid-cols-2 sm:grid-cols-4 w-full gap-5 sm:gap-10'>
                    <div>
                        <h2 className='text-gray-500 text-xs font-medium mb-1 capitalize tracking-wide'>Price/Hour</h2>
                        <h2 className='text-[18px] font-bold text-[#00d2ff]'>${pricePerHour}</h2>
                    </div>
                    <div>
                        <h2 className='text-gray-500 text-xs font-medium mb-1 capitalize tracking-wide'>Capacity</h2>
                        <h2 className='text-[18px] font-bold text-gray-200'>{capacity}</h2>
                    </div>
                    <div>
                        <h2 className='text-gray-500 text-xs font-medium mb-1 capitalize tracking-wide'>Opening Time</h2>
                        <h2 className='text-[18px] font-bold text-[#22c55e]'>{openingTime}</h2>
                    </div>
                    <div>
                        <h2 className='text-gray-500 text-xs font-medium mb-1 capitalize tracking-wide'>Closing Time</h2>
                        <h2 className='text-[18px] font-bold text-[#f97316]'>{closingTime}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyFacilitiesCard;