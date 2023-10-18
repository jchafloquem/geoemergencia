import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule )},
  { path: 'viewers', loadChildren: () => import('./viewers/viewers.module').then(m => m.ViewersModule)},
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
