import { Fragment } from 'react';
import { Dialog, DialogActions, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnUpdateStates, SGBody } from '../interface';
import UpdateForm from '../components/UpdateForm';

export default function Update(props: {
  isOpen: boolean;
  handleClose: () => void;
  data: SGBody;
  onUpdate: OnUpdateStates;
  handleUpdated: (value: SGBody) => void;
}) {
  const { isOpen, handleClose, data, onUpdate, handleUpdated } = props;
  const initialValues: SGBody = data;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Fragment>
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
              Update Support Group
            </h1>
            <span className="mb-4 text-sm"></span>
            <UpdateForm
              handleSubmit={handleUpdated}
              loading={onUpdate.loading}
              initialValues={initialValues}
              action="Update"
            />
          </div>
        </DialogContent>
        <DialogActions>
          {!onUpdate.loading && (
            <button className="bg-gray-200 p-2 rounded-xl hover:bg-gray-400" onClick={handleClose}>
              Close
            </button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
