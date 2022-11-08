import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_PATTERN_VALIDATOR } from 'app/utils/custom-validators';
import { Authorities } from 'app/models/account.model';
import { ApplicationUserService } from 'app/services/rest/application-user.service';
import { ApplicationUser } from 'app/models/application-user.model';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-add-eye',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  isLoading: boolean = false;

  userForm = this.formBuilder.group({
    id: null,
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, EMAIL_PATTERN_VALIDATOR]],
    role: ['', [Validators.required]],
  });

  availableRoles: string[] = [Authorities.USER, Authorities.ADMINISTRATOR];

  constructor(
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    public applicationUserService: ApplicationUserService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  back() {
    this.dialogRef.close();
  }

  close() {
    this.isLoading = false;
    this.dialogRef.close();
  }

  addUserRequest() {
    this.isLoading = true;
    const user: ApplicationUser = this.getUserFromForm();
    this.applicationUserService.addUser(user).subscribe({
      error: response => {
        this.isLoading = false;
        this.alertService.addAlert({ msg: `${response.status} - ${response.error?.message}`, type: 'alert' });
      },
      complete: () => {
        this.isLoading = false;
        this.alertService.addAlert({
          msg: `L'utente effettuato ${user.username} è stato aggiunto. La password è stata inviata a ${user.email}`,
          type: 'primary',
        });
        this.close();
      },
    });
  }

  private getUserFromForm(): ApplicationUser {
    return {
      firstName: this.userForm.get('firstName')!.value,
      lastName: this.userForm.get('lastName')!.value,
      email: this.userForm.get('email')!.value,
      username: this.userForm.get('username')!.value,
      role: this.userForm.get('role')!.value,
    };
  }
}
