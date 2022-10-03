import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInterceptor";

const primaryPath = "/admin_vacations";

interface IcreateVacationPayload {
    description: string;
    destination: string;
    image: string;
    start_date_time: string; 
    end_date_time: string;
    price_usd: number;
};

interface IupdateVacationPayload {
  id: number;
  description?: string;
  destination?: string;
  image?: string;
  start_date_time?: string; 
  end_date_time?: string;
  price_usd?: number;
};

interface IFollowersPerVacationResponseObj {
  destination: string;
  number_of_followers: number;
};

interface IFollowersPerVacationResponse{
  message: string;
  vacationStats: Array<IFollowersPerVacationResponseObj> | [];
}


async function addVacationService(
  payload: IcreateVacationPayload
  ): Promise<AxiosResponse<string,any> | AxiosError>  {
  const results: AxiosResponse<string,any> | AxiosError = await axiosInstance.post<string>(primaryPath, payload);
  return results;
};

async function deleteVacationService(
  id: number
  ): Promise<AxiosResponse<{message: string},any> | AxiosError>  {
  const results: AxiosResponse<{message: string} ,any> | AxiosError = await axiosInstance.delete<{message: string}>(
    `${primaryPath}?id=${id}`);
  console.log(results,results.data);
  return results;
};

async function updateVacationService(
  paylod: IupdateVacationPayload
  ): Promise<AxiosResponse<string,any> | AxiosError>  {
  const results: AxiosResponse<string, any> | AxiosError = await axiosInstance.put<string>(primaryPath, paylod);
  console.log(results,results.data);
  return results;
};

async function getFollowersPerVacationService(): 
Promise<IFollowersPerVacationResponse | undefined> {
  const results: AxiosResponse<IFollowersPerVacationResponse, any> | AxiosError = 
  await axiosInstance.get<IFollowersPerVacationResponse>(primaryPath);
   const data: IFollowersPerVacationResponse | undefined = results.data
   return data;
};

export {
  getFollowersPerVacationService,
  addVacationService,
  deleteVacationService,
  updateVacationService
};
export type {
  IFollowersPerVacationResponseObj,
  IFollowersPerVacationResponse,
  IcreateVacationPayload,
  IupdateVacationPayload
};

