import AddFacilitiesForm from "@/components/AddFacilitiesForm";
import { auth } from "@/lib/auth";
// import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import React from "react";

const AddFacilities =  async() => {
  const session=await auth.api.getToken({
          headers: await headers()
  })
  const token=session?.token
  
  return (
    <div className=" bg-[#03080F] mx-auto px-4 min-h-screen text-white">
      <section className="pt-32 pb-12 max-w-6xl mx-auto">
        <div className="text-center mx-auto px-4">
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Add New {""}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
                Facilities
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              List your sports venue and start earning from bookings
            </p>
          </div>
        </div>
        <AddFacilitiesForm token={token}></AddFacilitiesForm>
      </section>
    </div>
  );
};

export default AddFacilities;
