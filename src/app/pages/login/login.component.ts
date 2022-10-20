import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {FormBuilder} from "@angular/forms";
import {JwtToken} from "app/models/jwt-token.model";
import {JWT_STORAGE_KEY} from "app.constants";
import {AccountService} from "app/services/account.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
  ) {
  }

  login(): void {
    this.accountService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value
      })
      .subscribe({
        next: (jwtToken: JwtToken) => {
          this.localStorageService.store(JWT_STORAGE_KEY, jwtToken.token);

          this.accountService.load();
        }
      });
  }
}
