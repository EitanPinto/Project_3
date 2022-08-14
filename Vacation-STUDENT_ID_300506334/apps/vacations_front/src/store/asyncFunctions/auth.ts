import axios, { AxiosError, AxiosResponse } from "axios";
import { icons } from "../../misc/icons";
import { store } from "../index";
import { setIsFrontTokenOkOrNotLogin, setLoginLoader, setLoginSuccess, setRegisterSuccess, setVerifiedRole } from "../reducers/authReducer";
import { getTokenLS } from "../reducers/helpers/LSmanagement";
import { setPopUpModalAction } from "../reducers/modalReducer";
import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  loginService,
  registerService,
  validateFrontTokenLoginService,
} from "../services/authService";


async function loginAction(payload: ILoginPayload): Promise<void> {
  let data: undefined | ILoginResponse
  store.dispatch(setLoginLoader(true));
  try {
    const loginResponse: AxiosResponse<any, any> | AxiosError = await loginService(payload);
    if (axios.isAxiosError(loginResponse)) {
      if (loginResponse?.response?.status === 404) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.notFound} We did not find you in our system ${icons.notFound}`,
            bodyText: "You can close this window and try again"
          }));
      }
      if (loginResponse?.response?.status === 401) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.warning} Either your Username or Password are incorrect ${icons.warning}`,
            bodyText: "You can close this window and try again"
          }));
      }
      else {
        //status 500 or 403 // generel axiosError
        console.log("error", loginResponse?.response)
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
            bodyText: "You can close this window and try again"
          }));
      }
    }
    else if (loginResponse.status === 200) {
      data = loginResponse.data;
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true,
          headerText: `${icons.loginSuccess} You Have Logged In ! ${icons.loginSuccess}` 
        }));
      store.dispatch(setLoginSuccess(data));
    }
  }
  catch (ex: any) {
    console.log(ex)
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
        bodyText: "You can close this window and try again"
      }));
  } finally {
    store.dispatch(setLoginLoader(false));
  }
}

async function registerAction(payload: IRegisterPayload): Promise<void> {
  store.dispatch(setLoginLoader(true));
  try {
    const registerResponse: AxiosResponse<any, any> | AxiosError = await registerService(payload);
    if (axios.isAxiosError(registerResponse)) {
      if (registerResponse?.response?.status === 409) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.conflict} We already have a user with this name ${icons.conflict}`,
            bodyText: "Close this window and try a different Username"
          }));
      }
      else {
        console.log("genereal error", registerResponse?.response)
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
            bodyText: "You can close this window and try again"
          }));
      }
    }
    else if (registerResponse.status === 200) {
      console.log(registerResponse.status)
      const registrationStatusOk: number = registerResponse.status;
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true,
          headerText: `${icons.loginSuccess} Great ! you are now registered ${icons.loginSuccess}`,
          bodyText: "You will soon be redirected to our Login page to put your brand new credentials inside" 
        }));
      store.dispatch(setRegisterSuccess(registrationStatusOk));
    }
  } 
  catch (ex: any) {
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
        bodyText: "You can close this window and try again"
      }));
  } finally {
    store.dispatch(setLoginLoader(false));
  }
}

async function validateFrontTokenLogin(): Promise<void> {
try {
  const currentToken: string | null = getTokenLS()
  const data = await validateFrontTokenLoginService(currentToken);
  const { isFrontTokenOk, role } = data
  console.log(isFrontTokenOk, role,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  store.dispatch(setIsFrontTokenOkOrNotLogin(isFrontTokenOk));
  store.dispatch(setVerifiedRole(role));
} catch (ex: any) {
  console.log("front token Validation error fn")
  // store.dispatch(
  //   modalHelperFn(
  //     true, 
  //     `${icons.unAuthorized} You have to Log in to procced ${icons.unAuthorized}`, 
  //     "Close this window and Re-Login")); // ->no need , it will mess up my registered success message ...
}
}


export {
  loginAction,
  registerAction,
  validateFrontTokenLogin,
}