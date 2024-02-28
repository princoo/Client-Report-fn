import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(3, 'Client name must be atleast 3 characters')
    .max(30, ' Client name too long')
    .required('Client name is required'),
  activityDone: Yup.string()
    .min(5, 'Activity done must be atleast 5 characters')
    .max(254, 'Activity done too long')
    .required('Activity done is required'),
  discussedIssues: Yup.string()
    .min(5, 'Discussed issues must be atleast 5 characters')
    .required('Discussed issues are required'),
});
