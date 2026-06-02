import { Component } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCredential } from 'firebase/auth';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
shouldRun: boolean=false;

id:string|undefined;
userName!:string
userActive:boolean=false;

constructor(private firestore:AngularFirestore,private auth:AngularFireAuth,private route:Router){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.auth.authState.subscribe(user=>{
    if(user){
      this.userActive=true;
      this.id=user?.uid;
      this.firestore.collection<user>('users').doc(user.uid).valueChanges().subscribe(userVal=>{
    if(userVal)
      this.userName=userVal.username;
  })
    }

  })

}
logOutUser(){
  this.auth.signOut().then(()=>{
    try{
      alert('signed out succesfully');
      this.userActive=false;
      this.route.navigateByUrl('login');
    }
    catch(err:any){
      console.log(err.message);
    }
  })    
}



}
