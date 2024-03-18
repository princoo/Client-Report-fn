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
import { TaskData } from '../interface';
import { countryDateFormat } from '../../../utils/formatDate';
import CircularProgressWithLabel from '../../../components/CircularProgress';

export default function TaskTable(props: { tasks: TaskData[] }) {
  const { tasks } = props;
  return (
    <div>
      <div className="progress my-2">
        <p>Progress</p>
        <CircularProgressWithLabel tasks={tasks} />
      </div>

      <TableContainer component={Paper} sx={{ width: '100%', mb: 2 }}>
        <Table aria-label="reports table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Due date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="cursor-pointer hover:bg-gray-100">
                <TableCell className="capitalize flex items-center max-w-[400px] min-w-[400px] truncate">
                  <Checkbox
                    checked={task.status === 'COMPLETED'}
                    disabled={true}
                    className="defaultCheckbox mr-2" // Add margin to create space between checkbox and text
                    name="weekly"
                  />
                  <span className="">{task.description}</span>
                </TableCell>
                <TableCell className="capitalize flex items-center">
                  <span>{countryDateFormat(task.dueDate)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
