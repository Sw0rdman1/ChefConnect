import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const registrationValidationFirstStep = Yup.object().shape({
    email: Yup.string().email('Invalid email adress!').required('Email is required'),
    displayName: Yup.string().min(2, 'Display name must be at least 2 characters').required('Display name is required'),
});


export const registrationValidationSecondStep = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Password confirmation is required'),
});

export const editProfileValidation = Yup.object().shape({
    displayName: Yup.string().min(2, 'Display name must be at least 2 characters').required('Display name is required'),
});

export const resetPasswordValidation = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match').required('Password confirmation is required'),
});
