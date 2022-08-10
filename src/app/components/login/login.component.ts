import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // const db = getFirestore();
    // const usersRef = collection(db, 'user');
    // const users = query(usersRef);

    // this.httpClient
    //   .get('http://localhost:5000')
    //   .subscribe((users) => console.log(users));
  }
}
