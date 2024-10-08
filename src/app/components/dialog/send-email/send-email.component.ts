import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExportService } from 'app/services/rest/export.service';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { AlertService } from 'app/services/alert.service';
import { EMAIL_PATTERN_VALIDATOR, uniqueFormArray } from 'app/utils/custom-validators';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
})
export class SendEmailComponent {
  isLoading: boolean = false;
  emailForm = this.formBuilder.group({
    emailAddresses: this.formBuilder.array(
      [new FormControl('', [Validators.required, EMAIL_PATTERN_VALIDATOR])],
      [uniqueFormArray]
    ),
    sendYourself: [false, []],
  });
  private date: Date;
  private account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private exportService: ExportService,
    private accountService: AccountService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.date = data.selectedMonthDate;
    this.account = data.account;
  }

  get emailAddresses(): FormArray {
    return this.emailForm.controls['emailAddresses'] as FormArray;
  }

  addRecipient() {
    const emailRecipient = new FormControl('', [Validators.required, EMAIL_PATTERN_VALIDATOR]);
    this.emailAddresses.push(emailRecipient);
  }

  getRecipients() {
    return this.emailForm.get('emailAddresses')!.value;
  }

  trashRecipient(index: number) {
    this.emailAddresses.removeAt(index);
  }

  back() {
    this.dialogRef.close();
  }

  close() {
    this.isLoading = false;
    this.dialogRef.close();
  }

  sendEmailRequest() {
    this.isLoading = true;
    this.addYourself();
    this.exportService
      .exportAndSendByEmail(this.date.getFullYear(), this.date.getMonth() + 1, this.account.id, this.getRecipients())
      .subscribe({
        error: response => {
          this.alertService.addAlert({ msg: `${response.status} - ${response.error?.message}`, type: 'alert' });
          this.isLoading = false;
        },
        complete: () => {
          this.alertService.addAlert({ msg: 'Invio email effettuato', type: 'primary' });
          this.close();
        },
      });
  }

  private addYourself() {
    if (this.emailForm.get('sendYourself')!.value) {
      this.emailAddresses.push(new FormControl(this.account?.email, [Validators.required, EMAIL_PATTERN_VALIDATOR]));
    }
  }
}
