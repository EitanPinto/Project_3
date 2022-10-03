import { getTokenLS, setTokenLS, clearTokenLS } from "./helpers/LSmanagement";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse } from "../services/authService";

export interface authState {
  isLoading: boolean;
  token: string | null;
  userNameServer: string;
  role: string;
  registrationStatusOk: boolean;
  isFrontTokenOkLogin: boolean;
};
const initialState: authState = {
  isLoading: false,
  token: getTokenLS(),
  userNameServer: "",
  role: "user",
  registrationStatusOk: false,
  isFrontTokenOkLogin: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginLoader: (state: authState, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload;
    },
    setLoginSuccess: (state: authState, action: PayloadAction<ILoginResponse | undefined>): void => {
      if (action?.payload?.token || action?.payload?.userName || action?.payload?.role) {
        const { token, userName, role } = action?.payload
        setTokenLS(token);
        state.token = token;
        state.userNameServer = userName;
        state.role = role;
      }
    },
    setRegisterSuccess: (state: authState, action: PayloadAction<number>): void => {
      if (action.payload === 200) state.registrationStatusOk = true;
    },
    setIsFrontTokenOkOrNotLogin: (state: authState, action: PayloadAction<boolean>): void => {
      state.isFrontTokenOkLogin = action.payload;
    },
    setVerifiedRole: (state: authState, action: PayloadAction<string>): void => {
      state.role = action.payload;
    },
  }
});


export const { 
  setLoginLoader, 
  setLoginSuccess, 
  setRegisterSuccess, 
  setIsFrontTokenOkOrNotLogin, 
  setVerifiedRole 
} = authSlice.actions;
export default authSlice.reducer;



