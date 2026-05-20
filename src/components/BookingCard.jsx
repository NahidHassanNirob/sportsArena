
"use client"

import React, { useState } from 'react';
import { Shield } from "lucide-react";

export default function BookingCard({ pricePerHour, availableTimeSlots = [] }) {
    const [selectedSlots, setSelectedSlots] = useState([]);

    const toggleSlot = (time) => {
        setSelectedSlots((prev) =>
            prev.includes(time)
                ? prev.filter((t) => t !== time)
                : [...prev, time]
        );
    };

    const totalPrice = selectedSlots.length * pricePerHour;
    const serviceFee = Math.round(totalPrice * 0.05); 
    const grandTotal = totalPrice + serviceFee;

    return (
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
            {/* Price Header */}
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-cyan-400">
                    ${pricePerHour}
                </span>
                <span className="text-gray-400">/ hour</span>
            </div>

            
            <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-200">
                    Select Available Slots
                </label>
                
                {availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {availableTimeSlots.map((slot) => {
                            const isSelected = selectedSlots.includes(slot);
                            return (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => toggleSlot(slot)}
                                    className={`p-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                                        isSelected
                                            ? "bg-cyan-500 text-[#0D131F] border-cyan-400 shadow-lg shadow-cyan-500/20"
                                            : "bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 italic">No available slots for today.</p>
                )}

                {selectedSlots.length > 0 && (
                    <p className="text-xs text-cyan-400 mt-3 font-medium">
                        {selectedSlots.length} slot(s) selected
                    </p>
                )}
            </div>

            {/* Price Breakdown */}
            {selectedSlots.length > 0 && (
                <div className="border-t border-white/10 pt-4 mb-6 space-y-3 animation-fade-in">
                    <div className="flex justify-between text-sm text-gray-300">
                        <span className="text-gray-400">
                            ${pricePerHour} x {selectedSlots.length} hr
                        </span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                        <span className="text-gray-400">Service fee (5%)</span>
                        <span>${serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-3 border-t border-white/10 text-white">
                        <span>Total</span>
                        <span className="text-cyan-400 text-lg">${grandTotal}</span>
                    </div>
                </div>
            )}

            {/* Book Button */}
            <button
                disabled={selectedSlots.length === 0}
                className="w-full bg-cyan-500 text-[#0D131F] font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
            >
                {selectedSlots.length === 0
                    ? "Select Time Slots"
                    : `Book Now - $${grandTotal}`}
            </button>

            {/* Security Note */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Secure booking with instant confirmation</span>
            </div>
        </div>
    );
}