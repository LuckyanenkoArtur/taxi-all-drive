import { apiSlice } from "../../../apiSlice";

export const driversApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDriversList: builder.mutation({
      query: () => ({
        url: "/drivers/all",
        method: "GET",
      }),
    }),
    addDriver: builder.mutation({
      query: (data) => ({
        url: "/drivers/add-driver",
        method: "POST",
        body: { ...data },
      }),
    }),
    editDriver: builder.mutation({
      query: (data) => ({
        url: "/drivers/edit-driver",
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteDriver: builder.mutation({
      query: (data) => ({
        url: "/drivers/delete-driver",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetAllDriversListMutation,
  useAddDriverMutation,
  useEditDriverMutation,
  useDeleteDriverMutation,
} = driversApiSlice;
