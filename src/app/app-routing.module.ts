import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './app/user/user.component';
import { AccountComponent } from './app/account/account.component';
import { TransactionComponent } from './app/transaction/transaction.component';
import { AuthComponent } from './app/auth/auth.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent
  },
  {
    path: 'User', component: UserComponent
  },
  {
    path: 'Account', component: AccountComponent
  },
  {
    path: 'Transaction/:id', component: TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
