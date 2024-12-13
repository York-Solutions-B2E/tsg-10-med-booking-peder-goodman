import dayjs, { Dayjs } from "dayjs";

const calculateAge = (date: string | Dayjs) => {
  const today = dayjs();
  const birthdate = dayjs(date);
  return today.diff(birthdate, "year");
};

// Generate time slots between 8:00 AM and 7:00 PM using Day.js
const generateTimeSlots = (firstHour: number, lastHour: number) => {
  const startTime = dayjs().hour(firstHour).minute(0).second(0); // 8:00 AM
  const endTime = dayjs().hour(lastHour).minute(0).second(0); // 7:00 PM
  const slots = [];
  let currentTime = startTime;

  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    slots.push(currentTime.format("HH:mm A")); // Format time as "HH:mm A"
    currentTime = currentTime.add(1, "hour"); // Increment by 1 hour
  }

  return slots;
};

export { calculateAge, generateTimeSlots };
