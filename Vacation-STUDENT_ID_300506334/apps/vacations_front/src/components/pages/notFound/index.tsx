import Button  from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import notFoundGif from '../../../assests/notFound404Gif.gif'
import HomeIcon from '@mui/icons-material/Home';

export function NotFound() {
    const navigate = useNavigate();
    return (<div 
    style={{backgroundImage: `url(${notFoundGif})`, 
    height: "100%", 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingBottom: "800px"
    }}>
        
        <Button onClick={ ()=>{
             navigate("/")
            }
        } style={{marginTop: "100px", marginLeft:"200px"}} variant="outlined" color="error" sx={{ boxShadow: 3 }}>   <HomeIcon />Take Me Back Home Please</Button>
    </div>
    )
}

