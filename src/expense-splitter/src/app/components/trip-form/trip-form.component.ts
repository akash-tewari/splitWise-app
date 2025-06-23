import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseDialogComponent } from 'src/app/dialogs/expense-dialog/expense-dialog.component';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})

export class TripFormComponent {
  trip!: Trip;
  // myFilter= (d: Date | any): any => {
  //   const day = (new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return d > day;
  // };
  

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private db:TripsService,
    private activatedRoute:ActivatedRoute,
    private dialog: MatDialog){
    // this.trip=this.fb.group({
    //   tripDate: this.fb.control(null, Validators.required),
    //   tripName: this.fb.control(null, Validators.required)
    // });

  }
   openDialog():void{
      var tripDialog=this.dialog.open((ExpenseDialogComponent));
      tripDialog.afterClosed().subscribe(trip=>{
        if(trip!=undefined){
          this.trip=trip;
          this.submit(this.trip);
          console.log(this.trip);
        }
          
      })}
  submit(data:any){
    this.db.addTrip(data.value)
    .subscribe(id=>{
      this.router.navigateByUrl('/trips/'+id);
    });

    
    

  }
  
}
