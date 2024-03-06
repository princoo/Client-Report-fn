import { Fragment, useEffect, useState } from 'react';
import { HomeVisitData } from '../interface';
import { useAppSelector } from '../../../redux/hooks';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Carousel from '../../../components/Carousel';
import { countryDateFormat } from '../../../utils/formatDate';
import Loader from '../../../components/pageLoader/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMentor } from '../../../utils/user';
import { Button } from '../../../components/Button';
import { useHomeVisits } from '../redux/hooks';
import ConfirmationDialogue from '../../../components/ConfirmationDialogue';
import SnackBar from '../../../components/SnackBar/SnackBar';

export default function SingleHomeVisit(props: {
  homevisitId: string;
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteHVisit: (id: string) => void;
}) {
  const { homevisitId, isOpen, handleClose, handleDeleteHVisit } = props;
  const [homeVisitsBody, sethomeVisits] = useState<HomeVisitData[]>([]);
  const [onAlert, setonAlert] = useState<boolean>(false);
  const { homeVisits } = useAppSelector((state) => state.homevisit);
  const token = useAppSelector((state) => state.token);
  const { removeHomeVisit, onDelete } = useHomeVisits();

  useEffect(() => {
    const filteredHomeVisit = homeVisits.filter((item) => item.id === homevisitId);
    sethomeVisits(filteredHomeVisit);
  }, [homevisitId, homeVisits]);

  async function handleDelete() {
    setonAlert(false);
    const data = await removeHomeVisit(homevisitId);
    if (data) {
      setTimeout(() => {
        handleDeleteHVisit(homevisitId);
      }, 1000);
    }
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Fragment>
      {onDelete.data && (
        <SnackBar orderOpen={true} message="HomeVisit deleted" severity="success" />
      )}
      {onDelete.error && <SnackBar orderOpen={true} message={onDelete.error} severity="error" />}
      {homeVisitsBody.length ? (
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
          PaperProps={{
            style: {
              minWidth: fullScreen ? '100%' : '800px',
              maxWidth: fullScreen ? '100%' : '900px',
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <span className="text-2xl font-medium text-blue-500 capitalize">
              <FontAwesomeIcon icon="house-circle-check" className="me-2 text-4xl" />
              {homeVisitsBody[0].clientName}
            </span>
          </DialogTitle>
          <DialogContent>
            <div className="p-4">
              <Carousel images={homeVisitsBody[0].HVisitImages} />
              <p className="text-sm font-medium mt-6">Event Details:</p>
              <div className="mt-2 grid">
                {isMentor(token.value) && (
                  <span className=" capitalize block text-xs text-gray-500">
                    {homeVisitsBody[0].User.firstName + ' ' + homeVisitsBody[0].User.lastName}
                  </span>
                )}
                <span className="whitespace-nowrap rounded-full py-0.5 text-xs text-gray-600">
                  {countryDateFormat(homeVisitsBody[0].date)}
                </span>
              </div>
              <p className="capitalize mt-0.5 text-gray-900">{homeVisitsBody[0].description}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="btn w-full flex justify-between">
              <div className="action w-20">
                <Button
                  loading_state={onDelete.loading}
                  color="delete"
                  text="Delete"
                  onClick={() => setonAlert(true)}
                />
              </div>

              {!onDelete.loading && (
                <button
                  autoFocus
                  onClick={handleClose}
                  className="bg-blue-500 hover:bg-blue-300 p-2 rounded-lg text-white"
                >
                  {' '}
                  Close
                </button>
              )}
            </div>
          </DialogActions>
        </Dialog>
      ) : (
        <Loader />
      )}
      {onAlert && (
        <ConfirmationDialogue
          onClose={() => setonAlert(false)}
          onAgree={handleDelete}
          Onopen={onAlert}
          item="HomeVisit"
        />
      )}
    </Fragment>
  );
}
