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
import { countryDateFormat, tasksDueDate } from '../../../utils/formatDate';
import decodeToken from '../../../utils/token';
import Accordion from '../../../components/Accordion';
import TaskTable from '../components/TaskTable';

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
  const [showOtherTasks, setshowOtherTasks] = useState<boolean>(false);
  const [onAlert, setonAlert] = useState<boolean>(false);
  const [otherTasks, setotherTasks] = useState<{ [key: string]: TaskData[] }>({});
  const [ownTasks, setownTasks] = useState<TaskData[]>([]);
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
  useEffect(() => {
    if (tasks.length !== 0) {
      const loggeInUser = decodeToken(token.value);
      const otherUsersTasks = tasks.filter((task) => task.WeeklyPlan.User.id != loggeInUser.id);
      const groupedTasks = otherUsersTasks.reduce<{ [key: string]: TaskData[] }>(
        (acc, task) => ({
          ...acc,
          [`${task.WeeklyPlan.User.firstName} ${task.WeeklyPlan.User.lastName}`]: [
            ...(acc[`${task.WeeklyPlan.User.firstName} ${task.WeeklyPlan.User.lastName}`] || []),
            task,
          ],
        }),
        {}
      );

      setotherTasks(groupedTasks);
      const UserTasks = tasks.filter((task) => task.WeeklyPlan?.User.id === loggeInUser.id);
      setownTasks(UserTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

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
            <FontAwesomeIcon icon="list-check" className="text-2xl text-blue-600 mb-2" />
            <h1 className="text-xl font-bold text-blue-600 tracking-wider">Weekly Tasks</h1>
            <span className="text-sm">Boost your Productivity</span>
          </div>
          <div className="btn md:self-center ">
            <button
              onClick={() => setOpenAddDialog(true)}
              className="bg-blue-500 p-2 rounded-lg text-sm text-white cursor:pointer"
            >
              <FontAwesomeIcon icon="add" className="me-2" />
              New
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          All tasks are deleted at the end of the week (<span>{tasksDueDate()}</span>)
        </p>
        {!loading && ownTasks.length !== 0 && (
          <div className="mb-10">
            <ProgressBar tasks={ownTasks} />
          </div>
        )}
        {!loading && tasks.length !== 0 && ownTasks.length !== 0 ? (
          <TableContainer component={Paper} sx={{ width: '100%', mb: 2 }}>
            <Table aria-label="reports table">
              <TableHead className="bg-gray-300">
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Due date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownTasks.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer hover:bg-gray-100">
                    <TableCell className="capitalize flex items-center max-w-[400px] truncate">
                      <Checkbox
                        checked={task.status === 'COMPLETED'}
                        disabled={onStatusUpdate.loading}
                        className="defaultCheckbox mr-2" // Add margin to create space between checkbox and text
                        name="weekly"
                        onChange={() => {
                          changeStatus(task.id);
                        }}
                      />
                      <span className="">{task.description}</span>
                    </TableCell>
                    <TableCell className="capitalize flex items-center">
                      <span>{countryDateFormat(task.dueDate)}</span>
                    </TableCell>

                    <TableCell>
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
          !loading && (
            <div className="empty border-2 border-gray-200 rounded-xl mb-2">
              <EmptyData items="Tasks" />
            </div>
          )
        )}
        {!loading && Object.keys(otherTasks).length > 0 && isMentor(token.value) && (
          <button
            className="bg-blue-500 p-1 rounded-lg text-white my-4 text-sm"
            onClick={() => setshowOtherTasks(!showOtherTasks)}
          >
            {showOtherTasks ? 'Hide plans' : 'View other plans'}
          </button>
        )}

        {!loading && tasks.length !== 0 && showOtherTasks && Object.keys(otherTasks).length > 0 ? (
          <div className="others">
            {Object.entries(otherTasks).map(([user, tasks]) => (
              <div key={user}>
                <Accordion title={user} content={<TaskTable tasks={tasks} />} />
              </div>
            ))}
          </div>
        ) : null}
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
