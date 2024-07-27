import { apiSlice } from "../../../apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.mutation({
      query: () => ({
        url: "/orders/all",
        method: "GET",
      }),
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/add-order",
        method: "POST",
        body: { ...data },
      }),
    }),
    editOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/edit-order",
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/delete-order",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetOrdersMutation,
  useAddOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
} = ordersApiSlice;
