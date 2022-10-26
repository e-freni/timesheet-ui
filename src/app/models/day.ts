import { WeekDay } from '@angular/common';
import { Workday } from 'app/models/workday.model';

export class Day {
  monthDayNumber: number;
  weekdayValue: WeekDay;
  outerMonths: boolean = false;
  workday: Workday = null;

  constructor(monthDayNumber: number, dayValue: number, outerMonths?: boolean, workday?: Workday) {
    this.monthDayNumber = monthDayNumber;
    this.weekdayValue = dayValue;
    this.outerMonths = outerMonths;
    this.workday = workday;
  }

  get dayName(): string {
    switch (this.weekdayValue) {
      case WeekDay.Sunday:
        return 'Domenica';
      case WeekDay.Monday:
        return 'Lunedì';
      case WeekDay.Tuesday:
        return 'Martedì';
      case WeekDay.Wednesday:
        return 'Mercoledì';
      case WeekDay.Thursday:
        return 'Giovedì';
      case WeekDay.Friday:
        return 'Venerdì';
      case WeekDay.Saturday:
        return 'Sabato';
    }
  }
}
