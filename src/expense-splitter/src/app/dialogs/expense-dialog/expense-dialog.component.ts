import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
  providers: [
    
]
})
@Injectable({
  providedIn: 'root'
})

export class ExpenseDialogComponent implements OnInit {
@Input() payeeArr: any;
@Input() payeName: any;
trip: any;
@Output() arr!:EventEmitter<FormArray>;
payeeForm:any;
isPayeeAdded: boolean=false;





ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.payeeForm=this.fb.group({
    payees:this.fb.array([]),
  });
}
constructor(
  private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder) { }



public get payeesArr(){
  return this.payeeForm.get('payees') as FormArray;
}

intializePayees(){
  for(var i=0;i<this.payeeArr.length;i++){
    this.payeesArr.push(this.fb.group({
      Name:this.payeeArr.at(i).value,
      Amount:this.fb.control(null)

    }));
  }
}

validatePayee(){
  if(this.payeName.value=="custom" && this.payeeArr.invalid){
    return true;
  }
  return false;
}

addPayees() {
  this.payeeForm.setControl('payees', this.payeesArr);
  this.isPayeeAdded = true;
  this.arr.emit(this.payeesArr);
}

   
  
}
