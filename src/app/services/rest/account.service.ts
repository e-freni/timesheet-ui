import { Injectable } from '@angular/core';
import { JWT_STORAGE_KEY, SERVER_API_URL } from 'app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Account } from 'app/models/account.model';
import { Login } from 'app/models/login.model';
import { JwtToken } from 'app/models/jwt-token.model';
import { Router } from '@angular/router';
import { DateService } from 'app/services/date.service';
import { ChangePassword } from 'app/models/change-password';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountSubject = new ReplaySubject<Account | null>(1);
  private account: Account;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private dateService: DateService,
    private router: Router
  ) {}

  login(credentials: Login): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(SERVER_API_URL + '/account/login', credentials);
  }

  logout(): void {
    this.localStorageService.clear(JWT_STORAGE_KEY);
    this.account = null;
    this.accountSubject.next(null);
  }

  getAccount(): Subject<Account> {
    return this.accountSubject;
  }

  public updateUser(account: Account): void {
    this.account = account;
  }

  public load(): void {
    this.httpClient.get<Account>(SERVER_API_URL + '/account/info').subscribe({
      next: (account: Account) => {
        this.account = account;
        this.accountSubject.next(account);
      },
      error: () => {
        this.account = null;
        this.accountSubject.next(null);
      },
    });
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<HttpResponse<{}>> {
    const user: ChangePassword = { username: username, oldPassword: oldPassword, newPassword: newPassword };
    return this.httpClient.post<ChangePassword>(`${SERVER_API_URL}/account/change-password`, user, {
      observe: 'response',
    });
  }

  requestResetPassword(username: string): Observable<HttpResponse<{}>> {
    return this.httpClient.post<string>(`${SERVER_API_URL}/account/request-reset-password`, username, {
      observe: 'response',
    });
  }

  resetPassword(token: string): Observable<HttpResponse<{}>> {
    return this.httpClient.post<string>(`${SERVER_API_URL}/account/reset-password`, token, {
      observe: 'response',
    });
  }

  redirect() {
    if (!this.account) {
      return;
    }
    this.router.navigateByUrl('/dashboard').then();
  }
}
