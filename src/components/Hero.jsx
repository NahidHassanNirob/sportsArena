import { Calendar, Users, Trophy, Star } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Facilities", value: "2,500+", icon: Trophy },
  { label: "Bookings", value: "100K+", icon: Calendar },
  { label: "Rating", value: "4.9", icon: Star },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-slate-950">
      {/* Background Section - Non-moving & Pure Static */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1461896836934-1ff6242323ef?w=1920&q=80')`,
          }}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(34,197,94,0.08),_transparent_60%)]" />
      </div>

      {/* Static Glow Effects */}
      <div className="absolute top-1/4 left-[5%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="container max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-slate-900/60 backdrop-blur-md mb-8 border border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-slate-300 tracking-wide">
              Trusted by 50,000+ athletes worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-100 max-w-4xl">
            Book Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
              Sports Venue
            </span>{" "}
            Instantly
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover premium sports facilities near you. From football pitches to tennis courts, 
            swimming pools to basketball arenas. Book in seconds, play in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-20">
            <Link href="/facilities" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-bold text-base tracking-wide px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:opacity-95 transition-opacity duration-200 active:scale-[0.98]">
                Explore Facilities
              </button>
            </Link>
            <Link href="/add-facilities" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto text-base font-semibold tracking-wide px-8 py-4 rounded-xl border border-slate-800 text-slate-200 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900 hover:border-slate-700 transition-all duration-200 active:scale-[0.98]">
                List Your Venue
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="relative bg-slate-900/30 backdrop-blur-md rounded-xl p-5 md:p-6 text-center border border-slate-900 shadow-xl overflow-hidden"
              >
                <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm font-medium text-slate-400 mt-1.5 tracking-wide">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}