import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginNovoPage } from './login-novo.page';

const routes: Routes = [
  {
    path: '',
    component: LoginNovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginNovoPageRoutingModule {}
