import {Component, OnChanges, OnInit} from '@angular/core';
import {WorkdayService} from "app/services/rest/workday.service";
import {Subscription} from "rxjs";
import {Account} from "app/models/account.model";
import {AccountService} from "app/services/account.service";
import {DateService} from "app/services/date.service";
import {Summary} from "app/models/summary.model";
import {getTodaysDate} from "app/utils/date-utilities";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnChanges {

  private workdaySubscription: Subscription;
  private accountSubscription: Subscription;
  private dateSubscription: Subscription;

  summary: Summary;
  daysToMonthsEnd: number;
  showedMonth: number;
  currentMonth: number;

  constructor(
    private workdayService: WorkdayService,
    private accountService: AccountService,
    private dateService: DateService,
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.accountSubscription = this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateSubscription = this.dateService.getObservableDate().subscribe((date: Date) => {
        let monthInHumanFormat = date.getMonth() + 1;
        this.showedMonth = monthInHumanFormat
        this.daysToMonthsEnd = new Date(date.getFullYear(), monthInHumanFormat, 0).getDate() - getTodaysDate().getDate()
        this.workdaySubscription = this.workdayService.getMonthSummaryData(date.getFullYear(), monthInHumanFormat, account.id)
          .subscribe((summary: Summary) => {
            this.summary = summary
          })
      })
    });
  }

  ngOnChanges() {
    this.load();
  }


  getHoursInDaysFormatter(hours: number): string {
    return `(${hours / 8} giorni)`
  }

}
