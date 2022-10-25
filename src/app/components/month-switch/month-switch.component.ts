import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WorkdayService} from "app/services/rest/workday.service";
import {Account} from "app/models/account.model";
import {getMonth, getYear} from "app/utils/date-utilities";
import {AccountService} from "app/services/account.service";
import {DateService} from "app/services/date.service";
import {Subscription} from "rxjs";
import {saveAs} from 'file-saver-es';
import {MatDialog} from "@angular/material/dialog";
import {SendEmailComponent} from "app/components/month-switch/send-email/send-email.component";

@Component({
  selector: 'app-month-switch',
  templateUrl: './month-switch.component.html',
  styleUrls: ['./month-switch.component.css']
})
export class MonthSwitchComponent implements OnInit {

  @Output() calendarEmitter: EventEmitter<any> = new EventEmitter();
  @Output() analyticsEmitter: EventEmitter<any> = new EventEmitter();

  private dateSubscription: Subscription;
  private accountSubscription: Subscription;

  account: Account = null;
  date: Date;
  isLoading: boolean;

  constructor(
    private workdayService: WorkdayService,
    private accountService: AccountService,
    private dateService: DateService,
    private matDialog: MatDialog,
  ) {
  }

  get month(): string {
    return getMonth(this.date)
  }

  get year(): string {
    return getYear(this.date)
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.dateSubscription = this.dateService.getObservableDate().subscribe({
        next: date => {
          this.date = date;
          this.account = account;
        }
      });
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
    this.isLoading = true
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    this.workdayService.exportWorkdayMonth(year, month, this.account.id).subscribe(blob => {
      saveAs(blob, `${this.account.lastName}_foglio_ore_${this.year}_${this.month}.xlsx`, {autoBom: false});
    });
    this.isLoading = false
  }

  goToCalendar() {
    this.calendarEmitter.emit()
  }

  goToAnalytics() {
    this.analyticsEmitter.emit()
  }

  sendExportByEmail() {
    this.matDialog.open(SendEmailComponent, {
      width: '50%',
      disableClose: true,
      hasBackdrop: true,
      enterAnimationDuration: "100ms",
      exitAnimationDuration: "100ms",
      data: {
        selectedMonthDate: new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0)
      }
    })
  }
}
