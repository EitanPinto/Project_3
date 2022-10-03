import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../../store/asyncFunctions/auth";
import { useAppSelector } from "../../../store/hooks";
import { authState } from "../../../store/reducers/authReducer";
import { exeRegistrationSchema } from "../../../store/reducers/helpers/registrationValidator";
import { Loader } from "../../app-components/loader/loader";
import { VacationsState } from "../../../store/reducers/vacationsReducer";
import { store } from "../../../store";
import { icons } from "../../../misc/icons";
import { setPopUpModalAction } from "../../../store/reducers/modalReducer";
import loginPic from "../../../assests/f.jpg"


export function RegistrationPage() {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerState: authState = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
}) => state.authorization);
  const statusOk: boolean = registerState.registrationStatusOk
  const isLoading: boolean = registerState.isLoading
  async function register() {
    try{
    await exeRegistrationSchema().validate({firstName, lastName, userName, password, confirmPassword})
  }
    catch (ex: any){
      console.log(ex)
      let errorText = ex.errors[0]
      if (errorText === (`password must match the following: "/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/"`).toString()){
        errorText = "password must be an alphaNumeric";
      }
      if (errorText === (`userName must match the following: "/^[a-zA-Z0-9]+$/"`).toString()){
        errorText = "password must be an alphaBetical";
      }
      store.dispatch(
        setPopUpModalAction({
          modalActionToggle: true, 
          headerText: `${icons.warning} ${errorText} ${icons.warning}`,
          bodyText: "You can close this window and try again"
        }));
      return;
  }
    // already handled errors before for registeraction
  await registerAction({ 
    firstName, 
    lastName,
    userName,
    password,
    confirmPassword
   });
  }

  useEffect(()=> {
    if(statusOk) {
      navigate("/")
     }
  }, [statusOk])
  
  return (
<section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo"/>
                  <div style={{fontSize: "20px"}}> We are
                    <h4 className="mt-1 mb-5 pb-1">Lotus Global Destinations</h4>
                   <div style={{fontSize: "20px", marginTop: -50}}> Helping your dreams come to life </div>
                  </div>
                </div>
            <Loader isLoading={isLoading}>
                <form style={{marginTop: 50}}>
                  <p>Please register your new account</p>
                  <div className ="form-outline mb-4">
                    <input value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setFirstName(e.target.value) }}
                    type="firstName" className="form-control"
                      placeholder="First Name" />
                    <label className="form-label" >First name</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setLastName(e.target.value) }}
                    type="lastName" className="form-control" 
                    placeholder="Last Name" />
                    <label className="form-label" >Last Name</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setUserName(e.target.value) }}
                    type="email" className="form-control" 
                    placeholder="Username or email address" />
                    <label className="form-label" >Username</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setPassword(e.target.value) }}
                    type="password" className="form-control" 
                    placeholder="Password" />
                    <label className="form-label" >Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setConfirmPassword(e.target.value) }}
                    type="password" className="form-control" 
                    placeholder="Confirm password" />
                    <label className="form-label" >Confirm your password</label>
                  </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button onClick={(): void => { register() }}  
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                    type="button">Register me!</button>
                  </div>
                </form>
              </Loader>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div style={{backgroundImage: `url(${loginPic})`, backgroundSize: "cover", height: "700px", backgroundRepeat: "no-repeat"}}>
              <div className="text-black px-3 py-4 p-md-5 mx-md-4">
              <h3 className="mb-4">We are thrilled that you want to register!</h3>
                <h5 className="mb-4">FYI - We are more than just a company ...</h5>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
