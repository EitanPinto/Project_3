import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { authState } from "../../../store/reducers/authReducer";
import { VacationsState } from "../../../store/reducers/vacationsReducer";
import { followVacationAction, getVacationsAction, unFollowVacationAction } from "../../../store/asyncFunctions/vacations";
import { IvacationObjResponse } from "../../../store/services/vacationsService";
import { Loader } from "../../app-components/loader/loader";
import BasicCard from "./vacationCard";
import { Button } from "@mui/material";
import { validateFrontTokenLogin } from "../../../store/asyncFunctions/auth";
import { Checkbox } from '@mui/material';
import { pink } from '@mui/material/colors';
import vacationsBackgorundImg from "../../../assests/mainWallpaper.jpg"


export default function HomePage() {
  const [pageNum, setPageNum] = useState(1);
  const [checked, setChecked] = useState(false);
  const defualtMarkingText: string = "Mark the box to view vacations you Follow"
  const [markingText, setMarkingText] = useState(defualtMarkingText);


  const authState: authState = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
  }) => state.authorization);
  const { token, isFrontTokenOkLogin, isLoading } = authState

  const vacations: Array<IvacationObjResponse> | [] = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
  }) => state.vacations.vacations)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setPageNum(1)
    markingText === "Mark the box to view vacations you Follow" ?
    setMarkingText("Mark again to view all vacations") :
    setMarkingText(defualtMarkingText)
  };

  useEffect(() => {
    console.log(vacations, token, isFrontTokenOkLogin)
    if (isFrontTokenOkLogin) getVacationsAction(pageNum, checked)
    validateFrontTokenLogin()
  }, []);

  useEffect(() => {
    getVacationsAction(pageNum, checked)
  }, [checked]);

  return isFrontTokenOkLogin === false ? <Navigate to="/login" /> :
    (<div style={{backgroundImage: `url(${vacationsBackgorundImg})`, 
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: 'center'
    }}>
      <div style={{paddingTop:"30px", fontFamily:"sans-serif"}}><h3> Our vacations </h3> </div>
      <div style={{marginTop:"10px", fontFamily:"sans-serif"}}><h5> Updating all the time! </h5> </div>
      <div style={{marginLeft: "50%"}}> {markingText}
      <Checkbox 
      checked={checked} 
      onChange={handleChange} 
      inputProps={{ 'aria-label': 'controlled' }} 
      sx={{ 
        '& .MuiSvgIcon-root': { fontSize: 40 },  
        color: pink[800],
        '&.Mui-checked': {color: pink[600],}} }/>
      </div>
      <Loader isLoading={isLoading}>
        <>
        {vacations.map((v: IvacationObjResponse) => (
          <BasicCard vacationObj={v}
          followAction={async (id: number) => {
            await followVacationAction({vacationId: id});
            await getVacationsAction(pageNum, checked)
          }}
          unFollowAction={async (id: number) => {
            await unFollowVacationAction({vacationId: id});
            await getVacationsAction(pageNum, checked)
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
          await getVacationsAction(pageNum - 1, checked)
        }} autoFocus>
          Go Back
        </Button>}
       
        {!vacations.length ? "" : <Button 
        className="gradient-custom-2" 
        style={{ color: "white",fontSize: "10px", marginLeft: pageNum < 2 ? "auto": "3%"}} 
        onClick={async () => {
          setPageNum(pageNum + 1);
          await getVacationsAction(pageNum + 1, checked)
        }} autoFocus>
          Next Page
        </Button>}
      </div>
    </div>
    );
}
