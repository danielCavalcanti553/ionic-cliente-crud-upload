import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesFotonpmPageRoutingModule } from './clientes-fotonpm-routing.module';

import { ClientesFotonpmPage } from './clientes-fotonpm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesFotonpmPageRoutingModule
  ],
  declarations: [ClientesFotonpmPage]
})
export class ClientesFotonpmPageModule {}
