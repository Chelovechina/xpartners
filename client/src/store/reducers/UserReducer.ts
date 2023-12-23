import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../types/IAuthResponse";

interface IUserState {
  user: { email: string; id: string } | undefined;
}

const initialState: IUserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.user = action.payload.user;
    },
    deleteCredentials: (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
    },
  },
});

export const { setCredentials, deleteCredentials } = userSlice.actions;

export default userSlice.reducer;
