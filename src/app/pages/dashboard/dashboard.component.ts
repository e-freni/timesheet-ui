import { Component, OnInit } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MissingHoursWarning } from 'app/components/dialog/missing-hours-warning/missing-hours-warning.component';
import { getTodaysDate } from 'app/utils/date-utilities';
import { Summary } from 'app/models/summary.model';
import { WorkdayService } from 'app/services/rest/workday.service';
import { DateService } from 'app/services/date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  CALENDAR = 0;
  ANALYTICS = 1;
  page: string;
  selectedTab: number;
  private summary: Summary;

  //TODO finish alert of missing hours (not working with special days)
  //TODO alert when logging in special days (like Christmas!)
  //TODO user edit details (es. email)
  //TODO put all css in style classes and optimize it
  //TODO make a mobile view
  //TODO DARK MODE!
  //TODO (maybe) massive normal working days log

  constructor(
    private workdayService: WorkdayService,
    private dateService: DateService,
    private accountService: AccountService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }

      this.dateService.getObservableDate().subscribe((date: Date) => {
        this.workdayService
          .getMonthSummaryData(date.getFullYear(), getTodaysDate().getMonth() + 1, account.id)
          .subscribe({
            next: (summary: Summary) => {
              this.summary = summary;
              this.lastDaysOfTheMonthWarning();
            },
          });
      });
    });
  }

  switchToAnalytics() {
    this.selectedTab = this.ANALYTICS;
  }

  switchToCalendar() {
    this.selectedTab = this.CALENDAR;
  }

  private lastDaysOfTheMonthWarning() {
    const today = moment();
    const endOfMonth = moment().endOf('month');
    const alertPeriod = moment().endOf('month').subtract(3, 'days');
    let isTheEndOfTheMonth = today.isAfter(alertPeriod) && today.isBefore(moment().endOf('month'));
    console.log(isTheEndOfTheMonth);
    console.log(this.summary.toLogHours);
    if (isTheEndOfTheMonth && this.summary.toLogHours > 0) {
      this.matDialog.open(MissingHoursWarning, {
        width: '50%',
        height: '50%',
        disableClose: true,
        backdropClass: 'ts-backdrop',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          missingDaysToMonthEnd: endOfMonth.subtract(moment.now()).format('D'),
          toLogHours: this.summary.toLogHours,
        },
      });
    }
  }
}
