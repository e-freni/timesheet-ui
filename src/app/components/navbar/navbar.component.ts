import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { DropDownOption } from 'app/components/menu-elements/dropdown/dropdown-option.model';
import { isAdmin } from 'app/utils/admin-utilities';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from 'app/components/dialog/add-user/add-user.component';
import { ChangePasswordComponent } from 'app/components/dialog/edit-password/change-password.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  checked: boolean = false;

  account: Account = null;
  dropdownOptions: DropDownOption[] = [];

  private accountSubscription: Subscription;

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateTheme();
    this.accountSubscription = this.accountService.getAccount().subscribe({
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

  changeTheme() {
    const theme = this.localStorageService.retrieve('ui_theme');

    if (theme === 'dark') {
      this.localStorageService.store('ui_theme', 'light');
      this.checked = false;
    } else {
      this.localStorageService.store('ui_theme', 'dark');
      this.checked = true;
    }
    this.updateTheme();
  }

  private updateTheme() {
    const theme = this.localStorageService.retrieve('ui_theme');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
      this.checked = false;
    }
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
