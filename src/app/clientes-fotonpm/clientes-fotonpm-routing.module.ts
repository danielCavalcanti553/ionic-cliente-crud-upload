import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesFotonpmPage } from './clientes-fotonpm.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesFotonpmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesFotonpmPageRoutingModule {}
