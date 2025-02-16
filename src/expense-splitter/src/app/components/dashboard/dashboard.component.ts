import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { TripComponent } from '../trips/trip/trip.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  trips!:Trip[];
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
  
}
