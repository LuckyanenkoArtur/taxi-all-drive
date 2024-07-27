import { apiSlice } from "../../../apiSlice";

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientsList: builder.mutation({
      query: () => ({
        url: "/clients/all",
        method: "GET",
      }),
    }),
    addClient: builder.mutation({
      query: (data) => ({
        url: "/clients/add-client",
        method: "POST",
        body: { ...data },
      }),
    }),
    editClient: builder.mutation({
      query: (data) => ({
        url: "/clients/edit-client",
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteClient: builder.mutation({
      query: (data) => ({
        url: "/clients/delete-client",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetAllClientsListMutation,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} = clientsApiSlice;
