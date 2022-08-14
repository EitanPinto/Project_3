import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInterceptor";

const primaryPath = "/auth";

interface ILoginPayload {
  userName: string;
  password: string;
};
interface ILoginResponse {
  userName: string;
  message: string;
  token: string;
  role: string;
};
async function loginService(
  payload: ILoginPayload
  ): Promise<AxiosResponse | AxiosError> {
  const result: AxiosResponse | AxiosError = await axiosInstance.post(`${primaryPath}/login`, payload);
  return result;
};

interface IRegisterPayload {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

async function registerService(
  payload: IRegisterPayload
  ): Promise<AxiosResponse | AxiosError> {
  const result: AxiosResponse | AxiosError = await axiosInstance.post(`${primaryPath}/register`, payload);
  return result;
};

interface IverifyTokenResponse {
  isFrontTokenOk: boolean;
  role: string;
  message: string;
};

async function validateFrontTokenLoginService(
  frontToken: string | null
  ): Promise<IverifyTokenResponse> {
  const result: AxiosResponse<any, any> = await axiosInstance.get(`/validate_front_token?frontToken=${frontToken}`);
  const { data } = result;
  console.log(data, "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo data !!!!");
  return data;
};
export {
  validateFrontTokenLoginService,
  loginService,
  registerService
};
export type {
  IRegisterPayload,
  ILoginResponse,
  ILoginPayload
};

  
