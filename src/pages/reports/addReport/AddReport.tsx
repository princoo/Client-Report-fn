import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Fragment, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AddReportBody, Report } from '../viewReports/interface';
import { useReports } from '../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../../redux/hooks';
import { DialogActions } from '@mui/material';
import { addReports } from '../redux/reportsSlice';
import SnackBar from '../../../components/SnackBar/SnackBar';
import ReportForm from '../components/ReportForm';

export default function AddReport(props: { isOpen: boolean; handleClose: () => void }) {
  const dispatch = useAppDispatch();
  const { isOpen, handleClose } = props;
  const { addReport, isAddError, isAddLoading } = useReports();
  const [addedReport, setAddedreport] = useState<Report | null>(null);

  async function handleAddreport(values: AddReportBody) {
    const data = await addReport(values);
    if (data) {
      dispatch(addReports(data.data)); // add report to slice
      setAddedreport(data.data);
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }
  const initialValues: AddReportBody = {
    clientName: '',
    activityDone: '',
    discussedIssues: '',
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Fragment>
      {isAddError && <SnackBar orderOpen={true} message={isAddError} severity="error" />}
      {addedReport && <SnackBar orderOpen={true} message="Report created" severity="success" />}
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={(_event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            // Set 'open' to false, however you would do that with your particular code.
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
              <FontAwesomeIcon icon="hospital-user" className="me-2 text-4xl" />
              Add Client
            </h1>
            <span className="mb-4 text-sm"></span>
            <ReportForm
              handleSubmit={handleAddreport}
              loading={isAddLoading}
              initialValues={initialValues}
              action="Add Client"
            />
          </div>
        </DialogContent>
        <DialogActions>
          {!isAddLoading && (
            <button className="bg-gray-200 p-2 rounded-xl hover:bg-gray-400" onClick={handleClose}>
              Close
            </button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
