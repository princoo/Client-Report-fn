import React from 'react';
import { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../addReport/schema/ReportSchema';
import { AddReportBody } from '../viewReports/interface';
import { InputWithLabel } from '../../../components/Input';
import ErrorDiv from '../../../components/ErrorDiv';
import { Button } from '../../../components/Button';

interface ReportFormProps {
  handleSubmit: (values: AddReportBody) => void;
  loading: boolean;
  initialValues: AddReportBody;
  action: string;
}

const ReportForm: React.FC<ReportFormProps> = ({
  handleSubmit,
  loading,
  initialValues,
  action,
}) => {
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  const handleDiscussionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values: AddReportBody) => {
      handleSubmit(values);
    },
  });
  return (
    <div>
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
        {/* activty done */}
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <InputWithLabel
            label="Activity done"
            type="text"
            name="activityDone"
            id="activityDone"
            placeholder="Enter activity done"
            value={formik.values.activityDone}
            onChange={handleFieldChange}
          />
          {formik.touched.activityDone && formik.errors.activityDone && (
            <ErrorDiv error={formik.errors.activityDone} />
          )}
        </div>
        <div className="flex flex-col gap-2 flex-grow mb-5">
          <label htmlFor="discussedIssues">Discussed issues</label>
          <textarea
            name="discussedIssues"
            id="discussedIssues"
            rows={4}
            cols={50}
            placeholder="Enter discussed issues"
            value={formik.values.discussedIssues}
            onChange={handleDiscussionChange}
            className="border font-thin border-gray-300 p-3 rounded-xl focus:outline-none  focus:border-blue-500"
          ></textarea>
          {formik.touched.discussedIssues && formik.errors.discussedIssues && (
            <ErrorDiv error={formik.errors.discussedIssues} />
          )}
        </div>
        <div className="action gap-10">
          <Button type="submit" loading_state={loading} text={action} color="primary" />
        </div>
      </form>
    </div>
  );
};
export default ReportForm;
