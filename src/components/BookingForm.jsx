"use client";

import { authClient } from '@/lib/auth-client';
import { setBooking } from '@/lib/data';
import React, { useState } from 'react';

const BookingForm = ({ facilityId,image, facilityName,location, pricePerHour, computedTimeSlots, availableSlot }) => {
    // স্টেট ম্যানেজমেন্ট
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlots, setSelectedSlots] = useState([]);
    const {data:session}=authClient.useSession()
    const user=session?.user;

    // একজন ইউজার একবারে সর্বোচ্চ কত ঘন্টা/স্লট বুক করতে পারবেন তার লিমিট
    const MAX_BOOKING_HOURS = 5; 
    const today = new Date().toISOString().split('T')[0];

    // স্লট ক্লিক হ্যান্ডলার
    const handleSlotClick = (slot) => {
        if (!selectedDate) {
            alert("Please select a date first!");
            return;
        }

        if (selectedSlots.includes(slot)) {
            // অলরেডি সিলেক্টেড থাকলে রিমুভ হবে
            setSelectedSlots(selectedSlots.filter(s => s !== slot));
        } else {
            // সেশন লিমিট চেক করা হচ্ছে
            if (selectedSlots.length < MAX_BOOKING_HOURS) {
                setSelectedSlots([...selectedSlots, slot]);
            } else {
                alert(`You can select a maximum of ${MAX_BOOKING_HOURS} slots per booking.`);
            }
        }
    };

    const totalHours = selectedSlots.length;
    const totalPrice = totalHours * pricePerHour;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate) return alert("Please select a date first!");
        if (selectedSlots.length === 0) return alert("Please select at least one time slot!");

        const bookingData = {
            facilityId,
            facilityName,
            userEmail:user?.email,
            location,
            image,
            date: selectedDate,
            slots: selectedSlots, 
            totalHours,
            totalPrice,
            status:'pending'
        };
        const setData=await setBooking(bookingData)
        console.log("Submitting Booking Data to Server:", bookingData);
        
        // এখানে আপনার API কল বা সার্ভার অ্যাকশন যুক্ত করবেন
        alert(`Booking request submitted successfully!\nTotal Hours: ${totalHours} hrs\nTotal Price: $${totalPrice}`);
        
        // ফর্ম রিসেট
        setSelectedSlots([]);
        setSelectedDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* ১. ডেট সিলেকশন */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Select Date
                </label>
                <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlots([]); // ডেট চেঞ্জ হলে আগের সিলেক্ট করা স্লট রিসেট হবে
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                />
            </div>

            {/* ২. স্লট সিলেকশন */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Available Slots (Total: {availableSlot})
                    </label>
                    <span className="text-xs text-cyan-400 font-medium">
                     Selected: {selectedSlots.length}/{MAX_BOOKING_HOURS}
                    </span>
                </div>
                
                {computedTimeSlots && computedTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {computedTimeSlots.map((slot, index) => {
                            const isSelected = selectedSlots.includes(slot);
                            const isDisabled = selectedSlots.length >= MAX_BOOKING_HOURS && !isSelected;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isDisabled || parseInt(availableSlot) === 0}
                                    onClick={() => handleSlotClick(slot)}
                                    className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                                        isSelected
                                            ? "bg-cyan-500 border-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20"
                                            : isDisabled
                                            ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                                            : parseInt(availableSlot) === 0
                                            ? "bg-red-500/10 border-red-500/20 text-red-400/50 cursor-not-allowed"
                                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
                                    }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-amber-400">No slots available for this schedule.</p>
                ) }
            </div>

            {/* ৩. প্রাইস সামারি */}
            {selectedSlots.length > 0 && (
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-1 text-sm text-gray-300 animate-fadeIn">
                    <div className="flex justify-between">
                        <span>Selected Duration:</span>
                        <span className="text-cyan-400 font-medium">{totalHours} hr{totalHours > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-1 mt-1 font-semibold text-white">
                        <span>Total Est. Price:</span>
                        <span className="text-emerald-400">${totalPrice}</span>
                    </div>
                </div>
            )}

            {/* ৪. সাবমিট বাটন */}
            <button
                type="submit"
                disabled={parseInt(availableSlot) === 0}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/10 disabled:from-gray-800 disabled:to-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
            >
                {parseInt(availableSlot) === 0 ? "Fully Booked" : "Book This Facility"}
            </button>
        </form>
    );
};

export default BookingForm;