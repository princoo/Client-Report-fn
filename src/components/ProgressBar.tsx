import { TaskData } from '../pages/weeklyPlan/interface';

const ProgressBar = (props: { tasks: TaskData[] }) => {
  const { tasks } = props;
  const totalTasks = tasks.length;

  // Calculate the number of completed tasks
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED').length;

  // Calculate the progress percentage
  const progress = totalTasks === 0 ? 0 : Math.floor((completedTasks / totalTasks) * 100);

  return (
    <div className="border-2 p-5 rounded-lg">
      <div className="header flex justify-between mb-2 font-medium text-lg">
        <h1>Completion progress</h1>
        <p>{completedTasks + '/' + totalTasks}</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full">
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow={progress}
          className="block rounded-full bg-gray-200 translation-all duration-300"
          style={{ width: `${progress}%` }}
        >
          <span className="block h-4 rounded-full bg-blue-600 text-center text-[10px]/4">
            <span className="font-bold text-white">{progress}%</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
