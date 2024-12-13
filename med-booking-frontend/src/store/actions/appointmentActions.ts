import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createAppointment = createAsyncThunk<any, AppointmentRequest>("appointment/create", async (body: AppointmentRequest) => {
  const response = await axios.post<any>("api/appointments/create", body, {
    withCredentials: true,
  });

  return response.data;
});

export const updateAppointment = createAsyncThunk<any, Appointment>("appointment/update", async (body: Appointment) => {
  const response = await axios.post<any>("api/appointments/update/details", body, {
    withCredentials: true,
  });

  return response.data;
});

export const cancelAppointment = createAsyncThunk<any, number>("appointment/cancel", async (appointmentId: number) => {
  const response = await axios.get<any>(`api/appointments/cancel/${appointmentId}`, {
    withCredentials: true,
  });

  return response.data;
});
