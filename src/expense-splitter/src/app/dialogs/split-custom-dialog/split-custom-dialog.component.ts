import { Component,Inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import { Trip } from 'src/app/models/tripDetails.model';
import { Split } from 'src/app/models/split.model';
import { Participant } from 'src/app/models/participant.model';

@Component({
  selector: 'app-split-custom-dialog',
  templateUrl: './split-custom-dialog.component.html',
  styleUrls: ['./split-custom-dialog.component.scss'],
  providers:[{ 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: SplitCustomDialogComponent
  }]
})

@Injectable({
  providedIn: 'root'
})

export class SplitCustomDialogComponent {

  arr!: Array<any>;
  // checked!: boolean;
  splitForm!: FormGroup;

  constructor(@Inject(DIALOG_DATA) public data: {trip:Trip},private fb:FormBuilder) { }

  initializeSplit(participants: Participant[]) {
      // var participants=this.participants;
      // var splits = new FormArray<any>([]);
      this.splitArr.clear();
      for (var i = 0; i < participants.length; i++) {
        this.splitArr.push(this.fb.group({
          people: this.data.trip.particpants[i].name,
          amount:this.fb.control(null,Validators.required)
        }));
      }

      return this.splitArr;
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.splitForm=this.fb.group({
        splits:this.fb.array([])
      });
      this.arr=[];
      
      this.initializeSplit(this.data.trip.particpants);
      
      
    }

    removeSplit(n:number) {
      if(n!=0)
        return this.splitArr.controls.splice(n,1);
      else
        return this.splitArr;
      }

    public get splitArr(){
      return this.splitForm.get('splits') as FormArray;
    }
  
}







