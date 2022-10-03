import { Router, Request, Response, NextFunction } from "express";
import { TypedRequestQuery } from "../admin/vacations";
import { TypedRequestBody } from "../auth";
import { getGeneralErrorText } from "../helpers/errorTextFns";
import { validateBodyParamsForVacationFollows } from "../middlewares/generalValidations";
import { icons } from "../misc/icons";
import { 
  getNumberOfVacationFollowers, 
  insertNewVacationFollow, 
  removeVacationFollow, 
  addOrRemoveFollower,
  isVacationFollowed, 
  IVacationFollowDB, 
  isVacationExists, 
  IvacationDB,
  getVacations, 
} from "./businessLogic";

const vacationsRouter: Router = Router();

interface IVacationFollowBody {
  vacationId: number;
};

  vacationsRouter.post(
  "/follow", 
  validateBodyParamsForVacationFollows, 
  vacationFollowHandler
  );
  vacationsRouter.post(
  "/un_follow", 
  validateBodyParamsForVacationFollows, 
  vacationUnFollowHandler
  );
  vacationsRouter.get(
  "/", 
  getVacationsHandler
  );

async function vacationFollowHandler(
  req: TypedRequestBody<IVacationFollowBody>, 
  res: Response, 
  next: NextFunction
  ): Promise<void>{
const { vacationId } = req?.body;
const userId: number = req?.userData?.id;
// console.log(userId);
if (!userId) { next(new Error("Missing User ID")); return; };
try {
const vacationExists: IvacationDB | undefined = await isVacationExists(vacationId);
if (!vacationExists) {
  res.status(400).send(`
  <<${icons.somethingWentWrong}>> It Seems That This Vacation Does Not Exists or You were Attempted To Make A Forbidden Action <<${icons.somethingWentWrong}>>
  `);
  return;
};
const vacationFollowed: undefined | IVacationFollowDB = await isVacationFollowed(userId, vacationId)
if (vacationFollowed) {
  res.status(409).send(`
  <<${icons.conflict}>> Vacation ID ${vacationId} Already Been Followed By User ID  ${userId} <<${icons.conflict}>>
  `);
  return;
};
  const numberOfFollowers: number = await getNumberOfVacationFollowers(vacationId)
  await addOrRemoveFollower(numberOfFollowers, vacationId, true)
  await insertNewVacationFollow(userId, vacationId)
  res.status(200).send(`
  <<${icons.loginSuccess}>> Vacation ID ${vacationId} Has been Followed By User ID  ${userId} <<${icons.loginSuccess}>>
  `);
  return;
} catch(ex: unknown){
    console.log(ex)
    res.status(403).send(getGeneralErrorText("Follow Vacation"));
  };
};

async function vacationUnFollowHandler(
  req: TypedRequestBody<IVacationFollowBody>, 
  res: Response, 
  next: NextFunction
  ): Promise<void>{
const { vacationId } = req?.body
const userId: number = req?.userData?.id
if (!userId) { next(new Error("Missing User ID")); return; };
try {
const vacationExists: IvacationDB | undefined = await isVacationExists(vacationId)
if (!vacationExists) {
  res.status(400).send(`
  <<${icons.somethingWentWrong}>> It Seems That This Vacation Does Not Exists or You were Attempted To Make A Forbidden Action <<${icons.somethingWentWrong}>>
  `);
  return;
}
const vacationFollowed: undefined | IVacationFollowDB = await isVacationFollowed(userId, vacationId)
if (!vacationFollowed) {
  res.status(409).send(`
  <<${icons.conflict}>> Vacation ID ${vacationId} Already Been Unfollowed By User ID  ${userId} <<${icons.conflict}>>
  `);
  return;
}
const numberOfFollowers: number = await getNumberOfVacationFollowers(vacationId)
await addOrRemoveFollower(numberOfFollowers, vacationId)
await removeVacationFollow(userId, vacationId)
res.status(200).send(`
<<${icons.loginSuccess}>> Vacation ID ${vacationId} Has been Unfollowed By User ID  ${userId} <<${icons.loginSuccess}>>
`);
return;
}
catch(ex: unknown){
  console.log(ex)
  res.status(403).send(getGeneralErrorText("Un-Follow Vacation"));
};
};


async function getVacationsHandler(
  req: TypedRequestQuery<{ myVacations: string, page: string }>, 
  res: Response, 
  next: NextFunction
  ): Promise<any>{
  const { myVacations, page }= req?.query;
  let myVacationsBoolean: boolean = false;
  if (myVacations === "true") myVacationsBoolean = true;
  const userId: number = req?.userData?.id;
  if (!userId) { next(new Error("Missing User ID")); return; };
  let currentPage: number;
  if(!page) currentPage = 0;
  currentPage = Number(page)
  try {
  const vacationsResults: Array<IvacationDB> | [] = await getVacations(
    currentPage, 
    myVacationsBoolean, 
    userId
    );
    //using forloop insted of reduce because ... reference to -> https://zellwk.com/blog/async-await-in-loops

  // const finalVacationResults = (vacationsResults as any).reduce(async (accum: any[], currentVObj: any) => {
  //   const vacationFollowedResultFn = async () => {
  //     const vacationFollowed: undefined | IVacationFollowDB = await isVacationFollowed(userId, currentVObj["id"]) ;
  //     console.log(vacationFollowed)
  //   return vacationFollowed;
  // }
  // let x;
  // if (vacationFollowedResultFn() === undefined) x = true; else x = false
  //      accum.push({...currentVObj, isVacationFollowed: x})
  //      return accum;
  //    }, []);

  // if(!vacationsResults.length) {
  //   res.status(204).send(`<<${icons.notFound}>> No Vacations To Show <<${icons.notFound}>>`);
  //   return;
  // }

  interface IVacationFollowFinal {
    id: number;
    description: string;
    destination: string;
    image: string;
    start_date_time: object;
    end_date_time: object;
    price_usd: number;
    number_of_followers: number;
    updated_at: object;
    created_at: object;
    isVacationFollowed: boolean;
  }
  const finalVacationArray = async (): Promise<Array<IVacationFollowFinal> | []> => {
    let finalVacationResults = []
    for (let index = 0; index < vacationsResults.length; index++) {
      const currentVObj = vacationsResults[index];
        const vacationFollowed: undefined | IVacationFollowDB = await isVacationFollowed(userId, currentVObj["id"]) ;
        console.log(vacationFollowed)
    finalVacationResults.push({...currentVObj, isVacationFollowed: vacationFollowed ? true : false})
  }
  console.log(finalVacationResults)
  return finalVacationResults;
}
const vacations: Array<IVacationFollowFinal> | []  = await finalVacationArray()
  res.status(200).json({ 
    message: `<<${icons.loginSuccess}>> Get Vacations Success <<${icons.loginSuccess}>>`,
    vacations
    });
  return;
  } catch(ex: unknown){
    console.log(ex)
    res.status(403).send(getGeneralErrorText("Get Vacations"));
  };
};


export {
  IVacationFollowBody,
  vacationsRouter
}
