import { getConnection } from "../db";

interface IvacationDB {
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
};

interface IVacationFollowDB {
  id: number;
  user_id: number;
  vacation_id: number;
};

async function insertNewVacationFollow(
  userId: number, 
  vacationId: number
  ): Promise<void> {
  const query: string = `INSERT INTO vacations_followers (user_id, vacation_id) VALUES (?, ?);`;
  const result = await getConnection().execute(query, [userId, vacationId]);
};

async function removeVacationFollow(
  userId: number, 
  vacationId: number
  ): Promise<void> {
  const query: string = `DELETE FROM vacations_followers WHERE user_id = ? and vacation_id = ?`;
  const result = await getConnection().execute(query, [userId, vacationId]);
};


async function isVacationFollowed(
  userId: number, 
  vacationId: number
  ): Promise<IVacationFollowDB | undefined> {
  const query: string = `SELECT * FROM vacations_followers where user_id=? and vacation_id = ?`;
  const [result]: [] | Array<IVacationFollowDB> = await getConnection().execute(query, [userId, vacationId]);
  return result[0];
};


async function isVacationExists(
  vacationId: number
  ): Promise<IvacationDB | undefined> {
  const query: string = `select * from vacations where id = ?`;
  const [result]: [] | Array<IvacationDB> = await getConnection().execute(query, [vacationId]);
  return result[0];
};


async function getNumberOfVacationFollowers (
  vacationId: number
  ): Promise<IvacationDB["number_of_followers"]>{
  const query: string = `select number_of_followers from vacations where id = ?`;
  const [result]: Array<{ number_of_followers: number }>= await getConnection().execute(query, [vacationId]);
  return result[0]?.number_of_followers;
};

async function addOrRemoveFollower (
  numberOfFollowers: number, 
  vacationId: number, 
  add: boolean = false): Promise<void>{
  add ? numberOfFollowers++ : numberOfFollowers--
  const query: string = `UPDATE vacations SET number_of_followers = ? WHERE id = ?`;
  await getConnection().execute(query, [numberOfFollowers, vacationId]);
};

async function getVacations(
  page: number, 
  showMyVacations: boolean, 
  userId: number
  ): Promise<[] | Array<IvacationDB> > {
  let currentPage: number;
  !page ? currentPage = 0 : currentPage = (page - 1) * 10
  let query: string = `select 
  id, description,destination,image,start_date_time, end_date_time, price_usd, number_of_followers, updated_at, created_at  
  from vacations order by start_date_time desc limit 10 offset ?`
  let paramsArr: Array<number | string> = [`${currentPage}`]
  if (showMyVacations){
    query = `select 
    id, description, destination, image, start_date_time, end_date_time, price_usd,number_of_followers, updated_at, created_at 
    from (
      SELECT description, destination, image, start_date_time, end_date_time, price_usd,number_of_followers, user_id, 
      vacations.id, updated_at, created_at
      FROM vacations
      JOIN vacations_followers ON vacations.id=vacations_followers.vacation_id ) as a 
    where a.user_id = ? order by start_date_time desc limit 10 offset ?`;
    paramsArr = [userId, `${currentPage}`];  // <- offset type string
  }
  const [results]: [] | Array<IvacationDB>  = await getConnection().execute(query, paramsArr);
  // below is ts cant handle diffrent types of return values from a function , it thinks that 
  // there maybe different return type than array
  return results as any;
};

export { 
  getNumberOfVacationFollowers,
  insertNewVacationFollow,
  removeVacationFollow,
  addOrRemoveFollower,
  isVacationFollowed,
  IVacationFollowDB,
  isVacationExists,
  getVacations,
  IvacationDB
};