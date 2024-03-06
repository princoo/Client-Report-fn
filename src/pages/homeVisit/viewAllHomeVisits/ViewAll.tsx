import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { useHomeVisits } from '../redux/hooks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Loader from '../../../components/pageLoader/loader';
import TableData from '../components/TableData';
import EmptyData from '../../../components/EmptyData';
import Add from '../addHomeVisit/Add';
import { HomeVisitData } from '../interface';
import { addHomeGroupReducer } from '../redux/HomeVisitSlice';
import { isMentor } from '../../../utils/user';

export default function ViewAll() {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { fetchHomeVisits } = useHomeVisits();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '6', 10);
  const fetchStates = useAppSelector((state) => state.homevisit);
  const [addedData, setaddedData] = useState<HomeVisitData>();
  const token = useAppSelector((state) => state.token);

  useEffect(() => {
    fetchHomeVisits(page, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  useEffect(() => {
    if (addedData) {
      dispatch(addHomeGroupReducer(addedData));
    }
  }, [addedData, dispatch]);

  const handleAddNewData = (data: HomeVisitData) => {
    setaddedData(data);
  };

  const columns: Array<string> = ['Client Name', 'Phone', 'Description', 'Cats', 'Date']; // remember to put back Action when editing

  return (
    <div>
      <div className="flex justify-between px-2 flex-col md:flex-row mb-10 gap-2 md:gap-0">
        <div className="header flex flex-col">
          <h1 className="text-2xl font-medium text-blue-500">HomeVisits</h1>
          <span className="text-sm m-0 p-0">Care Beyond Homes</span>
        </div>
        {!isMentor(token.value) && (
          <div className="btn md:self-center ">
            <button
              onClick={() => setOpenAddDialog(true)}
              className="bg-blue-500 p-2 rounded-lg text-sm text-white cursor:pointer"
            >
              <FontAwesomeIcon icon="add" className="me-2" />
              New
            </button>
          </div>
        )}
      </div>
      {!fetchStates.loading && fetchStates.homeVisits.length !== 0 ? (
        <TableData data={fetchStates.homeVisits} columns={columns} />
      ) : (
        !fetchStates.loading && !fetchStates.error && <EmptyData items="HomeVists" />
      )}
      {fetchStates.loading && <Loader />}
      {openAddDialog && (
        <Add
          isOpen={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          handleAddNewData={handleAddNewData}
        />
      )}
    </div>
  );
}
