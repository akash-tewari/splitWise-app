import { Injectable } from '@angular/core';
import { Trip } from '../models/tripDetails.model';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import { Participant } from '../models/participant.model';
import { Expense } from '../models/expense.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase/compat';
import * as firebase from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips:any;
  expense:any;
  participants!:Participant[];
  private readonly idFieldObj = {idField: 'tripId'};
  constructor(private firestore: AngularFirestore) { }

  getTrips(): Observable<Trip[]>{
    this.trips= this.firestore.collection<Trip>('trips')
      .valueChanges(this.idFieldObj)
    return this.trips;        
  }

  getTripById(id: string): Observable<Trip>{
    return this.firestore.collection<Trip>('trips').doc(id)
      .valueChanges(this.idFieldObj)  as Observable<Trip>;
  }

  /**Saves trips in db and returns generated trip id. */
  addTrip(trip: Trip): Observable<string>{
    // this.firestore.collection('trips').doc(""+trip.tripId).set(""+trip.tripId);
    return from(this.firestore.collection<Trip>('trips').add(trip))
    .pipe(map(docRef=> docRef.id));
  }

  addParticipantsToTrip(tripId: string, particpantList: FormArray): Observable<void>{
    return from(this.firestore.collection('trips').doc(tripId).update({
      particpants : firebase.arrayUnion(...particpantList.value)
    }))

    
  }

  addExpenseToTrip(tripId: string, expense: FormGroup): Observable<void>{
    return from(this.firestore.collection('trips').doc(tripId).update({
      expenses:firebase.arrayUnion(...[expense.value])
    }))
  }

  

  // settleTrip(tripId: string): Observable<any>{

  // }

}
