import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loginAction, validateFrontTokenLogin } from "../../../store/asyncFunctions/auth";
import { useAppSelector } from "../../../store/hooks";
import { exeLoginSchema } from "../../../store/reducers/helpers/loginValidator";
import { Loader } from "../../app-components/loader/loader";
import {useNavigate} from "react-router-dom"
import { authState } from "../../../store/reducers/authReducer";
import { VacationsState } from "../../../store/reducers/vacationsReducer";
import { store } from "../../../store";
import { icons } from "../../../misc/icons";
import { setPopUpModalAction } from "../../../store/reducers/modalReducer";

 
export function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useAppSelector((state: {
    authorization: authState,
    vacations: VacationsState
}) => state.authorization);


  const { isLoading, token, userNameServer, role, isFrontTokenOkLogin} = loginState
  const navigate = useNavigate();
  async function login() {
    try{
    await exeLoginSchema().validate({ userName, password })
    }
    catch (ex: any){
    console.log(ex)
    const errorText = ex.errors[0]
    store.dispatch(
      setPopUpModalAction({
        modalActionToggle: true, 
        headerText: `${icons.warning} ${errorText} ${icons.warning}`, 
        bodyText: "You can close this window and try again"
      }));
    return;
  }
    // already handled errors before for loginaction
    await loginAction({ userName, password });
    await validateFrontTokenLogin()
  }
  if(token !== null && isFrontTokenOkLogin === true){
    console.log(isFrontTokenOkLogin, "isFrontTokenOkLogin")
    return <Navigate to="/" />
  }

  return  (<section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-12">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">Please login to your account</h4>
                </div>
            <Loader isLoading={isLoading}>
                <form>
                  <div className ="form-outline mb-4">
                    <input style={{width: "50%", margin: "auto"}} value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setUserName(e.target.value) }}
                    type="email" className="form-control"
                      placeholder="Username or email address" />
                    <label className="form-label" >Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input style={{width: "50%", margin: "auto"}} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                    { setPassword(e.target.value) }}
                    type="password" className="form-control" 
                    placeholder="Password" />
                    <label className="form-label" >Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button onClick={(): void => { login() }}  
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                    type="button">Log in</button>
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button onClick={(): void => navigate("/registration") }
                    type="button" className="btn btn-outline-danger">Create new</button>
                  </div>
                  <div style={{color: "grey", fontSize: "12px"}}>
                      If by any chance you encounter with Problems with logging in, just navigate to the main page of the website and try from there
                  </div>
                </form>
              </Loader>
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

