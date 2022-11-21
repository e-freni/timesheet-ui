import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';
import { DropDownOption } from 'app/components/menu-elements/dropdown/dropdown-option.model';
import { isAdmin } from 'app/utils/admin-utilities';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from 'app/components/dialog/edit-user/edit-user.component';
import { ChangePasswordComponent } from 'app/components/dialog/edit-password/change-password.component';
import { LocalStorageService } from 'ngx-webstorage';
import { getStandardModalsWidth } from 'app/utils/screen-utilities';

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
    this.accountSubscription = this.accountService.getAccount().subscribe({
      next: (account: Account | null) => {
        this.account = account;
        if (this.account && isAdmin(this.account?.role)) {
          this.dropdownOptions.push({ text: 'Aggiungi utente', operation: () => this.openAddUserDialog() });
        }
        this.dropdownOptions.push({ text: 'Modifica dati', operation: () => this.openEditUserDialog() });
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
    this.matDialog.open(EditUserComponent, {
      width: getStandardModalsWidth(),
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }

  private openChangePasswordDialog() {
    this.matDialog.open(ChangePasswordComponent, {
      width: getStandardModalsWidth(),
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: this.account.username,
    });
  }

  private openEditUserDialog() {
    this.matDialog.open(EditUserComponent, {
      width: getStandardModalsWidth(),
      disableClose: true,
      backdropClass: 'ts-backdrop',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: { isEdit: true },
    });
  }
}
