import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app.constants';
import { ApplicationUser } from 'app/models/application-user.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationUserService {
  constructor(private httpClient: HttpClient) {}

  addUser(user: ApplicationUser): Observable<HttpResponse<ApplicationUser>> {
    return this.httpClient.post<ApplicationUser>(`${SERVER_API_URL}/user/new`, user, { observe: 'response' });
  }

  editUser(user: ApplicationUser): Observable<HttpResponse<ApplicationUser>> {
    return this.httpClient.put<ApplicationUser>(`${SERVER_API_URL}/user/edit`, user, { observe: 'response' });
  }
}
