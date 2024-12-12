import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getSpecializationsAndDoctors = createAsyncThunk<any>(
  "doctor/doctors-specializations",
  async () => {
    const response = await axios.get<AuthCheckResponse>(
      "api/doctors/doctors-specializations",
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const getDoctorAvailability = createAsyncThunk<any, number>(
  "doctor/getAvailability",
  async (doctorId: number) => {
    const response = await axios.get<any>(`api/doctors/get/${doctorId}`, {
      withCredentials: true,
    });

    return response.data;
  }
);
