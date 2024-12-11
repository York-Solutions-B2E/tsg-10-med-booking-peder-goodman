import dayjs, { Dayjs } from "dayjs";
import { DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const calculateAge = (date: string | Dayjs) => {
  const today = dayjs();
  const birthdate = dayjs(date);
  return today.diff(birthdate, "year");
};

export { calculateAge };
