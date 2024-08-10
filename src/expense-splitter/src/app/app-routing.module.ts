import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { ParticipantFormComponent } from './components/trips/trip/participant/participant-form/participant-form.component';
import { ExpenseFormComponent } from './components/expenses/expense-form/expense-form.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripComponent } from './components/trips/trip/trip.component';

const routes: Routes = [
  {path:'', component : DashboardComponent},
  {path:'add-trip', component: TripFormComponent},
  { path: 'trips', component: TripsComponent},
  { path: 'trips/:id', component: TripComponent},
  {path:'trips/:id/add-participants', component: ParticipantFormComponent},
  {path:'trips/:id/add-expenses', component: ExpenseFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
