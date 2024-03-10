import React, { ChangeEvent } from 'react';
import { OnAddBody, OnAddResponse } from '../interface';
import { useFormik } from 'formik';
import { validationSchema } from '../schema/taskSchema';
import ErrorDiv from '../../../components/ErrorDiv';
import { Button } from '../../../components/Button';

interface hVisitFormProps {
  handleSubmit: (values: OnAddBody) => void;
  onAdd: {
    loading: boolean;
    data: OnAddResponse | null;
    error: string | null;
  };
}
const FormAdd: React.FC<hVisitFormProps> = ({ handleSubmit, onAdd }) => {
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema,
    onSubmit: (values: OnAddBody) => {
      handleSubmit(values);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2 flex-grow mb-5">
        <label htmlFor="discussedIssues">Description</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          cols={50}
          placeholder="Enter description"
          value={formik.values.description}
          onChange={handleDescription}
          className="border font-thin border-gray-300 p-3 rounded-xl focus:outline-none  focus:border-blue-500"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <ErrorDiv error={formik.errors.description} />
        )}
      </div>
      <div className="action gap-10">
        <Button type="submit" loading_state={onAdd.loading} text="Add" color="primary" />
      </div>
    </form>
  );
};

export default FormAdd;
