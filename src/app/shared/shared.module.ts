import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar/menubar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Error404Component } from './error404/error404.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenubarComponent,
    SidebarComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule
  ],
  exports:[
    MenubarComponent
  ]
})
export class SharedModule { }
