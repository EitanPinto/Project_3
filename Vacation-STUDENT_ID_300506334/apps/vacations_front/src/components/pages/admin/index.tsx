import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store";
import { deleteVacationAction } from "../../../store/asyncFunctions/admin";
import { validateFrontTokenLogin } from "../../../store/asyncFunctions/auth";
import { getVacationsAction } from "../../../store/asyncFunctions/vacations";
import { useAppSelector } from "../../../store/hooks";
import { authState } from "../../../store/reducers/authReducer";
import { VacationsState } from "../../../store/reducers/vacationsReducer";
import { IvacationObjResponse } from "../../../store/services/vacationsService";
import { Loader } from "../../app-components/loader/loader";
import AdminVacationsCard from "./adminVacationCard";


export default function AdminPage() {
  const navigate = useNavigate()

  const authState: authState = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
  }) => state.authorization);
  const { isLoading , isFrontTokenOkLogin , role} = authState
  
  const vacations: Array<IvacationObjResponse> | [] = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
  }) => state.vacations.vacations)

  const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
      const parentFn = async () => {
      const placeHolderfn = async () => {
        await validateFrontTokenLogin()
        const state = store.getState()
        const localRole = state.authorization.role
        const localIsFrontTokenOkLogin = state.authorization.isFrontTokenOkLogin
      if(localIsFrontTokenOkLogin === false || localRole !== 'admin'){
      navigate("/login")
      }
    } 
      await placeHolderfn()
      await getVacationsAction(pageNum, false)
  }
    parentFn()
    // console.log( token, isFrontTokenOkLogin, role, "after")
}, [role, isFrontTokenOkLogin]);


  return (
  <div>
   <h5 style={{marginTop: "50px"}}>Administrator</h5>
   <div>
   <Button 
        className="gradient-custom-2" 
        style={{marginLeft:"70%", marginTop:"20px", color:"white"}}
        onClick={(): void => {
          if(isFrontTokenOkLogin === true || role == 'admin'){
          navigate("/addVacation") 
          }}} autoFocus>
          Add a new vacation 
    </Button>
   </div>
      <Loader isLoading={isLoading}>
        <>
        {vacations.map((v: IvacationObjResponse) => (
          <AdminVacationsCard vacationObj={v}
          deleteVacationAction={(id: number) => {
          deleteVacationAction(id)
          }}
          />
        ))}
        </>
      </Loader>
      <div style={{ marginTop: "20px"}}>
        {pageNum < 2 ? "" : <Button 
        className="gradient-custom-2" 
        style={{ color: "white",fontSize: "10px", marginRight: !vacations.length? "auto" : "3%"}} 
        onClick={async () => {
          setPageNum(pageNum - 1);
          await getVacationsAction(pageNum - 1, false)
        }} autoFocus>
          Go Back
        </Button>}
       
        {!vacations.length ? "" : <Button 
        className="gradient-custom-2" 
        style={{ color: "white",fontSize: "10px", marginLeft: pageNum < 2 ? "auto": "3%"}} 
        onClick={async () => {
          setPageNum(pageNum + 1);
          await getVacationsAction(pageNum + 1, false)
        }} autoFocus>
          Next Page
        </Button>}
      </div>
    </div>)
}
