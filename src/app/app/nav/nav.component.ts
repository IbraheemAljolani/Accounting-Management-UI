import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private popup: NgbModal, private navigater: Router
    ,private service:ApplicationService) { }

  Logout(){
    this.service.Logout()
    localStorage.removeItem('token');
  }

  Users(){


    this.navigater.navigateByUrl('/User')
    
  }

  Accounts(){

    this.navigater.navigateByUrl('/Account')
    
  }

  Transactions(){

    this.navigater.navigateByUrl('/Transaction')
   
    
  }
}
