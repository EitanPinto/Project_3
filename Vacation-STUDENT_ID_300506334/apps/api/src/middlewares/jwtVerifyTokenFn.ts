import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ISignToken } from "../auth/signTokenFn";



// or chage the request to ... req: TypedRequestBody<ISignToken>  ...
// you can also change the response to be someting<t> extends response { ... } 
interface CustomRequestVerifyToken<T> extends Request {
  userData: T;
  currentToken: string;
}

function verifyToken(
  req: CustomRequestVerifyToken<ISignToken>, 
  res: Response , 
  next: NextFunction): void {
  const token: string = req?.headers?.authorization;
  jwt.verify(token, process.env.TOKEN_SECRET, (err: Error, decoded: JwtPayload) => {
    if (err) {
      next({ ...err, status: 401 });
      return;
    } else {
      req.userData = decoded?.userData;
      req.currentToken = token;
      next();
      return;
    }
  });
}

export {
  verifyToken,
  CustomRequestVerifyToken
}
