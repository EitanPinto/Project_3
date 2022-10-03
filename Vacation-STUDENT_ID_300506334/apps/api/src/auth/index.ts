import { Router, Request, Response, NextFunction } from "express";
import { validateLoginBody, validateRegistrationBody } from "../middlewares/joiValidations";
import { ISignToken, signToken } from "./signTokenFn";
import { isPasswordMatch } from "./validations";
import { getGeneralErrorText } from "../helpers/errorTextFns";
import { icons } from "../misc/icons";
import { 
  checkIfUserExistsInDB, 
  insertNewUser, 
  getNewUser, 
  IUserDB
} from "./businessLogic";

const authRouter: Router = Router();

interface TypedRequestBody<T> extends Request {
  body: T;
  userData: ISignToken;
};

interface IUserLoginReqBody {
  userName: string;
  password: string;
};

interface IRegisterNewUserReqBody {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

authRouter.post(
  "/login", 
  validateLoginBody,
  loginHandler
  );
  

authRouter.post(
  "/register", 
  validateRegistrationBody, 
  registerHandler
  );


async function loginHandler(
  req: TypedRequestBody<IUserLoginReqBody>, 
  res: Response, 
  next: NextFunction
  ): Promise<void> {
  const { userName, password } = req?.body;
  try {
  const currentUser: IUserDB | undefined = await checkIfUserExistsInDB(userName, true);
  if (!currentUser) {
    res.status(404).send(`<<${icons.notFound}>> User Not Found <<${icons.notFound}>>`);
    return;
};
  if (!isPasswordMatch(currentUser, password)) { 
    res.status(401).send(`
    <<${icons.notAuthorized}>> User Is Not Authorized <<${icons.notAuthorized}>>
    `);
    return;
  };
  const { id, first_name, last_name, user_name, role } = currentUser;
  const token: string = signToken({ id, first_name, last_name, user_name, role });
  res.status(200).json({ 
    userName, 
    message: `<<${icons.loginSuccess}>> Login Success <<${icons.loginSuccess}>>`, 
    token,
    role
  });
} catch(ex: unknown){
  console.log(ex)
  res.status(403).send(getGeneralErrorText("Login"));
};
};


async function registerHandler(
  req: TypedRequestBody<IRegisterNewUserReqBody>, 
  res: Response, 
  next: NextFunction
  ): Promise<void> {
  const { userName } = req.body;
  try{
  const currentUser: IUserDB | undefined = await checkIfUserExistsInDB(userName);
  if (currentUser) {res.status(409).send(`<<${icons.conflict}>> User Already Exist <<${icons.conflict}>>`); return;}
  await insertNewUser(req.body);
  const newUser: IUserDB = await getNewUser(userName);
  res.status(200).send(
    `<<${icons.registerSuccess}>> New User: ${newUser.user_name} Registered successfully <<${icons.registerSuccess}>>`
    );
  return;
  } 
  catch(ex: unknown){
    console.log(ex)
    res.status(403).send(getGeneralErrorText("Registration"));
  };
};


export {
  IRegisterNewUserReqBody,
  IUserLoginReqBody,
  TypedRequestBody,
  authRouter
}

