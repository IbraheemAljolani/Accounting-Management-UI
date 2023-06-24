import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/application.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(public service:ApplicationService,private spinner: NgxSpinnerService, private toastr: ToastrService, private popup: NgbModal, private navigater: Router) { }
  accountsIds: number[] = [];
  searchUserId: string = "";
  searchaccountId: string = "";
  searchaccountNumber: string = "";
  selectedaccountId:string="";
  selectedUserId:string="";
  selecteaccountNumber:string="";
  selectedbalance:string="";
  selectedcurrency:string="";
  selectedstatus:string="";
  isOpenForEdit=false;
  ngOnInit(): void {
    this.service.ViewAllAccount();
  }
  Search(){
    this.service.ViewAllAccount(this.searchUserId,this.searchaccountId,this.searchaccountNumber);
  }
  openCreate(content:any) {
    this.isOpenForEdit=false;
    this.selectedaccountId="";
    this.selectedUserId="";
    this.selecteaccountNumber="";
    this.selectedbalance="";
    this.selectedcurrency="";
    this.selectedstatus="";
    this.popup.open(content,{ size: 'xl' });
  }
  openEdit(content:any,object:any) {
    this.isOpenForEdit=true;
    this.selectedaccountId=object.accountId;
    this.selectedUserId=object.userId;
    this.selecteaccountNumber=object.accountNumber;
    this.selectedbalance=object.balance;
    this.selectedcurrency=object.currency;
    this.selectedstatus=object.status;
    this.popup.open(content,{ size: 'xl' });
  }
  AddAccount(){
    const account={
      "userId": this.selectedUserId,
      "balance":this.selectedbalance,
      "currency": this.selectedcurrency
    }
    if(this.selectedUserId=="" || this.selectedbalance =="" || this.selectedcurrency ==""){
      this.toastr.warning('Please Fill out All Field')
    }else{
      this.service.AddAccount(account);
    }
  }
  AddAccountExit(){
    const account={
      "userId": this.selectedUserId,
      "balance":this.selectedbalance,
      "currency": this.selectedcurrency
    }
    if(this.selectedUserId=="" || this.selectedbalance =="" || this.selectedcurrency ==""){
      this.toastr.warning('Please Fill out All Field')
    }else{
      this.popup.dismissAll();
      this.service.AddAccount(account);
    }
  }
  UpdateAccount(){
    if(this.selectedUserId=="" || this.selectedbalance =="" || this.selectedcurrency ==""){
      this.toastr.warning('Please Fill out All Field')
    }else{
      const acoi={
        "userId": this.selectedUserId,
        "balance":this.selectedbalance,
        "currency":this.selectedcurrency,
        "status": this.selectedstatus
      }
      this.service.EditAccount(this.selectedaccountId,acoi)
    }
  }
  UpdateAccountExit(){
    if(this.selectedUserId=="" || this.selectedbalance =="" || this.selectedcurrency ==""){
      this.toastr.warning('Please Fill out All Field')
    }else{
      const acoi={
        "userId": this.selectedUserId,
        "balance":this.selectedbalance,
        "currency":this.selectedcurrency,
        "status": this.selectedstatus
      }
      this.popup.dismissAll();
      this.service.EditAccount(this.selectedaccountId,acoi)
    }
  }
  SelectStatus(name:string){
    this.selectedstatus = name;
  }
  SelectCur(name:string){
    debugger
    this.selectedcurrency = name;
  }
  ViewTransaction(accountId:number){
    this.navigater.navigateByUrl('/Transaction/'+accountId+'')
  }
  IdSelected(accountId: number) {
    if (!this.accountsIds.includes(accountId)) {
      this.accountsIds.push(accountId)
    } else {
      const index = this.accountsIds.indexOf(accountId, 0);
      if (index > -1) {
        this.accountsIds.splice(index, 1);
      }
    }
    //console.log(this.accountsIds)
  }
  DeleteAll() {
    this.service.DeleteAccounts(this.accountsIds);
  }
  DeleteAccount(id:number) {
    let upd :any = [];
    upd.push(id);
    this.service.DeleteAccounts(upd);
  }
}
