import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "..";
import { icons } from "../../misc/icons";
import { setLoginLoader } from "../reducers/authReducer";
import { exeCreateVacationSchema } from "../reducers/helpers/createVacationValidator";
import { exeUpdateVacationSchema } from "../reducers/helpers/updateVacationValidator copy";
import { setPopUpModalAction } from "../reducers/modalReducer";
import { setVacationsStats } from "../reducers/vacationsReducer";
import { addVacationService, deleteVacationService, getFollowersPerVacationService, IcreateVacationPayload, IFollowersPerVacationResponse, IFollowersPerVacationResponseObj, IupdateVacationPayload, updateVacationService } from "../services/adminService";
import { getVacationsAction } from "./vacations";


async function addVacationAction(payload: IcreateVacationPayload): Promise<void> {
  try{
    await exeCreateVacationSchema().validate(payload)
    }
    catch(ex: any){
      console.log(ex)
      const errorText: string = ex?.errors[0];
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.warning} ${errorText} ${icons.warning}`,
          bodyText: "You can close this window and try again"
        }));
      return;
    }
  store.dispatch(setLoginLoader(true));
  try {
    const createVacationResponse: AxiosResponse<any, any> | AxiosError = await addVacationService(payload);
    if (axios.isAxiosError(createVacationResponse)) {
      if (createVacationResponse?.response?.status === 403) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Vacation failed to be created ${icons.somethingWentWrong}`,
            bodyText: "You can close this window and try again"
          }));
      }
      else {
        console.log("error", createVacationResponse.response)
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
            bodyText: "You can close this window and try again"
          }));
      }
    }
    else if (createVacationResponse.status === 200) {
      const { data } = createVacationResponse
      console.log(data);
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true,
          headerText: `${icons.loginSuccess} Vacation created successfully ${icons.loginSuccess}` 
        }));
        await getVacationsAction(1, false);
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
};


async function deleteVacationAction (id: number): Promise<void> {
   if (typeof(id) !== 'number'){
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.warning} Vacation ID must be a number! ${icons.warning}`,
        bodyText: "You can close this window and try again"
      }));
    return;
   }
  store.dispatch(setLoginLoader(true));
  try {
    const deleteVacationResponse: AxiosResponse<{message: string} ,any> | AxiosError = await deleteVacationService(id);
    if (axios.isAxiosError(deleteVacationResponse)) {
      if (deleteVacationResponse?.response?.status === 401) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.unAuthorized} An unauthroized request ${icons.unAuthorized}`
          }));
          return;
      }
      else if (deleteVacationResponse?.response?.status === 400) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.notFound} Vacation does not exist ${icons.notFound}`,
            bodyText: "You can close this window and try again"
          }));
          return;
      }
      else if (deleteVacationResponse?.response?.status === 403) {
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Delete vacation process failed because something went wrong ${icons.somethingWentWrong}`,
            bodyText: "You can close this window and try again"
          }));
          return;
      }
      else {
        console.log("error", deleteVacationResponse.response)
        store.dispatch(
          setPopUpModalAction({
            modalActionToggle: true, 
            headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
            bodyText: "You can close this window and try again"
          }));
      }
    }
    else if (deleteVacationResponse.status === 200) {
      const { data } = deleteVacationResponse
      console.log(data)
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true,
          headerText: `${icons.loginSuccess} Vacation deleted successfully ${icons.loginSuccess}` 
        }));
        await getVacationsAction(1, false)
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
};



async function updateVacationAction (payload: IupdateVacationPayload): Promise<void> {
  try{
    await exeUpdateVacationSchema().validate(payload)
    }
    catch(ex: any){
      console.log(ex)
      const errorText: string = ex?.errors[0];
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.warning} ${errorText} ${icons.warning}`,
          bodyText: "You can close this window and try again"
        }));
      return;
    }
 store.dispatch(setLoginLoader(true));
 try {
   const updateVacationResponse: AxiosResponse<string ,any> | AxiosError = await updateVacationService(payload);
   if (axios.isAxiosError(updateVacationResponse)) {
     if (updateVacationResponse?.response?.status === 400 || updateVacationResponse?.response?.status === 422) {
       store.dispatch(
         setPopUpModalAction({
           modalActionToggle: true, 
           headerText: `${icons.warning} Missing essential parameters in order to process ${icons.warning}`,
           bodyText: "You can close this window and try again"
         }));
         return;
     }
     else if (updateVacationResponse?.response?.status === 403) {
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.somethingWentWrong} Update vacation process failed because something went wrong ${icons.somethingWentWrong}`,
          bodyText: "You can close this window and try again"
        }));
        return;
    }
     else {
       console.log("error", updateVacationResponse.response)
       store.dispatch(
         setPopUpModalAction({
           modalActionToggle: true, 
           headerText: `${icons.somethingWentWrong} Something Went Wrong ${icons.somethingWentWrong}`, 
           bodyText: "You can close this window and try again"
         }));
     }
   }
   else if (updateVacationResponse.status === 200) {
     const { data } = updateVacationResponse
     console.log(data)
     store.dispatch(
       setPopUpModalAction({
         modalActionToggle: true,
         headerText: `${icons.loginSuccess} Vacation updated successfully ${icons.loginSuccess}` 
       }));
       await getVacationsAction(1, false)
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
};


async function getFollowersPerVacationAction(): Promise<void> {
  store.dispatch(setLoginLoader(true));
  try {
    const data: IFollowersPerVacationResponse | undefined= await getFollowersPerVacationService();
    if (data){
      const vacationStats: Array<IFollowersPerVacationResponseObj> | [] = data.vacationStats;
      store.dispatch(setVacationsStats(vacationStats));
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
};


export {
  addVacationAction,
  deleteVacationAction,
  updateVacationAction,
  getFollowersPerVacationAction
};
