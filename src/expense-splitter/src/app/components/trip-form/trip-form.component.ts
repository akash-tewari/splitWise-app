import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ExpenseDialogComponent } from 'src/app/dialogs/expense-dialog/expense-dialog.component';
import { Trip } from 'src/app/models/tripDetails.model';
import { user } from 'src/app/models/user.model';
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})

export class TripFormComponent {
  trip!: Trip;
  id: any;
  user: any;
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
    private dialog: MatDialog,
    private fa:AngularFireAuth,
    private firestore:AngularFirestore){
    // this.trip=this.fb.group({
    //   tripDate: this.fb.control(null, Validators.required),
    //   tripName: this.fb.control(null, Validators.required)
    // });

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.activatedRoute.params.pipe(
    //   switchMap((params:Params)=>{
    //     // this.db.addTrip(this.trip,params["id"]);
    //     return params['id'];
    //   })
    // ).subscribe((userId)=>{this.id=userId});
    this.fa.authState.subscribe(user=>{
      this.id=user?.uid;
    })
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
  submit(data:Trip){
    
    this.db.addTrip(data,this.id);
    

    
    

  }
  
}
