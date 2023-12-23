import { baseApi } from "./BaseService";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], undefined>({
      query: () => ({
        url: "/people",
      }),
      providesTags: ["Users"],
    }),
    updateUser: build.mutation<string, any>({
      query: (formData) => ({
        url: "/account",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useFetchAllUsersQuery, useUpdateUserMutation } = userApi;
