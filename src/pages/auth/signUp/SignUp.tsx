import { InputWithLabel } from '../../../components/Input';
import { useFormik } from 'formik';
import { validationSchema } from './Schemas/validationSchema';
import { ChangeEvent, useEffect } from 'react';
// import { Button } from '../../components/Button';
import ErrorDiv from '../../../components/ErrorDiv';
import { Link } from 'react-router-dom';
import { UserFields } from '../interface';
import { useSignUp, useSites } from './redux/hooks';
import SnackBar from '../../../components/SnackBar/SnackBar';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setToken } from '../../../redux/slices/tokenSlice';

export default function SignUp() {
  const { handleSignUp, stats } = useSignUp();
  const sites = useSites();
  const sitesStats = useAppSelector((state) => state.sites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, value } = stats;

  useEffect(() => {
    if (value) {
      dispatch(setToken(value));
    }
  }, [value, sites]);

  async function handleSubmit(values: UserFields) {
    handleSignUp(values);
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
      phone: '',
      site: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values: UserFields) => {
      handleSubmit(values);
    },
  });

  if (value) {
    return (
      <>
        <SnackBar message="Account created successfully" orderOpen={true} severity="success" />
        {navigate('/')}
      </>
    );
  }
  return (
    <div className="w-full lg:w-3/5 border py-3 px-7 md:mx-auto mt-3 rounded-xl">
      {error && <SnackBar message={error} orderOpen={true} severity="error" />}
      <h1 className="text-4xl font-medium text-blue-600">Create an account</h1>
      <span className="text-sm">Simplify your work with Cats Care !</span>

      <form action="" onSubmit={formik.handleSubmit} className="flex flex-col mt-5">
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
              name="phone"
              id="phone"
              placeholder="Enter PhoneNumber"
              value={formik.values.phone}
              onChange={handleFieldChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <ErrorDiv error={formik.errors.phone} />
            )}
          </div>
        </div>
        {/* passwords */}
        <div className="pass flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="flex flex-col gap-2 md:w-1/2">
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
            {sitesStats.value.map((site) => (
              <option key={site.id} value={site.name}>
                {site.name}
              </option>
            ))}
          </select>
          {formik.touched.site && formik.errors.site && <ErrorDiv error={formik.errors.site} />}
        </div>
        <Button type="submit" loading_state={loading} text="Sign Up" color="primary" />
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
