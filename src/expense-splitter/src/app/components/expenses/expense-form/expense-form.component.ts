import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent {
  expenses:Expense[]=[];
  expenseForm:any;
  i:number=0;
  
  constructor(private fb:FormBuilder){
    this.expenseForm=this.fb.group({
      expenses:this.fb.array<Expense>([])
    });
  }
  addExpense()
  {
    this.i+=1;
    return this.expenseArr.push(this.fb.group({
      description:this.fb.control(null,Validators.required),
      amount:this.fb.control(null,Validators.required)
    }));
  }

  public get expenseArr(){
    return this.expenseForm.get('expenses') as FormArray;
  }
  

}
