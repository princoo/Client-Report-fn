import { isMentor } from './user';

const filteredColumns = (
  columns: Array<string>,
  hideMentor: Array<string>,
  hideCats: Array<string>,
  token: string
) => {
  const columnsToRemove = isMentor(token) ? hideMentor : hideCats;

  // Remove the specified columns from the 'columns' array
  columnsToRemove.forEach((column) => {
    const indexToRemove = columns.indexOf(column);
    if (indexToRemove !== -1) {
      columns.splice(indexToRemove, 1);
    }
  });

  return columns;
};

export default filteredColumns;
