import { Observable } from "rxjs";
import { Expense } from "./expense.model";
import { Participant } from "./participant.model";
import { FormControl } from "@angular/forms";

export type Trip={
    tripId:string,
    tripDate: Date,
    tripName: FormControl<null>,
    totalExpense?: number;
    particpants: Participant[];
    expenses: Expense[];
}