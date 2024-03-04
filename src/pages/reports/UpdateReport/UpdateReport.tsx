import { Fragment, useState } from 'react';
import SnackBar from '../../../components/SnackBar/SnackBar';
import { AddReportBody } from '../viewReports/interface';
import { Dialog, DialogActions, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import { useReports } from '../redux/hooks';
import { useAppDispatch } from '../../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReportForm from '../components/ReportForm';
import store from '../../../redux/store';
import { updateReports } from '../redux/reportsSlice';

export default function UpdateReport(props: {
  isOpen: boolean;
  handleClose: () => void;
  reportId: string;
}) {
  const dispatch = useAppDispatch();
  const { updateReport, isUpdateLoading, isUpdateError } = useReports();
  const { isOpen, handleClose, reportId } = props;
  const [updatedReport, setUpdatedreport] = useState<boolean>(false);

  const report = store.getState().reports.reports.filter((report) => report.id === reportId);

  async function handleUpdateReport(values: AddReportBody) {
    setUpdatedreport(false);
    const data = await updateReport(values, reportId);
    if (data) {
      dispatch(updateReports(data[1][0])); // add report to slice
      setUpdatedreport(true);
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { UserId, createdAt, updatedAt, id, ...rest } = report[0];
  const initialValues: AddReportBody = rest;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Fragment>
      {isUpdateError && <SnackBar orderOpen={true} message={isUpdateError} severity="error" />}
      {updatedReport && <SnackBar orderOpen={true} message="Report updated" severity="success" />}
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={(_event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose();
          }
        }}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <div className="flex flex-col  w-full py-1 px-7">
            <h1 className="text-2xl font-medium text-blue-500">
              <FontAwesomeIcon icon="file-pen" className="me-2 text-4xl" />
              Update Client
            </h1>
            <span className="mb-4 text-sm"></span>
            <ReportForm
              handleSubmit={handleUpdateReport}
              loading={isUpdateLoading}
              initialValues={initialValues}
              action="Update Client"
            />
          </div>
        </DialogContent>
        <DialogActions>
          {!isUpdateLoading && (
            <button className="bg-gray-200 p-2 rounded-xl hover:bg-gray-400" onClick={handleClose}>
              Close
            </button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
