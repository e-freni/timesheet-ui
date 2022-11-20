import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_PATTERN_VALIDATOR } from 'app/utils/custom-validators';
import { Account, Authorities } from 'app/models/account.model';
import { ApplicationUserService } from 'app/services/rest/application-user.service';
import { ApplicationUser } from 'app/models/application-user.model';
import { AlertService } from 'app/services/alert.service';
import { AccountService } from 'app/services/rest/account.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
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
  account: Account;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    public applicationUserService: ApplicationUserService,
    public accountService: AccountService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) data: { isEdit?: boolean }
  ) {
    if (data?.isEdit) {
      this.isEdit = data.isEdit;
    }
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.accountService.getAccount().subscribe((account: Account | null) => {
        this.account = account;
        this.userForm.patchValue({
          firstName: this.account.firstName,
          lastName: this.account.lastName,
          username: this.account.username,
          email: this.account.email,
          role: this.account.role,
        });
        this.userForm.get('username').disable();
        this.userForm.get('role').disable();
      });
    }
  }

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
    if (this.isEdit) {
      this.editUser(user);
    } else {
      this.addUser(user);
    }
  }

  private addUser(user: ApplicationUser) {
    this.applicationUserService.addUser(user).subscribe({
      error: response => {
        this.error(response);
      },
      complete: () => {
        this.isLoading = false;
        this.alertService.addAlert({
          msg: `L'utente ${user.username} è stato aggiunto. La password è stata inviata a ${user.email}`,
          type: 'primary',
        });
        this.close();
      },
    });
  }

  private editUser(user: ApplicationUser) {
    this.applicationUserService.editUser(user).subscribe({
      error: response => {
        this.error(response);
      },
      complete: () => {
        this.isLoading = false;
        this.alertService.addAlert({
          msg: `L'utente ${user.username} è stato modificato`,
          type: 'primary',
        });
        this.close();
        location.reload();
      },
    });
  }

  private error(response: { status: any; error: { message: any } }) {
    this.isLoading = false;
    this.alertService.addAlert({ msg: `${response.status} - ${response.error?.message}`, type: 'alert' });
  }

  private getUserFromForm(): ApplicationUser {
    const user: any = {
      id: null,
      firstName: this.userForm.get('firstName')!.value,
      lastName: this.userForm.get('lastName')!.value,
      email: this.userForm.get('email')!.value,
      username: this.userForm.get('username')!.value,
      role: this.userForm.get('role')!.value,
    };

    if (this.isEdit) {
      user.id = this.account.id;
    }

    return user;
  }
}
