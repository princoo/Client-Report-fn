import { useEffect, useState } from 'react';
import { useTasks } from '../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyData from '../../../components/EmptyData';
import Loader from '../../../components/pageLoader/loader';
import PageNotFound from '../../../components/PageNotFound';
import ProgressBar from '../../../components/ProgressBar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SpinnerComponent from '../../../components/SpinnerComponent';
import SnackBar from '../../../components/SnackBar/SnackBar';
import { isMentor } from '../../../utils/user';
import ConfirmationDialogue from '../../../components/ConfirmationDialogue';
import Add from '../addTask/Add';
import { TaskData } from '../interface';
import { addTaskReducer } from '../redux/weeklyPlanSlice';

export default function ViewAll() {
  const dispatch = useAppDispatch();
  const {
    fetchTasks,
    loading,
    error,
    tasks,
    onStatusUpdate,
    onDeleteTask,
    toogleStatus,
    deleteTask,
  } = useTasks();
  const [selectedId, setSelectedId] = useState<string>('');
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [onAlert, setonAlert] = useState<boolean>(false);

  const token = useAppSelector((state) => state.token);

  async function changeStatus(id: string) {
    setSelectedId(id);
    const data = await toogleStatus(id);
    if (data) {
      setSelectedId('');
    }
  }
  async function handleDelete() {
    setonAlert(false);
    const data = await deleteTask(selectedId);
    if (data) {
      setSelectedId('');
    }
  }

  const handleAddNewData = (data: TaskData) => {
    dispatch(addTaskReducer(data));
  };

  async function handleConfirm(id: string) {
    setSelectedId(id);
    setonAlert(true);
  }
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <PageNotFound error={error} />;
  }

  return (
    <>
      <div>
        {onStatusUpdate.error && (
          <SnackBar orderOpen={true} message={onStatusUpdate.error} severity="error" />
        )}
        <div className="flex justify-between px-2 flex-col md:flex-row mb-2 gap-2 md:gap-0">
          <div className="title flex flex-col items-start mb-7">
            <FontAwesomeIcon icon="list-check" className="text-4xl text-blue-600 mb-2" />
            <h1 className="text-3xl font-bold text-blue-600 tracking-wider">Weekly Tasks</h1>
            <span className="text-sm">Boost your Productivity</span>
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
        {!loading && tasks.length !== 0 && (
          <div className="mb-10">
            <ProgressBar tasks={tasks} />
          </div>
        )}

        {!loading && tasks.length !== 0
          ? tasks.map((item, index) => (
              <div
                className={`flex justify-between p-3 text-lg border-gray-100 border-2 rounded-lg ${item.status === 'PENDING' ? 'bg-gray-100' : 'bg-blue-100'} hover:bg-gray-100 mb-2`}
                key={index}
              >
                <div className="w-full flex gap-2">
                  {!onStatusUpdate.loading ? (
                    <input
                      type="checkbox"
                      checked={item.status === 'COMPLETED' ? true : false}
                      disabled={onStatusUpdate.loading}
                      className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] items-center
                            justify-center rounded-md border border-gray-300  outline-none transition duration-[0.2s]
                            checked:border-none checked:text-white hover:cursor-pointer checked:bg-brand-500"
                      name="weekly"
                      onChange={() => {
                        changeStatus(item.id);
                      }}
                    />
                  ) : (
                    selectedId === item.id && <SpinnerComponent />
                  )}
                  <p className="text-base font-medium text-navy-700 ">{item.description}</p>
                </div>
                <span
                  className="material-symbols-rounded text-navy-700  cursor-pointer"
                  onClick={() => {
                    handleConfirm(item.id);
                  }}
                >
                  {!onDeleteTask.loading ? (
                    <FontAwesomeIcon icon="trash" />
                  ) : (
                    selectedId === item.id && <SpinnerComponent />
                  )}
                </span>
              </div>
            ))
          : !loading && <EmptyData items="Tasks" />}
      </div>
      {loading && <Loader />}
      {onAlert && (
        <ConfirmationDialogue
          onClose={() => {
            setonAlert(false);
            setSelectedId('');
          }}
          onAgree={handleDelete}
          Onopen={onAlert}
          item="Task"
        />
      )}
      {openAddDialog && (
        <Add
          isOpen={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          handleAddNewData={handleAddNewData}
        />
      )}
    </>
  );
}
