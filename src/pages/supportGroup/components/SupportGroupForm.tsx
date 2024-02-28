import React, { ChangeEvent, useRef, useState } from 'react';
import { InputWithLabel } from '../../../components/Input';
import { useFormik } from 'formik';
import { validationSchema } from '../addSupportGroup/schema/validationSchema';
import { SupportGroupBody, SupportGroupImages } from '../interface';
import ErrorDiv from '../../../components/ErrorDiv';
import { Button } from '../../../components/Button';
import UploadMultiple from '../components/UploadImage';

interface FormProps {
  handleSubmit: (values: SupportGroupBody) => void;
  initialValues: {
    date: string;
    title: string;
    description: string;
    images: Array<File | SupportGroupImages>;
  };
  action: string;
  loading: boolean;
}
const SupportGroupForm: React.FC<FormProps> = ({
  handleSubmit,
  loading,
  action,
  initialValues,
}) => {
  const [images, setImages] = useState<File[] | []>([]);
  const fileListContainerRef = useRef<HTMLDivElement>(null);

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
    validationSchema,
    onSubmit: async (values: SupportGroupBody) => {
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
        <Button type="submit" loading_state={loading} text={action} color="primary" />
      </form>
    </div>
  );
};

export default SupportGroupForm;
