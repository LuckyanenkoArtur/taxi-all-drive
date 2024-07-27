import { apiSlice } from "../../../apiSlice";

export const autocompletesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientsList: builder.mutation({
      query: () => ({
        url: "/autocompletes/clients",
        method: "GET",
      }),
    }),
    getVeichelsList: builder.mutation({
      query: () => ({
        url: "/autocompletes/vechels",
        method: "GET",
      }),
    }),
    getDriversList: builder.mutation({
      query: () => ({
        url: "/autocompletes/drivers",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetClientsListMutation,
  useGetVeichelsListMutation,
  useGetDriversListMutation,
} = autocompletesApiSlice;
