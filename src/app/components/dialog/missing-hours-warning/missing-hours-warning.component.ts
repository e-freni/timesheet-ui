import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getHoursInDaysFormatter } from 'app/utils/date-utilities';

@Component({
  selector: 'app-add-eye',
  templateUrl: './missing-hours-warning.component.html',
})
export class MissingHoursWarning implements OnInit {
  missingDaysToMonthEnd: number;
  toLogHours: any;
  private account: any;

  constructor(public dialogRef: MatDialogRef<MissingHoursWarning>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.missingDaysToMonthEnd = data.missingDaysToMonthEnd;
    this.toLogHours = data.toLogHours;
  }

  ngOnInit(): void {}

  back() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  dontShowForThisMonth() {}

  getHoursInDaysFormat(hours: number): string {
    return getHoursInDaysFormatter(hours).replace('(', '').replace(')', '');
  }
}
