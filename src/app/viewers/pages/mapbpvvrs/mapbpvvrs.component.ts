import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
//libreria de ArcGIS
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import Print from '@arcgis/core/widgets/Print.js';
import ScaleBar from '@arcgis/core/widgets/ScaleBar.js';
import Search from '@arcgis/core/widgets/Search.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';


@Component({
  selector: 'app-mapbpvvrs',
  templateUrl: './mapbpvvrs.component.html',
  styleUrls: ['./mapbpvvrs.component.css']
})
export class MapbpvvrsComponent implements OnInit, OnDestroy {
  public vista: any = null;
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  initializeMap(): Promise<any> {

    const container = this.mapViewEl.nativeElement;
    const mapa = new Map({
      basemap: "satellite",
    });

    //Cargado de capas
    const limDistrito = new FeatureLayer({
      url: "https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/2",
      title: 'LIMITE DE DISTRITO',
      legendEnabled: false
    }); mapa.add(limDistrito);
    const limProvincia = new FeatureLayer({
      url: "https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/3",
      title: 'LIMITE DE PROVINCIA',
      legendEnabled: false
    }); mapa.add(limProvincia);
    const limDepartamento = new FeatureLayer({
      url: "https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/4",
      title: 'LIMITE DE DEPARTAMENTO',
      legendEnabled: false
    }); mapa.add(limDepartamento);
    const estudiosMicroZonificacion = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/1_Seguimiento_Monitoreo/MapServer/13',
      title:'Estudios de Microzonificacion Sismica'
    }); mapa.add(estudiosMicroZonificacion);
    const obraculminada = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/1_Seguimiento_Monitoreo/MapServer/0',
      title:'Obras Culminadas'
    }); mapa.add(obraculminada);

    //Cargado del mapa
    const view = new MapView({
      container: container,
      map: mapa,
      center: [-75.015152, -9.189967], //longitud, latitud (Centro del mapa) -12.0458293,-77.0285855
      zoom: 6,
      rotation: 0,
      constraints: { snapToZoom: true },
      padding: { top: 0 },
      ui: { components: [] }, //Altura del mapa
    });

    //Boton de Inicio de mapa (1)
    const homeBtn = new Home({ view: view }); view.ui.add(homeBtn, 'top-right');
    //Boton de acercar y alejar (2)
    const zoom = new Zoom({ view: view }); view.ui.add(zoom, 'top-right');
    //Boton de Extender el Mapa (3)
    const fullscreen = new Fullscreen({ view: view }); view.ui.add(fullscreen, 'top-right');
    //Funcion de Galeria de mapas (4)
    const basemapGallery = new BasemapGallery({ view: view });
    const GaleryExpand = new Expand({
      expandIconClass: 'esri-icon-basemap',
      view: view,
      expandTooltip: 'GALERIA DE MAPAS',
      content: basemapGallery,
    }); view.ui.add(GaleryExpand, { position: 'top-right' });
    //Leyenda del mapa (5)
    const leyenda = new Legend({ view: view, icon: 'legend-plus' });
    const leyendaExpand = new Expand({
      expandIconClass: 'esri-icon-legend',
      view: view,
      expandTooltip: 'LEYENDA',
      content: leyenda,
    }); view.ui.add(leyendaExpand, { position: 'bottom-trailing' });
    //Funcion de coordenadas
    const ccoordenadas = new CoordinateConversion({ view: view }); view.ui.add(ccoordenadas, { position: 'bottom-left' });
    //Funcion de escala
    const scaleBarra = new ScaleBar({ view: view, unit: 'dual' }); view.ui.add(scaleBarra, { position: 'bottom-left' });
    //Control de capas
    const controlCapas = new LayerList({ view: view });
    const capasExpand = new Expand({
      expandIconClass: 'esri-icon-layers',
      view: view,
      expandTooltip: 'CAPAS',
      content: controlCapas,
    }); view.ui.add(capasExpand, { position: 'top-left' });
    this.vista = view;
    return this.vista.when();
  }
  ngOnInit(): any {
    this.initializeMap().then(() => {
      console.log('Se puede leer el mapa.');
    });
  }
  ngOnDestroy(): void {
    if (this.vista) {
      this.vista.destroy();
    }
  }
}
