import dayjs, { Dayjs } from "dayjs";

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (email && email != "" && email.match(emailPattern)) {
    return true;
  }

  return false;
};

const validateDateIsInPast = (selectedDateTime: Dayjs | null) => {
  const currentDateTime = dayjs();
  const isSelectedDateInThePast = selectedDateTime?.isBefore(currentDateTime, "day");

  // if empty string false
  if (selectedDateTime === null) {
    return false;
  }

  //  if selected date is in the past true
  if (isSelectedDateInThePast) {
    return true;
  }

  // if selected date is today true
  return false;
};

const validateDateIsInFuture = (selectedDate: Dayjs | null) => {
  const currentDateTime = dayjs();
  const isSelectedDateInThePast = selectedDate?.isAfter(currentDateTime, "day");
  const isSelectedDateToday = selectedDate?.isSame(currentDateTime, "day");

  // if empty string false
  if (selectedDate === null) {
    return false;
  }

  // if selected date is in the future, true
  if (isSelectedDateInThePast) {
    return true;
  }

  // if selected date is today, true
  if (isSelectedDateToday) {
    return true;
  }

  // if selected date is in the past, false
  return false;
};

const validateTimeIsInFuture = (selectedDateTime: Dayjs | null) => {
  const currentDateTime = dayjs();

  // if null, false
  if (selectedDateTime === null) {
    return false;
  }

  if (selectedDateTime.isAfter(currentDateTime.endOf("hour"))) {
    return true;
  }

  return false;
};

export { validateDateIsInFuture, validateDateIsInPast, validateEmail, validateTimeIsInFuture };
