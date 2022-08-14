import axios, { AxiosError, AxiosResponse } from "axios";
import { icons } from "../../misc/icons";
import { store } from "../index";
import { setLoginLoader } from "../reducers/authReducer";
import { setPopUpModalAction } from "../reducers/modalReducer";
import { setVacations } from "../reducers/vacationsReducer";
import { 
  followVacationService,
  getVacationsService, 
  IVacationFollowPayload, 
  IvacationObjResponse, 
  IvacationsResponse,
  unFollowVacationService
} from "../services/vacationsService";


async function getVacationsAction(page: number, myVacations: boolean): Promise<void> {
    store.dispatch(setLoginLoader(true));
  try {
    const data: IvacationsResponse | undefined= await getVacationsService(page, myVacations);
    if(data) {
    const vacations: Array<IvacationObjResponse> | [] = data.vacations
    store.dispatch(setVacations(vacations));
    }
  } catch (ex: any) {
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.notFound} We identified a problem during the upload of this page's info ${icons.notFound}`,
        bodyText: "You can close this window and try to refresh the page"
      }));
    console.log(ex)
  } finally {
    store.dispatch(setLoginLoader(false));
  }
}

async function followVacationAction(payload: IVacationFollowPayload): Promise<void> {
try {
  const result: AxiosResponse<any, any> | AxiosError<unknown, any>= await followVacationService(payload);
  if(result.status === 200) {
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.heart} You now follow this ad ${icons.heart}`
        }));
  }
  if (axios.isAxiosError(result)) {
    if (result?.response?.status === 409) {
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.unAuthorized} You are already follow this ad ${icons.unAuthorized}`
        }));
    }
    if (result?.response?.status === 400) {
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.notFound} It seems that this ad does not exist ${icons.notFound}`
        }));
    }
    if (result?.response?.status === 500) {
      console.log(result?.response?.status)
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
          bodyText: "You can close this window and try again"
        }));
  }
}
} catch (ex: any) {
  console.log(ex , "main error follow")

  store.dispatch(
    setPopUpModalAction({
      modalActionToggle: true, 
      headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
      bodyText: "You can close this window and try again"
    }));
}
}

async function unFollowVacationAction(payload: IVacationFollowPayload): Promise<void> {
  try {
    const result: AxiosResponse<any, any> | AxiosError<unknown, any>= await unFollowVacationService(payload);
    if(result.status === 200) {
      store.dispatch(
        setPopUpModalAction({
            modalActionToggle: true,
            headerText: `${icons.brokwnHeart} You now do not follow this ad ${icons.brokwnHeart}`
        }));
    }
    if (axios.isAxiosError(result)) {
      if (result?.response?.status === 409) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true,
            headerText: `${icons.unAuthorized} You are already follow this ad ${icons.unAuthorized}`
          }));
      }
      if (result?.response?.status === 400) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.notFound} It seems that this ad does not exist ${icons.notFound}`
          }));
      }
      if (result?.response?.status === 500) {
        console.log(result?.response?.status , "small error unfolloe")

        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
            bodyText: "You can close this window and try again"
          }));
    }
  }
  } catch (ex: any) {
    console.log(ex ,"main error unfollow")
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
        bodyText: "You can close this window and try again"
      }));
  }
  }

  
export {
  getVacationsAction,
  followVacationAction,
  unFollowVacationAction
 }