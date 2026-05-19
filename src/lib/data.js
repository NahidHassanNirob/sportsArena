// get featuredfacilities data
export const getfeaturedfacilities=async()=>{
    const res=await fetch('http://localhost:8000/featuredfacilities');
    const data=await res.json();
    return data
}