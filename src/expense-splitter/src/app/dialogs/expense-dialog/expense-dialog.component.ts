import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting:ExpenseDialogComponent
  }
    
]
})
@Injectable({
  providedIn: 'root'
})

export class ExpenseDialogComponent implements OnInit {
tripForm:any;
myFilter= (d: Date | any): any => {
  const day = (new Date()).getDay();
  // Prevent Saturday and Sunday from being selected.
  return d > day;
};

ngOnInit(): void {
  this.tripForm=this.fb.group({
    tripName:this.fb.control(null,Validators.required),
    tripDate:this.fb.control(null,Validators.required)
  });
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.payeeForm=this.fb.group({
  //   payees:this.fb.array([]),
  // });
}
constructor(
  private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder) {}


  public get tripFrm(){
    return this.tripForm;
  }
  public get name(){
    return this.tripForm.get("tripName");
  }

  public get date(){
    return this.tripForm.get("tripDate");
  }
closeDialog(){
 this.dialog.closeAll();
}
// public get payeesArr(){
//   return this.payeeForm.get('payees') as FormArray;
// }

// intializePayees(){
//   for(var i=0;i<this.payeeArr.length;i++){
//     this.payeesArr.push(this.fb.group({
//       Name:this.payeeArr.at(i).value,
//       Amount:this.fb.control(null)

//     }));
//   }
// }

// validatePayee(){
//   if(this.payeName.value=="custom" && this.payeeArr.invalid){
//     return true;
//   }
//   return false;
// }

// addPayees() {
//   this.payeeForm.setControl('payees', this.payeesArr);
//   this.isPayeeAdded = true;
//   this.arr.emit(this.payeesArr);
// }

   
  
}
