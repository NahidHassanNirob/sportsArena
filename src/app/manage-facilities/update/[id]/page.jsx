import { getDataById } from "@/lib/data";
import UpdateFacilityForm from "@/components/UpdateFacilityForm";

const UpdatePage = async ({ params }) => {
  const { id } = await params;
  
  // ডাটাবেজ থেকে আইডি অনুযায়ী আগের ডাটা নিয়ে আসা হচ্ছে
  const currentData = await getDataById(id);

  return (
    <div className="bg-[#0D131F] min-h-screen pt-24 pb-10 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* ক্লায়েন্ট ফর্ম কম্পোনেন্ট কল করা হলো এবং ডাটা পাঠিয়ে দেওয়া হলো */}
        <UpdateFacilityForm id={id} currentData={currentData} />
      </div>
    </div>
  );
};

export default UpdatePage;