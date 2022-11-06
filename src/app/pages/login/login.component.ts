import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtToken } from 'app/models/jwt-token.model';
import { JWT_STORAGE_KEY } from 'app.constants';
import { AccountService } from 'app/services/account.service';
import { AlertService } from 'app/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  private accountSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  login(): void {
    this.accountSubscription = this.accountService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      })
      .subscribe({
        next: (jwtToken: JwtToken) => {
          this.localStorageService.store(JWT_STORAGE_KEY, jwtToken.token);
          this.accountService.load();
        },
        error: res => {
          if (res.status == 504)
            this.alertService.addAlert({
              type: 'alert',
              msg: 'Server non trovato. Il backend è online e raggiungibile?',
            });
          if (res.status == 401)
            this.alertService.addAlert({ type: 'alert', msg: 'Login non riuscita. Utente e password sono corretti?' });
        },
      });
  }

  changeHidePassword(hidePassword: boolean) {
    this.hidePassword = hidePassword;
  }
}
