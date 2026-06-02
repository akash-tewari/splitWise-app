import { Expense } from "./expense.model";
import { Trip } from "./tripDetails.model";

export type user={
    username:string,
    emailId:string,
    firstName:string,
    lastName:string,
    trips:Array<Trip> | any,
    expenses:Array<Expense>
}