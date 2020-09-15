import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteDetalhePageRoutingModule } from './cliente-detalhe-routing.module';

import { ClienteDetalhePage } from './cliente-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDetalhePageRoutingModule
  ],
  declarations: [ClienteDetalhePage]
})
export class ClienteDetalhePageModule {}
