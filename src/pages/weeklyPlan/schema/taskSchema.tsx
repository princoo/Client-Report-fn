import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  description: Yup.string().min(5, 'Description too short').required('Description is required'),
});
