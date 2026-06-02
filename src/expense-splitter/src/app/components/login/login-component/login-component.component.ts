import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignInService } from 'src/app/services/sign-in.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {

  loginForm:any;

  constructor(private fb:FormBuilder,private authService:SignInService,public route:Router,private fAuth:AngularFireAuth){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm=this.fb.group({
      emailId:this.fb.control(null,Validators.email),
      password:this.fb.control(null)
    });
  }

  logInUser(email:string,userPassword:string){
    this.authService.signInUser(email,userPassword).then((status)=>{
      console.log("sign in" + status);
      if(status==true){
        alert("welcome");
        this.fAuth.authState.subscribe(user=>{this.route.navigateByUrl('')});
      }
      
    })
  }

  isEmailFormatInvalid(){
    return this.email.invalid;
  }

  public get email(){
    return this.loginForm.get('emailId');
  }

  public get password(){
    return this.loginForm.get('password');
  }

}
