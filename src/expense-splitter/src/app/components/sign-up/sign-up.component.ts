import { BooleanInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayeeDialogComponent } from 'src/app/dialogs/payee-dialog/payee-dialog.component';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers:[{
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:SignUpComponent
    }]
})
export class SignUpComponent {
  signUpForm:any;
  uniqueId:string='';
firstFormGroup!: any;
isLinear: BooleanInput=true;
secondFormGroup!: any;

  constructor(private fb:FormBuilder,private signUpService:SignInService, private route:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      // userName:this.fb.control(null,Validators.required),
      this.firstFormGroup=this.fb.group({
        email:this.fb.control(null,[Validators.email,Validators.required]),
        password:this.fb.control(null,[Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),Validators.required])
      });
      this.secondFormGroup=this.fb.group({
        firstName:this.fb.control(null,Validators.required),
        lastName:this.fb.control(null,Validators.required)
      });
  }

  addUser(){
    this.signUpService.createUser(this.emailId.value, this.password.value, this.userName,this.lastName).then((id)=>{this.route.navigateByUrl('');});
    
  }

  isInvalidEmailFormat(){
    if(this.emailId?.hasError('email')){
      return true;
    }
    return false;
  }

  checkPasswordHasCaps(passWord:string){
    if(/[A-Z]/.test(passWord)){
      return true;
    }
    return false;
  }

  checkPasswordHasSpch(passWord:string){
    if(/[#?!@$%^&*-]/.test(passWord)){
      return true;
    }
    return false;
  }

  checkPasswordHasNum(passWord:string){
    if(/[0-9]/.test(passWord)){
      return true;
    }
    return false;
  }

  checkPasswordHasLowercase(passWord:string){
    if(/[a-z]/.test(passWord)){
      return true;
    }
    return false;
  }

  public get emailId(){
    return this.firstFormGroup.get('email');
  }

  public get password(){
    return this.firstFormGroup.get('password');
  }

  public get userName(){
    return this.secondFormGroup.get("firstName").value;
  }

  public get lastName(){
    return this.secondFormGroup.get("lastName").value;
  }

}
