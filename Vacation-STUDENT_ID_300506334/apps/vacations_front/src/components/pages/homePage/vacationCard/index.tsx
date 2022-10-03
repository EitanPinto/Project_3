import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IvacationObjResponse } from '../../../../store/services/vacationsService';


export default function BasicCard(props: { 
  vacationObj: IvacationObjResponse, 
  followAction: Function, 
  unFollowAction: Function
}) {

    const { 
      id, description, destination, image, 
      start_date_time, end_date_time, price_usd, 
      number_of_followers, updated_at, created_at, 
      isVacationFollowed
    } = props.vacationObj;

    const commonStyles = {
      borderColor: 'text.primary',
      m: 1,
      border: 1,
      width: '3rem',
      height: '3rem'
    };


  return (
    <Card className="vacationCardMain">
      {isVacationFollowed ? <Button onClick={() => { 
      props.unFollowAction(id);
    }} 
      variant="outlined" color="error"  
      sx={{ fontSize: 10, marginLeft:"75%" }}  size="small">
       unfollow
     </Button> :
     <Button onClick={() => { 
      props.followAction(id);
    }} 
      variant="outlined" color="error"  
      sx={{ fontSize: 10, marginLeft:"75%" , backgroundColor: "pink"}}  size="small">
       follow
     </Button>}
      <CardContent>
        <Typography sx={{ fontSize: 23 }} color="text.secondary" gutterBottom>
        {destination}
        </Typography>
        <Typography sx={{ fontSize: 20 }} variant="body2">
          {`${price_usd}$`}
        </Typography>
        <div style={{fontSize: "15px"}}> Usefull info: </div>
        <Typography sx={{ fontSize: 18 }} component="div">
        {description}
        </Typography>
        <img src={image} alt="N/A" height="200px" width="250px" /> 
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Starts at <br />
           {JSON.stringify(start_date_time).slice(1, 20).replace('T', ' ')}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Ends at  <br />
          {JSON.stringify(end_date_time).slice(1, 20).replace('T', ' ')}
        </Typography>
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
          <Box className="gradient-custom-2 innerBoxVacationCard"  
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
