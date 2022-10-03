// import * as yup from 'yup';
// import { AnyObject } from 'yup/lib/types';



// export const checkValidUrl = (): yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
// const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
// const validUrlSchema = yup.string().matches(regMatch, "Website should be a valid URL")
//     return validUrlSchema;
// };

// export default async function imageValidator (imageLink: string) {
//     try {
//     //  await checkValidUrl().validate(imageLink)
//     return imageLink
//     }
//     catch(ex){
//         return process.env.PUBLIC_URL + imageLink;
//     }
//     return imageLink;
// };

export{}