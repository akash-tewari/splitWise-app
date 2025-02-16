import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
// import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';

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
    private tripService: TripsService,
    private route:Router,
    private participant:ParticipantFormComponent
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

  addExpenses()
  {
    this.route.navigateByUrl('/trips/'+this.trip.tripId+'/add-expenses');
  }
  addParticipants() {
    this.participant.addParticipant();
    this.route.navigateByUrl('/trips/'+this.trip.tripId+'/add-participants');
  }

}
