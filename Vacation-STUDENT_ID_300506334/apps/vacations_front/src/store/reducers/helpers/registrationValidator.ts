import * as yup from 'yup';

export const exeRegistrationSchema = () => {
const commonRegistrationSchema = yup.string().matches(/^[a-zA-Z0-9]+$/).min(1).max(20).required();
const registrationSchemaObj = yup.object().shape({
    firstName: commonRegistrationSchema,
    lastName: commonRegistrationSchema,
    userName: yup.string().matches(/^[a-zA-Z0-9]+$/).min(5).max(30).required(),
    password: yup.string().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).required(),
    confirmPassword: yup.string().test('passwords-match', 'Passwords must match!', function (value) {
            return this.parent.password === value     
            })
        });
    return registrationSchemaObj;
};

