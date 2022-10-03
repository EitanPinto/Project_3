import * as yup from 'yup';

export const exeUpdateVacationSchema = () => {
const updateVacationSchemaObj = yup.object().shape({
    id: yup.number().required(),
    description: yup.string(),
    destination: yup.string().max(45),
    image: yup.string(),
    start_date_time: yup.date(),
    end_date_time: yup.date(),
    price_usd: yup.number()
    });
    return updateVacationSchemaObj;
};


