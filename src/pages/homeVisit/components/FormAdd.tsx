import React, { ChangeEvent, useRef } from 'react';
import { useState } from 'react';
import { OnAddBody, OnAddState } from '../interface';
import { useFormik } from 'formik';
import { validationSchema } from '../addHomeVisit/schema/homeVisitSchema';
import { InputWithLabel } from '../../../components/Input';
import ErrorDiv from '../../../components/ErrorDiv';
import { Button } from '../../../components/Button';
import UploadMultiple from '../../supportGroup/components/UploadImage';

interface hVisitFormProps {
  handleSubmit: (values: OnAddBody) => void;
  onAdd: OnAddState;
}
const FormAdd: React.FC<hVisitFormProps> = ({ handleSubmit, onAdd }) => {
  const [images, setImages] = useState<File[]>([]);
  const fileListContainerRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      date: '',
      description: '',
      clientName: '',
      phone: '',
      images: [],
    },
    validationSchema,
    onSubmit: (values: OnAddBody) => {
      handleSubmit(values);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      {/* client name */}
      <div className="flex flex-col gap-2 flex-grow">
        <InputWithLabel
          label="Client name"
          type="text"
          name="clientName"
          id="clientName"
          placeholder="Enter client name"
          value={formik.values.clientName}
          onChange={handleFieldChange}
        />
        {formik.touched.clientName && formik.errors.clientName && (
          <ErrorDiv error={formik.errors.clientName} />
        )}
      </div>
      {/* phone */}
      <div className="flex flex-col gap-2 flex-grow mb-5">
        <InputWithLabel
          label="Phone number"
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter Phone number"
          value={formik.values.phone}
          onChange={handleFieldChange}
        />
        {formik.touched.phone && formik.errors.phone && <ErrorDiv error={formik.errors.phone} />}
      </div>
      {/* date */}
      <div className="flex flex-col gap-2 flex-grow mb-5">
        <InputWithLabel
          label="Date"
          type="date"
          name="date"
          id="date"
          placeholder="Enter Date"
          value={formik.values.date}
          onChange={handleFieldChange}
        />
        {formik.touched.date && formik.errors.date && <ErrorDiv error={formik.errors.date} />}
      </div>
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
      {/* image */}
      <div className="flex flex-col gap-1 flex-grow mb-5">
        <div className="flex gap-2">
          <label className="font-medium">Images</label>
          <span className="text-sm text-gray-400 self-center">(Up to 2 images)</span>
        </div>
        <div className="w-full px-6 pt-3  border bg-white rounded-lg">
          <UploadMultiple images={images} setImages={setImages} formik={formik} />
          {formik.touched.images && formik.errors.images && (
            <ErrorDiv error={formik.errors.images as string} />
          )}
          <div
            className="text-center p-1 text-start text-sm mb-3"
            id="fileList"
            ref={fileListContainerRef}
          ></div>
        </div>
      </div>
      <div className="action gap-10">
        <Button type="submit" loading_state={onAdd.loading} text="Add" color="primary" />
      </div>
    </form>
  );
};

export default FormAdd;
