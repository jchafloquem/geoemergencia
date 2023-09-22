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
        label: 'GeoVisores',
        icon: 'pi pi-fw pi-map',
        items: [
          {
            label: 'Validacion en campo (Movil)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'MapMovil'
          },
          {
            label: 'Modulos Temporales de Vivienda',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'MapMtv'
          },
          {
            label: 'Bono de Atencion de Emergencias (BAE)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'mapBAE'
          },
          {
            label: 'Bono Familiar Habitacional (BFH)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'mapBFH'
          },
          {
            label: 'Bono de Proteccion de Vivienda Vulnerables a los Riesgos Sismicos (BPVVRS)',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: 'mapBPVVRS'
          },

        ]
      },
      {
        label: 'Consultas',
        icon: 'pi pi-fw pi-search',
        items: [
          {
            label: 'Beneficiarios Bono de Atencion de Emergencias (BAE)',
            icon: 'pi pi-fw pi-search'
          },
          {
            label: 'Beneficiarios Bono Familiar Habitacional (BFH)',
            icon: 'pi pi-fw pi-search'
          },
          {
            label: 'Beneficiarios Bono Proteccion de Viviendas Vulnerables a los Riesgos Sismicos (BPVVRS)',
            icon: 'pi pi-fw pi-search'
          },

        ]
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-pie',
        items: [
          {
            label: 'Gestion de Validacion',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: 'dashboard'
          },
        ]
      },
    ];
  }

}
