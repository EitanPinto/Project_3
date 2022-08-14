import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getTokenLS } from "../reducers/helpers/LSmanagement";


const axiosInstance: AxiosInstance = axios.create({ baseURL: "http://localhost:3500" });

axiosInstance.interceptors.request.use((request: any) => {
  request.headers.authorization =  getTokenLS();
  return request;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, 
  (error: AxiosError) => {
    console.log(error , "inside the interceptor");
    //////////// check if network error (object below ) with no status .. or ... check if this modal in this place will take and handle all the errors like the ones in login
//     AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}
// code: "ERR_NETWORK"
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// message: "Network Error"
// name: "AxiosError"
// request: XMLHttpRequest {data: undefined, onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, …}
// response: XMLHttpRequest {data: undefined, onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, …}
// [[Prototype]]: Error
    // openModalError(....................);
    return error;
  }
);


export default axiosInstance;
