import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-non-working-day-log-warning',
  templateUrl: './non-working-day-log-warning.component.html',
})
export class NonWorkingDayLogWarning {
  constructor(public dialogRef: MatDialogRef<NonWorkingDayLogWarning>) {}

  back() {
    this.close();
  }

  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
