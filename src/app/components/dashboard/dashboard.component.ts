import {Component, OnInit} from '@angular/core';
import {WeekDay} from "@angular/common";

class Day {
  monthDayNumber: number;
  weekdayValue: WeekDay;
  outerMonths: boolean = false;

  constructor(monthDayNumber: number, dayValue: number, outerMonths?: boolean) {
    this.monthDayNumber = monthDayNumber;
    this.weekdayValue = dayValue;
    this.outerMonths = outerMonths
  }

  get dayName(): string {
    switch (this.weekdayValue) {
      case WeekDay.Sunday:
        return "Domenica"
      case WeekDay.Monday:
        return "Lunedì"
      case WeekDay.Tuesday:
        return "Martedì"
      case WeekDay.Wednesday:
        return "Mercoledì"
      case WeekDay.Thursday:
        return "Giovedì"
      case WeekDay.Friday:
        return "Venerdì"
      case WeekDay.Saturday:
        return "Sabato"
    }
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: Date;
  monthDays: Day[] = []

  constructor() {
  }

  private static getTodaysDate() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  ngOnInit(): void {
    this.date = DashboardComponent.getTodaysDate()
  }

  displayMonth(): string {
    return new Intl.DateTimeFormat("it-IT", {month: "long"}).format(this.date).toUpperCase();
  }

  displayYear(): string {
    return new Intl.DateTimeFormat("it-IT", {year: "numeric"}).format(this.date).toUpperCase();
  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  getMonthDays() {
    this.monthDays = [];
    const date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    while (date.getMonth() === this.date.getMonth()) {
      const day = new Day(date.getDate(), date.getDay())
      this.monthDays.push(day)
      date.setDate(date.getDate() + 1);
    }
    this.addOtherMonthsDays()
    return this.monthDays;
  }

  isNotWorkingDay(day: Day): boolean {
    return day.dayName == 'Domenica' || day.dayName == 'Sabato'
  }

  private addOtherMonthsDays() {
    let now = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    const firstMonthDay = 0;
    if (this.monthDays[firstMonthDay].weekdayValue !== WeekDay.Monday) {
      while (now.getDay() != WeekDay.Monday) {
        now.setDate(now.getDate() - 1)
        this.monthDays.unshift(new Day(now.getDate(), now.getDay(), true))
      }
    }

    const nextMonth = this.date.getMonth() + 1;
    now = new Date(this.date.getFullYear(), nextMonth, 0);

    const lastMonthDay = this.monthDays.length - 1;
    if (this.monthDays[lastMonthDay].weekdayValue !== WeekDay.Sunday) {
      while (now.getDay() != WeekDay.Sunday) {
        now.setDate(now.getDate() + 1)
        this.monthDays.push(new Day(now.getDate(), now.getDay(), true))
      }
    }
  }
}
