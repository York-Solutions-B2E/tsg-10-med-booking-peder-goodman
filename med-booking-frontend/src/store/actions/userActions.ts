import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { store } from "../store";
import { resetUserState } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const cookies = new Cookies();

export const logoutUser = createAsyncThunk<LogoutResponse>(
  "admin/logoutUser",
  async () => {
    // get the xsrf token from the cookies
    const xsrfToken = cookies.get("XSRF-TOKEN");

    const response = await axios.post<LogoutResponse>("/api/auth/logout", {
      withCredentials: true,
      headers: { "X-XSRF-TOKEN": xsrfToken },
    });

    if (response.status !== 200) {
      console.log("Error logging out: ", response.status);
      throw new Error(`HTTP error! status: ${response.data.message}`);
    } else {
      // handle redirect to home page/ logout page
      window.location.href =
        `${response.data.logoutUrl}?id_token_hint=${response.data.idToken}` +
        `&post_logout_redirect_uri=${window.location.origin}`;
    }

    return response.data;
  }
);

export const checkUserAuthentication = createAsyncThunk<AuthCheckResponse>(
  "user/authenticateUser",
  async () => {
    const response = await axios.get<AuthCheckResponse>("api/auth/check", {
      withCredentials: true,
    });

    console.log("In Check Auth Thunk:", response.data.message);

    return response.data;
  }
);

export const loginAdmin = createAsyncThunk<void>(
  "admin/loginAdmin",
  async () => {
    let port = window.location.port ? ":" + window.location.port : "";

    // set the port to 8080 if it's 3000
    if (port === ":3000") {
      port = ":8080";
    }
    // redirect to the Okta login page (aka an api/<privateRoute>)
    window.location.href = `//${window.location.hostname}${port}/api/auth/login`;
  }
);

export const loginPatient = createAsyncThunk(
  "patient/loginPatient",
  async (body: LoginRequest) => {
    const response = await axios.post<any>(
      "api/patients/login",
      body,
      {
        withCredentials: true,
      }
    );

    console.log("In Patient Login Thunk:", response.data);

    return response.data;
  }
);


