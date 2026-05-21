import MyBookingCard from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/data";
import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import { CalendarX } from "lucide-react";

const MyBookingPage = async () => {
  const session = await auth.api.getToken({ headers: await headers() });


  const mybooked = session?.token ? await getMyBookings(session.token) : [];
  console.log(mybooked, session.token);

  return (
    <div className="bg-[#080D19] min-h-screen mx-auto pt-30 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {mybooked.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-10 md:p-20 bg-[#041527] border border-white/5 rounded-2xl max-w-2xl mx-auto mt-10">
            <div className="p-4 bg-red-500/10 rounded-full mb-5">
              <CalendarX className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-wide">
              No Bookings Found
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-sm mb-6 leading-relaxed">
              You haven't reserved any sports facilities yet. Explore our top
              turfs and courts to secure your spot!
            </p>
            <Link
              href="/facilities"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-medium bg-[#00CECB] text-[#080D19] hover:bg-[#00A8A5] transition-all shadow-lg shadow-[#00CECB]/10 text-sm md:text-base"
            >
              Explore Facilities
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {mybooked.map((book) => (
              <MyBookingCard book={book} key={book._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;
