export function calculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const daysDifference = diffTime / (1000 * 3600 * 24);
  return daysDifference;
}
