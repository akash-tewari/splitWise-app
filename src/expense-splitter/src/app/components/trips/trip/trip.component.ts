import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap, Timestamp } from 'rxjs';
import { Trip } from 'src/app/models/tripDetails.model';
import { addParticipantSub$, TripsService } from 'src/app/services/trips.service';
import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Participant } from 'src/app/models/participant.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from 'src/app/models/user.model';
// import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  trip!: any;
  tripSubscription$!:Subscription;

  // tripDate:any;
  participantData1$!:Subscription;
  participantData2$!:Subscription;
  private userId!: any;
  private paramsSubscription$!: Subscription;
  user: any;
  tripName:string="";
  private userSubscription$!:Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fdb:AngularFirestore,
    private tripService: TripsService,
    private route:Router,
    private fa:AngularFireAuth,
    // private participant:ParticipantFormComponent,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.userSubscription$=this.fa.authState.subscribe(user=>{
      if(user){
        this.userId=user.uid;
        this.showTrip()
      }
    }
  )
  this.paramsSubscription$=this.activatedRoute.params.pipe(
      switchMap((params:Params)=>{
          return params['name'];
      })
    ).subscribe(name=>{
      console.log(name);
      this.tripName+=name;
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription$.unsubscribe();
    this.paramsSubscription$.unsubscribe();
    this.tripSubscription$.unsubscribe();
    

  }

  showTrip(){
    this.tripSubscription$=this.tripService.getTrips(this.userId).subscribe(userDet=>{
      if(userDet)
        userDet.trips.find((trip:Trip)=>{
      if(trip.tripName==this.tripName){
        this.trip=trip;
      }
      })
    })
    
  }

  addExpenses()
  {
    this.route.navigateByUrl(this.userId+'/trips/'+this.tripName+'/add-expenses');
  }
  addParticipants() {
    var isAdded=false;
    var dialogRef=this.dialog.open(ParticipantFormComponent);
    this.participantData1$=dialogRef.afterClosed().subscribe(participant=>{
      // this.trip.particpants.push(participant);
      if(this.trip.participants == undefined)
        this.trip['particpants']=participant.value;
      else
        this.trip.particpants.push(...participant.value);
      this.participantData2$=this.tripService.getTrips(this.userId).subscribe(user=>{
        let i=0;
        if(user){
          let arr=user.trips;
          i=arr.findIndex((item:any)=>item.tripName==this.trip.tripName);         
          user.trips[i]=this.trip;
          this.tripService.addParticipantsToTrip(this.userId,user.trips);
          this.participantData1$.unsubscribe();
          this.participantData2$.unsubscribe();
        }
      });
      
      
    });
    // this.participantData2$=

    
    // this.participant.addParticipant();
    // this.route.navigateByUrl('/trips/'+this.trip.tripId+'/add-participants');
  }

}
