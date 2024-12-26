import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSpecializationsAndDoctors = createAsyncThunk<any>("doctor/doctors-specializations", async () => {
  const response = await axios.get<any>("api/doctors/doctors-specializations", {
    withCredentials: true,
  });

  console.log("doctors are: ", response.data.doctors);

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

export const deactivateDoctor = createAsyncThunk<any, number>("doctor/deactivate", async (doctorId: number) => {
  const response = await axios.put<any>(`api/doctors/deactivate/${doctorId}`, {
    withCredentials: true,
  });
});

export const activateDoctor = createAsyncThunk<any, number>("doctor/activate", async (doctorId: number) => {
  const response = await axios.put<any>(`api/doctors/activate/${doctorId}`, {
    withCredentials: true,
  });
});