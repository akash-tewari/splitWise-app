import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { Participant } from 'src/app/models/participant.model';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class ParticipantFormComponent {
  tripId:string ="";
  tripId$!:Subscription;
  participantForm:any;
  i:number=0;
  name: any;
  participants!: Participant[];
  

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private db:TripsService){
    this.participantForm=this.fb.group({
      participants:this.fb.array([this.fb.group({
        name:this.fb.control(null,[Validators.required,Validators.pattern(/[a-z]/gi)]),
        phoneNumber:this.fb.control(null,Validators.required)
      })])

    });
    this.tripId$=this.route.params.subscribe(param=>{
      this.tripId=param['id'];
    });
    
    
  }
  // ngOnDestroy(): void {
  //   this.participants.push(this.participantForms.value);
  // }
  // ngOnInit(): void {
  //   this.participants=[];
  // }

  addParticipant()
  {
    if(this.i<50)
    {
      this.i+=1;
      return this.participantForms.push(
        this.fb.group({
          name:this.fb.control(null,[Validators.required,Validators.pattern(/[a-z]/gi)]),
          phoneNumber:this.fb.control(null,Validators.required)
        })
      );
    }
    else{
      alert('More than 50 cannot be added');
    }
    
  }

  // removeParticipant(i:any){
  //   this.i-=1;
  //   return this.participantForms.removeAt(i);
  // }

  // removeAllParticipant()
  // {
  //   return this.participantForms.clear();
  // }
  
  saveParticipants(){
    console.log(this.participantForms.value);
    this.db.addParticipantsToTrip(this.tripId,this.participantForms);
    // this.addParticipant();
    this.router.navigateByUrl("/trips/"+this.tripId);
  }
  // onInput(){
  //   if(this.participantForms.controls[0].hasError('pattern')){
  //     alert('Enter a valid name');
  //   }
  // }

  public get participantForms()
  {
    return this.participantForm.get('participants') as FormArray;
  }
}
