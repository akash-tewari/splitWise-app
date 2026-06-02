import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { Trip } from 'src/app/models/tripDetails.model';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit,OnDestroy {
  $paramsSub!:Subscription
  trip: any;
  tripId!:string;
  tripNme!:string;
  expDescription!:string;
  expense:any;
  splits!:string[];
  panelOpenState=false;
  sum: number=0;
  tripSubscription$: any;


  constructor(private route:ActivatedRoute,public db:TripsService, private fa:AngularFireAuth){}
  ngOnInit() {

    
    this.$paramsSub=this.route.params.subscribe((params:Params)=>{
        this.tripId = params['id'];
        this.expDescription = params['expense'];
        this.tripNme= params['name'];
    }

    
  )

  this.tripSubscription$=this.db.getTrips(this.tripId).subscribe(userDet=>{
        if(userDet){
          userDet.trips.find((trip:Trip)=>{
        if(trip.tripName==this.tripNme){
          this.trip=trip;
          this.getExpense(this.expDescription);
        }
      
        })
        this.tripSubscription$.unsubscribe();
      }})
      
      //   const q = query(collection(firebase.getFirestore(initializeApp(firebaseConfig)),"users"), where("yourArrayField", "array-contains", "valueToMatchInArray"));
      // const querySnapshot = await getDocs(q);
      
      //  querySnapshot.forEach((doc) => {
      //   tripDet = doc.data();
      //   console.log(doc.data);
      //   // 'data' contains the document's fields, including the array.
      // });
      
      
  // if(this.db.getTripById(this.tripId,this.tripNme)!= undefined){
  //   this.trip=this.db.getTripById(this.tripId,this.tripNme);
  //   this.getExpense(this.expDescription);
  // }
    // this.getExpense(this.expDescription);
    // ).subscribe(_trip=>{this.trip=_trip;this.getExpense(this.expDescription)});
  }
  ngOnDestroy(): void {
    this.$paramsSub.unsubscribe();
  }

  getExpense(expenseName:string){
    console.log(this.trip.expenses);
    for(var i=0;i<this.trip.expenses.length;i++)
    {
      if(expenseName==this.trip.expenses.at(i).description)
      {
        this.expense=this.trip.expenses.at(i);
        // console.log(this.trip.expenses.at(i));
      }
      
    }
    this.compareAmount();
    return this.expense;
    // if(this.isPayeeArr())
    //   this.splitPayments();
    // else
    //   this.splitPay();
  }


  roundToTwoDec(amount:number){
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  compareAmount(){
    var currVal=0;
    var splitArr=this.expense.splits;
    for(var i=0;i<this.expense.splits.length;i++){
      currVal=splitArr.at(i).amount;
      this.sum+=this.roundToTwoDec(currVal);
    }
    if(this.sum<this.expense.amount){
      splitArr.at(splitArr.length-1).amount=splitArr.at(0).amount+(this.expense.amount-this.sum);
    }
  }


  isPayeeArr(){
    return Array.isArray(this.expense.payee);
  }

  // splitPay(){
  //   this.splits=[];
  //   for(var i=0;i<this.expense.splits.length;i++){
  //     if(this.expense.paye != this.expense.splits[i].people){
  //       this.splits.push(this.expense.splits[i].people+' needs to pay ₹'+this.expense.amount/this.expense.splits.length);
  //     }
  //   }
  // }

  // splitPayments()
  // {
  //   var diff=0;
  //   this.splits=[];

  //   for(var i =0;i<this.expense.splits.length;i++)
  //   {
  //     for(var j=0;j<this.expense.paye.length;j++)
  //     {
  //       if(this.expense.splits[i].people==this.expense.paye[j].name){
  //         diff=this.expense.splits[i].amount-this.expense.paye[j].payment;
  //         if(diff>0)
  //         {
  //           this.splits.push(this.expense.splits[i].people+' needs to pay '+diff);
  //           console.log(this.expense.splits[i].people+' needs to pay',diff);
  //           break;
  //         }
  //         else if(diff < 0){
  //           this.splits.push(this.expense.splits[i].people+' owes '+-diff);
  //           console.log(this.expense.splits[i].people+' owes',-diff);
  //           break;
  //         }
  //       }
          
  //     }
  //   }
     
    
  // }


  
}
