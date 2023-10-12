import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewersRoutingModule } from './viewers-routing.module';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MapbaeComponent } from './pages/mapbae/mapbae.component';
import { MapbfhComponent } from './pages/mapbfh/mapbfh.component';
import { MapbpvvrsComponent } from './pages/mapbpvvrs/mapbpvvrs.component';
import { MapmovilComponent } from './pages/mapmovil/mapmovil.component';
import { SharedModule } from '../shared/shared.module';
import { MtvComponent } from './pages/mapmtv/mtv.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    ConsultasComponent,
    DashboardComponent,
    LayoutPageComponent,
    MapbaeComponent,
    MapbfhComponent,
    MapbpvvrsComponent,
    MapmovilComponent,
    MtvComponent
  ],
  imports: [
    CommonModule,
    ViewersRoutingModule,
    SharedModule,
    PrimeNgModule
  ]
})
export class ViewersModule { }
