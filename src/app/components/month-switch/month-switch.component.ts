import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { WorkdayService } from 'app/services/rest/workday.service';
import { Account } from 'app/models/account.model';
import { getMonth, getTodaysDate, getYear } from 'app/utils/date-utilities';
import { AccountService } from 'app/services/rest/account.service';
import { DateService } from 'app/services/date.service';
import { saveAs } from 'file-saver-es';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailComponent } from 'app/components/dialog/send-email/send-email.component';
import { ExportService } from 'app/services/rest/export.service';

@Component({
  selector: 'app-month-switch',
  templateUrl: './month-switch.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MonthSwitchComponent implements OnInit {
  @Output() calendarEmitter: EventEmitter<any> = new EventEmitter();
  @Output() analyticsEmitter: EventEmitter<any> = new EventEmitter();
  account: Account = null;
  date: Date;
  isLoading: boolean;

  constructor(
    private workdayService: WorkdayService,
    private exportService: ExportService,
    private accountService: AccountService,
    private dateService: DateService,
    private matDialog: MatDialog
  ) {}

  get month(): string {
    return getMonth(this.date);
  }

  get year(): string {
    return getYear(this.date);
  }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.dateService.getDate().subscribe({
        next: date => {
          this.date = date;
          this.account = account;
        },
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
    this.isLoading = true;
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    this.exportService.exportWorkdayMonth(year, month, this.account.id).subscribe(blob => {
      saveAs(blob, `${this.account.lastName}_foglio_ore_${this.year}_${this.month}.xlsx`, { autoBom: false });
    });
    this.isLoading = false;
  }

  goToCalendar() {
    this.calendarEmitter.emit();
  }

  goToAnalytics() {
    this.analyticsEmitter.emit();
  }

  sendExportByEmail() {
    this.matDialog.open(SendEmailComponent, {
      width: '25%',
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        selectedMonthDate: new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0),
        account: this.account,
      },
    });
  }

  getToCurrentMonth() {
    this.date.setMonth(getTodaysDate().getMonth());
    this.date.setFullYear(getTodaysDate().getFullYear());
    this.dateService.setDate(this.date);
  }

  isCurrentMonth(): boolean {
    if (!this.date) {
      return false;
    }
    return getTodaysDate().getMonth() == this.date.getMonth();
  }

  getCurrentMonth(): string {
    return getMonth(getTodaysDate());
  }
}
