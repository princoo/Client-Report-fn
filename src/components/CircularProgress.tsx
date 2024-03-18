import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { TaskData } from '../pages/weeklyPlan/interface';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={40} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className="text-xs text-blue-600">{`${Math.round(props.value)}%`}</p>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel(props: { tasks: TaskData[] }) {
  const { tasks } = props;
  const totalTasks = tasks.length;

  // Calculate the number of completed tasks
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED').length;

  // Calculate the progress percentage
  const progress = totalTasks === 0 ? 0 : Math.floor((completedTasks / totalTasks) * 100);

  return <CircularProgressWithLabel value={progress} />;
}
