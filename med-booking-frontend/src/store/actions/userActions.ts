import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const logoutUser = createAsyncThunk<LogoutResponse>(
  "user/logoutUser",
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
