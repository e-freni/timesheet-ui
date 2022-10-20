import {Component, OnInit} from '@angular/core';
import {Account} from "app/models/account.model";
import {AccountService} from "app/services/account.service";
import {DropDownOption} from "app/components/menu-elements/dropdown/dropdown-option.model";
import {isAdmin} from "app/utils/admin-utilities";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  account: Account = null;
  dropdownOptions: DropDownOption[] = []

  constructor(
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.account = account;
      if(isAdmin(account.role)){
        this.dropdownOptions.push({text: "Aggiungi utente", operation: (() => this.accountService.logout())})
        this.dropdownOptions.push({text: "Cambia password", operation: (() => this.accountService.logout())})
      }
      this.dropdownOptions.push({text: "Log out", operation: (() => this.accountService.logout())})
    });
  }

}
