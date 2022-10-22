export function getTodaysDate(): Date {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function getFormattedDate(year: number, month: number, day:number): string {
  let date = getTodaysDate();
  date.setFullYear(year, month, day)
  return date.toISOString().split('T')[0];
}

export function getMonth(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", {month: "long"}).format(date).toUpperCase();
}

export function getYear(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", {year: "numeric"}).format(date).toUpperCase();
}
