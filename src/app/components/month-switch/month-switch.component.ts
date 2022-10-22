import {Component, OnDestroy, OnInit} from '@angular/core';
import * as FileSaver from "file-saver";
import {WorkdayService} from "app/services/rest/workday.service";
import {Account} from "app/models/account.model";
import {getMonth, getTodaysDate, getYear} from "app/utils/date-utilities";
import {AccountService} from "app/services/account.service";
import {DateService} from "app/services/date.service";
import {PageService} from "app/services/page.service";

@Component({
  selector: 'app-month-switch',
  templateUrl: './month-switch.component.html',
  styleUrls: ['./month-switch.component.css']
})
export class MonthSwitchComponent implements OnInit {

  account: Account = null;
  date: Date;

  constructor(
    private workdayService: WorkdayService,
    private accountService: AccountService,
    private dateService: DateService,
    private pageService: PageService,
  ) {
  }

  get month(): string {
    return getMonth(this.date)
  }

  get year(): string {
    return getYear(this.date)
  }

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.dateService.getObservableDate().subscribe(date => {
        this.date = date;
        this.account = account;
      })
    });
  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.dateService.setDate(this.date);
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.dateService.setDate(this.date);
  }

  exportToExcel(): void {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    this.workdayService.exportWorkdayMonth(year, month, this.account.id).subscribe(blob => {
      FileSaver.saveAs(blob, `${this.account.lastName}_foglio_ore_${this.year}_${this.month}.xlsx`, {autoBom: false});
    });
  }

  goToCalendar() {
    this.pageService.setCurrentPage('calendar');
  }

  goToAnalytics() {
    this.pageService.setCurrentPage('analytics');
  }
}
