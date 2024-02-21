import { Button } from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
import ErrorDiv from '../../components/ErrorDiv';
import { useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { validationSchema } from './Schema/loginSchema';
// import { useAppDispatch } from '../../redux/hooks';

type ValuesType = {
  email: string;
  password: string;
};
export default function Login() {
  // const dispatch = useAppDispatch();
  const [isPending, setisPending] = useState(false);

  async function handleSubmit(values: ValuesType) {
    //handles form submition
    // console.log(values);
    return values;
  }
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: ValuesType) => {
      setisPending(true);
      handleSubmit(values);
    },
  });
  return (
    <div className="flex flex-col  w-full lg:w-2/5 md:w-3/5 border py-3 px-7 mx-auto mt-10 rounded-xl">
      <h1 className="text-4xl font-medium text-blue-600">Welcome back</h1>
      <span className="mb-4 text-sm">Login to continue your work</span>

      <form action="" onSubmit={formik.handleSubmit}>
        {/* email /phones */}
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
          {formik.touched.email && formik.errors.email && <ErrorDiv error={formik.errors.email} />}
        </div>
        {/* passwords */}
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <InputWithLabel
            label="password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={handleFieldChange}
          />
          <Link to="/auth/resetPassword" className="text-sm cursor:pointer underline">
            Forgot password?
          </Link>
          {formik.touched.password && formik.errors.password && (
            <ErrorDiv error={formik.errors.password} />
          )}
        </div>
        <Button type="submit" loading_state={isPending} text="Sign In" />
        <p className="text-center mt-2 text-sm">
          Do not have an Account?
          <Link to="/auth/signup" className="text-blue-500 ml-2 cursor:pointer">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
