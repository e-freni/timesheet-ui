import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditWorkdayComponent } from 'app/components/dialog/edit-workday/edit-workday.component';
import { IconsModule } from 'app/components/menu-elements/icons/icons.module';
import { AuthInterceptor } from 'app/interceptor/auth.interceptor.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CalendarComponent } from 'app/pages/dashboard/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
import { DropdownComponent } from './components/menu-elements/dropdown/dropdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertComponent } from './components/alert/alert.component';
import { MonthSwitchComponent } from './components/month-switch/month-switch.component';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/dashboard/analytics/analytics.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderLessTabsDirective } from 'app/components/header-less-tabs.directive';
import { SendEmailComponent } from './components/dialog/send-email/send-email.component';
import { AddUserComponent } from './components/dialog/add-user/add-user.component';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    LoginComponent,
    CalendarComponent,
    NavbarComponent,
    DropdownComponent,
    EditWorkdayComponent,
    MonthSwitchComponent,
    DashboardComponent,
    AnalyticsComponent,
    HeaderLessTabsDirective,
    SendEmailComponent,
    AddUserComponent,
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
      separator: '_',
    }),
    // Material imports
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    IconsModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
