import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { TripComponent } from '../trips/trip/trip.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from 'src/app/dialogs/expense-dialog/expense-dialog.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  trips!:Trip[];
  tripName!: String;
  tripDate!: String | DatePipe;
  // $trips!:Subscription;
  showFiller= false;
  shouldRun=false;
  constructor(private service:TripsService,private dialog: MatDialog,private route:Router){
    
  }
  ngOnInit(): void {
    // this.$trips=this.service.getTrips().subscribe(trips=>{this.trips=trips})
  }
  ngOnDestroy(): void {
    // this.$trips.unsubscribe();
  }
  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string, tripId:string): void {
  //   this.route.navigateByUrl("/trips/"+tripId);
  //   this.dialog.open(TripComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
  openDialog():void{
    var tripDialog=this.dialog.open((ExpenseDialogComponent),{data:{tripName:this.tripName,tripDate:this.tripDate}});
    tripDialog.afterClosed().subscribe(trip=>{
      console.log(trip);
    })
    
  }
  
}
