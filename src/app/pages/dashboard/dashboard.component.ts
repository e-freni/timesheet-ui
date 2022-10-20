import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WeekDay} from "@angular/common";
import {Day} from "app/models/day";
import {Account} from "app/models/account.model";
import {AccountService} from "app/services/account.service";
import {WorkdayService} from "app/services/workday.service";
import {Workday} from "app/models/workday.model";
import {EditWorkdayComponent} from "app/pages/dashboard/edit-workday/edit-workday.component";
import {getTodaysDate} from 'app/utils/date-utilities';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: Date;
  monthDays: Day[] = []

  account: Account = null;
  workdays: Workday[] = [];

  constructor(
    private matDialog: MatDialog,
    private accountService: AccountService,
    private workdayService: WorkdayService,
  ) {
  }

  get month(): string {
    return new Intl.DateTimeFormat("it-IT", {month: "long"}).format(this.date).toUpperCase();
  }

  get year(): string {
    return new Intl.DateTimeFormat("it-IT", {year: "numeric"}).format(this.date).toUpperCase();
  }

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.date = getTodaysDate()
      this.account = account;
      this.createMonthCalendar()
      this.fetchWorkdays();
    });
  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.createMonthCalendar()
    this.fetchWorkdays()
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.createMonthCalendar()
    this.fetchWorkdays()
  }

  createMonthCalendar() {
    this.monthDays = [];
    const date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    while (date.getMonth() === this.date.getMonth()) {
      const day = new Day(date.getDate(), date.getDay(), false)
      this.monthDays.push(day)
      date.setDate(date.getDate() + 1);
    }
    this.addOtherMonthsDays()
  }

  private fetchWorkdays() {
    if (this.account) {
      this.workdayService.findWorkdaysByUsername(this.account.username, this.monthBeginningDate(this.date.getMonth()), this.monthEndingDate(this.date.getMonth() + 1)).subscribe(workdays => {
          this.workdays = workdays;
          const onlyWorkDays = this.monthDays.filter(d => !d.outerMonths)
          this.workdays.forEach(wd => onlyWorkDays.find(d => d.monthDayNumber == new Date(wd.date).getDate()).workday = wd);
        }
      )
    }
  }

  private monthBeginningDate(month: number) {
    return new Date(this.date.getFullYear(), month, 1).toLocaleDateString();
  }

  private monthEndingDate(month: number) {
    return new Date(this.date.getFullYear(), month, 0).toLocaleDateString();
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

  openDay(day: Day) {
    if (day.outerMonths) {
      return
    }
    this.matDialog.open(EditWorkdayComponent, {
      width: '50%',
      disableClose: true,
      hasBackdrop: true,
      enterAnimationDuration: "100ms",
      exitAnimationDuration: "100ms",
      data: {
        day: day,
        calendarDate: new Date(this.date.getFullYear(), this.date.getMonth(), day.monthDayNumber, 0, 0, 0)
      }
    }).afterClosed().subscribe((workDayHasBeenChanged) => {
      if (workDayHasBeenChanged) {
        this.createMonthCalendar()
        this.fetchWorkdays()
      }
    })


  }

  exportToExcel(): void {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    this.workdayService.exportWorkdayMonth(year, month, this.account.id).subscribe(blob => {
      FileSaver.saveAs(blob, `${this.account.lastName}_foglio_ore_${this.year}_${this.month}.xlsx`, {autoBom: false});
    });
  }

  goToEdit() {
    console.log("get back to edit")
  }

  goToStatistics() {
    console.log("go to statistics")
  }
}
