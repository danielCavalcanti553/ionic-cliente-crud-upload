import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes-foto',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-novo',
    loadChildren: () => import('./login-novo/login-novo.module').then( m => m.LoginNovoPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'logoff',
    loadChildren: () => import('./logoff/logoff.module').then( m => m.LogoffPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'clientes-novo',
    loadChildren: () => import('./clientes-novo/clientes-novo.module').then( m => m.ClientesNovoPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'cliente-detalhe/:id',
    loadChildren: () => import('./cliente-detalhe/cliente-detalhe.module').then( m => m.ClienteDetalhePageModule)
  },
  {
    path: 'clientes-foto/:id',
    loadChildren: () => import('./clientes-foto/clientes-foto.module').then( m => m.ClientesFotoPageModule)
  },
  {
    path: 'clientes-fotonpm',
    loadChildren: () => import('./clientes-fotonpm/clientes-fotonpm.module').then( m => m.ClientesFotonpmPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
