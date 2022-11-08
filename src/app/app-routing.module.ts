import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from 'app/pages/reset-password/reset-password.component';
import { LoginComponent } from 'app/pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  // {path: 'component/:id/new', component: AComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
