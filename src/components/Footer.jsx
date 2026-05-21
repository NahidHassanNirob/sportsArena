import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081b31] border-t border-slate-800 text-slate-400 pt-20 pb-10 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          
          {/* ব্র্যান্ড এবং কন্টাক্ট ইনফরমেশন */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold tracking-widest uppercase text-white">
              Sports<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">Arena</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Discover and book premium sports venues instantly. Your ultimate playground companion.
            </p>
            
            {/* কন্টাক্ট ডিটেইলস */}
            <div className="space-y-3.5 pt-2 text-sm">
              <div className="flex items-center gap-3.5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="group-hover:text-slate-200 transition-colors">+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3.5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">support@sportsarena.com</span>
              </div>
              <div className="flex items-center gap-3.5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="group-hover:text-slate-200 transition-colors">Gazipur, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* কুইক লিংকস */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold tracking-wider text-sm uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["All Facilities", "Featured Venues", "My Bookings", "About Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-cyan-400 transition-colors flex items-center group py-0.5">
                    <span className="w-0 group-hover:w-2.5 h-[2px] bg-cyan-400 mr-0 group-hover:mr-2.5 transition-all duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* সোশ্যাল লিংকস (আপনার প্রোভাইড করা রিয়েল লিংকসহ) */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold tracking-wider text-sm uppercase">Follow Us</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Stay connected with our community and tournaments.</p>
            
            {/* গোল সোশ্যাল আইকন কন্টেইনার */}
            <div className="flex items-center gap-3.5 pt-1">
              {[
                { 
                  name: "Facebook", 
                  url: "https://www.facebook.com/share/18etNm2avY/",
                  icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                },
                { 
                  name: "LinkedIn", 
                  url: "https://linkedin.com/in/nirob-hossen",
                  icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                },
                { 
                  name: "Portfolio", 
                  url: "https://nirobhossen.vercel.app/",
                  icon: <>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" x2="22" y1="12" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </>
                },
                { 
                  name: "GitHub", 
                  url: "https://github.com/NahidHassanNirob",
                  icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full bg-[#041527] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-lg"
                >
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
                    className="shrink-0"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* বটম লাইন এবং কপিরাইট */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <p className="tracking-wide">© {currentYear} SportsArena. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}