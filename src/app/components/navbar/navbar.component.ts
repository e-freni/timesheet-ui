import { Component, OnInit } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/account.service';
import { DropDownOption } from 'app/components/menu-elements/dropdown/dropdown-option.model';
import { isAdmin } from 'app/utils/admin-utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  account: Account = null;
  dropdownOptions: DropDownOption[] = [];

  private accountSubscription: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getObservableAccount().subscribe({
      next: (account: Account | null) => {
        this.account = account;
        if (isAdmin(this.account?.role)) {
          this.dropdownOptions.push({ text: 'Aggiungi utente', operation: () => this.accountService.logout() });
          this.dropdownOptions.push({ text: 'Cambia password', operation: () => this.accountService.logout() });
        }
        this.dropdownOptions.push({
          text: 'Log out',
          operation: () => {
            this.accountService.logout();
          },
        });
      },
    });
  }
}
