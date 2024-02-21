import { InputWithLabel } from '../../components/Input';
import { useFormik } from 'formik';
import { validationSchema } from './Schemas/validationSchema';
import { ChangeEvent, useState } from 'react';
import { Button } from '../../components/Button';
import ErrorDiv from '../../components/ErrorDiv';
import { Link } from 'react-router-dom';

type ValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  site: string;
  password: string;
  confirmPassword: string;
};
export default function SignUp() {
  const [isPending, setisPending] = useState(false);

  async function handleSubmit(values: ValuesType) {
    //handles form submition
    // console.log(values);
  }
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  const handleSiteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      site: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values: ValuesType) => {
      setisPending(true);
      handleSubmit(values);
    },
  });
  return (
    <div className="w-full lg:w-3/5 border py-3 px-7 md:mx-auto mt-3 rounded-xl">
      <h1 className="text-4xl font-medium text-blue-600">Create an account</h1>
      <span className="mb-6 text-sm">Simplify your work with Cart Care !</span>

      <form action="" onSubmit={formik.handleSubmit} className="flex flex-col">
        {/* names */}
        <div className="names flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="flex flex-col gap-2 flex-grow">
            <InputWithLabel
              label="First name"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={formik.values.firstName}
              onChange={handleFieldChange}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <ErrorDiv error={formik.errors.firstName} />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <InputWithLabel
              label="Last name"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={formik.values.lastName}
              onChange={handleFieldChange}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <ErrorDiv error={formik.errors.lastName} />
            )}
          </div>
        </div>
        {/* email /phones */}
        <div className="phone flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="flex flex-col gap-2 flex-grow">
            <InputWithLabel
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={handleFieldChange}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorDiv error={formik.errors.email} />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <InputWithLabel
              label="Phone number"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter PhoneNumber"
              value={formik.values.phoneNumber}
              onChange={handleFieldChange}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <ErrorDiv error={formik.errors.phoneNumber} />
            )}
          </div>
        </div>
        {/* passwords */}
        <div className="pass flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="flex flex-col gap-2 w-1/2">
            <InputWithLabel
              label="password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={handleFieldChange}
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorDiv error={formik.errors.password} />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <InputWithLabel
              label="Confirm password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re enter password"
              value={formik.values.confirmPassword}
              onChange={handleFieldChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <ErrorDiv error={formik.errors.confirmPassword} />
            )}
          </div>
        </div>
        {/* site */}
        <div className="flex flex-col gap-2 mb-7">
          <label className="mt-3 text-sm font-medium">Operation site</label>
          <select
            className="p-3 rounded-xl border border-gray-300 focus:outline-none  focus:border-blue-500"
            value={formik.values.site}
            onChange={handleSiteChange}
            id="site"
          >
            <option value="option1" id="1">
              Option 1
            </option>
            <option value="option2" id="2">
              Option 2
            </option>
            <option value="option3" id="3">
              Option 3
            </option>
          </select>
          {formik.touched.site && formik.errors.site && <ErrorDiv error={formik.errors.site} />}
        </div>
        <Button type="submit" loading_state={isPending} text="Sign Up" />
        <p className="text-sm text-center mt-2">
          Already have an Account?
          <Link to="/auth/login" className="text-blue-500 ml-2 cursor:pointer">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
