import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap, Timestamp } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Participant } from 'src/app/models/participant.model';
// import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  trip!: any;
  // tripDate:any;
  participantData!:Participant;
  private tripId!: string;
  private paramsSubscription$!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tripService: TripsService,
    private route:Router,
    // private participant:ParticipantFormComponent,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.paramsSubscription$ = this.activatedRoute.params.pipe(
      switchMap((params: Params)=>{
      this.tripId = params["id"];
      return this.tripService.getTripById(this.tripId);
    })).subscribe(trip=> {this.trip = trip;
      console.log(trip);
    });


  }
  showTrip(){
    console.log(this.trip);
  }

  addExpenses()
  {
    this.route.navigateByUrl('/trips/'+this.trip.tripId+'/add-expenses');
  }
  addParticipants() {
    var dialogRef=this.dialog.open(ParticipantFormComponent);
    dialogRef.afterClosed().subscribe(participant=>{
      this.tripService.addParticipantsToTrip(this.tripId,participant);
    });
    // this.participant.addParticipant();
    // this.route.navigateByUrl('/trips/'+this.trip.tripId+'/add-participants');
  }

}
