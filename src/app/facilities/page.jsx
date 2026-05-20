import FacilityCard from "@/components/FacilityCard";
import { getAllfacilities } from "@/lib/data";

const FacilitiesPage = async () => {
  const allFacilities = await getAllfacilities();

  return (
    <div className=" bg-[#041527] mx-auto px-4 min-h-screen text-white">
      <section className="pt-32 pb-12 max-w-6xl mx-auto">
        <div className="text-center mx-auto px-4">
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
                Facilities
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Discover and book from our curated collection of premium sports
              venues.
            </p>
          </div>
        </div>
      </section>
      <div>{/* todo : search and filter */}</div>

      <section className="pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFacilities.map((facility, index) => (
            <FacilityCard
              key={facility._id}
              facilitie={facility}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
