import { apiSlice } from "../../../apiSlice";

export const userprofileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfileDetails: builder.mutation({
      query: () => ({
        url: "/userprofile/",
        method: "GET",
      }),
    }),
    deleteUserProfile: builder.mutation({
      query: (data) => ({
        url: "/userprofile/delete-user/",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetUserProfileDetailsMutation,
  useDeleteUserProfileMutation,
} = userprofileApiSlice;
