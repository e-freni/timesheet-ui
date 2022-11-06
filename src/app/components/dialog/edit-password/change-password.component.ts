import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'app/utils/custom-validators';
import { AlertService } from 'app/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'app/services/rest/account.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  isLoading: boolean = false;

  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideNewConfirmPassword: boolean = true;
  editPasswordForm = this.formBuilder.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    },
    {
      validators: matchPasswordsValidator,
    }
  );
  private username: string;

  constructor(
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    public accountService: AccountService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) username: string
  ) {
    this.username = username;
  }

  back() {
    this.dialogRef.close();
  }

  close() {
    this.isLoading = false;
    this.dialogRef.close();
  }

  changePassword() {
    const currentPassword = this.editPasswordForm.get('currentPassword')!.value;
    const password = this.editPasswordForm.get('password')!.value;
    this.accountService.changePassword(this.username, currentPassword, password).subscribe({
      error: response => {
        this.alertService.addAlert({ msg: `${response.status} - ${response.error.message}`, type: 'alert' });
        this.isLoading = false;
      },
      complete: () => {
        this.alertService.addAlert({ msg: 'Cambio password effettuato', type: 'primary' });
        this.close();
      },
    });
  }

  changeHideCurrentPassword(hidePassword: boolean) {
    this.hideCurrentPassword = hidePassword;
  }

  changeHideNewPassword(hidePassword: boolean) {
    this.hideNewPassword = hidePassword;
  }

  changeHideNewConfirmPassword(hidePassword: boolean) {
    this.hideNewConfirmPassword = hidePassword;
  }
}
