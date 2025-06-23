import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Participant } from 'src/app/models/participant.model';
import { Trip } from 'src/app/models/tripDetails.model';

@Component({
  selector: 'app-payee-dialog',
  templateUrl: './payee-dialog.component.html',
  styleUrls: ['./payee-dialog.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    multi:true,
    useExisting:PayeeDialogComponent
  }]
})

@Injectable({
  providedIn:'root'
})

export class PayeeDialogComponent {

payeeForm: any;
payeeArr: any;

constructor(@Inject(DIALOG_DATA) public data: {trip:Trip},private fb:FormBuilder){}

initializePayee(participants: Participant[]) {
  // var participants=this.participants;
  // var splits = new FormArray<any>([]);
  this.payees.clear();
  for (var i = 0; i < participants.length; i++) {
    this.payees.push(this.fb.group({
      people: this.data.trip.particpants[i].name,
      amount:this.fb.control(0,Validators.required)
    }));
  }

  return this.payees;
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.payeeForm=this.fb.group({
    payeeArr:this.fb.array([])
  })

  this.initializePayee(this.data.trip.particpants);
  
}

removePayee(index: number) {
  if(index>0)
    return this.payees.controls.splice(index,1);
  else
    return this.payees;
}

public get payees(){
  return this.payeeForm.get("payeeArr") as FormArray;
}

}
