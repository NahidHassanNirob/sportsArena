// get featuredfacilities data
export const getfeaturedfacilities=async()=>{
    const res=await fetch('http://localhost:8000/featuredfacilities');
    const data=await res.json();
    return data
}

export const getAllfacilities = async (search = "", filter = "") => {
    
    const res = await fetch(`http://localhost:8000/facilities?search=${search}&filter=${filter}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
};


// post database Facilities
export const postFacilities=async(facilitiesData)=>{
    const res = await fetch(`http://localhost:8000/facilities`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(facilitiesData)

    })
    const data=await res.json();
    return data;

}
// get data by id
export const getDataById=async(id)=>{
    const res=await fetch(`http://localhost:8000/facilities/${id}`)
    const data = await res.json()
    return data|| []
}

// post data to booking
export const setBooking=async(bookingdata)=>{
    const res=await fetch('http://localhost:8000/bookings',{
        method:'POST',
         headers:{
            'content-type':'application/json'
         }
         ,
         body:JSON.stringify(bookingdata)
    })

    const data= await res.json()
    return data;
}

// get my booking data
export const getMyBookings=async(myEmail)=>{
    const res= await fetch(`http://localhost:8000/bookings?email=${myEmail}`,{cache:'no-store'})
    const data=await res.json();
    return data || []
}

// get owner facilities
export const getOwnerFcilities=async(owenerEmail)=>{
    const res= await fetch(`http://localhost:8000/ownerfacilities?email=${owenerEmail}`,{cache:'no-store'})
    const data=await res.json(owenerEmail);
    return data || [];
}

// update facility data by id
export const updateFacilityById = async (id, updatedData) => {
  const res = await fetch(`http://localhost:8000/facilities/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });
  const data = await res.json();
  return data;
};

// delete facility by id
export const deleteFacilityById = async (id) => {
  const res = await fetch(`http://localhost:8000/facilities/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

