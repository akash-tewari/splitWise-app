import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { ParticipantFormComponent } from './components/trips/trip/participant/participant-form/participant-form.component';
import { ExpenseFormComponent } from './components/expenses/expense-form/expense-form.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripComponent } from './components/trips/trip/trip.component';
import { ExpenseComponent } from './components/expenses/expense/expense.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponentComponent } from './components/login/login-component/login-component.component';
import { authGuard } from './guardAuth/auth.guard';
import { deactivateAuthGuard } from './deactivateGuard/auth.guard';

const routes: Routes = [
  {path:'', component : DashboardComponent, canActivate:[authGuard]},
  // {path:'add-trip', component: TripFormComponent},
  { path: ':id/trips', component: TripsComponent, canActivate:[authGuard]},
  { path: 'login', component: LoginComponentComponent, canActivate:[deactivateAuthGuard]},
  { path: ':id/trips/:name', component: TripComponent},
  {path:':id/trips/:name/add-expenses', component: ExpenseFormComponent},
  { path: ':id/trips/:name/:expense', component: ExpenseComponent},
  {path:':id/trips/:name/add-participants', component: ParticipantFormComponent, pathMatch:'full'},
  {path: 'signUp', component:SignUpComponent, canActivate:[deactivateAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
