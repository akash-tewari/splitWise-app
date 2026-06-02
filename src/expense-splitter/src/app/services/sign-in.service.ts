import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { firebaseConfig } from '../environment/environment';
import { Router } from '@angular/router';
import { user } from 'h:/Akash/repos/splitWise-app/src/expense-splitter/src/app/models/user.model'
import { DashboardComponent } from '../components/dashboard/dashboard.component';
// import { Firestore } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { last } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInService {
  auth;
  app;
  // userMod:user={
  //   username:'',
  //   emailId:'',
  //   trips:[],
  //   expenses:[]
  // }

  constructor(private route:Router,private fire:AngularFirestore, private fireAuth:AngularFireAuth) {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);

    // if (location.hostname === 'localhost') {
    //   connectAuthEmulator(this.auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    //   console.log('✅ Connected to Firebase Auth Emulator');
    // }
  }

  createUser(email: string, password: string, username?:string,lastname?:string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((cred) => {
        console.log('✅ Created user:', cred.user.email);
        alert("welcome "+cred.user.email);
        this.fireAuth.authState.subscribe((user)=>{
          if(user){
            this.fire.collection('users').doc(user.uid).set({
              username:username,
              emailId:email,
              firstName:username,
              lastName:lastname,
              trips:[],
              expenses:[]
          });
          }
        })
        return cred.user.uid;
        
      })
      .catch((err) => {
        console.error('❌ Auth Error:', err.code, err.message);
        alert(err.message);
        return '';
      });
  }

  signInUser(email:string,password:string):Promise<Boolean | void>{
    return signInWithEmailAndPassword(this.auth,email,password)
    .then((credential)=>{
      // console.log(credential.user.email);
      return true;
    })
    .catch((error)=>{
      console.log(error.code);
      if(error.code=='auth/user-disabled')
        return alert('account has been disabled');
      else
        return alert('invalid credential!');
      
    })
  }
}
