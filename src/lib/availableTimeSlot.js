export function generateAvailableSlots(openingTime, closingTime) {
  if (!openingTime || !closingTime) return [];

  
  const parseTimeTo24HourNumber = (timeStr) => {
    const cleanStr = timeStr.trim().toUpperCase();
    
    if (cleanStr.includes("AM") || cleanStr.includes("PM")) {
      const isPM = cleanStr.includes("PM");
      
      const timePart = cleanStr.replace(/[AMP\s]/g, ""); 
      let [hours] = timePart.split(":").map(Number);
      
      if (isPM && hours !== 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
      return hours;
    }
    
    
    const [hours] = cleanStr.split(":").map(Number);
    return hours;
  };

  
  const formatTo12Hour = (hour) => {
    const currentHour = hour % 24;
    const ampm = currentHour >= 12 ? "PM" : "AM";
    let displayHour = currentHour % 12;
    if (displayHour === 0) displayHour = 12;
    
    
    return `${String(displayHour).padStart(2, '0')}:00 ${ampm}`;
  };

  const startHour = parseTimeTo24HourNumber(openingTime);
  let endHour = parseTimeTo24HourNumber(closingTime);

  
  if (endHour <= startHour) {
    endHour += 24;
  }

  const slots = [];
  
  for (let i = startHour; i <= endHour; i++) {
    slots.push(formatTo12Hour(i));
  }

  return slots;
}