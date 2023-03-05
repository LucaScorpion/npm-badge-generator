export function timeAgo(date: string): string {
  const ms = Date.now() - new Date(date).getTime();
  const exactDays = ms / 1000 / 86400;
  const days = Math.round(exactDays);
  const exactMonths = exactDays / 30;
  const months = Math.round(exactMonths);
  const exactYears = exactDays / 365;
  const years = Math.round(exactYears);

  if (exactDays < 1) {
    return 'today';
  }

  if (exactMonths < 1) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  if (exactYears < 1) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  return `${years} year${years === 1 ? '' : 's'} ago`;
}
