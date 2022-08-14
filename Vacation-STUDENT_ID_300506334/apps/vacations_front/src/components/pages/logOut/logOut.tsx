import { useNavigate } from "react-router-dom"
import { icons } from "../../../misc/icons"
import { store } from "../../../store"
import { clearTokenLS } from "../../../store/reducers/helpers/LSmanagement"
import { setPopUpModalAction } from "../../../store/reducers/modalReducer"



export default function LogOut () {

    const navigate = useNavigate()
    
    const logOut = async () => {
        clearTokenLS()
        navigate("/login")
        // regreshing the page again after navigate refresh the state within the login page and then it gets out to login page again...
        window.location.reload();
            store.dispatch(
                setPopUpModalAction({
                  modalActionToggle: true, 
                  headerText: `${icons.loginSuccess} You logged out successfully ${icons.loginSuccess}`,
                }));  
    }
    const cancelLogOut = async () => {
        navigate("/")
    }


    return <div>
        <div className="firstTextDivLogout">
        We hate to see you leave ...
        </div>
        <div className="secondTextDivLogout">
        Are you sure you want to log out ?
        </div>
        <div style={{marginTop:"20px"}}>
        <div className="text-center pt-1 mb-5 pb-1 firstDivButtonLogout">
              <button onClick={cancelLogOut} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                type="button" style={{ width:"180px"}} >
                Cancel and go home
              </button>
        </div>
        <div className="text-center pt-1 mb-5 pb-1 secondDivButtonLogout">
            <button onClick={logOut}  className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
               type="button" style={{ width:"180px"}} >
                Yes, log me out
            </button>
        </div>
        </div>
    </div>
}