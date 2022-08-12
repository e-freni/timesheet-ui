import {Component, OnInit} from '@angular/core';
import {Account} from "app/models/account.model";
import {AccountService} from "app/services/account.service";
import {DropDownOption} from "app/components/menu-elements/dropdown/dropdown-option.model";

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

      this.dropdownOptions.push({text: "Log out", operation: (() => this.accountService.logout())})


    });
  }

}
