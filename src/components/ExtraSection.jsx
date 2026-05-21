import React from "react";

export default function ExtraSections() {
  return (
    <div className="bg-[#041527] text-white space-y-32 py-24 overflow-hidden relative">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্টস */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================
          SECTION 1: HOW IT WORKS
          ========================================================= */}
      <section className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">Works</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Book your favorite sports arena in less than a minute. Follow these three simple steps to get started.
          </p>
        </div>

        {/* স্টেপ কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* কানেক্টিং ড্যাশড লাইন */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-slate-800 -translate-y-1/2 z-0" />

          {[
            {
              step: "01",
              title: "Explore Venues",
              desc: "Browse through our verified premium arenas and filter by your favorite sports or preferred location.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              ),
              color: "group-hover:border-cyan-500/50 group-hover:text-cyan-400",
              badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            },
            {
              step: "02",
              title: "Select Slot & Details",
              desc: "Pick your comfortable date and dynamic hourly time slot that suits your team's match schedule perfectly.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              ),
              color: "group-hover:border-green-500/50 group-hover:text-green-400",
              badge: "bg-green-500/10 text-green-400 border-green-500/20"
            },
            {
              step: "03",
              title: "Confirm Booking",
              desc: "Complete your payment securely with multiple digital methods and get instantly verified slot confirmation.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              ),
              color: "group-hover:border-cyan-500/50 group-hover:text-cyan-400",
              badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="group bg-[#081b31] border border-slate-800/80 p-8 rounded-2xl relative z-10 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl bg-[#041527] border border-slate-800 flex items-center justify-center text-slate-400 transition-colors duration-300 ${item.color}`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-bold tracking-widest border px-2.5 py-0.5 rounded-md ${item.badge}`}>
                  STEP {item.step}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-100 mb-2.5 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 2: WHY CHOOSE US
          ========================================================= */}
      <section className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">SportsArena</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            We deliver a seamless slot booking journey backed by advanced infrastructure and zero manual confirmation lag.
          </p>
        </div>

        {/* ৪ কলামের কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Instant Confirmation",
              desc: "No manual phone calls or waiting hours. Get your booking receipt instantly right after payment.",
              icon: <path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0" />
            },
            {
              title: "Verified Premium Turf",
              desc: "All Listed grounds feature high-quality artificial grass, standard court dimensions, and fresh environments.",
              icon: (
                <>
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74z" />
                  <path d="m9 12 2 2 4-4" />
                </>
              )
            },
            {
              title: "Floodlight Filtering",
              desc: "Want to experience late-night matches? Filter matches with top-tier high-luminance floodlight amenities.",
              icon: (
                <>
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </>
              )
            },
            {
              title: "Flexible Rescheduling",
              desc: "Plans changed suddenly? Reschedule your slot easily up to 24 hours before kick-off straight from the user dashboard.",
              icon: (
                <>
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </>
              )
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-[#081b31]/40 border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between hover:bg-[#081b31] hover:border-slate-700/60 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}