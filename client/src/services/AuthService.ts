import { ILoginDto } from "../types/ILoginDto";
import { IAuthResponse } from "../types/IAuthResponse";
import { baseApi } from "./BaseService";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<IAuthResponse, any>({
      query: (formData: any) => ({
        url: "/registration",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),
    login: build.mutation<IAuthResponse, ILoginDto>({
      query: (loginDto) => ({
        url: "/login",
        method: "POST",
        body: loginDto,
      }),
      invalidatesTags: ["Users"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } =
  authApi;
