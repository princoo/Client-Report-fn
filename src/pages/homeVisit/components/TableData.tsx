import { useState } from 'react';
import { HomeVisitData } from '../interface';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
} from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { countryDateFormat } from '../../../utils/formatDate';
import store from '../../../redux/store';
import filteredColumns from '../../../utils/tableColumns';
import { isMentor } from '../../../utils/user';
import SingleHomeVisit from '../singleHomeVisit/SingleHomeVisit';
import { useAppDispatch } from '../../../redux/hooks';
import { removeHomeVisitReducer } from '../redux/HomeVisitSlice';

export default function TableData(props: { columns: Array<string>; data: HomeVisitData[] }) {
  const { columns, data } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [HvisitId, setHvisitId] = useState<string>('');
  const dispatch = useAppDispatch();
  const token = store.getState().token;
  const filteredColums = filteredColumns(columns, ['Actions'], ['Cats'], token.value || '');

  function handleSingleHvisitOpen(id: string) {
    setHvisitId(id);
    setOpenDialog(true);
  }
  function handleSingleHvisitClose() {
    setOpenDialog(false);
    setHvisitId('');
  }

  async function handleDeleteState(HvisitId: string) {
    setOpenDialog(false);
    dispatch(removeHomeVisitReducer(HvisitId));
  }

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: '100%', mb: 2 }}>
        <Table aria-label="reports table">
          <TableHead className="bg-gray-300">
            <TableRow>
              {filteredColums.map((items, index) => (
                <TableCell key={index}>{items}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => handleSingleHvisitOpen(item.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="capitalize">{item.clientName}</TableCell>
                <TableCell className="max-w-[100px] truncate">{item.phone}</TableCell>
                <TableCell className="max-w-[100px] truncate">{item.description}</TableCell>
                {isMentor(token.value) && (
                  <TableCell className="max-w-[100px] truncate capitalize">
                    {item.User.firstName + ' ' + item.User.lastName}
                  </TableCell>
                )}
                <TableCell>{countryDateFormat(item.date)}</TableCell>
                {/* {!isMentor(token.value) && (
                  <TableCell>
                    <div className="actions flex gap-3">
                      <span
                        className="bg-blue-300 hover:text-blue-500 px-3 py-2 rounded-xl cursor-pointer "
                        // onClick={(e) => {
                        //   handleUpdateOpen(e, item.id);
                        // }}
                      >
                        <FontAwesomeIcon icon="pen" className="" />
                      </span>
                    </div>
                  </TableCell>
                )} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && (
        <SingleHomeVisit
          isOpen={openDialog}
          handleClose={handleSingleHvisitClose}
          handleDeleteHVisit={handleDeleteState}
          homevisitId={HvisitId}
        />
      )}
    </div>
  );
}
