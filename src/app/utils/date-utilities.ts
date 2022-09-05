export function getTodaysDate(): Date {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function getFormattedTodaysDate(): string {
  let date = getTodaysDate();
  return date.toISOString().split('T')[0];
}
