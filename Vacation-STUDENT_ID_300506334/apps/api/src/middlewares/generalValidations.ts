import { Router, Request, Response, NextFunction } from "express";
import { TypedRequestBody } from "../auth";
import { icons } from "../misc/icons";
import { IVacationFollowBody } from "../vacations";

const zeroErrorText = "Parameter Must Be Greater Than 0";

function validateBodyParamsForVacationFollows(
    req: TypedRequestBody<IVacationFollowBody>, 
    res: Response, 
    next: NextFunction
    ): void {
    const { vacationId } = req.body
    console.log(typeof(vacationId), vacationId)
    if (!vacationId){            // checks if 0 / NaN / ""
    res.status(422).send(
    `<<${icons.somethingWentWrong}>> Missing Essential Parameters ${vacationId === 0? `- ${zeroErrorText}` : ""} <<${icons.somethingWentWrong}>>`
    ); return; }
    else if (typeof(vacationId) !== typeof(Number(vacationId))) {    // checks if type is different than number
    res.status(400).send(`<<${icons.warning}>> No Match. Vacation ID Must Be a Number. <<${icons.warning}>>`); return; }
    next(); 
};

export { validateBodyParamsForVacationFollows, zeroErrorText };
