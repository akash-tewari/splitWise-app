import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanDeactivate, CanDeactivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { getAuth } from "firebase/auth";
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { pipe } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class deactivateAuthGuard implements CanActivate{
  userDet:any;
  constructor(private route:Router,private fireAuth:AngularFireAuth){}
  canActivate (route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const auth=getAuth()
   return pipe<Observable<boolean | UrlTree>,any>(getAuth().onAuthStateChanged(state=>{
         if(state){
           return this.route.navigateByUrl('');
         }
         else
         {
           console.log("empty");
           return true;
         }
        })) as any;
    
      // if (auth.currentUser) {
      //   return this.route.parseUrl('');
      // }
      // else {
      //   return true;
      // }
};

}
 

