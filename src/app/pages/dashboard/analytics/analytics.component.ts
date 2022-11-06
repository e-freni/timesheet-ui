import { Component, OnChanges, OnInit } from '@angular/core';
import { WorkdayService } from 'app/services/rest/workday.service';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { DateService } from 'app/services/date.service';
import { Summary } from 'app/models/summary.model';
import { getTodaysDate } from 'app/utils/date-utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, OnChanges {
  summary: Summary;
  daysToMonthsEnd: number;
  showedMonth: number;
  currentMonth: number;
  private workdaySubscription: Subscription;

  constructor(
    private workdayService: WorkdayService,
    private accountService: AccountService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges() {
    this.load();
  }

  getHoursInDaysFormatter(hours: number): string {
    return `(${hours / 8} giorni)`;
  }

  private load() {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateService.getObservableDate().subscribe((date: Date) => {
        let monthInHumanFormat = date.getMonth() + 1;
        this.showedMonth = monthInHumanFormat;
        this.currentMonth = getTodaysDate().getMonth() + 1;
        this.daysToMonthsEnd =
          new Date(date.getFullYear(), monthInHumanFormat, 0).getDate() - getTodaysDate().getDate();

        if (this.workdaySubscription) {
          this.workdaySubscription.unsubscribe();
        }

        this.workdaySubscription = this.workdayService
          .getMonthSummaryData(date.getFullYear(), monthInHumanFormat, account.id)
          .subscribe({
            //FIXME duplicated calls after logout
            next: (summary: Summary) => {
              this.summary = summary;
            },
          });
      });
    });
  }
}
