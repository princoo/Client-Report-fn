import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { SGBody } from '../interface';
import { onUpdatevalidationSchema } from '../addSupportGroup/schema/validationSchema';
import { InputWithLabel } from '../../../components/Input';
import ErrorDiv from '../../../components/ErrorDiv';
import { Button } from '../../../components/Button';

interface FormProps {
  handleSubmit: (values: SGBody) => void;
  initialValues: {
    date: string;
    title: string;
    description: string;
  };
  action: string;
  loading: boolean;
}
const UpdateForm: React.FC<FormProps> = ({ handleSubmit, loading, action, initialValues }) => {
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: onUpdatevalidationSchema,
    onSubmit: async (values: SGBody) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit} className="mt-6">
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <InputWithLabel
            label="Date"
            type="date"
            name="date"
            id="date"
            placeholder="Date"
            value={formik.values.date}
            onChange={handleFieldChange}
          />
          {formik.touched.date && formik.errors.date && <ErrorDiv error={formik.errors.date} />}
        </div>
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <InputWithLabel
            label="Title"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={handleFieldChange}
          />
          {formik.touched.title && formik.errors.title && <ErrorDiv error={formik.errors.title} />}
        </div>
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            cols={60}
            placeholder="Enter description"
            value={formik.values.description}
            onChange={handleDescriptionChange}
            className="border font-thin border-gray-300 p-3 rounded-xl focus:outline-none  focus:border-blue-500"
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <ErrorDiv error={formik.errors.description} />
          )}
        </div>
        <Button type="submit" loading_state={loading} text={action} color="primary" />
      </form>
    </div>
  );
};

export default UpdateForm;
