// lib/data.js
const BASE_URL = "http://localhost:8000";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { "Authorization": `Bearer ${token}` })
});

export const getfeaturedfacilities = async (jwtToken = "") => {
  const res = await fetch(`${BASE_URL}/featuredfacilities`, { headers: getHeaders(jwtToken) });
  return res.json();
};

export const getAllfacilities = async (search = "", filter = "") => {
  const res = await fetch(`${BASE_URL}/facilities?search=${search}&filter=${filter}`, { cache: "no-store" });
  return res.json();
};

export const postFacilities = async (facilitiesData, jwtToken) => {
  const res = await fetch(`${BASE_URL}/facilities`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}` // এভাবে হেডার নিশ্চিত করুন
    },
    body: JSON.stringify(facilitiesData),
  });
  return res.json();
};

export const getDataById = async (id) => {
  const res = await fetch(`${BASE_URL}/facilities/${id}`);
  return res.json();
};

export const setBooking = async (data, token) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });

  // যদি সার্ভার থেকে স্ট্যাটাস কোড ২০০ এর বাইরে আসে (যেমন ৪০০ বা ৫০০)
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to book");
  }

  return res.json();
};

export const getMyBookings = async (token) => {
  const res = await fetch(`${BASE_URL}/bookings`, { 
    headers: getHeaders(token), 
    cache: "no-store" 
  });
  return res.json();
};



export const getOwnerFcilities = async (jwtToken) => {
  const res = await fetch(`${BASE_URL}/ownerfacilities`, {
    headers: getHeaders(jwtToken),
    cache: "no-store",
  });
  return res.json();
};

export const updateFacilityById = async (id, updatedData, jwtToken) => {
  const res = await fetch(`${BASE_URL}/facilities/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}` // টোকেন পাঠানো জরুরি
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

// lib/data.js
export const deleteFacilityById = async (id, jwtToken) => {
  const res = await fetch(`${BASE_URL}/facilities/${id}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${jwtToken}` // হেডারটি এভাবে নিশ্চিত করুন
    },
  });
  return res.json();
};

export const deleteBooking = async (id, jwtToken) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: getHeaders(jwtToken),
  });
  return res.json();
};