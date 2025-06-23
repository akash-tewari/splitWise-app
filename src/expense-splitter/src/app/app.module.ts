import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipantFormComponent } from './components/trips/trip/participant/participant-form/participant-form.component';
import { ExpenseFormComponent } from './components/expenses/expense-form/expense-form.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripComponent } from './components/trips/trip/trip.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environment/environment';
import { ParticipantComponent } from './components/trips/trip/participant/participant.component';
import { DatePipe } from './pipes/date.pipe';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SplitComponent } from './components/split/split.component';
import { ExpenseComponent } from './components/expenses/expense/expense.component';
import { MaterialModule } from 'src/material/material.module';
import { ExpenseDialogComponent } from './dialogs/expense-dialog/expense-dialog.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SplitCustomDialogComponent } from './dialogs/split-custom-dialog/split-custom-dialog.component';
import { SplitAmongDialogComponent } from './dialogs/split-among-dialog/split-among-dialog.component';
import { PayeeDialogComponent } from './dialogs/payee-dialog/payee-dialog.component';
import { LoginComponentComponent } from './components/login/login-component/login-component.component';

// import { MaterialModule } from 'src/material/material.module';
// import { MatCommonModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TripFormComponent,
    ParticipantFormComponent,
    ExpenseFormComponent,
    TripsComponent,
    TripComponent,
    ParticipantComponent,
    DatePipe,
    ExpensesComponent,
    ExpenseComponent,
    ExpenseDialogComponent,
    NavigationBarComponent,
    SplitCustomDialogComponent,
    SplitAmongDialogComponent,
    PayeeDialogComponent,
    LoginComponentComponent,
    // SplitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
