import { Component, OnInit } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { DropDownOption } from 'app/components/menu-elements/dropdown/dropdown-option.model';
import { isAdmin } from 'app/utils/admin-utilities';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from 'app/components/dialog/add-user/add-user.component';
import { ChangePasswordComponent } from 'app/components/dialog/edit-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  account: Account = null;
  dropdownOptions: DropDownOption[] = [];

  private accountSubscription: Subscription;

  constructor(private accountService: AccountService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getObservableAccount().subscribe({
      next: (account: Account | null) => {
        this.account = account;
        if (isAdmin(this.account?.role)) {
          this.dropdownOptions.push({ text: 'Aggiungi utente', operation: () => this.openAddUserDialog() });
        }
        this.dropdownOptions.push({ text: 'Modifica dati', operation: () => this.accountService.logout() });
        this.dropdownOptions.push({ text: 'Cambia password', operation: () => this.openChangePasswordDialog() });
        this.dropdownOptions.push({
          text: 'Log out',
          operation: () => {
            this.accountService.logout();
          },
        });
      },
    });
  }

  private openAddUserDialog() {
    this.matDialog.open(AddUserComponent, {
      width: '40%',
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  private openChangePasswordDialog() {
    this.matDialog.open(ChangePasswordComponent, {
      width: '40%',
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: this.account.username,
    });
  }
}
