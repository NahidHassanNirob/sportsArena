import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import CancelBookingBtn from "./CancelBookingBtn";

const MyBookingCard = ({ book }) => {
  const {
    _id,
    facilityId,
    
location,
    image,
    facilityName,
    userEmail,
    date,
    slots,
    totalHours,
    totalPrice,
    status,
  } = book;
// console.log(location,status,"location and status");
  return (
    <div className="w-full border bg-[#041527] border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
      <div className="flex items-start gap-4 flex-1">
        
        {/* ডাইনামিক ইমেজ ব্যাকগ্রাউন্ড */}
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: `url('${image || "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&q=80"}')`,
          }}
        />

        <div className="space-y-2 pt-1">
          {/* ডাইনামিক স্ট্যাটাস */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-[#00A86B] uppercase tracking-wider">
            {status}
          </span>

          {/* ডাইনামিক ফ্যাসিলিটি নাম */}
          <h3 className="text-white text-base md:text-xl font-bold tracking-wide">
            {facilityName}
          </h3>

          {/* ডাইনামিক লোকেশন */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-400 pt-1">
            {/* ডাইনামিক ডেট */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{date}</span>
            </div>
            
            {/* ডাইনামিক স্লটস (অ্যারে থেকে লুপ বা জয়েন করে দেখানো হয়েছে) */}
            <div className="flex items-start gap-1.5 max-w-[250px] md:max-w-md">
              <Clock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {slots && slots.length > 0 ? slots.join(", ") : "No slot selected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between md:justify-center items-center md:items-end md:flex-col gap-3 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
        {/* ডাইনামিক টোটাল প্রাইস */}
        <div className="text-2xl md:text-3xl font-extrabold text-[#00CECB]">
          ${totalPrice}
        </div>

        {/* ক্যানসেল বাটন */}
        <CancelBookingBtn id={_id}></CancelBookingBtn>
      </div>
    </div>
  );
};

export default MyBookingCard;