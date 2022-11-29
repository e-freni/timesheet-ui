import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getHoursInDaysFormatter } from 'app/utils/date-utilities';
import { LocalStorageService } from 'ngx-webstorage';
import { SKIP_MONTH_KEY } from 'app.constants';

@Component({
  selector: 'app-add-eye',
  templateUrl: './missing-hours-warning.component.html',
})
export class MissingHoursWarning {
  missingDaysToMonthEnd: number;
  toLogHours: any;
  private readonly currentMonth: number;

  constructor(
    public dialogRef: MatDialogRef<MissingHoursWarning>,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.missingDaysToMonthEnd = data.missingDaysToMonthEnd;
    this.toLogHours = data.toLogHours;
    this.currentMonth = data.currentMonth;
  }

  back() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  dontShowForThisMonth() {
    this.localStorageService.store(SKIP_MONTH_KEY, this.currentMonth);
    this.close();
  }

  getHoursInDaysFormat(hours: number): string {
    return getHoursInDaysFormatter(hours).replace('(', '').replace(')', '');
  }
}
