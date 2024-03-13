import { useEffect, useState } from 'react';
import { useTasks } from '../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyData from '../../../components/EmptyData';
import Loader from '../../../components/pageLoader/loader';
import ProgressBar from '../../../components/ProgressBar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SpinnerComponent from '../../../components/SpinnerComponent';
import SnackBar from '../../../components/SnackBar/SnackBar';
import { isMentor } from '../../../utils/user';
import ConfirmationDialogue from '../../../components/ConfirmationDialogue';
import Add from '../addTask/Add';
import { TaskData } from '../interface';
import { addTaskReducer } from '../redux/weeklyPlanSlice';
import FallBackComponent from '../../../components/FallBackComponent';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Checkbox,
} from '@mui/material';
import { tasksDueDate } from '../../../utils/formatDate';

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
  async function handleRetry() {
    fetchTasks();
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
    return <FallBackComponent error={error} resetErrorBoundary={handleRetry} />;
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
        <p className="text-sm text-gray-500 mb-2">
          Your task(s) are due to <span>{tasksDueDate()}</span>
        </p>

        {!loading && tasks.length !== 0 && (
          <div className="mb-10">
            <ProgressBar tasks={tasks} />
          </div>
        )}
        {!loading && tasks.length !== 0 ? (
          <TableContainer component={Paper} sx={{ width: '100%', mb: 2 }}>
            <Table aria-label="reports table">
              <TableHead className="bg-gray-300">
                <TableRow>
                  {/* <TableCell>Check</TableCell> */}
                  <TableCell>Task</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer hover:bg-gray-100">
                    <TableCell className="capitalize flex items-center">
                      <Checkbox
                        checked={task.status === 'COMPLETED'}
                        disabled={onStatusUpdate.loading}
                        className="defaultCheckbox mr-2" // Add margin to create space between checkbox and text
                        name="weekly"
                        onChange={() => {
                          changeStatus(task.id);
                        }}
                      />
                      <span>{task.description}</span>
                    </TableCell>

                    <TableCell className="max-w-[100px] truncate">
                      <span
                        className="material-symbols-rounded text-navy-700  cursor-pointer"
                        onClick={() => {
                          handleConfirm(task.id);
                        }}
                      >
                        {!onDeleteTask.loading ? (
                          <FontAwesomeIcon icon="trash" />
                        ) : (
                          selectedId === task.id && <SpinnerComponent />
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // ))
          !loading && <EmptyData items="Tasks" />
        )}
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
