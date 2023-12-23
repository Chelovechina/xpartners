import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IFormState {
  email: string;
  password: string;
  day: string;
  year: number;
  month: { value: string; title: string };
  gender: {
    value: "male" | "female";
    title: string;
  };
  name: string;
  isModalOpen: boolean;
}

const initialState: IFormState = {
  email: "",
  password: "",
  day: "01",
  year: 2000,
  month: { value: "01", title: "Январь" },
  gender: {
    value: "male",
    title: "Мужской",
  },
  name: "",
  isModalOpen: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.day = ("0" + action.payload).slice(-2);
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setMonth: (
      state,
      action: PayloadAction<{ value: string; title: string }>
    ) => {
      state.month = action.payload;
    },
    setGender: (
      state,
      action: PayloadAction<{ value: "male" | "female"; title: string }>
    ) => {
      state.gender = action.payload;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    clearAll: (state) => {
      state.name = "";
      state.isModalOpen = false;
      state.gender = { value: "male", title: "Мужской" };
      state.month = { value: "01", title: "Январь" };
      state.day = "01";
      state.year = 2000;
      state.email = "";
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setGender,
  setDay,
  setYear,
  setMonth,
  setIsModalOpen,
  clearAll,
} = formSlice.actions;

export default formSlice.reducer;
