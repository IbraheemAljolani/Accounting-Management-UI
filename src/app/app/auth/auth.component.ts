import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email : string="";
  password : string="";
  confirmpassword : string="";
  loginEmail : string ="";
  loginPassword : string ="";
  registerusername: string="";
  registeremail: string="";
  registerfirstName: string="";
  registerlastName: string="";
  registergender: string="";
  registerdateOfBirth:string="";
  registerpassword: string="";
  registerconfirmpassword: string="";
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private popup: NgbModal, private navigater: Router
    ,private service :ApplicationService) { }

  ngOnInit(): void {
    
  }

  SelectGender(type:string){
    debugger;
    this.registergender = type;
    this.toastr.info(this.registergender)
  }
  ResetPassword(){
    var trigger = this.password,
    regexp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    test = regexp.test(trigger);
    if(this.email=="" || this.password =="" || this.confirmpassword==""){
      this.toastr.warning("Please Fill All Required Data")
    }else if(this.password != this.confirmpassword){
      this.toastr.warning("Password must be match ")
    }else if(test == false){
      this.toastr.warning("Password must contains of at least 8 character with one digit and one letter and one special Character")
    }else{
      const account = {
        "email": this.email,
        "newPassword": this.password,
        "confirmPassword": this.confirmpassword,
      };
      this.email="";
      this.password="";
      this.confirmpassword="";
      this.service.ForgotPassword(account);
      this.popup.dismissAll();
    }
  }
  LoginToAccount(){
    debugger
    var trigger = this.loginEmail,
    regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
    test = regexp.test(trigger);

    var trigger2 = this.loginPassword,
    regexp2 = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    test2 = regexp2.test(trigger2);

    if(this.loginEmail == "" || this.loginPassword == ""){
      this.toastr.warning("Email and Password is Required")
    }
    else if(test==false || test2==false){
      this.toastr.warning("Email and Password Incorrect Format")
    }else{
      const account = {
        "email": this.loginEmail,
        "password": this.loginPassword,
      };
      this.service.Login(account);
    }
  }
  Register(){
    debugger
    var trigger = this.registeremail,
    regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
    test = regexp.test(trigger);

    var trigger2 = this.registerpassword,
    regexp2 = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    test2 = regexp2.test(trigger2);
    if(this.registerusername=="" || this.registeremail =="" || this.registerfirstName==""|| this.registerlastName==""
    || this.registergender==""|| this.registerdateOfBirth==""|| this.registerpassword==""|| this.registerconfirmpassword==""){
      this.toastr.warning("Please Fill Out All Fields")
    }else if(this.password != this.confirmpassword){
      this.toastr.warning("Password must be match ")
    }
    else if(test==false || test2==false){
      //this.toastr.warning("Email and Password Incorrect Format")
      if(test==false){
        this.toastr.warning("Please use valid email address from gmail/yahaoo/hotmail")
      }
      if(test2==false){ 
        this.toastr.warning("Password must be at least 8 character")
      }
    }else{
      const account = {
        "username": this.registerusername,
        "email": this.registeremail,
        "firstName": this.registerfirstName,
        "lastName": this.registerlastName,
        "gender": this.registergender,
        "dateOfBirth": this.registerdateOfBirth,
        "password": this.registerpassword
      };
      this.registerusername="";
      this.registeremail="";
      this.registerfirstName="";
      this.registerlastName="";
      this.registergender="";
      this.registerdateOfBirth="";
      this.registerpassword="";
      this.service.Registration(account);
    }
  }
  openForgetPass(content:any) {
    this.popup.open(content,{ size: 'xl' });
  }
  openRegister(content:any) {
    this.popup.open(content,{ size: 'xl' });
  }

}
