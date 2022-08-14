import { IUserDB } from "./businessLogic";

export function isPasswordMatch(user: IUserDB, password: string): boolean {
  console.log(user, password);
  return user.password === password;
};

