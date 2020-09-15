import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesFotoPageRoutingModule } from './clientes-foto-routing.module';

import { ClientesFotoPage } from './clientes-foto.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesFotoPageRoutingModule,
  ],
  declarations: [ClientesFotoPage],
  providers: [Camera]
})
export class ClientesFotoPageModule {}
