import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteDetalhePage } from './cliente-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteDetalhePageRoutingModule {}
