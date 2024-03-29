import FormAdd from '../components/FormAdd';
import { HomeVisitData, OnAddBody } from '../interface';
import { useHomeVisits } from '../redux/hooks';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DialogActions } from '@mui/material';
import SnackBar from '../../../components/SnackBar/SnackBar';

export default function Add(props: {
  handleClose: () => void;
  isOpen: boolean;
  handleAddNewData: (data: HomeVisitData) => void;
}) {
  const { isOpen, handleClose, handleAddNewData } = props;
  const { onAdd, addHomeVisit } = useHomeVisits();

  const handleSubmit = (values: OnAddBody) => {
    addHomeVisit(values);
  };
  if (onAdd.data) {
    handleClose();
    handleAddNewData(onAdd.data);
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Fragment>
      {onAdd.error && <SnackBar orderOpen={true} message={onAdd.error} severity="error" />}
      {onAdd.data && <SnackBar orderOpen={true} message="HomeVisit created" severity="success" />}
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
              <FontAwesomeIcon icon="handshake" className="me-2 text-4xl" />
              Add HomeVisit
            </h1>
            <span className="mb-4 text-sm"></span>
            <FormAdd handleSubmit={handleSubmit} onAdd={onAdd} />
          </div>
        </DialogContent>
        <DialogActions>
          {!onAdd.loading && (
            <button className="bg-gray-200 p-2 rounded-xl hover:bg-gray-400" onClick={handleClose}>
              Close
            </button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
