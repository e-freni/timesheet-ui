import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgSelectModule} from '@ng-select/ng-select';
import {DeleteComponent} from "app/components/menu-elements/icons/delete/delete.component";
import {PlusComponent} from "app/components/menu-elements/icons/plus/plus.component";
import {AuthInterceptor} from "app/interceptor/auth.interceptor.service";
import {NgxWebstorageModule} from "ngx-webstorage";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {EditWorkdayComponent} from './components/dashboard/edit-workday/edit-workday.component';
import {LoginComponent} from "./components/login/login.component";
import {DropdownComponent} from './components/menu-elements/dropdown/dropdown.component';
import {LeftarrowComponent} from './components/menu-elements/icons/leftarrow/leftarrow.component';
import {RightarrowComponent} from './components/menu-elements/icons/rightarrow/rightarrow.component';
import {TimeComponent} from './components/menu-elements/icons/time/time.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { CloseComponent } from './components/menu-elements/icons/close/close.component';
import { SpinningCircleComponent } from './components/menu-elements/icons/spinning-circle/spinning-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    DropdownComponent,
    LeftarrowComponent,
    RightarrowComponent,
    TimeComponent,
    EditWorkdayComponent,
    CloseComponent,
    PlusComponent,
    DeleteComponent,
    SpinningCircleComponent
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
    // Material imports
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
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
