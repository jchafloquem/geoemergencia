import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
//libreria de ArcGIS
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import ScaleBar from '@arcgis/core/widgets/ScaleBar.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import Search from "@arcgis/core/widgets/Search.js";


@Component({
  selector: 'app-mapmovil',
  templateUrl: './mapmovil.component.html',
  styleUrls: ['./mapmovil.component.css']
})
export class MapmovilComponent implements OnInit, OnDestroy {
  public vista: any = null;
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
    const mapa = new Map({ basemap: "satellite" });
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
    const puebloCofopri = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/FORMALIZACION/MapServer/7',
      title: 'LIMITE DE PUEBLO',
      legendEnabled: false
    }); mapa.add(puebloCofopri)
    const manzanaCofopri = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/FORMALIZACION/MapServer/8',
      title: 'LIMITE DE MANZANA',
      legendEnabled: false
    }); mapa.add(manzanaCofopri)
    const lotesCofopri = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/FORMALIZACION/MapServer/9',
      title: 'LIMITE DE LOTE',
      legendEnabled: false
    }); mapa.add(lotesCofopri)
    const appmovil = new FeatureLayer({
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/Mapa_Validacion/MapServer/1',
      title: 'VALIDACION EN CAMPO'
    }); mapa.add(appmovil);
    const buscarCapas = [
      {
        layer: new FeatureLayer({
          url: "https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/Mapa_Validacion/MapServer/1",
        }),
        searchFields: ["nro_ficha"],
        displayField: "nro_ficha",
        exactMatch: false,
        outFields: ["*"],
        name: "N° DE FICHA",
        placeholder: "FICHA: 0001",
        maxResults: 5,
        maxSuggestions: 5,
        suggestionsEnabled: true,
        minSuggestCharacters: 0,
        zoomScale: 1000,
        popupTemplate: {
          title: "N° DE FICHA: {nro_ficha}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "nombre_departamento",
                  label: "<b><font color='#0C5EA3'>DEPARTAMENTO</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "nombre_provincia",
                  label: "<b><font color='#0C5EA3'>PROVINCIA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "nombre_distrito",
                  label: "<b><font color='#0C5EA3'>DISTRITO</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },

                {
                  fieldName: "direccion",
                  label: "<b><font color='#0C5EA3'>DIRECCION</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "localidad ",
                  label: "<b><font color='#0C5EA3'>LOCALIDAD</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "manzana",
                  label: "<b><font color='#0C5EA3'>MANZANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "lote",
                  label: "<b><font color='#0C5EA3'>LOTE</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "observaciones",
                  label: "<b><font color='#0C5EA3'>OBSERVACIONES</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "fecha",
                  label: "<b><font color='#0C5EA3'>FECHA DE VALIDACION</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],
            },
          ],
        },
      },
    ]
    //Cargado del mapa
    const view = new MapView({
      container: container,
      map: mapa,
      center: [-75.015152, -9.389967], //longitud, latitud (Centro del mapa) -12.0458293,-77.0285855
      zoom: 6,
      rotation: 0,
      constraints: { snapToZoom: true },
      padding: { top: 0 },
      ui: { components: [] },
    });
    const buscarData = new Search({
      view: view,
      sources: buscarCapas,
      allPlaceholder: "N° FICHA",
      includeDefaultSources: true,
    }); view.ui.add(buscarData, { position: "top-right" });
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
    const leyenda = new Legend({ view: view });
    const leyendaExpand = new Expand({
      expandIconClass: 'esri-icon-feature-layer',
      view: view,
      expandTooltip: 'LEYENDA',
      content: leyenda,
    }); view.ui.add(leyendaExpand, { position: 'top-right' });
    //Funcion de coordenadas (6)
    const ccoordenadas = new CoordinateConversion({ view: view }); view.ui.add(ccoordenadas, { position: 'bottom-left' });
    //Funcion de escala (7)
    const scaleBarra = new ScaleBar({ view: view, unit: 'dual' }); view.ui.add(scaleBarra, { position: 'bottom-left' });
    //Control de capas (8)
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
    this.initializeMap().then(() => { });
  }
  ngOnDestroy(): void {
    if (this.vista) {
      this.vista.destroy();
    }
  }
}
