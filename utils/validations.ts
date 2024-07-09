import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
});

export const registrationValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!'),
    displayName: Yup.string().min(2, 'Display name must be at least 2 characters'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});
