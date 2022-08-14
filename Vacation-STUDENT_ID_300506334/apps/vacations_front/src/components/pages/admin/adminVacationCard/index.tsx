import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { updateVacationAction } from '../../../../store/asyncFunctions/admin';
import { IvacationObjResponse } from '../../../../store/services/vacationsService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

export default function AdminVacationsCard(props: { 
  vacationObj: IvacationObjResponse, 
  deleteVacationAction: Function, 
  }) {

    const { 
      id, description, destination, image, 
      start_date_time, end_date_time, price_usd, 
      number_of_followers, updated_at, created_at, 
    } = props.vacationObj;

    const commonStyles = {
      borderColor: 'text.primary',
      m: 1,
      border: 1,
      width: '3rem',
      height: '3rem'
    };
    
    const [isUpdateModeOn, setIsUpdateModeOn] = useState(false)
    const [localDescription, setLocalDescription] = useState("")
    const [localDestination, setLocalDestination] = useState("")
    const [localImageUrl, setLocalImageUrl] = useState("")
    const [localStartDateTime, setLocalStartDateTime] = useState(new Date())
    const [localEndDateTime, setLocalEndDateTime] = useState(new Date())
    const [localPrice, setLocalPrice] = useState(0)

    const divRef = useRef<HTMLDivElement>(null);
    
  return (
    <Card className='mainAdminCardContainer' 
    onMouseEnter={()=>{divRef?.current?.classList.add("divDateMessage")}}
    onMouseLeave={()=>{divRef?.current?.classList.remove("divDateMessage")}}>
      <CardContent>
        <div style={{textAlign: "center"}}>
        <div onClick={()=>{ props.deleteVacationAction(id) }} 
        className='deleteDivButton'>
        <DeleteIcon/>
        </div>
        <div onClick={()=>{ setIsUpdateModeOn(!isUpdateModeOn) }} 
        className='editDivButton'>
        <EditIcon/>
        </div>
        </div>
        {isUpdateModeOn? 
        <div style={{marginTop: "10px", height: "50px"}}>
        <TextField sx={{width: {sm: 200},"& .MuiInputBase-root": {height: 40}}} id="outlined-basic" 
        onChange={(e) => {setLocalDestination(e.target.value) }} label="Edit destination" variant="outlined" />
        </div> : <Typography sx={{ fontSize: 23 }} color="text.secondary" gutterBottom>
        {destination}
        </Typography>}
        {isUpdateModeOn?
        <div style={{marginTop: "5px"}}>
        <TextField sx={{width: {sm: 200},"& .MuiInputBase-root": {height: 40}}} id="outlined-number" 
        type="number" onChange={(e) => {setLocalPrice(Number(e.target.value))  }} label="Edit price tag (USD)" variant="outlined" />
        </div> :
        <Typography sx={{ fontSize: 20 }} variant="body2">
          {`${price_usd}$`}
        </Typography>}
        {isUpdateModeOn?
        <div style={{marginTop: "10px"}}>
        <TextField sx={{width: {sm: 200},"& .MuiInputBase-root": {height: 60}}} id="outlined-basic" 
        onChange={(e) => {setLocalDescription(e.target.value) }} label="Edit ad's info" variant="outlined" />
        </div> : <><div style={{fontSize: "15px"}}> Usefull info: </div>
        <Typography sx={{ fontSize: 18 }} component="div">
        {description}
        </Typography>
        </>}
        {isUpdateModeOn?
        <div style={{marginTop: "10px"}}>
        <TextField sx={{width: {sm: 200},"& .MuiInputBase-root": {height: 40}}} id="outlined-basic" 
        onChange={(e) => {setLocalImageUrl(e.target.value) }} label="Edit image url" variant="outlined" />
        </div> :
        <img src={image} alt="N/A" height="200px" width="250px" />}
        {isUpdateModeOn? 
        <div style={{marginTop: "5px"}}>
        <div>
        Edit start Date & Time 
        </div>
        <div>
         <DatePicker
           className="form-control datePickerAdminPage"
           selected={localStartDateTime}
           onChange={(value)=>{setLocalStartDateTime(value as Date)} }
           name="selectDate"
           showTimeSelect
           timeIntervals={30}
           timeFormat="HH:mm"
           timeCaption="time"
           dateFormat="MMMM d, yyyy h:mm aa"
               />
        </div>  
        </div> :
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Starts at <br />
           {JSON.stringify(start_date_time).slice(1, 20).replace('T', ' ')}
        </Typography>}
        {isUpdateModeOn?
         <div style={{marginTop: "5px"}}>
          <div>
           Edit end Date & Time
           </div>
           <div>
           <DatePicker
              className="form-control datePickerAdminPage"
              selected={localEndDateTime}
              onChange={(value)=>{setLocalEndDateTime(value as Date)} }
              name="selectDate"
              showTimeSelect
              timeIntervals={30}
              timeFormat="HH:mm"
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              />           
          </div>
        </div> :
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Ends at  <br />
          {JSON.stringify(end_date_time).slice(1, 20).replace('T', ' ')}
        </Typography>}
        {isUpdateModeOn?
        <div style={{marginTop: "10px"}}>
        <div style={{color: "grey", fontSize: "15px"}}>
          Finished editing ?
        </div>
        <div style={{color: "grey", fontSize: "10px"}}> Go ahead and submit the button below </div>
        <Button className="gradient-custom-2" sx={{marginTop: 3, marginBottom: 4}} onClick={() => {
                  updateVacationAction({ 
                  id,
                  description: localDescription, 
                  destination: localDestination,
                  image: localImageUrl, 
                  start_date_time: localStartDateTime.toISOString().slice(0, 19).replace('T', ' '),
                  end_date_time: localEndDateTime.toISOString().slice(0, 19).replace('T', ' '),
                  price_usd: localPrice 
                })   
         }} variant="contained">
                SUBMIT
        </Button>
        <div ref={divRef} className="divDateMessageBlocked">
          If a new date is not chosen for either the start or end of the vacation, the default time presented on each of them will be submitted as if you would asked to submit it !         
        </div>
        </div> : ""
        }
        <div style={{marginTop: "20px"}}>
        <Typography sx={{ fontSize: 10 }} color="text.secondary">
        This ad updated at {JSON.stringify(updated_at).slice(1, 20).replace('T', ' ')}        
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="text.secondary">
        Ad first created at {JSON.stringify(created_at).slice(1, 20).replace('T', ' ')}        
        </Typography>
        <div style={{marginTop: "20%"}}>
        <label style={{marginRight: "100%"}} > folowers: </label>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Box className="gradient-custom-2 innerBoxAdminCard"  
          sx={{ ...commonStyles, borderRadius: '50%' }} >
          {number_of_followers}
          </Box>
        </Box>
        </div>
       </div> 
      </CardContent>
      <CardActions>
    </CardActions>
    </Card>
  );
}

