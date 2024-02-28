import React from 'react';
import { useEffect, useState } from 'react';
import { useReports } from '../redux/hooks';
import PageNotFound from '../../../components/PageNotFound';
import Loader from '../../../components/pageLoader/loader';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
} from '@mui/material';
import SingleReport from './SingleReport';
import { formatGivenDate } from '../../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddReport from '../addReport/AddReport';
import UpdateReport from '../UpdateReport/UpdateReport';
import moment from 'moment';
import EmptyData from '../../../components/EmptyData';

export default function ViewAllReports() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openUpdateDialog, setUpdateDialog] = useState<boolean>(false);
  const [reportId, setReportId] = useState<string>('');
  const { fetchReports, loading, error, reports } = useReports();
  useEffect(() => {
    fetchReports();
  }, []);

  const formattedDate = moment().format('YYYY-MM-DD'); // get today's date

  function handleSingleReportOpen(id: string) {
    setReportId(id);
    setOpenDialog(true);
  }
  function handleAddReportOpen() {
    setOpenDialog(false);
    setOpenAddDialog(true);
  }
  function handleSingleReportClose() {
    setOpenDialog(false);
    setReportId('');
  }
  function handleAddReportClose() {
    setOpenAddDialog(false);
  }
  function handleUpdateOpen(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    reportId: string
  ) {
    event.stopPropagation();
    setOpenDialog(false);
    setOpenAddDialog(false);
    setUpdateDialog(true);
    setReportId(reportId);
  }
  function handleUpdateClose() {
    setUpdateDialog(false);
    setReportId('');
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <PageNotFound error={error} />;
  }
  return (
    <div>
      <div className="flex justify-between px-2 flex-col md:flex-row mb-10 gap-2 md:gap-0">
        <div className="header flex flex-col">
          <h1 className="text-2xl font-medium text-blue-500">Clients Today</h1>
          <span className="text-sm text-gray-400 m-0 p-0">{formattedDate}</span>
        </div>
        <div className="btn md:self-center ">
          <button
            onClick={handleAddReportOpen}
            className="bg-blue-500 p-2 rounded-lg text-sm text-white cursor:pointer"
          >
            <FontAwesomeIcon icon="add" className="me-2" />
            ADD CLIENT
          </button>
        </div>
      </div>
      {reports.length !== 0 ? (
        <TableContainer component={Paper} sx={{ width: '100%', mb: 2 }}>
          <Table aria-label="reports table">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Activity Done</TableCell>
                <TableCell>Discusses Issues</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.id}
                  onClick={() => handleSingleReportOpen(report.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell className="capitalize">{report.clientName}</TableCell>
                  <TableCell className="max-w-[100px] truncate">{report.activityDone}</TableCell>
                  <TableCell className="max-w-[100px] truncate">{report.discussedIssues}</TableCell>
                  <TableCell>{formatGivenDate(report.createdAt)}</TableCell>
                  <TableCell>
                    <span
                      className="bg-blue-300 hover:text-blue-500 px-3 py-2 rounded-xl cursor-pointer "
                      onClick={(e) => {
                        handleUpdateOpen(e, report.id);
                      }}
                    >
                      <FontAwesomeIcon icon="pen" className="" />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyData items="Clients" />
      )}
      {openDialog && (
        <SingleReport
          isOpen={openDialog}
          handleClose={handleSingleReportClose}
          reportId={reportId}
        />
      )}
      {openAddDialog && <AddReport isOpen={openAddDialog} handleClose={handleAddReportClose} />}
      {openUpdateDialog && (
        <UpdateReport
          isOpen={openUpdateDialog}
          handleClose={handleUpdateClose}
          reportId={reportId}
        />
      )}
    </div>
  );
}
