import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeekDay } from '@angular/common';
import { Day } from 'app/models/day';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { WorkdayService } from 'app/services/rest/workday.service';
import { Workday } from 'app/models/workday.model';
import { EditWorkdayComponent } from 'app/components/dialog/edit-workday/edit-workday.component';
import { getMonth, getTodaysDate } from 'app/utils/date-utilities';
import { DateService } from 'app/services/date.service';
import { Subscription } from 'rxjs';
import {
  ALL_SAINTS_DAY,
  APRIL_TWENTY_FIFTH,
  BOXING_DAY,
  calculateEaster,
  calculateEasterMonday,
  CHRISTMAS,
  EPIPHANY,
  IMMACULATE_CONCEPTION,
  MID_AUGUST,
  MIDSUMMER,
  NEW_YEARS_EVE,
  REPUBLIC_DAY,
  SpecialDay,
  WORKERS_DAY,
} from 'app/models/special-days';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  date: Date;
  account: Account = null;

  monthDays: Day[] = [];
  workdays: Workday[] = [];

  private workdaySubscription: Subscription;
  private dateSubscription: Subscription;
  private accountSubscription: Subscription;
  private readonly standardNonWorkingDaysNames: string[] = ['Domenica', 'Sabato'];
  private specialDays: SpecialDay[] = [
    NEW_YEARS_EVE,
    APRIL_TWENTY_FIFTH,
    calculateEaster(new Date().getFullYear()),
    calculateEasterMonday(new Date().getFullYear()),
    WORKERS_DAY,
    EPIPHANY,
    MIDSUMMER,
    REPUBLIC_DAY,
    MID_AUGUST,
    ALL_SAINTS_DAY,
    IMMACULATE_CONCEPTION,
    CHRISTMAS,
    BOXING_DAY,
  ];

  constructor(
    private matDialog: MatDialog,
    private accountService: AccountService,
    private dateService: DateService,
    private workdayService: WorkdayService
  ) {}

  get month(): string {
    return getMonth(this.date);
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateSubscription = this.dateService.getObservableDate().subscribe({
        next: (date: Date | null) => {
          this.account = account;
          this.date = date;
          this.createMonthCalendar();
          this.fetchWorkdays();
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.dateSubscription?.unsubscribe();
    this.accountSubscription?.unsubscribe();
  }

  createMonthCalendar() {
    this.monthDays = [];
    const date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    while (date.getMonth() === this.date.getMonth()) {
      const day = new Day(date.getDate(), date.getDay(), false);
      this.monthDays.push(day);
      date.setDate(date.getDate() + 1);
    }
    this.addOtherMonthsDays();
  }

  isNotWorkingDay(day: Day): boolean {
    return this.standardNonWorkingDaysNames.includes(day.dayName);
  }

  isSpecialDay(day: Day): boolean {
    const dateInStringFormat: string = `${day.monthDayNumber}/${this.date.getMonth() + 1}`;
    return this.specialDays.some((d: SpecialDay) => {
      return d.holidayDate === dateInStringFormat;
    });
  }

  getSpecialDayName(day: Day): string {
    const dateInStringFormat: string = `${day.monthDayNumber}/${this.date.getMonth() + 1}`;
    return this.specialDays.find((d: SpecialDay) => {
      return d.holidayDate === dateInStringFormat;
    }).holidayName;
  }

  openDay(day: Day) {
    if (day.outerMonths) {
      return;
    }
    this.matDialog
      .open(EditWorkdayComponent, {
        width: '50%',
        disableClose: true,
        backdropClass: 'ts-backdrop',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          day: day,
          calendarDate: new Date(this.date.getFullYear(), this.date.getMonth(), day.monthDayNumber, 0, 0, 0),
        },
      })
      .afterClosed()
      .subscribe(workDayHasBeenChanged => {
        if (workDayHasBeenChanged) {
          this.createMonthCalendar();
          this.fetchWorkdays();
        }
      });
  }

  isToday(day: Day) {
    const dateToCheck = new Date(this.date);
    dateToCheck.setDate(day.monthDayNumber);
    return dateToCheck.getTime() == getTodaysDate().getTime();
  }

  private fetchWorkdays() {
    if (this.account) {
      if (this.workdaySubscription) {
        this.workdaySubscription.unsubscribe();
      }

      this.workdaySubscription = this.workdayService
        .findWorkdaysByUsername(
          this.account.username,
          this.monthBeginningDate(this.date.getMonth()),
          this.monthEndingDate(this.date.getMonth() + 1)
        )
        .subscribe(workdays => {
          this.workdays = workdays;
          const onlyWorkDays = this.monthDays.filter(d => !d.outerMonths);
          this.workdays.forEach(
            wd => (onlyWorkDays.find(d => d.monthDayNumber == new Date(wd.date).getDate()).workday = wd)
          );
        });
    }
  }

  private monthBeginningDate(month: number) {
    return new Date(this.date.getFullYear(), month, 1).toLocaleDateString();
  }

  private monthEndingDate(month: number) {
    return new Date(this.date.getFullYear(), month, 0).toLocaleDateString();
  }

  private addOtherMonthsDays() {
    let now = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

    const firstMonthDay = 0;
    if (this.monthDays[firstMonthDay].weekdayValue !== WeekDay.Monday) {
      while (now.getDay() != WeekDay.Monday) {
        now.setDate(now.getDate() - 1);
        this.monthDays.unshift(new Day(now.getDate(), now.getDay(), true));
      }
    }

    const nextMonth = this.date.getMonth() + 1;
    now = new Date(this.date.getFullYear(), nextMonth, 0);

    const lastMonthDay = this.monthDays.length - 1;
    if (this.monthDays[lastMonthDay].weekdayValue !== WeekDay.Sunday) {
      while (now.getDay() != WeekDay.Sunday) {
        now.setDate(now.getDate() + 1);
        this.monthDays.push(new Day(now.getDate(), now.getDay(), true));
      }
    }
  }
}
