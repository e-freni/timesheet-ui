import {Injectable} from '@angular/core';
import {JWT_STORAGE_KEY, SERVER_API_URL} from "app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {Account} from "app/models/account.model";
import {Login} from "app/models/login.model";
import {JwtToken} from "app/models/jwt-token.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountSubject = new ReplaySubject<Account | null>(1);
  private account: Account;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  login(credentials: Login): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(SERVER_API_URL + '/account/login', credentials);
  }


  logout(): void {
    this.localStorageService.clear(JWT_STORAGE_KEY);
    this.account = null;
    this.accountSubject.next(null);
  }

  getAccount(): Account | null {
    return this.account;
  }

  getObservableAccount(): Observable<Account | null> {
    return this.accountSubject.asObservable();
  }


  hasRole(role: string): boolean {
    return this.account?.authorities.includes(role);
  }

  public load(): void {
    this.httpClient.get<Account>(SERVER_API_URL + '/account/info')
      .subscribe(
        {
          next: (account: Account) => {
            this.account = account;
            this.accountSubject.next(account);
          },
          error: () => {
            this.account = null;
            this.accountSubject.next(null);
          }
        }
      );
  }

  redirect() {
    if (!this.account) {
      return;
    }
    this.router.navigateByUrl("/dashboard");
  }


}
