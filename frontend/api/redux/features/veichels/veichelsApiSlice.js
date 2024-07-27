import { apiSlice } from "../../../apiSlice";

export const veichelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVeichelsList: builder.mutation({
      query: () => ({
        url: "/veichels/all",
        method: "GET",
      }),
    }),
    addVeichel: builder.mutation({
      query: (data) => ({
        url: "/veichels/add-veichel",
        method: "POST",
        body: { ...data },
      }),
    }),
    editVeichel: builder.mutation({
      query: (data) => ({
        url: "/veichels/edit-veichel",
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteVeichel: builder.mutation({
      query: (data) => ({
        url: "/veichels/delete-veichel",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetAllVeichelsListMutation,
  useAddVeichelMutation,
  useEditVeichelMutation,
  useDeleteVeichelMutation,
} = veichelsApiSlice;
