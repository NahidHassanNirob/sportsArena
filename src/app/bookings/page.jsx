import MyBookingCard from '@/components/MyBookingCard';
import { auth } from '@/lib/auth';
// import { authClient } from '@/lib/auth-client';
import { getMyBookings } from '@/lib/data';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingPage = async () => {
     const session=await auth.api.getSession({
            headers: await headers()
        })
    const user=session?.user.email
      
    const mybooked=await getMyBookings(user);
    console.log(mybooked);
    return (
        <div className=' bg-[#080D19] mx-auto pt-30 pb-10 px-4 '>
            <div className='max-w-6xl grid gap-4 mx-auto'>
                {mybooked.map(book=><MyBookingCard book={book} key={book._id}></MyBookingCard>)}
            </div>
        </div>
    );
};

export default MyBookingPage;