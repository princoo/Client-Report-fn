import moment from 'moment';

function formatDate(date: string) {
  const todayDate: Date = new Date(date);
  return todayDate.toISOString().split('T')[0]; // get today's date
}
function countryDateFormat(date: string) {
  const formattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
  return formattedDate;
}

function formatGivenDate(date: string) {
  const newDate = moment(date);
  return newDate.format('hh:mm A');
}
function formatTimeAgo(date: string): string {
  const currentTime = moment();
  const previousTime = moment(date);

  const elapsedTimeInSeconds = currentTime.diff(previousTime, 'seconds');

  if (elapsedTimeInSeconds < 60) {
    return `${elapsedTimeInSeconds} second${elapsedTimeInSeconds !== 1 ? 's' : ''} ago`;
  } else if (elapsedTimeInSeconds < 3600) {
    const minutes = Math.round(moment.duration(elapsedTimeInSeconds, 'seconds').asMinutes());
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (elapsedTimeInSeconds < 86400) {
    const hours = Math.round(moment.duration(elapsedTimeInSeconds, 'seconds').asHours());
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.round(moment.duration(elapsedTimeInSeconds, 'seconds').asDays());
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

function tasksDueDate() {
  // Get the current date
  const currentDate = new Date();

  // Get the end of the current week using Moment.js
  const endOfWeek = moment(currentDate).endOf('isoWeek').format('DD-MM-YYYY');

  return endOfWeek;
}

export { formatDate, formatGivenDate, formatTimeAgo, countryDateFormat, tasksDueDate };
