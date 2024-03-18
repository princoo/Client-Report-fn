import * as Yup from 'yup';
import moment from 'moment'; // Import moment library

// Custom validation function to check if the date is in the future
const isFutureDate = (dateString: string | Date) => {
  const userDate = moment(dateString);
  const now = moment();
  return userDate.isValid() && userDate.isAfter(now);
};

export const validationSchema = Yup.object().shape({
  description: Yup.string().min(5, 'Description too short').required('Description is required'),
  dueDate: Yup.date()
    .required('Due date is required')
    .test('is-future-date', 'Due date must be in the future', (value) => isFutureDate(value)),
});
