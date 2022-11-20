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
import { EditUserComponent } from 'app/components/dialog/edit-user/edit-user.component';
import { ChangePasswordComponent } from 'app/components/dialog/edit-password/change-password.component';
import { PasswordEyeComponent } from './components/password-eye/password-eye.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MissingHoursWarning } from 'app/components/dialog/missing-hours-warning/missing-hours-warning.component';
import { NonWorkingDayLogWarning } from 'app/components/dialog/non-working-day-log-warning/non-working-day-log-working.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DarkModeSwitchComponent } from './components/dark-mode-switch/dark-mode-switch.component';

@NgModule({
  declarations: [
    EditUserComponent,
    AlertComponent,
    AnalyticsComponent,
    AppComponent,
    CalendarComponent,
    ChangePasswordComponent,
    DashboardComponent,
    DropdownComponent,
    EditWorkdayComponent,
    HeaderLessTabsDirective,
    LoginComponent,
    MissingHoursWarning,
    MonthSwitchComponent,
    NavbarComponent,
    NonWorkingDayLogWarning,
    PasswordEyeComponent,
    ResetPasswordComponent,
    SendEmailComponent,
    DarkModeSwitchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    NgxWebstorageModule.forRoot({
      prefix: 'timesheet',
      separator: '_',
    }),
    // Material imports
    BrowserAnimationsModule,
    IconsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule,
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
