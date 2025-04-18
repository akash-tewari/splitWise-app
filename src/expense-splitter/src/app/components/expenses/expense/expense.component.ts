import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
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
  expDescription!:string;
  expense:any;
  splits!:string[];
  panelOpenState=false;
  sum: number=0;


  constructor(private route:ActivatedRoute,private db:TripsService){}
  ngOnInit(): void {
    this.$paramsSub=this.route.params.pipe(
      switchMap((params:Params)=>{
        this.tripId = params['id'];
        this.expDescription = params['expense'];
        return this.db.getTripById(this.tripId);
      })
    ).subscribe(_trip=>{this.trip=_trip;this.getExpense(this.expDescription)});
  }
  ngOnDestroy(): void {
    this.$paramsSub.unsubscribe();
  }

  getExpense(expenseName:string){
    // console.log(this.trip.expenses);
    for(var i=0;i<this.trip.expenses.length;i++)
    {
      if(expenseName==this.trip.expenses.at(i).description)
      {
        this.expense=this.trip.expenses.at(i);
        // console.log(this.trip.expenses.at(i));
      }
      
    }
    this.compareAmount();
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
    return Array.isArray(this.expense.paye);
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
