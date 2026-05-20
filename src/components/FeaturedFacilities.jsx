
import { getfeaturedfacilities } from "@/lib/data";
import Link from "next/link";
import FacilityCard from "./FacilityCard";

export async function FeaturedFacilitiesSection() {

  const facilities = await getfeaturedfacilities();

  return (
    <section className="py-24 bg-[#041527] text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-orange-500 text-sm font-semibold tracking-wider uppercase mb-4">
              Featured Venues
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Top-Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-400">Facilities</span>
            </h2>
          </div>
          <Link href="/facilities" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2">
            View All Facilities <span>→</span>
          </Link>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {facilities.map(facilitie=><FacilityCard key={facilitie._id} facilitie={facilitie} ></FacilityCard>)}
        </div>
      </div>
    </section>
  );
}