import dayjs, { Dayjs } from "dayjs";

const validateEmail = (email: string) => {
  console.log("email: ", email);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (email && email != "" && email.match(emailPattern)) {
    return true;
  }

  return false;
};

const validateDateIsInPast = (selectedDate: Dayjs | null) => {
  const currentDate = dayjs();

  if (!selectedDate) {
    return false;
  }

  if (selectedDate < currentDate) {
    return true;
  }

  return false;
};

const calculateAge = (date: string | Dayjs) => {
  const today = dayjs();
  const birthdate = dayjs(date);
  return today.diff(birthdate, "year");
};

export { validateDateIsInPast, validateEmail, calculateAge };
