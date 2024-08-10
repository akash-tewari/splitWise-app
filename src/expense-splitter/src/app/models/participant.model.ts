import { FormControl } from "@angular/forms";
import { Expense } from "./expense.model";

export type Participant={
    name:string | null|FormControl;
    phoneNumber:number|undefined|FormControl;
};