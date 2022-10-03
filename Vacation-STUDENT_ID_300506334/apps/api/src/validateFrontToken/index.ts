import { NextFunction, Response, Router } from "express";
import { TypedRequestQuery } from "../admin/vacations";


const validateFrontTokenRouter: Router = Router();



validateFrontTokenRouter.get("/", (  
    req: TypedRequestQuery<{frontToken: string| null}>, 
    res: Response, 
    next: NextFunction
    ) => {
    const { frontToken } = req?.query;
    res.status(200).json({ 
        message: "ok",
        isFrontTokenOk: frontToken === req.currentToken ? true : false,
        role: req.userData.role
        });
        console.log(req.userData.role, req.currentToken)
   return;
});
  


export { validateFrontTokenRouter }

