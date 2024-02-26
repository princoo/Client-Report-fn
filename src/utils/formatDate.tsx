import moment from 'moment';

function formatDate(date: string) {
  const todayDate: Date = new Date(date);
  return todayDate.toISOString().split('T')[0]; // get today's date
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

export { formatDate, formatGivenDate, formatTimeAgo };
