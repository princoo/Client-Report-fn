import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Report } from './interface';
import { formatDate, formatTimeAgo } from '../../../utils/formatDate';

export default function SingleReport(props: {
  reportId: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { reportId, isOpen, handleClose } = props;
  const [report, setreport] = useState<Report[]>([]);
  const { reports } = useAppSelector((state) => state.reports);
  useEffect(() => {
    const filteredReport = reports.filter((report) => report.id === reportId);
    setreport(filteredReport);
  }, [reportId, reports]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  if (!report.length) {
    return <p>OOps !!</p>;
  }
  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            minWidth: fullScreen ? '100%' : '600px',
            maxWidth: fullScreen ? '100%' : '700px',
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title capitalize" className="capitalize">
          {report[0].activityDone}
        </DialogTitle>
        <DialogContent>
          <div className="p-4">
            <span className=" capitalize block text-xs text-gray-500">{report[0].clientName}</span>

            <p className="capitalize mt-0.5 text-lg text-gray-900">{report[0].discussedIssues}</p>

            <div className="mt-2 flex flex-wrap gap-1">
              <span className="whitespace-nowrap rounded-full py-0.5 text-xs text-gray-600">
                {formatDate(report[0].createdAt)}
              </span>

              <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-purple-600">
                {formatTimeAgo(report[0].createdAt)}
              </span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            autoFocus
            onClick={handleClose}
            className="bg-blue-500 hover:bg-blue-300 p-2 rounded-lg text-white"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
