import Joi from "joi";
import { Response, NextFunction } from "express";
import { IUpdateVacation } from "../admin/vacations/businessLogic";
import { 
  IRegisterNewUserReqBody, 
  IUserLoginReqBody, 
  TypedRequestBody 
} from "../auth";

interface IcreateVacation {
  description: string;
  destination: string;
  image: string;
  start_date_time: object;
  end_date_time: object;
  price_usd: number;
}

function exeLoginSchema(): Joi.ObjectSchema<IUserLoginReqBody> {
const commonLoginSchema: Joi.StringSchema = Joi.string().min(1).required()
const loginSchema: Joi.ObjectSchema<IUserLoginReqBody> = Joi.object({
  userName: commonLoginSchema,
  password: commonLoginSchema
});
return loginSchema;
}

function validateLoginBody(
  req: TypedRequestBody<IUserLoginReqBody>, 
  res: Response, 
  next: NextFunction
  ): void {
  const { error } = exeLoginSchema().validate(req.body);
  if (error) return next(new Error(error.message));
  next();
}

function exeRegistrationSchema(): Joi.ObjectSchema<IRegisterNewUserReqBody> {
const commonRegistrationSchema: Joi.StringSchema = Joi.string().alphanum().min(1).max(20).required()
const registrationSchema: Joi.ObjectSchema<IRegisterNewUserReqBody>= Joi.object({
  firstName: commonRegistrationSchema,
  lastName: commonRegistrationSchema,
  userName: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
  confirmPassword: Joi.ref('password')
});
return registrationSchema;
}


function validateRegistrationBody(
  req: TypedRequestBody<IRegisterNewUserReqBody>, 
  res: Response, 
  next: NextFunction
  ): void {
  const { error } = exeRegistrationSchema().validate(req.body);
  if (error) return next(new Error(error.message));
  next();
}


function exeCreateVacationSchema(): Joi.ObjectSchema<IcreateVacation>{
  const vacationSchema: Joi.ObjectSchema<IcreateVacation> = Joi.object({
      description: Joi.string().allow("").required(),
      destination: Joi.string().max(45).required(),
      image: Joi.string().allow("").required(),
      start_date_time: Joi.date().required(),
      end_date_time: Joi.date().required(),
      price_usd: Joi.number().required(),
  });
  return vacationSchema;
}


function validateCreateVacationBody(
  req: TypedRequestBody<IcreateVacation>, 
  res: Response, 
  next: NextFunction
  ): void {
  const { error } = exeCreateVacationSchema().validate(req.body)
  if (error) return next(new Error(error.message))
  next()
}

function exeUpdateVacationSchema(): Joi.ObjectSchema<IcreateVacation>{
  const vacationSchema: Joi.ObjectSchema<IcreateVacation> = Joi.object({
      id: Joi.number(),
      description: Joi.string().allow(""),
      destination: Joi.string().max(45).allow(""),
      image: Joi.string().allow(""),
      start_date_time: Joi.date(),
      end_date_time: Joi.date(),
      price_usd: Joi.number()
  });
  return vacationSchema;
}


function validateUpdateVacationBody(
  req: TypedRequestBody<IUpdateVacation>, 
  res: Response, 
  next: NextFunction
  ): void {
  const { error } = exeUpdateVacationSchema().validate(req.body)
  if (error) return next(new Error(error.message))
  next()
}

export {
  validateCreateVacationBody,
  validateUpdateVacationBody,
  validateRegistrationBody,
  validateLoginBody,
  IcreateVacation
}