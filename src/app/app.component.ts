import {Component, OnInit} from '@angular/core';
import {AccountService} from "app/services/account.service";
import {Router} from "@angular/router";
import {Account} from "app/models/account.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timesheet-ui';
  loading = true;
  loggedIn: boolean | null = null;


  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      this.loggedIn = (account !== null);

      // redirect al login se non sono loggato
      if (!this.loggedIn) {
        this.router.navigateByUrl("");
        return;
      }

      // redirect a dashboard se loggato
      if (this.loggedIn) {
        this.accountService.redirect();
      }
      this.loading = false;
    });

    this.accountService.load();

  }
}
