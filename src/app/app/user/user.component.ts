import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  searchUserId: string = "";
  searchUserName: string = "";
  searchUserEmail: string = "";
  selectedId: string = "";
  selectedusername: string = "";
  selectedemail: string = "";
  selectedfirstName: string = "";
  selectedlastName: string = "";
  selectedgender: string = "";
  selecteddateOfBirth: string = "";
  selectedpassword: string = "";
  selectedconfirmpassword: string = "";
  selectedstatus: string = "";
  isEditModal: boolean = false;
  title: string = "";
  usersIds: number[] = [];
  constructor(public service: ApplicationService, private spinner: NgxSpinnerService, private toastr: ToastrService, private popup: NgbModal, private navigater: Router) { }
  ngOnInit(): void {
    this.service.ViewAllUsers();
  }
  Update() {
    var trigger = this.selectedemail,
      regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
      test = regexp.test(trigger);


    if (this.selectedusername == "" || this.selectedemail == "" || this.selectedfirstName == "" || this.selectedlastName == ""
      || this.selectedgender == "" || this.selecteddateOfBirth == "") {
      this.toastr.warning("Please Fill Out All Fields")
    }
    else if (test == false) {
        this.toastr.warning("Please use valid email address from gmail/yahaoo/hotmail")
    } else {
      const upd = {
        "updateDateTimeUtc": new Date(),
        "username": this.selectedusername,
        "email": this.selectedemail,
        "firstName": this.selectedfirstName,
        "lastName": this.selectedlastName,
        "status": this.selectedstatus,
        "gender": this.selectedgender,
        "dateOfBirth": this.selecteddateOfBirth
      }
      let id=this.selectedId;
     
      this.service.EditUser(upd, id);
    }
  }
  AddUserExit(){
    debugger;
    var trigger = this.selectedemail,
      regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
      test = regexp.test(trigger);

    var trigger2 = this.selectedpassword,
      regexp2 = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      test2 = regexp2.test(trigger2);
    if (this.selectedusername == "" || this.selectedemail == "" || this.selectedfirstName == "" || this.selectedlastName == ""
      || this.selectedgender == "" || this.selecteddateOfBirth == "" || this.selectedpassword == "" || this.selectedconfirmpassword == "") {
      this.toastr.warning("Please Fill Out All Fields")
    } else if (this.selectedpassword != this.selectedconfirmpassword) {
      this.toastr.warning("Password must be match ")
    }
    else if (test == false || test2 == false) {
      this.toastr.warning("Email and Password Incorrect Format")
      if (test == false) {
        this.toastr.warning("Please use valid email address from gmail/yahaoo/hotmail")
      }
      if (test2 == false) {
        this.toastr.warning("Password must be at least 8 character")
      }
    } else {
      const account = {
        "username": this.selectedusername,
        "email": this.selectedemail,
        "firstName": this.selectedfirstName,
        "lastName": this.selectedlastName,
        "gender": this.selectedgender,
        "dateOfBirth": this.selecteddateOfBirth,
        "password": this.selectedpassword
      };
      this.selectedusername = "";
      this.selectedemail = "";
      this.selectedfirstName = "";
      this.selectedlastName = "";
      this.selectedgender = "";
      this.selecteddateOfBirth = "";
      this.selectedpassword = "";
      this.popup.dismissAll()
      this.service.Registration(account);
    }
  }
  UpdateExit(){
    var trigger = this.selectedemail,
    regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
    test = regexp.test(trigger);


  if (this.selectedusername == "" || this.selectedemail == "" || this.selectedfirstName == "" || this.selectedlastName == ""
    || this.selectedgender == "" || this.selecteddateOfBirth == "") {
    this.toastr.warning("Please Fill Out All Fields")
  }
  else if (test == false) {
      this.toastr.warning("Please use valid email address from gmail/yahaoo/hotmail")
  } else {
    const upd = {
      "updateDateTimeUtc": new Date(),
      "username": this.selectedusername,
      "email": this.selectedemail,
      "firstName": this.selectedfirstName,
      "lastName": this.selectedlastName,
      "status": this.selectedstatus,
      "gender": this.selectedgender,
      "dateOfBirth": this.selecteddateOfBirth
    }
    let id=this.selectedId;
    this.selectedId = "";
    this.selectedusername = "";
    this.selectedemail = "";
    this.selectedfirstName = "";
    this.selectedlastName = "";
    this.selectedgender = "";
    this.selecteddateOfBirth = "";
    this.selectedpassword = "";
    this.selectedstatus = "";
    this.popup.dismissAll()
    this.service.EditUser(upd, id);
  }
  }
  ViewUser(content: any, tempUser: any, source: string) {
    debugger
    if (source == 'add') {
      this.isEditModal = false;
      this.title = "Add New User";
    } else {
      this.title = "Update User Account";
      this.isEditModal = true;
      this.selectedId = tempUser.userId;
      this.selectedusername = tempUser.username;
      this.selectedemail = tempUser.email;
      this.selectedfirstName = tempUser.firstName;
      this.selectedlastName = tempUser.lastName;
      this.selectedgender = tempUser.gender;
      this.selecteddateOfBirth = tempUser.dateOfBirth;
      this.selectedpassword = tempUser.password;
      this.selectedstatus = tempUser.status;
    }
    this.popup.open(content, { size: 'xl' });
  }
  SelectGender(name: string) {
    this.selectedgender = name;
  }

  Search() {
    this.service.ViewAllUsers(this.searchUserEmail, this.searchUserName, this.searchUserId);
  }

  SelectStatus(name: string) {
    this.selectedstatus = name;
  }

  IdSelected(userId: number) {
    if (!this.usersIds.includes(userId)) {
      this.usersIds.push(userId)
    } else {
      const index = this.usersIds.indexOf(userId, 0);
      if (index > -1) {
        this.usersIds.splice(index, 1);
      }
    }
    console.log(this.usersIds)
  }
  AddUser() {
    debugger;
    var trigger = this.selectedemail,
      regexp = new RegExp('^[A-Za-z0-9]*@(gmail\.com|yahoo\.com|hotmail\.com)$'),
      test = regexp.test(trigger);

    var trigger2 = this.selectedpassword,
      regexp2 = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      test2 = regexp2.test(trigger2);
    if (this.selectedusername == "" || this.selectedemail == "" || this.selectedfirstName == "" || this.selectedlastName == ""
      || this.selectedgender == "" || this.selecteddateOfBirth == "" || this.selectedpassword == "" || this.selectedconfirmpassword == "") {
      this.toastr.warning("Please Fill Out All Fields")
    } else if (this.selectedpassword != this.selectedconfirmpassword) {
      this.toastr.warning("Password must be match ")
    }
    else if (test == false || test2 == false) {
      this.toastr.warning("Email and Password Incorrect Format")
      if (test == false) {
        this.toastr.warning("Please use valid email address from gmail/yahaoo/hotmail")
      }
      if (test2 == false) {
        this.toastr.warning("Password must be at least 8 character")
      }
    } else {
      const account = {
        "username": this.selectedusername,
        "email": this.selectedemail,
        "firstName": this.selectedfirstName,
        "lastName": this.selectedlastName,
        "gender": this.selectedgender,
        "dateOfBirth": this.selecteddateOfBirth,
        "password": this.selectedpassword
      };
      this.selectedusername = "";
      this.selectedemail = "";
      this.selectedfirstName = "";
      this.selectedlastName = "";
      this.selectedgender = "";
      this.selecteddateOfBirth = "";
      this.selectedpassword = "";
      this.service.Registration(account);
    }
  }

  DeleteAll() {
    debugger
    this.service.DeleteUsers(this.usersIds);
  }

  DeleteUser(id: number) {
    debugger
    const upd :any=[];
    upd.push(id)
    this.service.DeleteUsers(upd);
  }
}
