import React from "react";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@heroui/react";
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
  return (
    <div className="w-full  border bg-[#041527] border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
      <div className="flex items-start gap-4 flex-1">
       
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-cover bg-center flex-shrink-0"
          
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&q=80')`,
          }}
        />

      
        <div className="space-y-2 pt-1">
         
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-[#00A86B]">
            {status}
          </span>

       
          <h3 className="text-white text-base md:text-xl font-bold tracking-wide">
            {facilityName}
          </h3>

          
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{location}</span>
          </div>

         
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Thu, Feb 15, 2024</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-500" />
              <span>06:00 PM - 07:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex  justify-between md:justify-center items-end gap-3 w-full md:w-auto">
        

        <div className="text-2xl md:text-3xl font-extrabold text-[#00CECB]">
          $120
        </div>

       <CancelBookingBtn id={_id}></CancelBookingBtn>
      </div>
    </div>
  );
};

export default MyBookingCard;
