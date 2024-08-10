import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  trip!: Trip;
  private tripId!: string;
  private paramsSubscription$!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tripService: TripsService
  ){}

  ngOnInit(): void {
    this.paramsSubscription$ = this.activatedRoute.params.pipe(
      switchMap((params: Params)=>{
      this.tripId = params["id"];
      return this.tripService.getTripById(this.tripId);
    }))

    
    .subscribe(trip=> {this.trip = trip});
  }
  showTrip(){
    console.log(this.trip);
  }

}
