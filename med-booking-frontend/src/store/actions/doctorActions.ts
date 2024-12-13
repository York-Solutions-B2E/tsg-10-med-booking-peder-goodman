import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSpecializationsAndDoctors = createAsyncThunk<any>("doctor/doctors-specializations", async () => {
  const response = await axios.get<AuthCheckResponse>("api/doctors/doctors-specializations", {
    withCredentials: true,
  });

  return response.data;
});

export const getDoctorAvailability = createAsyncThunk<any, number>("doctor/getAvailability", async (doctorId: number) => {
  const response = await axios.get<any>(`api/doctors/get/${doctorId}`, {
    withCredentials: true,
  });

  return response.data;
});

export const createDoctor = createAsyncThunk("doctor/create", async (body: DoctorRequest) => {
  const response = await axios.post<any>("api/doctors/create", body, {
    withCredentials: true,
  });

  return response.data;
});

export const updateDoctor = createAsyncThunk("doctor/update", async (body: DoctorRequest) => {
  const response = await axios.put<any>("api/doctors/edit", body, {
    withCredentials: true,
  });

  return response.data;
});

export const deleteDoctor = createAsyncThunk<any, number>("doctor/cancel", async (doctorId: number) => {
  const response = await axios.put<any>(`api/doctors/delete/${doctorId}`, {
    withCredentials: true,
  });
});
