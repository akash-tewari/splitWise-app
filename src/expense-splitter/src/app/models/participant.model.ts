import { FormControl } from "@angular/forms";
import { Expense } from "./expense.model";

export type Participant={
    name:string;
    phoneNumber:number|undefined|FormControl;
};