import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginNovoPageRoutingModule } from './login-novo-routing.module';

import { LoginNovoPage } from './login-novo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginNovoPageRoutingModule
  ],
  declarations: [LoginNovoPage]
})
export class LoginNovoPageModule {}
