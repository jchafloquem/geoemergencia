import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Geo VISORES',
        icon: 'pi pi-fw pi-map',
        items: [
          {
            label: 'Validacion (MOVIL)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'GeoVisorMovil'
          },
          {
            label: 'Bono de Atencion de Emergencias (BAE)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'GeoVisorBAE'
          },
          {
            label: 'Modulos Temporales de Vivienda',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'GeoVisorMTV'
          },
          {
            label: 'Bono Familiar Habitacional (BFH)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'GeoVisorBFH'
          },
          {
            label: 'Bono de Proteccion de Vivienda Vulnerables a los Riesgos Sismicos (BPVVRS)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'GeoVisorBPVVRS'
          },

        ]
      },
      {
        label: 'DASHBOARD',
        icon: 'pi pi-fw pi-chart-pie',
        items: [
          {
            label: 'Tablero de datos - Validacion',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: 'DashboardValidacion'
          },
          {
            label: 'Tablero de datos - Cobro - BAE',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: 'DashboardCobros'
          },
        ]
      },

    ];
  }

}
