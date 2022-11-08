import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'app/services/rest/account.service';
import { AlertService } from 'app/services/alert.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  isLoading: boolean = false;

  firstStepForm = this.formBuilder.group({
    username: ['', Validators.required],
  });
  secondStepForm = this.formBuilder.group({
    confirmationToken: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  requestResetPassword(stepper: MatStepper) {
    this.isLoading = true;
    const username = this.firstStepForm.get(['username'])!.value;
    this.accountService.requestResetPassword(username).subscribe({
      error: response => {
        this.isLoading = false;
        if (response.status == 404) {
          this.alertService.addAlert({
            msg: `Questo utente non esiste, l'hai scritto bene? eh? ehhhhh?`,
            type: 'alert',
          });
        } else {
          this.alertService.addAlert({ msg: `${response.status} - ${response.error?.message}`, type: 'alert' });
        }
      },
      complete: () => {
        this.isLoading = false;
        stepper.next();
      },
    });
  }

  resetPassword(stepper: MatStepper) {
    this.isLoading = true;
    const confirmationToken = this.secondStepForm.get(['confirmationToken'])!.value;
    this.accountService.resetPassword(confirmationToken).subscribe({
      error: response => {
        this.isLoading = false;
        this.alertService.addAlert({ msg: `${response.status} - ${response.error?.message}`, type: 'alert' });
      },
      complete: () => {
        this.isLoading = false;
        stepper.next();
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 5000);
      },
    });
  }
}
