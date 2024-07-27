import { apiSlice } from "../../../apiSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registNewUser: builder.mutation({
      query: (data) => ({
        url: "/regist/",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useRegistNewUserMutation } = registrationApiSlice;
