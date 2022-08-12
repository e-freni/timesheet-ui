import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "app/components/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', component: LoginComponent}, //TODO timesheetMainPage
  {path: 'dashboard', component: DashboardComponent},
  // {path: 'component/:id/new', component: AComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
