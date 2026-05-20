import MyFacilitiesCard from '@/components/MyFacilitiesCard';
import { auth } from '@/lib/auth';
import { getOwnerFcilities } from '@/lib/data';
import { headers } from 'next/headers';
import React from 'react';

const ManageFacilities = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const email=session?.user.email
    console.log(session);
    const myfacilities=await getOwnerFcilities(email)
    console.log(myfacilities);
    return (
        <div className='pt-32 min-h-screen bg-[#080D19] pb-10 px-4 mx-auto'>
           <div className='max-w-6xl mx-auto '>
             <div className=''>
                {
                    myfacilities.map(facilities=><MyFacilitiesCard facilities={facilities} key={facilities._id}></MyFacilitiesCard>)
                }
             </div>
           </div>
        </div>
    );
};

export default ManageFacilities;