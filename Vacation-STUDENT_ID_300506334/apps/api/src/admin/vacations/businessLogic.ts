import { ISignToken } from "../../auth/signTokenFn";
import { getConnection } from "../../db";
import { toLocal } from "../../helpers/currentDateTimeFn";
import { IcreateVacation } from "../../middlewares/joiValidations";
import { IvacationDB } from "../../vacations/businessLogic";

type Id = number

interface IUpdateVacation {
  id: number;
  description?: string;
  destination?: string;
  image?: string;
  start_date_time?: object;
  end_date_time?: object;
  price_usd?: number;
};

interface IFollowersPerVacationResponseObj {
  destination: string;
  number_of_followers: number;
};

async function updateVacation(
  reqBody: IUpdateVacation,
  reqUserData: ISignToken
  ): Promise<void>{
  //vacation id mandatory 
  // in this function after I have at least one param to update
  const { id, description, destination, image, start_date_time, end_date_time , price_usd } = reqBody;
const updatedDateTime: string = toLocal( new Date()).slice(0, 19).replace('T', ' ')
const arrBodyKeys: Array<string> = Object.keys(reqBody)
const newBody: IUpdateVacation | {} = arrBodyKeys.reduce((accum, key) => {
 if (Boolean(reqBody[key])) accum[key] = reqBody[key];
  return accum;
}, {});
  const paramsArr: Array<any> = Object.values(newBody);
  paramsArr.splice(0, 1);
  paramsArr.push(updatedDateTime, reqUserData.user_name, id);
  console.log(paramsArr);
  const query: string = `UPDATE vacations SET
  ${description ? `description = ? ` : ""}
  ${description &&(destination || image || start_date_time || end_date_time || price_usd)? ", " : ""} 
  ${destination ? `destination = ?` : ""}
  ${destination &&(image || start_date_time || end_date_time || price_usd)? ", " : ""} 
  ${image ? `image = ?` : ""}
  ${image &&(start_date_time || end_date_time || price_usd)? ", " : ""} 
  ${start_date_time ? `start_date_time = ?` : ""}
  ${start_date_time &&(end_date_time || price_usd)? ", " : ""} 
  ${end_date_time ? `end_date_time = ?` : ""}
  ${end_date_time &&(price_usd)?", " : ""} 
  ${price_usd ? `price_usd = ? ` : ""},
  updated_at = ?, updated_by = ?
  where id = ?`
  await getConnection().execute(query, paramsArr);
};

async function createVacation(
  reqBody: IcreateVacation, 
  reqUserData: ISignToken): Promise<void>{
  const { description, destination, image, start_date_time, end_date_time , price_usd} = reqBody;
  const query: string = `insert into vacations (description, destination, image, start_date_time, end_date_time,price_usd, created_by)
   values (?,?,?,?,?,?,?)`;
  const [result]: Array<any> = await getConnection().execute(
    query, [description, destination, image, start_date_time, end_date_time, price_usd, reqUserData.user_name]
    );
  return result;
};

async function getNewVacation(id: Id): Promise<IvacationDB> {
  const query: string = `select 
  id, description, destination, image, start_date_time, end_date_time, price_usd, number_of_followers, updated_at, created_at   
  from vacations where id = ?`
  const [result]: Array<IvacationDB> = await getConnection().execute(query, [id]);
  const newVacation: IvacationDB = result[0];
  return newVacation;
};


async function getIDs(): Promise<Array<Id>> {
  const query: string = "select id from vacations"
  const [results]: Array<{ id: number}>  = await getConnection().query(query);
  if (results instanceof Array) { 
    const idResults: Array<Id> = results.map((idObj:{ id: number}) => idObj.id); 
    return idResults;
  }
};

async function deleteVacation(id: Id): Promise<void> {
  const query: string = `delete from vacations where id = ?`
  await getConnection().execute(query, [id]);
};


async function getFollowersPerVacationFullList (): Promise<Array<IFollowersPerVacationResponseObj> | []> {
  const query: string =
  `select destination, number_of_followers from project_3_schema.vacations where project_3_schema.vacations.number_of_followers > 0`
 const [results]: Array<IFollowersPerVacationResponseObj> | [] = await getConnection().execute(query);
 return results as unknown as Array<IFollowersPerVacationResponseObj> | [];
}



export { 
  getFollowersPerVacationFullList,
  IFollowersPerVacationResponseObj,
  IUpdateVacation,
  createVacation, 
  deleteVacation,
  getNewVacation,
  updateVacation,
  getIDs,
  Id
};

