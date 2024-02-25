import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain 6 characters containing uppercase letter(s), lowercase letter(s), a number and special character'
    )
    .required('Password is required'),
});
