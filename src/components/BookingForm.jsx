"use client";

import { authClient } from '@/lib/auth-client';
import { setBooking } from '@/lib/data';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookingForm = ({ facilityId, image, facilityName, location, pricePerHour, computedTimeSlots, availableSlot: initialAvailableSlot }) => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlots, setSelectedSlots] = useState([]);
    
    // ডাটাবেজ থেকে আসা প্রাথমিক স্লট সংখ্যাকে একটি লোকাল স্টেটে রাখছি যেন রিয়েল-টাইম চেঞ্জ করা যায়
    const [currentAvailableSlots, setCurrentAvailableSlots] = useState(parseInt(initialAvailableSlot) || 0);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const today = new Date().toISOString().split('T')[0];

    // যদি প্রপ্স থেকে আসা availableSlot কখনো চেঞ্জ হয় (যেমন পেজ রিফ্রেশ বা রাউটার রিফ্রেশে)
    useEffect(() => {
        setCurrentAvailableSlots(parseInt(initialAvailableSlot) || 0);
        setSelectedSlots([]); // ফ্যাসিলিটি বা স্লট সংখ্যা সার্ভার থেকে আপডেট হলে সিলেকশন ক্লিয়ার হবে
    }, [initialAvailableSlot]);

    // স্লট ক্লিক হ্যান্ডলার
    const handleSlotClick = (slot) => {
        if (!selectedDate) {
            toast.error("Please select a date first!");
            return;
        }

        if (selectedSlots.includes(slot)) {
            // ১. স্লট আন-সিলেক্ট (Deselect) করলে: 
            setSelectedSlots(selectedSlots.filter(s => s !== slot));
            // লোকাল এভেইলেবল স্লট ১টি বাড়িয়ে দিব
            setCurrentAvailableSlots(prev => prev + 1);
        } else {
            // ২. নতুন স্লট সিলেক্ট করতে গেলে চেক করব লোকাল স্লট ফাঁকা আছে কিনা
            if (currentAvailableSlots <= 0) {
                toast.error("No more available slots left for this facility!");
                return;
            }
            
            setSelectedSlots([...selectedSlots, slot]);
            // লোকাল এভেইলেবল স্লট ১টি কমিয়ে দিব
            setCurrentAvailableSlots(prev => prev - 1);
        }
    };

    const totalHours = selectedSlots.length;
    const totalPrice = totalHours * pricePerHour;

  // BookingForm.jsx এর ভেতরে handleSubmit ফাংশনটি আপডেট করো:

// BookingForm.jsx এর ভেতরে handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  const { data } = await authClient.token();
  if (!data?.token) return toast.error("Please login!");

  const bookingData = { facilityId, facilityName, date: selectedDate, slots: selectedSlots, totalHours, totalPrice };
  
  const res = await setBooking(bookingData, data.token);
  if (res.acknowledged) {
    toast.success("Booking Success!");
    router.refresh();
  } else {
    toast.error("Booking Failed!");
  }
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
                        setSelectedSlots([]); 
                        // ডেট চেঞ্জ হলে এভেইলেবল স্লট সংখ্যা আবার আগের অরিজিনাল অবস্থায় ফেরত যাবে
                        setCurrentAvailableSlots(parseInt(initialAvailableSlot) || 0);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                />
            </div>

            {/* ২. স্লট সিলেকশন */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {/* এখন এখানে লোকাল রিয়েল-টাইম স্টেট (currentAvailableSlots) দেখাবে */}
                        Available Slots (Total: {currentAvailableSlots})
                    </label>
                    <span className="text-xs text-cyan-400 font-medium">
                        Selected: {selectedSlots.length} Slots
                    </span>
                </div>
                
                {computedTimeSlots && computedTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {computedTimeSlots.map((slot, index) => {
                            const isSelected = selectedSlots.includes(slot);
                            
                            // যদি কারেন্ট স্লট ০ হয়ে যায় এবং এই বাটনটি সিলেক্টেড না থাকে, তবে বাটনটি ডিজেবল হবে
                            const isButtonDisabled = currentAvailableSlots === 0 && !isSelected;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isButtonDisabled || parseInt(initialAvailableSlot) === 0}
                                    onClick={() => handleSlotClick(slot)}
                                    className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                                        isSelected
                                            ? "bg-cyan-500 border-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20"
                                            : isButtonDisabled
                                            ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-40"
                                            : parseInt(initialAvailableSlot) === 0
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
                )}
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
                disabled={parseInt(initialAvailableSlot) === 0}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/10 disabled:from-gray-800 disabled:to-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
            >
                {parseInt(initialAvailableSlot) === 0 ? "Fully Booked" : "Book This Facility"}
            </button>
        </form>
    );
};

export default BookingForm;