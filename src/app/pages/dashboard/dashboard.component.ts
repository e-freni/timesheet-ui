import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MissingHoursWarning } from 'app/components/dialog/missing-hours-warning/missing-hours-warning.component';
import { Summary } from 'app/models/summary.model';
import { WorkdayService } from 'app/services/rest/workday.service';
import { DateService } from 'app/services/date.service';
import { getTodaysDate } from 'app/utils/date-utilities';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SKIP_MONTH_KEY } from 'app.constants';
import { getStandardModalsWidth } from 'app/utils/screen-utilities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  CALENDAR = 0;
  ANALYTICS = 1;
  selectedTab: number;
  private summary: Summary;
  private accountSubscription: Subscription;
  private dateSubscription: Subscription;
  private date: Date;

  constructor(
    private workdayService: WorkdayService,
    private dateService: DateService,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private matDialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateSubscription = this.dateService.getDate().subscribe((date: Date) => {
        this.date = date;

        this.clearSkipMonth();
        if (!this.isCurrentMonth()) {
          return;
        }

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

  private clearSkipMonth() {
    if (this.localStorageService.retrieve(SKIP_MONTH_KEY) != getTodaysDate().getMonth())
      this.localStorageService.clear(SKIP_MONTH_KEY);
  }

  private isCurrentMonth() {
    return (
      moment().format('M') === (this.date.getMonth() + 1).toString() &&
      moment().format('YYYY') === this.date.getFullYear().toString()
    );
  }

  private lastDaysOfTheMonthWarning() {
    const today = moment();
    const endOfMonth = moment().endOf('month');
    const alertPeriod = moment().endOf('month').subtract(3, 'days');
    let isTheEndOfTheMonth = today.isAfter(alertPeriod) && today.isBefore(moment().endOf('month'));
    if (isTheEndOfTheMonth && this.summary.toLogHours > 0 && this.isCurrentMonth() && this.isWarningNotChecked()) {
      this.matDialog.open(MissingHoursWarning, {
        width: getStandardModalsWidth(),
        height: '50%',
        disableClose: true,
        backdropClass: 'ts-backdrop',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          missingDaysToMonthEnd: endOfMonth.subtract(moment.now()).format('D'),
          toLogHours: this.summary.toLogHours,
          currentMonth: this.date.getMonth(),
        },
      });
    }
  }

  private isWarningNotChecked() {
    return this.localStorageService.retrieve(SKIP_MONTH_KEY) != this.date.getMonth();
  }
}
