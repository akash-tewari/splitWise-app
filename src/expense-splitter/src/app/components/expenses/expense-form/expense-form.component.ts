import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError, Subscription, throwError } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { Participant } from 'src/app/models/participant.model';
import { Split } from 'src/app/models/split.model';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';
import { ControlValueAccessor } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseDialogComponent } from 'src/app/dialogs/expense-dialog/expense-dialog.component';
import { SplitAmongDialogComponent } from 'src/app/dialogs/split-among-dialog/split-among-dialog.component';
import { SplitCustomDialogComponent } from 'src/app/dialogs/split-custom-dialog/split-custom-dialog.component';
import { PayeeDialogComponent } from 'src/app/dialogs/payee-dialog/payee-dialog.component';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { ExpenseDialogComponent } from 'src/app/dialogs/expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ExpenseFormComponent,
    
    
  },
  { provide: MAT_DIALOG_DATA, useValue: {} },
  // { provide: MdDialogRef, useValue: {} }, --> deprecated
  { provide: MatDialogRef, useValue: {} } 
  ]
})


export class ExpenseFormComponent implements OnInit, OnDestroy, OnChanges {
  expenseForm: any;
  checked: boolean = false;
  participants: Participant[] = []
  i: number = 0;
  tripId!: string;
  tripID$!: Subscription;
  trip!: Trip;
  // splitType!:FormControl;
  splitTypes: Array<String>=["split-equally-among-all","split-among-equally","split-custom"];
  payee!: FormControl;
  splits!: FormArray;
  amount!: FormControl;
  peoples: string[] | undefined;
  // splitForm!: FormGroup;
  arr: Split[] = [];
  payees!: FormArray<any>;
  payment!: FormControl<any>;
  isSplitCustom: boolean = false;
  isSplitAmong: boolean = false;
  isPayeeAdded: boolean = false;
  sum: number = 0;
  callbackTouchedFn: any;


  constructor(private fb: FormBuilder,
    private db: TripsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

  //  onClick():void{
  //   if(this.payeName.value=="custom"){
  //     let dialogRef=this.dialog.open(ExpenseDialogComponent,{
  //       data:{title:"Dialog Box"}
  //     });
  //     dialogRef.afterClosed().subscribe(data=>{this.data=data});
  //     console.log(this.data);
  //   }
  
    
  // }
   

  registerOnTouched(fn: any): void {
    this.callbackTouchedFn = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.splitArr.push(this.initializeSplit(this.participants))
  }

  ngOnInit(): void {
    this.payee = this.fb.control(null, Validators.required);

    this.expenseForm = this.fb.group({
      description: this.fb.control(null, Validators.required),
      amount: this.fb.control(null, Validators.required),
      splitType: this.fb.control(null, Validators.required),
      payee: this.fb.control(null, Validators.required),
      splits: this.fb.array([]),
      payees: this.fb.array([])
      // splitForm: this.splitForm = this.fb.group({
      //   splits: this.splits = this.fb.array([])
      // }
    });

    this.splitArr.valueChanges.subscribe(()=>{
      this.sum = (this.splitArr.value as []).reduce((sum: number, x:any)=> sum + x.amount, 0);
    });

    this.tripID$ = this.route.params.subscribe(params => {

      this.tripId = params['id'];
    });

    this.db.getTripById(this.tripId).subscribe(_trip => {
      this.trip = _trip;
      this.participants = [...this.initializeParticipants()];
      // this.payees = this.initializePayees();
      // this.initializeSplit(this.initializeParticipants());

    });

    // this.expenseForm.setControl('payee', this.payees);


  }

  ngOnDestroy(): void {
    this.tripID$.unsubscribe();
  }

  public get splitArr() {
    return this.expenseForm.get('splits') as FormArray;
  }

  public get amountVal() {
    return this.expenseForm.get('amount');
  }

  public get payeeArr() {
    return this.expenseForm.get('payees');
  }

  public get payeName() {
    return this.expenseForm.get('payee');
  }
  public get splitTyp(){
    return this.expenseForm.get('splitType');
  }

  removeParicipant(i: number) {
    if (this.splitArr.length > 2) {

      this.splitArr.removeAt(i);
      
    }
    else {
      alert('atleast 2 participants are required');
    }
  }

  initializeParticipants() {
    var participants = [];
    for (var i = 0; i < this.trip.particpants.length; i++) {

      participants[i] = this.trip.particpants[i];
    }
    return participants;

  }

  

  initializePayees() {
    this.payeeArr.clear();
    for (var i = 0; i < this.participants.length; i++) {
      this.payeeArr.push(this.fb.group({
        name: this.participants[i].name,
        payment: this.payment = this.fb.control(null, Validators.required)
      }))
    }
  }


  validateForm() {
    var isPresent=false;

    if (this.expenseForm.valid) {
      return false;

    }
    
    return true;
  }

  validatePayee(){
    if(this.payeName.value=="custom" && this.payeeArr.invalid){
      return true;
    }
    return false;
  }

  addExpense() {
    var isPresent=false;
    this.expenseForm.removeControl('splitType');
    

    if (isPresent){
      alert('already present');
      
    }

    else{
      if(this.isSplitAmong)
      {
        this.expenseForm.setControl('splits', this.splitAmong());
      }
      this.db.addExpenseToTrip(this.tripId, this.expenseForm);
      this.router.navigateByUrl('/trips/' + this.tripId);
    }
  }

  addPayees() {
    this.expenseForm.setControl('payee', this.payees);
    // this.expenseForm.removeControl('payees');
    this.isPayeeAdded = true;
  }

  getValue(value: string) {
    // this.initializeSplit(this.participants)
    this.sum = 0;
    console.log(2);
    console.log(this.splitTyp);
    
    if (this.splitTyp.value == 'split-equally-among-all') {
      this.isSplitAmong = false;
      this.isSplitCustom = false;

      this.expenseForm.setControl('splits', this.splitEqually(this.splits));
    }

    if (value == 'split-custom') {

      this.isSplitAmong = false;
      this.isSplitCustom = true;

      var dlgRef=this.dialog.open(SplitCustomDialogComponent,{data:{trip:this.trip}});
      dlgRef.afterClosed().subscribe(splits=>{
        this.splits=splits;
        this.splitCustom();
        console.log(this.splits);
      })
    }
    else if (value == 'split-among-equally') {
      this.isSplitAmong = true;
      this.isSplitCustom = false;
      var dialogRef=this.dialog.open(SplitAmongDialogComponent,{data:{trip:this.trip}});
      dialogRef.afterClosed().subscribe(splits=>{
        this.arr=splits;
        console.log(this.arr);
      })
    }

  }

  getPayee(payee: string) {
    this.expenseForm.setControl('payees', new FormArray<any>([]));
    // console.log(payee);
    if (payee == "custom") {
      // this.initializePayees();
      var dialog=this.dialog.open(PayeeDialogComponent,{data:{trip:this.trip}})
      dialog.afterClosed().subscribe(payees=>{this.payees=payees;this.addPayees();console.log(this.payees)});
      // this.onClick();
    }
    else {
      this.expenseForm.removeControl('payees');
    }
  }

  

  splitAmong() {
    var arr = new FormArray<any>([]);
    this.sum = 0;

    for (var i = 0; i < this.arr.length; i++) {
      arr.push(this.fb.group({
        people: this.arr[i].people,
        amount: this.amountVal.value / this.arr.length
      }))
      this.sum += this.amountVal.value / this.arr.length;
    }



    return arr;
  }

  splitEqually(arr: FormArray) {
    this.checked = false;
    this.sum = 0;
    
    arr = new FormArray<any>([]);
    var participants = this.participants;
    var shareOfEach=this.amountVal.value / participants.length;
    
    for (var i = 0; i < participants.length; i++) {
      
      
        arr.push(this.fb.group({
          people: participants[i].name,
          amount: shareOfEach
        }))
      
      
      this.sum += shareOfEach;
    }
    if(this.sum<this.amountVal.value){
      arr.at(arr.length-1).setValue("amount" ,(this.amountVal.value / participants.length)+(this.amountVal.value-this.sum))
    }
    return arr;
  }

  splitCustom() {
    this.sum = 0;
    this.checked = false;
    for (var i = 0; i <= this.splits.length - 1; i++) {
      this.sum += this.splits.at(i).value['amount'];
      this.splitArr.setControl(i,this.splits.at(i));

      // if (this.splitArr.at(i).value['amount'] == null) {
      //   this.splitArr.controls.splice(i, 1);
      // }
    }
    

  }
  // openDialog(): void {
  //   let dialogRef = this.dialog.open(ExpenseDialogComponent, {
  //     width: '250px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed',result);
      
  //   });
  // }

 
}

