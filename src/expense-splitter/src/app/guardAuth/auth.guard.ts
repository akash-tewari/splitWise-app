import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivate } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { firebaseConfig } from '../environment/environment';
import { initializeApp } from '@angular/fire/app';

var auth=async ()=>{
      var status=false;
      await getAuth().onAuthStateChanged((state)=>{
      if(state)
        console.log(state)
        status=true;
    });
    return status;
  };

 @Injectable({
    providedIn: 'root'
  })


export class authGuard implements CanActivate {
  flag:boolean=false;
    constructor(private fireAuth: AngularFireAuth, private router: Router) { }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      auth().then(statusFlag=>{
        this.flag=statusFlag;
      });
      console.log(this.flag);
    }
    

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return pipe<Observable<boolean | UrlTree>,any>(getAuth().onAuthStateChanged(state=>{
      if(state)
        return true;
      else
      {
        console.log("empty");
        this.router.navigateByUrl('login');
        return false;
      }
     })) as any;


  };
  // canDeactivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   const auth=getAuth();
    
  //     if (auth.currentUser) {
  //       return this.router.parseUrl('dashboard/:id');
  //     }
  //     else {
  //       return true;
  //     }
  //   }

}