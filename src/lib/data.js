// lib/data.js
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

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
  console.log(jwtToken);
  const res = await fetch(`${BASE_URL}/facilities`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}` 
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

  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to book");
  }

  return res.json();
};

export const getMyBookings = async (token) => {
  console.log(token,"token");
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      headers: getHeaders(token),
      cache: "no-store",
    });
   console.log(res,"res");
    if (!res.ok) {
      console.log("Booking fetch failed:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log("getMyBookings error:", error);
    return [];
  }
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

  // ✅ 500 হলে JSON parse না করে error throw করুন
  if (!res.ok) {
    const text = await res.text();
    console.error("Server error:", text);
    throw new Error("Failed to cancel booking");
  }

  return res.json();
};