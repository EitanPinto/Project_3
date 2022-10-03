import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInterceptor";

const primaryPath = "/vacations";

interface IvacationObjResponse {
  id: number;
  description: string;
  destination: string;
  image: string;
  start_date_time: object;
  end_date_time: object;
  price_usd: number;
  number_of_followers: number;
  updated_at: object;
  created_at: object;
  isVacationFollowed: boolean;
};

interface IvacationsResponse {
  message: string;
  vacations: Array<IvacationObjResponse> | [];
};

type vacationsQueryParamPage = number;
type vacationsQueryParamMyVacations = Boolean;

async function getVacationsService(
  page: vacationsQueryParamPage, 
  myVacations: vacationsQueryParamMyVacations,
  ): Promise<IvacationsResponse | undefined>  {
  const results: AxiosResponse<IvacationsResponse, any> | AxiosError = await axiosInstance.get<IvacationsResponse>(
    `${primaryPath}?page=${page}&myVacations=${myVacations}`
    );
    const data: IvacationsResponse | undefined = results.data
  return data;
};

interface IVacationFollowPayload {
  vacationId: number;
};

async function followVacationService(
  payload: IVacationFollowPayload
  ): Promise<AxiosResponse | AxiosError> {
  const result: AxiosResponse | AxiosError = await axiosInstance.post(`${primaryPath}/follow`, payload);
  return result;
};

async function unFollowVacationService(
  payload: IVacationFollowPayload
  ): Promise<AxiosResponse | AxiosError> {
  const result: AxiosResponse | AxiosError = await axiosInstance.post(`${primaryPath}/un_follow`, payload);
  return result;
};

export {
  unFollowVacationService,
  followVacationService,
  getVacationsService
};
export type {
  IVacationFollowPayload,
  IvacationsResponse,
  IvacationObjResponse
};
