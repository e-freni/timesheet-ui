import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkdayService } from 'app/services/rest/workday.service';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { DateService } from 'app/services/date.service';
import { Summary } from 'app/models/summary.model';
import { getHoursInDaysFormatter, getTodaysDate } from 'app/utils/date-utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  summary: Summary;
  daysToMonthsEnd: number;
  showedMonth: number;
  currentMonth: number;
  private workdaySubscription: Subscription;
  private accountSubscription: Subscription;
  private dateSubscription: Subscription;

  constructor(
    private workdayService: WorkdayService,
    private accountService: AccountService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.dateSubscription?.unsubscribe();
    this.accountSubscription?.unsubscribe();
  }

  getHoursInDaysFormat(hours: number): string {
    return getHoursInDaysFormatter(hours);
  }

  private load() {
    this.accountSubscription = this.accountService.getAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateSubscription = this.dateService.getDate().subscribe((date: Date) => {
        let monthInHumanFormat = date.getMonth() + 1;
        this.showedMonth = monthInHumanFormat;
        this.currentMonth = getTodaysDate().getMonth() + 1;
        this.daysToMonthsEnd =
          new Date(date.getFullYear(), monthInHumanFormat, 0).getDate() - getTodaysDate().getDate();
        this.fetchSummary(date, monthInHumanFormat, account);
      });
    });
  }

  private fetchSummary(date: Date, monthInHumanFormat: number, account: Account) {
    if (this.workdaySubscription) {
      this.workdaySubscription.unsubscribe();
    }

    this.workdaySubscription = this.workdayService
      .getMonthSummaryData(date.getFullYear(), monthInHumanFormat, account.id)
      .subscribe({
        next: (summary: Summary) => {
          this.summary = summary;
        },
      });
  }
}
