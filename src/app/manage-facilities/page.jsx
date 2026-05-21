import MyFacilitiesCard from '@/components/MyFacilitiesCard';
import { auth } from '@/lib/auth';
import { getOwnerFcilities } from '@/lib/data';
import { headers } from 'next/headers';
import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

const ManageFacilities = async () => {
   
    const session = await auth.api.getToken({
        headers: await headers()
    });
    
    const rawData = session?.token ? await getOwnerFcilities(session.token) : [];
    
    
    const myfacilities = Array.isArray(rawData) ? rawData : [];

    return (
        <div className='pt-32 min-h-screen bg-[#080D19] pb-10 px-4 mx-auto'>
           <div className='max-w-6xl mx-auto'>
                {myfacilities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-10 md:p-20 bg-[#041527] border border-white/5 rounded-2xl max-w-2xl mx-auto ">
                        <div className="p-4 bg-cyan-500/10 rounded-full mb-5">
                            <Building2 className="w-12 h-12 text-[#00CECB]" />
                        </div>
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-wide">
                            No Facilities Listed Yet
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-sm mb-6 leading-relaxed">
                            You haven't added any sports facilities to the platform. Start listing your turfs, courts, or pools to receive bookings!
                        </p>
                        <Link 
                            href="/add-facilities" 
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-medium bg-[#00CECB] text-[#080D19] hover:bg-[#00A8A5] transition-all shadow-lg shadow-[#00CECB]/10 text-sm md:text-base"
                        >
                            Add New Facility
                        </Link>
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {myfacilities.map(facilities => (
                            <MyFacilitiesCard facilities={facilities} key={facilities._id} />
                        ))}
                    </div>
                )}
           </div>
        </div>
    );
};

export default ManageFacilities;