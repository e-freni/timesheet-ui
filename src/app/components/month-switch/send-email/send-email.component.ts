import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

const EMAIL_VALIDATOR = Validators.pattern('^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,5}$');

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent {
  isLoading: boolean = false;
  emailForm = this.formBuilder.group({
    emailAddresses: this.formBuilder.array([new FormControl('', [Validators.required, EMAIL_VALIDATOR])]),
  });
  private date: Date;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.date = data.selectedMonthDate;
  }

  get emailAddresses(): FormArray {
    return this.emailForm.controls['emailAddresses'] as FormArray;
  }

  addRecipient() {
    const emailRecipient = new FormControl('', [Validators.required, EMAIL_VALIDATOR]);
    this.emailAddresses.push(emailRecipient);
  }

  trashEmail(index: number) {
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
    //TODO email service
    console.log('SEND!');

    this.close();
  }
}
