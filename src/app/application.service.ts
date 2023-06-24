import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  users:any=[];
  accounts:any=[];
  transcations:any=[];
  constructor(public http: HttpClient, public ngxSpinner: NgxSpinnerService, public toastr: ToastrService
    , public router: Router) { }

  Registration(RegistrationDTO: any) {
    this.ngxSpinner.show();
    this.http.post('http://localhost:5171/api/Auth/Registration', RegistrationDTO).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Congratulations, the account has been registered successfully.');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('An error occurred while registering the account. Please try again.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.toastr.success('Congratulations, the account has been registered successfully.')
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }
  Login(LoginDTO: any) {
    this.ngxSpinner.show();
    this.http.put('http://localhost:5171/api/Auth/Login', LoginDTO,{responseType:'text'}).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('tOKen', res);
        this.router.navigateByUrl('/User').then(this.ViewAllUsers)
        //this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      //console.log(error)
      this.toastr.error(error.statusText)
      this.ngxSpinner.hide();
    })
  }

  Logout() {
    this.ngxSpinner.show();
    this.http.put('http://localhost:5171/api/Auth/Logout/'+localStorage.getItem('tOKen')+"",null).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Logout successful.');
        this.ngxSpinner.hide();
        this.router.navigateByUrl('')
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.router.navigateByUrl('')
      if(error.statusText=="OK"){
        this.toastr.success('Logout successful.');
      }else{
        this.toastr.error(error.statusText)
      }
     
      this.ngxSpinner.hide();
    })
  }

  ForgotPassword(ForgotPasswordDTO: any) {
    this.ngxSpinner.show();

    this.http.put('http://localhost:5171/api/Auth/ForgotPassword', ForgotPasswordDTO).subscribe((res: any) => {
      if (res) {
        //
        this.toastr.success('Password has been modified successfully.');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('An error occurred while processing the password reset request.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      //console.log(error.error)
      if(error.statusText=="OK"){
        this.toastr.success('Password has been modified successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
     
      this.ngxSpinner.hide();
    })
  }

  ViewAllUsers(email: any="",userName: any="", userId: any = 0,pageSize: number = 10, pageNumber: number = 1, ) {
    debugger;
    this.users=[];
    this.ngxSpinner.show();
    let url="http://localhost:5171/api/User/ViewAllUsers?pageSize=10&pageNumber=1"; 
    if(userName != ""){
     url +='&userName='+userName;
    }else if(email !=""){
      url +='&email='+email;
    }else if(userId!=0){
      url ='&userId='+userId;
    }
    else{
      
    }
    this.http.get(url).subscribe((res: any) => {
      if (res) {
        this.users=res;
        //this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error(error.statusText)
      this.ngxSpinner.hide();
    })
  }

  EditUser(EditUserDTO: any, userId: string) {
    
    this.ngxSpinner.show();
    this.http.put('http://localhost:5171/api/User/EditUser/'+parseInt(userId), EditUserDTO).subscribe((res: any) => {
      if (res) {
        this.toastr.success('The user has been modified successfully.');
        this.ngxSpinner.hide();
        window.location.reload()
        this.ViewAllUsers()
      } else {
        this.toastr.error('User not found.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllUsers()
        this.toastr.success('The user has been modified successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  DeleteUsers(userIds: any) {
    
    const upd = {
      "userIds": userIds,
    }
   
    this.ngxSpinner.show();
    this.http.post('http://localhost:5171/api/User/DeleteUsers',upd ).subscribe((res: any) => {
      if (res) {
        this.ViewAllUsers()
        this.toastr.success('Users have been deleted successfully.');
        this.ngxSpinner.hide();
        location.reload()
      } else {
        this.toastr.error('No users were deleted.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllUsers()
        this.toastr.success('Users have been deleted successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  ViewAllAccount( userId: any = 0, accountId: any = 0, accountNumber: any = 0 , pageSize: any = 10, pageNumber: any = 1,) {
    this.accounts=[];
    this.ngxSpinner.show();
    let url = 'http://localhost:5171/api/Account/ViewAllAccount?pageSize=10&pageNumber=1'
    if(userId!=""){
      url += '&userId='+userId
    }else if(accountId !=0){
      url += '&accountId='+accountId
    }else if(accountNumber != 0){
      url += '&accountNumber='+accountNumber
    }else{

    }

    this.http.get(url).subscribe((res: any) => {
      if (res) {
        this.accounts=res
        //this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        //this.toastr.success('Users have been deleted successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }
  AddAccount(AddAccountDTO: any) {
    this.ngxSpinner.show();

    this.http.post('http://localhost:5171/api/Account/AddAccount', AddAccountDTO).subscribe((res: any) => {
      if (res) {
        this.ViewAllAccount()
        this.toastr.success('Congratulations, the account has been registered successfully.');
        this.ngxSpinner.hide();
        this.router.navigateByUrl('/Account').then(this.ViewAllAccount)
      } else {
        this.toastr.error('An error occurred registering the account, try again.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllAccount()
        this.toastr.success('Congratulations, the account has been registered successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  EditAccount(accountId: any, EditAccountDTO: any) {
    
    this.ngxSpinner.show();
    this.http.put('http://localhost:5171/api/Account/EditAccount/'+parseInt(accountId),EditAccountDTO).subscribe((res: any) => {
      if (res) {
        this.ViewAllAccount()
        this.toastr.success('The account has been modified successfully.');
        this.ngxSpinner.hide();
        window.location.reload()
      } else {
        this.toastr.error('Account not found.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      
      if(error.statusText=="OK"){
        this.ViewAllAccount()
        this.toastr.success('The account has been modified successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  DeleteAccounts(accountIds: any) {
    this.ngxSpinner.show();
    const upd = {
      "accountIds": accountIds,
    }
   
    this.http.post('http://localhost:5171/api/Account/DeleteAccounts', upd).subscribe((res: any) => {
      if (res) {
        this.ViewAllAccount()
        this.toastr.success('Accounts have been deleted successfully.');
        this.ngxSpinner.hide();
        this.router.navigateByUrl('/Account').then(this.ViewAllAccount)
      } else {
        this.toastr.error('No accounts were deleted.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllAccount()
        this.toastr.success('Accounts have been deleted successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  ViewAllTransactions(accountId: any = 0, userId: any = 0,transactionStatus: any="",pageSize: any = 10, pageNumber: any = 1) {
    this.transcations=[];
    this.ngxSpinner.show();
    this.http.get('http://localhost:5171/api/Transaction/ViewAllTransactions?accountId='+accountId).subscribe((res: any) => {
      if (res) {
        this.transcations=res;
        //this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        //this.toastr.success('Accounts have been deleted successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  AddTransaction(AddTransactionDTO: any,id:number) {
    this.ngxSpinner.show();
    this.http.post('http://localhost:5171/api/Transaction/AddTransaction', AddTransactionDTO).subscribe((res: any) => {
      if (res) {
        this.ViewAllTransactions()
        this.toastr.success('Congratulations, the transaction has been registered successfully.');
        this.ngxSpinner.hide();
        this.router.navigateByUrl('/Transaction'+id).then(this.ViewAllTransactions)
      } else {
        this.toastr.error('An error occurred registering the transaction, try again.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllTransactions()
        this.toastr.success('Congratulations, the transaction has been registered successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  EditTransaction(transactionId: any, EditTransactionDTO: any) {
    this.ngxSpinner.show();
    this.http.put('http://localhost:5171/api/Transaction/EditTransaction/'+parseInt(transactionId),EditTransactionDTO).subscribe((res: any) => {
      if (res) {
        this.ViewAllTransactions()
        this.toastr.success('The transaction has been modified successfully.');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Transaction not found.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      //console.log(error.statusText)
      if(error.statusText=="OK"){
        this.ViewAllTransactions()
        this.toastr.success('The transaction has been modified successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }

  DeleteTransactions(transactionIds: any,id:number) {
    this.ngxSpinner.show();
    this.http.post('http://localhost:5171/api/Transaction/DeleteTransactions', transactionIds).subscribe((res: any) => {
      if (res) {
        this.ViewAllTransactions()
        this.toastr.success('Transactions have been deleted successfully.');
        this.ngxSpinner.hide();
        this.router.navigateByUrl('/Transaction'+id).then(this.ViewAllTransactions)
      } else {
        this.toastr.error('No transactions were deleted.')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      if(error.statusText=="OK"){
        this.ViewAllTransactions()
        this.toastr.success('Transactions have been deleted successfully.');
      }else{
        this.toastr.error(error.statusText)
      }
      this.ngxSpinner.hide();
    })
  }
}
