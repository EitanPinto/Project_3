import { Response } from "express";
import { TypedRequestQuery } from ".";
import { zeroErrorText } from "../../middlewares/generalValidations";
import { icons } from "../../misc/icons";

function validateQueryParamsForDeleteVacation(
    req: TypedRequestQuery<{ id: string }>, 
    res: Response<any, Record<string, any>>): number {
    let { id } = req?.query
    if (!id){
    res.status(422).send(
    `<<${icons.somethingWentWrong}>> Missing Essential Parameters <<${icons.somethingWentWrong}>>`
    ); return; };
    const vacationId = Number(id);
    const nanError: string = `- Parameters ${vacationId} !`
    if (!vacationId){
    res.status(422).send(
    `<<${icons.somethingWentWrong}>> Missing Essential Parameters ${vacationId === 0? `- ${zeroErrorText}` : nanError} <<${icons.somethingWentWrong}>>`
    ); return; }
    return vacationId;
};

export { validateQueryParamsForDeleteVacation };