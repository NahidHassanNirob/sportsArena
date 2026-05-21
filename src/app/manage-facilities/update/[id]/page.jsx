import { getDataById } from "@/lib/data";
import UpdateFacilityForm from "@/components/UpdateFacilityForm";

const UpdatePage = async ({ params }) => {
  const { id } = await params;
  
  
  const currentData = await getDataById(id);

  return (
    <div className="bg-[#0D131F] min-h-screen pt-24 pb-10 ">
      <div className="max-w-6xl mx-auto px-4">
        
        <UpdateFacilityForm id={id} currentData={currentData} />
      </div>
    </div>
  );
};

export default UpdatePage;