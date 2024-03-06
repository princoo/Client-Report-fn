import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  phone: Yup.string().required('PhoneNumber is required'),
  clientName: Yup.string()
    .min(3, 'ClientName short')
    .max(254, 'ClientName too long')
    .required('ClientName is required'),
  description: Yup.string().min(5, 'Description too short').required('Description is required'),
  images: Yup.array()
    .min(1, 'Provide atleast one image')
    .max(1, 'Select only 1 images')
    .required('Image is required'),
});
