import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
});
