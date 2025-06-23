import { Observable } from "rxjs";
import { Expense } from "./expense.model";
import { Participant } from "./participant.model";
import { FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";

export type Trip={
    tripId:string,
    tripDate: any,
    tripName: FormControl<null>,
    totalExpense?: number;
    particpants: Participant[];
    expenses: Expense[];
}