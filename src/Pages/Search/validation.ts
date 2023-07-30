import * as yup from 'yup';

export const searchSchema = yup.object({
    phrase: yup
        .string()
        .required('Phrase is a required field.')
        .min(2, 'Phrase must be at least 2 characters long.'),
    yearStart: yup.date(),
    yearEnd: yup.date(),
});
