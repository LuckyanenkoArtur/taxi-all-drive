import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  logOut,
  setCredentials,
} from "./redux/features/authentication/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token;
    if (endpoint !== "login") {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    const refreshToken = getState().auth.refreshToken;
    if (refreshToken) {
      headers.set("Cookie", `refreshToken=${refreshToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials(...refreshResult.data, user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
