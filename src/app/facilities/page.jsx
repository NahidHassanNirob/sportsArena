'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FacilityCard from "@/components/FacilityCard";
import { getAllfacilities } from "@/lib/data";

const sportsTypes = [
  "All", "Football", "Tennis", "Swimming", 
  "Basketball", "Badminton", "Cricket", 
  "Volleyball", "Golf", "Boxing"
];

const FacilitiesPage = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // সার্চ এবং ফিল্টার চেঞ্জ হলে ডাটা ফেচ করবে
  // সার্চ এবং ফিল্টার চেঞ্জ হলে ডাটা ফেচ করবে
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      // ব্যাকএন্ড এপিআই তে রিকোয়েস্ট পাঠানো হচ্ছে
      const data = await getAllfacilities(search, selectedSport);
      setAllFacilities(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ইউজার টাইপ করা থামালে ৩০০ মিলি-সেকেন্ড পর ডাটা লোড হবে
  const delayDebounceFn = setTimeout(() => {
    fetchData();
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [search, selectedSport]);

  // ফিল্টার ক্লিয়ার করার ফাংশন
  const handleClearFilters = () => {
    setSearch("");
    setSelectedSport("All");
  };

  return (
    <div className="bg-[#041527] mx-auto px-4 min-h-screen text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
              Facilities
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and book from our curated collection of premium sports venues.
          </p>
        </div>
      </section>

      {/* 🔍 Search & Filter Section */}
      <section className="max-w-6xl mx-auto mb-12">
        <div className="bg-[#081b31] border border-slate-800 rounded-2xl p-6 shadow-xl">
          {/* Search Bar + Filter Button Wrapper */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#041527] text-white pl-12 pr-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-500"
              />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border font-medium transition-all w-full sm:w-auto justify-center ${
                isFilterOpen || selectedSport !== "All"
                  ? "bg-[#041527] border-cyan-500 text-cyan-400"
                  : "bg-[#041527] border-slate-800 text-white hover:border-slate-700"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {selectedSport !== "All" && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block ml-1"></span>
              )}
            </button>
          </div>

          {/* Expandable Sports Filter Badges */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6 pt-6 border-t border-slate-800"
              >
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Sport Type
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {sportsTypes.map((sport) => (
                      <button
                        key={sport}
                        onClick={() => setSelectedSport(sport)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedSport === sport
                            ? "bg-cyan-500 text-[#041527] font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "bg-[#041527] text-gray-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>

                  {/* Clear Filters Button */}
                  {(selectedSport !== "All" || search !== "") && (
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors pt-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear all filters</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

     
      <section className="pb-24 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : allFacilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFacilities.map((facility, index) => (
              <FacilityCard
                key={facility._id}
                facilitie={facility}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#151414] border border-slate-800 rounded-2xl">
            <p className="text-white text-lg">No facilities found.</p>
            <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-cyan-500 text-[#041527] font-semibold rounded-xl text-sm"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default FacilitiesPage;