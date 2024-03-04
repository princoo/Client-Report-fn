import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

interface SnackProps {
  orderOpen: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  severity: any; // error, info, warning , success
}
export default function SnackBar(props: SnackProps) {
  const { orderOpen, message, severity } = props;
  const [open, setOpen] = React.useState(orderOpen);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // message={message}
        action={action}
      >
        <Alert onClose={handleClose} severity={severity} variant="standard" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
