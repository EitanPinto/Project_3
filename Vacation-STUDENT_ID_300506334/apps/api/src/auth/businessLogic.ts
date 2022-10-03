import { IRegisterNewUserReqBody } from ".";
import { getConnection } from "../db";

interface IUserDB {
id: number;
first_name: string;
last_name: string;
user_name: string;
password: string;
role: string;
created_at: object;
};

async function checkIfUserExistsInDB(userName: string, login: boolean = false): Promise<IUserDB | undefined> {
  const queryTextUserLogin: string = "order by users.created_at DESC limit 1"
  const query: string = `SELECT * FROM users WHERE user_name = ? ${ login ? queryTextUserLogin : "" }`;
  console.log(query);
  const [result]: Array<IUserDB> | [] = await getConnection().execute(query, [userName]);
  return result[0];
};

async function insertNewUser(newUserObj: IRegisterNewUserReqBody): Promise<void> {
  const { firstName, lastName, userName, password } = newUserObj;
  const query: string = `INSERT INTO users (first_name, last_name, user_name, password) VALUES (?,?,?,?);`;
  const [dbSuccessObj]: Array<any> = await getConnection().execute(query, [firstName, lastName, userName, password]);
};

async function getNewUser(userName: string): Promise<IUserDB> {
const query: string = `select * from users where user_name = ?`
const [result]: Array<IUserDB> = await getConnection().execute(query, [userName]);
return result[0];
};


export {
  checkIfUserExistsInDB,
  insertNewUser,
  getNewUser,
  IUserDB
};