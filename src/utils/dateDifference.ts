export function calculateDays(startDate: string, endDate: string) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  let daysDifference = diffTime / (1000 * 3600 * 24);
  return daysDifference;
}
