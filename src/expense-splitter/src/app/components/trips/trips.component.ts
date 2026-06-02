import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  providers:[TripFormComponent]
})

export class TripsComponent implements OnInit {
  trips:any;
  id:any;
  $trips: Subscription = new Subscription;
  constructor(private db:TripsService,private trip:TripFormComponent,private fireAuth:AngularFireAuth){
    
  }
  
  ngOnInit(): void {
    this.fireAuth.authState.subscribe(user=>{this.showTrips(user?.uid)});
    
  }

  showTrips(id:string |undefined){
    this.db.getTrips(id).subscribe(user=>{this.trips= user?.trips});
  }
  show(value:string){
    console.log(value);
  }
  // getTrip(i:number){
  //   let id="";
  //   this.db.getTripById(this.trip.tripId[i]).subscribe(trip=>{console.log(trip)});
    
  // }  
}
