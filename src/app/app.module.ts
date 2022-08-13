import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {AuthInterceptor} from "app/interceptor/auth.interceptor.service";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DropdownComponent} from './components/menu-elements/dropdown/dropdown.component';
import {LeftarrowComponent} from './components/menu-elements/icons/leftarrow/leftarrow.component';
import {RightarrowComponent} from './components/menu-elements/icons/rightarrow/rightarrow.component';
import {TimeComponent} from './components/menu-elements/icons/time/time.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    DropdownComponent,
    LeftarrowComponent,
    RightarrowComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({
      prefix: 'timesheet',
      separator: '_'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
