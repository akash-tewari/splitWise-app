import { Component,Inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import { Trip } from 'src/app/models/tripDetails.model';
import { Split } from 'src/app/models/split.model';
import { Participant } from 'src/app/models/participant.model';


@Component({
  selector: 'app-split-among-dialog',
  templateUrl: './split-among-dialog.component.html',
  styleUrls: ['./split-among-dialog.component.scss'],
  providers:[{ 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: SplitAmongDialogComponent
  }]
})

@Injectable({
  providedIn: 'root'
})

export class SplitAmongDialogComponent {
  // splits!:FormArray;
  
  arr!: Array<any>;
  checked!: boolean;
  splitForm!: FormGroup;

  constructor(@Inject(DIALOG_DATA) public data: {trip:Trip},private fb:FormBuilder) { }

  initializeSplit(participants: Participant[]) {
      // var participants=this.participants;
      // var splits = new FormArray<any>([]);
      this.splitArr.clear();
      for (var i = 0; i < participants.length; i++) {
        this.splitArr.push(this.fb.group({
          people: this.data.trip.particpants[i].name
        }));
      }

      return this.splitArr;
    }

    onChecked(event: any, split: Split, i: number): void {
      if (event.checked == true) {
  
        this.arr.push(split);
        // this.splits.at(i).get('amount')?.setValue(this.splitAmong());
        console.log(this.arr);
        this.checked = true;
      }
  
      else {
        console.log(this.arr.splice(this.arr.indexOf(split),1));
      }
  
      
      // this.expenseForm.setControl('splits', this.splitAmong());
      // this.splitAmong();
  
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

    public get splitArr(){
      return this.splitForm.get('splits') as FormArray;
    }
  

}
