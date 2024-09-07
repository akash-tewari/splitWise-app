import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError, Subscription, throwError } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { Participant } from 'src/app/models/participant.model';
import { Split } from 'src/app/models/split.model';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent implements OnInit, OnDestroy, OnChanges {
  expenseForm: any;
  checked: boolean = false;
  participants: Participant[] = []
  i: number = 0;
  tripId!: string;
  tripID$!: Subscription;
  trip!: Trip;
  // splitType!: FormControl;
  payee!: FormControl;
  splits!: FormArray;
  amount!: FormControl;
  peoples: string[] | undefined;
  // splitForm!: FormGroup;
  arr: Split[] = [];
  payees!: FormArray<any>;
  payment!: FormControl<any>;
  isSplitCustom:boolean=false;
  isSplitAmong:boolean=false;
  isPayeeAdded:boolean=false;
  sum:number=0;


  constructor(private fb: FormBuilder,
    private db: TripsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.payee = this.fb.control(null, Validators.required);

    this.expenseForm = this.fb.group({
      description: this.fb.control(null, Validators.required),
      amount: this.fb.control(null, Validators.required),
      // splitType: this.splitType = this.fb.control(null, Validators.required),
      paye: this.fb.control(null, Validators.required),
      splits:this.fb.array([]),
      payees:this.fb.array([])
      // splitForm: this.splitForm = this.fb.group({
      //   splits: this.splits = this.fb.array([])
      // })

    });

    this.tripID$ = this.route.params.subscribe(params => {

      this.tripId = params['id'];
    });

    this.db.getTripById(this.tripId).subscribe(_trip => {
      this.trip = _trip;
      this.participants = [...this.initializeParticipants()];
      // this.payees = this.initializePayees();
      this.initializeSplit(this.initializeParticipants());
      
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
    return this.expenseForm.get('paye');
  }

  removeParicipant(i: number) {
    if (this.splitArr.length > 2) {

      this.splitArr.removeAt(i);
      // this.splitForm.controls["splits"].patchValue(this.splitEqually(this.splits).value);
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

  initializeSplit(participants: Participant[]) {
    // var participants=this.participants;
    // var splits = new FormArray<any>([]);
    this.splitArr.clear();
    for (var i = 0; i < participants.length; i++) {
      this.splitArr.push(this.fb.group({
        amount: this.amount= this.fb.control(null, Validators.required),
        people: participants[i].name
      }));
    }
    // return splits;
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

  validateAmount() {
    this.sum=0;
    for(var i=0;i<this.splitArr.length;i++){
      this.sum+=this.splitArr.at(i).value['amount'];
    }
  }

  validateForm(){
    for(var controls in this.expenseForm.controls.value){
      if(controls == null){
        return false;
      }
    }
    return true;
  }



  addExpense() {

    if (this.isSplitAmong) {

      // this.initializeSplit(this.arr);
      this.expenseForm.setControl('splits', this.splitAmong());


    }
    // else if (this.splitType.value == "split-custom") {

    //   this.splitCustom();
    // }

    this.db.addExpenseToTrip(this.tripId, this.expenseForm);
    this.router.navigateByUrl('/trips/' + this.tripId);

  }

  addPayees()
  {
    this.expenseForm.setControl('paye', this.payeeArr);
    this.isPayeeAdded=true;
  }


  getValue(event:string) {
    this.initializeSplit(this.participants)
    this.sum=0;
    // this.splitForm.setControl("splits", this.splits);
  
    
    

    if (event == 'split-equally-among all') {
      this.isSplitAmong=false;
      this.isSplitCustom=false;

      this.expenseForm.setControl('splits',this.splitEqually(this.splits));
    }

    if(event=='split-custom'){

      this.isSplitAmong=false;
      this.isSplitCustom=true;
    }
    else if(event=='split-among-equally')
    {
      this.isSplitAmong=true;
      this.isSplitCustom=false;
    }

  }

  getPayee(payee: string) {
    this.expenseForm.setControl('payees',new FormArray<any>([]));
    if (payee == "custom") {
      this.initializePayees();
    }
    else{
      this.expenseForm.removeControl('payees');
    }
  }

  onChecked(event: any, split: Split, i: number): void {
    if (event.target['checked'] == true) {
      
      this.arr.push(split);
      this.splitArr.at(i).get('amount')?.setValue(this.splitAmong());
      console.log(this.arr);
      this.checked = true;
    }

    else {
      this.arr.splice(this.arr.indexOf(split, 1));
    }

    // this.expenseForm.setControl('splits', this.splitAmong());
    this.splitAmong();

  }

  splitAmong() {
    var arr = new FormArray<any>([]);
    this.sum=0;

    for (var i = 0; i < this.arr.length; i++) {
      arr.push(this.fb.group({
        name: this.arr[i].people,
        amount: this.amountVal.value / this.arr.length
      }))
      this.sum+=this.amountVal.value / this.arr.length;
    }
    
    

    return arr;
  }

  splitEqually(arr: FormArray) {
    this.checked = false;
    this.sum=0;
    arr = new FormArray<any>([]);
    var participants = this.participants;
    for (var i = 0; i < participants.length; i++) {
      arr.push(this.fb.group({
        people: participants[i].name,
        amount: this.amountVal.value / participants.length
      }))
      this.sum+=this.amountVal.value / participants.length;
    }
    return arr;
  }

  splitCustom() {
    this.sum = 0;
    this.checked = false;
    for (var i = 0; i <= this.splits.length - 1; i++) {
      this.sum += this.splitArr.at(i).value['amount'];
      if (this.splitArr.at(i).value['amount'] == null) {
        this.splitArr.controls.splice(i, 1);
      }
    }
    // if (this.sum != this.amountVal.value) {
    //   throw alert('not Equal');


    // }

  }
  

 

}
