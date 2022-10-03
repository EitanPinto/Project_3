import { Router, Request, Response, NextFunction } from "express";
import { Query } from 'express-serve-static-core';
import { TypedRequestBody } from "../../auth";
import { IcreateVacation, validateCreateVacationBody, validateUpdateVacationBody } from "../../middlewares/joiValidations";
import { icons } from "../../misc/icons";
import { IvacationDB } from "../../vacations/businessLogic";
import { validateQueryParamsForDeleteVacation } from "./validations";
import { zeroErrorText } from "../../middlewares/generalValidations";
import { getUnauthorizedErrorText } from "../../helpers/errorTextFns";
import { ISignToken } from "../../auth/signTokenFn";
import { 
  IUpdateVacation,
  createVacation, 
  deleteVacation,
  getNewVacation,
  updateVacation, 
  getIDs,
  Id,
  getFollowersPerVacationFullList,
  IFollowersPerVacationResponseObj,
} from "./businessLogic";


const adminVacationsRouter: Router = Router();

interface TypedRequestQuery<T extends Query> extends Request {
     currentToken: string;
     userData: ISignToken;
    //  userData: any;
     query: T;
};

adminVacationsRouter.post(
  "/",
  validateCreateVacationBody,
  createVacationHandler
  );
adminVacationsRouter.delete(
  "/", 
  deleteVacationHandler
  );
adminVacationsRouter.put(
  "/",
  validateUpdateVacationBody,
  updateVacationHandler
  );

adminVacationsRouter.get(
"/",
getFollowersPerVacationFullListHandler
);

const adminTitle = "admin"

async function updateVacationHandler(
  req: TypedRequestBody<IUpdateVacation>, 
  res: Response,
  next: NextFunction
  ): Promise<void> {
    const { role } = req.userData;
    if (role !== adminTitle) {
      res.status(401).send(getUnauthorizedErrorText());
      return;
    };
    const { id } = req.body;
    //vacation id mandatory 
    console.log(typeof(id), id)
    if (!id){            // checks if 0 / NaN / ""
    res.status(422).send(
    `<<${icons.somethingWentWrong}>> Missing Essential Parameters ${id === 0? `- ${zeroErrorText}` : ""} <<${icons.somethingWentWrong}>>`
    ); return; }
    else if (typeof(id) !== typeof(Number(id))) {    // checks if type is different than number
    res.status(400).send(`<<${icons.warning}>> No Match. Vacation ID Must Be a Number. <<${icons.warning}>>`); return; }
    const bodyValuesArrIncId = Object.values(req.body)
    const checkExistingParamsArr = bodyValuesArrIncId.filter(p=> p)
    console.log(checkExistingParamsArr," checkExistingParamsArr")
    if ( checkExistingParamsArr.length <= 1) {
      res.status(400).send(`<<${icons.warning}>> Missing Essential Parameters - Should have Sent At Least One Parameter To Update <<${icons.warning}>>`); return; }
  try {
    await updateVacation(req.body, req.userData);
    res.status(200).send(
  `<<${icons.registerSuccess}>> Vacation ID No. ${id} Updated successfully <<${icons.registerSuccess}>>`
  );
  }
  catch(ex: unknown){
    console.log(ex)
    res.status(403).send(
      `<<${icons.somethingWentWrong}>> Vacation Failed To Be Updated <<${icons.somethingWentWrong}>>`
    );
};
};

async function createVacationHandler(
  req: TypedRequestBody<IcreateVacation>, 
  res: Response,
  next: NextFunction
  ): Promise<void> {
  const { role } = req.userData;
  if (role !== adminTitle) {
    res.status(401).send(getUnauthorizedErrorText());
    return;
  };
  try {
    const newVacationResult: any = await createVacation(req.body, req.userData);
    const newVacation: IvacationDB = await getNewVacation(newVacationResult?.insertId);
    res.status(200).send(
  `<<${icons.registerSuccess}>> New Vacation ID No: ${newVacation.id} To ${newVacation.destination} Uploaded successfully <<${icons.registerSuccess}>>`
  );
  }
  catch(ex: unknown){
    console.log(ex)
    res.status(403).send(
      `<<${icons.somethingWentWrong}>> New Vacation Failed To Be Created <<${icons.somethingWentWrong}>>`
    );
};
};


async function deleteVacationHandler(
  req: TypedRequestQuery<{ id: string }>, 
  res: Response,
  next: NextFunction
  ): Promise<void>{
  const { role } = req.userData;
  if (role !== adminTitle) {
    res.status(401).send(getUnauthorizedErrorText());
    return;
  };
  const id: number = validateQueryParamsForDeleteVacation(req, res);
  const idsArrDB: Array<Id> = await getIDs();
  const results: undefined | Array<Id> = idsArrDB.filter((idDB)=> idDB === id);
  if (!results[0]){
    res.status(400).send(
      `<<${icons.warning}>> ID ${id} Does Not Exists In DB ! <<${icons.warning}>>`
  ); return; }
  try {
    await deleteVacation(id);
    res.status(200).json({ message: `<<${icons.loginSuccess}>> Vacation ${id} Removed <<${icons.loginSuccess}>>`});
  }
  catch(ex: unknown){
    console.log(ex);
    res.status(403).send(
      `<<${icons.somethingWentWrong}>> Vacation ${id} Was Not Removed <<${icons.somethingWentWrong}>>`
    );
};
};

async function getFollowersPerVacationFullListHandler (  
  req: Request, 
  res: Response, 
  next: NextFunction
  ): Promise<void> {
try{
const vacationStats: Array<IFollowersPerVacationResponseObj> | [] = await getFollowersPerVacationFullList();
res.status(200).json({ 
  message: `<<${icons.loginSuccess}>> Fetched vacations stats successfully <<${icons.loginSuccess}>>`,
  vacationStats
});
}
catch(ex: unknown){
  console.log(ex);
  res.status(500).send(
    `<<${icons.somethingWentWrong}>> Failed to fetch stats due to an unkonwn error <<${icons.somethingWentWrong}>>`
  );
}
};



export {
  adminVacationsRouter,
  TypedRequestQuery
};


  