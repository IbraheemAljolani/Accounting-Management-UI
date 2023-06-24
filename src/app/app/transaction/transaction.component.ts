import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  constructor(private route: ActivatedRoute,public service:ApplicationService,private spinner: NgxSpinnerService, private toastr: ToastrService, private popup: NgbModal, private navigater: Router) { }
  TransIds: number[] = [];
  newaccountId:number=0;
  newamount:number=0;
  newcreditType:string="";
  id:number=0;
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    if (this.id == 0) {
      this.service.Logout()
    }
    this.service.ViewAllTransactions(this.id);
  }
  IdSelected(transactionId:number){
    if (!this.TransIds.includes(transactionId)) {
      this.TransIds.push(transactionId)
    } else {
      const index = this.TransIds.indexOf(transactionId, 0);
      if (index > -1) {
        this.TransIds.splice(index, 1);
      }
    }
    console.log(this.TransIds)
  }
  ModifyTransaction(input:any,name:string) {
   const modei={
    "accountId": input.accountId,
    "amount": input.amount,
    "creditType":input.creditType,
    "transactionStatus": name
  }
  let transId=input.transactionId;
  this.service.EditTransaction(transId,modei);
  }
  SelectTypeDFO(type:string){
    this.newcreditType=type;
  }
  AddTransaction(){
    if(this.id == 0 || this.newamount == 0 ||this.newcreditType == ""){
      this.toastr.warning('Fill out all transaction Data')
    }else{
      const trans = {
        "accountId": this.id,
        "amount":this.newamount,
        "creditType": this.newcreditType,
      }
      this.service.AddTransaction(trans,this.id);
    }
  }
  AddTransactionExit(){
    if(this.id == 0 || this.newamount == 0 ||this.newcreditType == ""){
      this.toastr.warning('Fill out all transaction Data')
    }else{
      const trans = {
        "accountId": this.id,
        "amount":this.newamount,
        "creditType": this.newcreditType,
      }
      this.popup.dismissAll()
      this.service.AddTransaction(trans,this.id);
    }
  }
  BackToAcounts(){
    this.navigater.navigateByUrl('/Account')
  }
  openAddTransaction(content:any) {
    this.popup.open(content,{ size: 'xl' });
  }
}
