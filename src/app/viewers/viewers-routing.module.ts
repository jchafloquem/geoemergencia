import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MapmovilComponent } from './pages/mapmovil/mapmovil.component';
import { MapbaeComponent } from './pages/mapbae/mapbae.component';
import { MapbfhComponent } from './pages/mapbfh/mapbfh.component';
import { MapbpvvrsComponent } from './pages/mapbpvvrs/mapbpvvrs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { MtvComponent } from './pages/mapmtv/mtv.component';


const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: 'MapMovil', component: MapmovilComponent },
      { path: 'MapMtv', component: MtvComponent },
      { path: 'mapBAE', component: MapbaeComponent },
      { path: 'mapBFH', component: MapbfhComponent },
      { path: 'mapBPVVRS', component: MapbpvvrsComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'consulta', component: ConsultasComponent },
      { path: '', redirectTo: 'MapMovil', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewersRoutingModule { }
