import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar/menubar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    MenubarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    MenubarComponent
  ]
})
export class SharedModule { }
