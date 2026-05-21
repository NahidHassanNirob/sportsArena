import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#041527] flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* ব্যাকগ্রাউন্ড রেডিয়াল গ্লো ইফেক্ট */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.12),_transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* মেইন কন্টেন্ট কন্টেইনার */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* স্পিনার রিং */}
        <div className="relative w-24 h-24 mb-6">
          {/* আউটার ডার্ক বর্ডার */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          
          {/* স্পিনিং গ্লো রিং (Tailwind Built-in animate-spin) */}
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-green-400 border-b-transparent border-l-transparent animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]" />
          
          {/* সেন্ট্রাল লোগো হোল্ডার */}
          <div className="absolute inset-2 bg-[#081b31] rounded-full border border-slate-800 flex items-center justify-center shadow-inner">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-cyan-400 animate-bounce"
            >
              <path d="m2 22 1-1c3.4-3.4 6.8-6.8 10.2-10.2" />
              <path d="m22 2-1 1c-3.4 3.4-6.8 6.8-10.2 10.2" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
            </svg>
          </div>
        </div>

        
        
      </div>

     
     
    </main>
  );
}