import { useEffect, useState } from "react"
import { Button, TextField } from '@mui/material';
import { addVacationAction } from "../../../../store/asyncFunctions/admin";
import { VacationsState } from "../../../../store/reducers/vacationsReducer";
import { authState } from "../../../../store/reducers/authReducer";
import { useAppSelector } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { validateFrontTokenLogin } from "../../../../store/asyncFunctions/auth";
import { store } from "../../../../store";
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

export function AddVacation() {
  const navigate = useNavigate()

  const [description, setDescription] = useState("")
  const [destination, setDestination] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())
  const [price, setPrice] = useState(0)

  const authState: authState = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
  }) => state.authorization);
  const { isFrontTokenOkLogin, role} = authState

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
    placeHolderfn()
  }
  parentFn()
}, [role, isFrontTokenOkLogin]);



    return (
    <div style={{marginTop: "50px"}}>
        <h5> Create a new vacation ad: </h5>
        <div style={{marginTop: "40px"}}>
        <TextField sx={{width: 400}} id="outlined-basic" 
        onChange={(e) => { setDestination(e.target.value) }} label="Destination" variant="outlined" />
        </div>
        <div style={{marginTop: "20px"}}>
        <TextField sx={{width: 400}} id="outlined-basic" 
        onChange={(e) => { setDescription(e.target.value) }} label="Description" variant="outlined" />
        </div>
        <div style={{marginTop: "20px"}}>
        <TextField sx={{width: 400}} id="outlined-basic" 
        onChange={(e) => { setImageUrl(e.target.value) }} label="Image Url" variant="outlined" />
        </div>
        <div style={{marginTop: "20px"}}>
        <TextField sx={{width: 400}} id="outlined-number" 
        type="number" onChange={(e) => { setPrice(Number(e.target.value)) }} label="Price USD" variant="outlined" />
        </div>
        <div style={{marginTop: "20px"}}>
           <div>
           Start Date & Time 
           </div>
           <div>
            <DatePicker
              className="form-control datePicker"
              selected={startDateTime}
              onChange={(value)=>{setStartDateTime(value as Date)} }
              name="selectDate"
              showTimeSelect
              timeIntervals={30}
              timeFormat="HH:mm"
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
                  />
           </div>  
          <div style={{marginTop: "20px"}}>
           End Date & Time
           </div>
           <div>
           <DatePicker
              className="form-control datePicker"
              selected={endDateTime}
              onChange={(value)=>{setEndDateTime(value as Date)} }
              name="selectDate"
              showTimeSelect
              timeIntervals={30}
              timeFormat="HH:mm"
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
                  />           
            </div>     
      </div>
          <Button className="gradient-custom-2" sx={{marginTop: 5}} onClick={() => { 
              addVacationAction({ 
                  destination,
                  description, 
                  image: imageUrl, 
                  start_date_time: startDateTime.toISOString().slice(0, 19).replace('T', ' '),
                  end_date_time: endDateTime.toISOString().slice(0, 19).replace('T', ' '),
                  price_usd: price 
                }) 
              }} variant="contained">
                SUBMIT
              </Button>

    </div>
    )
 }
