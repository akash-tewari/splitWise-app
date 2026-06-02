import { Injectable } from '@angular/core';
import { Trip } from '../models/tripDetails.model';
import { from, map, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { Participant } from '../models/participant.model';
import { Expense } from '../models/expense.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase/compat';
import * as firebase from 'firebase/firestore';
import { collection, getDocs, query, where } from "firebase/firestore";
import { FormArray, FormGroup } from '@angular/forms';
import { user } from '../models/user.model';
import { firebaseConfig } from '../environment/environment';
import { initializeApp } from '@angular/fire/app';

export var addParticipantSub$!:Subscription;

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips:any;
  trip!:any;
  expense:any;
  
  participants!:Participant[];
  private readonly idFieldObj = {idField: 'tripId'};
  tripSubscription$!: Subscription;
  constructor(private firestore: AngularFirestore, private db:AngularFirestore) { }

  getTrips(uid:string|undefined): Observable<user|undefined>{
    return this.firestore.collection<user>('users').doc(uid)
      .valueChanges();        
  }

  getTripById(id:string,name: string): any{
      let tripDet:any;
      this.tripSubscription$=this.getTrips(id).subscribe(userDet=>{
      if(userDet){
        userDet.trips.find((trip:Trip)=>{
      if(trip.tripName==name){
        this.trip=trip;
      }
    
      })
      // this.tripSubscription$.unsubscribe();
    }})
    //   const q = query(collection(firebase.getFirestore(initializeApp(firebaseConfig)),"users"), where("yourArrayField", "array-contains", "valueToMatchInArray"));
    // const querySnapshot = await getDocs(q);
    
    //  querySnapshot.forEach((doc) => {
    //   tripDet = doc.data();
    //   console.log(doc.data);
    //   // 'data' contains the document's fields, including the array.
    // });
    
    return this.trip;
    
      
  }

  /**Saves trips in db and returns generated trip id. */
  async addTrip(trip: any,uid:string): Promise<void>{
    // this.firestore.collection('trips').doc(""+trip.tripId).set(""+trip.tripId);
    // return from()
    // .pipe(map(docRef=> docRef.id));
    await this.firestore.collection<user>("users").doc(uid).update({trips:firebase.arrayUnion(trip.value)});
  }

  addParticipantsToTrip(tripId: string, trip:any): Promise<void>{
    let tripsList:any
    
    // this.firestore.collection<user>('users').doc(tripId).valueChanges().subscribe(user=>{
    //   if(user){
    //   user.trips.find((trip:Trip)=>{
    //     if(trip.tripName===tName)
    //       {this.trip=c;}
    //     c+=1;})
    //   }
    // });

    // addParticipantSub$=this.getTrips(tripId).subscribe(user=>{
      // if(user){
      //   this.trips=user.trips;
      //   this.trips.find((tripDet:Trip)=>{
      //     if(tripDet.tripName==tName){
      //       tripDet.particpants=particpantList.value;
      //     }
      //   })
    return this.firestore.collection<user>('users').doc(tripId).update({
      trips:[...trip]
    }); 
  
}

  addExpenseToTrip(tripId: string, trip: any): Promise<void>{
    return this.firestore.collection<user>('users').doc(tripId).update({
      trips:[...trip]
    })
  }

  

  // settleTrip(tripId: string): Observable<any>{

  // }

}
