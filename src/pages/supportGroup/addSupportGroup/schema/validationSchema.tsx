import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  title: Yup.string()
    .min(5, 'Title too short')
    .max(254, 'Title too long')
    .required('Title is required'),
  description: Yup.string().min(5, 'Description too short').required('Description is required'),
  images: Yup.array()
    .min(1, 'Provide atleast one image')
    .max(2, 'Select only two images')
    .required('Image is required'),
});
export const onUpdatevalidationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  title: Yup.string()
    .min(5, 'Title too short')
    .max(254, 'Title too long')
    .required('Title is required'),
  description: Yup.string().min(5, 'Description too short').required('Description is required'),
});
