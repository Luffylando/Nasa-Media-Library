import * as yup from "yup";

export const searchSchema = yup.object({
    keyword: yup.string().required(),
    yearStart: yup.string(),
    yearEnd: yup.string(),
});

