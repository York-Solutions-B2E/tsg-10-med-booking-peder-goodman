import dayjs, { Dayjs } from "dayjs";

/*

 Calculate age from date of birth

 */
const calculateAge = (date: string | Dayjs) => {
  const today = dayjs();
  const birthdate = dayjs(date);
  return today.diff(birthdate, "year");
};

/*

 Generate time slots between 8:00 AM and 7:00 PM using Day.js

 */
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

/*

 Check if an appointment is editable

 */
const checkIfAppointmentIsEditable = (appointment: Appointment) => {
  if (appointment.appointmentStatus === "CANCELED") {
    return false;
  }

  const isAppointmentDateInThePast = dayjs(appointment.appointmentDate + appointment.appointmentTime).isBefore(dayjs());

  if (isAppointmentDateInThePast) {
    return false;
  }

  return true;
};

/*

 Filter out unavailable time slots

*/
const filterSelectedDaysAvailableSlots = (
  scheduledAppointments: DoctorAppointment[],
  selectedAppointmentDate: string,
  patientId: number,
  patientAppointments: Appointment[]
) => {
  // Generate initial time slots between 8:00 AM and 7:00 PM
  const initialTimeSlots = generateTimeSlots(8, 23);
  let filteredTimeSlots: string[] = [];
  let unavailableTimeSlots: string[] = [];
  let filteredDoctorAvailability: DoctorAppointment[] = [];
  let filteredPatientAvailability: Appointment[] = [];

  // format the dates
  const currentDateTime = dayjs();
  const selectedDate = dayjs(selectedAppointmentDate, "YYYY-MM-DD");

  /*
   Get the list of appointments that the doctor is not available on the selected date
   */
  if (scheduledAppointments) {
    filteredDoctorAvailability = scheduledAppointments.filter((appointment) => {
      return dayjs(appointment.appointmentDate, "YYYY-MM-DD").isSame(selectedDate) && appointment.appointmentStatus !== "CANCELED";
    });
  }

  /*
   * If patient HAS an appointment on the selected date, return an empty array
   */
  const appointmentsWithSamePatient = filteredDoctorAvailability.filter((appointment) => {
    return appointment.patient.id === patientId;
  });
  console.log("appointmentsWithSamePatient is:", appointmentsWithSamePatient);
  console.log("appointmentsWithSamePatient is:", appointmentsWithSamePatient[0]?.appointmentStatus);

  if (appointmentsWithSamePatient.length > 0) {
    console.log("Patient has appointments on the selected date");

    return [];
  }

  // Add the doctor's unavailable times to the unavailable time slots
  unavailableTimeSlots = filteredDoctorAvailability.map((appointment) => dayjs(appointment.appointmentTime, "HH:mm").format("HH:mm A"));

  // console.log("doctor unavailable time slots:", unavailableTimeSlots);

  /*
   * Grab times patient isn't available on the selected date
   */
  if (patientAppointments) {
    filteredPatientAvailability = patientAppointments.filter((appointment) => {
      return dayjs(appointment.appointmentDate, "YYYY-MM-DD").isSame(selectedDate) && appointment.appointmentStatus !== "CANCELED";
    });

    const formattedPatientAvailability = filteredPatientAvailability.map((appointment) =>
      dayjs(appointment.appointmentTime, "HH:mm").format("HH:mm A")
    );

    // Add the patient's unavailable times to the unavailable time slots
    unavailableTimeSlots = [...unavailableTimeSlots, ...formattedPatientAvailability];
  }

  // console.log("doctor & patient unavailable time slots:", unavailableTimeSlots);

  /*
   *  if selected date is today, filter out the past times
   */
  if (selectedDate.isSame(currentDateTime, "day")) {
    const currentTime = currentDateTime.format("HH:mm");

    // remove the past times from TODAYS time slots
    const todaysPastTimeSlots = initialTimeSlots.filter((slot) => {
      return slot <= currentTime;
    });

    unavailableTimeSlots = [...unavailableTimeSlots, ...todaysPastTimeSlots];
  }

  // Remove duplicates from the unavailable time slots
  const uniqueUnavailableTimeSlots = unavailableTimeSlots.filter((value, index, self) => self.indexOf(value) === index);

  // Remove the UNAVAILABLE time slots from the AVAILABLE time slots
  filteredTimeSlots = initialTimeSlots.filter((slot) => {
    return !unavailableTimeSlots.includes(slot);
  });

  // Return the filtered time slots
  return filteredTimeSlots;
};

export { calculateAge, checkIfAppointmentIsEditable, filterSelectedDaysAvailableSlots, generateTimeSlots };
