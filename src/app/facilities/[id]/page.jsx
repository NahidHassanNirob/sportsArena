import { getDataById } from '@/lib/data';
import React from 'react';
import { MapPin, Users, Clock, Star } from "lucide-react";
import Image from 'next/image';
import { generateAvailableSlots } from '@/lib/availableTimeSlot';
import BookingForm from '@/components/BookingForm';
// import BookingForm from '@/components/BookingForm'; // 👈 নতুন ফর্মটি ইম্পোর্ট করুন

const FacilitiesDetails = async ({ params }) => {
    const { id } = await params;
    const detailsData = await getDataById(id);
    
    if (!detailsData) {
        return <div className="text-white text-center py-20">Facility not found!</div>;
    }

    const {
        _id, 
        facilityName,
        facilityType,
        image,
        location,
        pricePerHour,
        capacity,
        description,
        openingTime, 
        closingTime,
        availableSlot
        
    } = detailsData;

    
    const computedTimeSlots = generateAvailableSlots(openingTime, closingTime);

    return (
        <main className="min-h-screen bg-[#0D131F] text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-xl">
                            <Image
                               height={400}
                               width={800}
                               src={image || "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&q=80"} 
                               alt={facilityName}
                               className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-2 uppercase">
                                {facilityType}
                            </span>
                            <h1 className="text-3xl font-bold mb-2">{facilityName}</h1>
                            
                            <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm">{location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm">Schedule: {openingTime} - {closingTime}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                            {description || "No description available."}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <Users className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                                <div className="text-lg font-bold">{capacity}</div>
                                <div className="text-xs text-gray-400">Max Capacity</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                                <div className="text-lg font-bold">Available Slot</div>
                                <div className="text-xs text-gray-400">{availableSlot}</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                                <div className="text-lg font-bold">1 Hour</div>
                                <div className="text-xs text-gray-400">Per Slot</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1 fill-yellow-400" />
                                <div className="text-lg font-bold">4.9</div>
                                <div className="text-xs text-gray-400">Rating</div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl sticky top-6">
                            <div className="flex items-baseline gap-1 mb-4 border-b border-white/5 pb-4">
                                <span className="text-3xl font-bold text-cyan-400">${pricePerHour}</span>
                                <span className="text-gray-400 text-sm">/ hour</span>
                            </div>

                            <BookingForm 
                                location={location}
                                facilityId={_id}
                                facilityName={facilityName}
                                pricePerHour={pricePerHour}
                                computedTimeSlots={computedTimeSlots}
                                availableSlot={availableSlot}
                                image={image}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default FacilitiesDetails;