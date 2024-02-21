import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,}$/;

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'first name must be atleast 3 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'last name must be atleast 3 characters')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid phone number') // Assuming a 10-digit phone number
    .required('Phone number is required'),
  site: Yup.string().required('site name is required'),

  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain 6 characters containing uppercase letter(s), lowercase letter(s), a number and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
