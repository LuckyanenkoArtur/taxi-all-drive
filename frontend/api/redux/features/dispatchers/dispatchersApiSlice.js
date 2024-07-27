import { apiSlice } from "../../../apiSlice";

export const dispatchersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDispatchers: builder.mutation({
      query: () => ({
        url: "/dispatchers/all",
        method: "GET",
      }),
    }),
    addDispatcher: builder.mutation({
      query: (data) => ({
        url: "/dispatchers/add-dispatcher",
        method: "POST",
        body: { ...data },
      }),
    }),
    editDispatcher: builder.mutation({
      query: (data) => ({
        url: "/dispatchers/edit-dispatcher",
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteDispatcher: builder.mutation({
      query: (data) => ({
        url: "/dispatchers/delete-dispatcher",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetDispatchersMutation,
  useAddDispatcherMutation,
  useEditDispatcherMutation,
  useDeleteDispatcherMutation,
} = dispatchersApiSlice;
