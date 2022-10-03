import * as yup from 'yup';

export const exeCreateVacationSchema = () => {
const createVacationSchemaObj = yup.object().shape({
    destination: yup.string().min(2).max(45).required(),
    description: yup.string().max(20).required(),
    image: yup.string().required(),
    start_date_time: yup.date().required(),
    end_date_time: yup.date().required(),
    price_usd: yup.number().min(50).required()
    });
    return createVacationSchemaObj;
};

