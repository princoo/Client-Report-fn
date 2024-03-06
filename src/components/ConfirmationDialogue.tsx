import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ConfirmationDialogue(props: {
  onAgree: () => void;
  onClose: () => void;
  Onopen: boolean;
  item: string;
}) {
  const { onAgree, onClose, Onopen, item } = props;
  return (
    <React.Fragment>
      <Dialog
        open={Onopen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // PaperProps={{
        //   style: {
        //     backgroundColor: 'rgba(249, 185, 183,1)',
        //     boxShadow: 'none',
        //   },
        // }}
      >
        <DialogTitle id="alert-dialog-title" className="text-red-600">
          <FontAwesomeIcon icon="trash" className="mr-2 text-3xl" />
          Want to delete this {item} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete, the {item} will be removed permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={onAgree} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
