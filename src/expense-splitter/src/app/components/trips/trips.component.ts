import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  providers:[TripFormComponent]
})

export class TripsComponent implements OnInit {
  trips:Trip[]=[];
  $trips: Subscription = new Subscription;
  constructor(private db:TripsService,private trip:TripFormComponent){
    
  }
  
  ngOnInit(): void {
    this.showTrips();
  }

  showTrips(){
    this.$trips=this.db.getTrips().subscribe(trips=>{this.trips=trips});
  }

  // getTrip(i:number){
  //   let id="";
  //   this.db.getTripById(this.trip.tripId[i]).subscribe(trip=>{console.log(trip)});
    
  // }  
}
