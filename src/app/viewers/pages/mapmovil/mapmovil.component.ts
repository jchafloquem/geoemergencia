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
      url: 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/Mapa_Validacion/MapServer/12',
      title: 'VALIDACION EN CAMPO'
    }); mapa.add(appmovil);

    const arregloCapas = [
      {
        layer: new FeatureLayer({
          url: "https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/Mapa_Validacion/MapServer/12",
        }),
        searchFields: ["ID_LOTE"],
        displayField: "ID_LOTE",
        exactMatch: false,
        outFields: ["*"],
        name: "LOTE CATASTRAL",
        placeholder: "Ejemplo: 4004064023",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionsEnabled: true,
        minSuggestCharacters: 0,
        zoomScale: 500,
        popupTemplate: {
          title: "LOTE CATASTRAL: {ID_LOTE}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "ID_MZ",
                  label: "<b><font color='#0C5EA3'>MANZANA CATASTRAL</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "COD_LOT",
                  label: "<b><font color='#0C5EA3'>LOTE CATASTRAL</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "NM_HAB_URB",
                  label: "<b><font color='#0C5EA3'>HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "NRO_MZ",
                  label: "<b><font color='#0C5EA3'>MANZANA URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "LOTE_URB",
                  label: "<b><font color='#0C5EA3'>LOTE URBANO</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "TIPO_ZONIF",
                  label: "<b><font color='#0C5EA3'>TIPO DE ZONIFICACION</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "DESC_ZONI",
                  label: "<b><font color='#0C5EA3'>DESCRIPCION DE ZONIFICACION</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "NMRO_ATN",
                  label: "<b><font color='#0C5EA3'>AREA DE TRATAMIENTO NORMATIVO</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "NMRO_ESTR",
                  label: "<b><font color='#0C5EA3'>ESTRUCTURACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "OBSERV",
                  label: "<b><font color='#0C5EA3'>OBSERVACIONES</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],
            },
          ],
        },
      },
      {
        layer: new FeatureLayer({
          url: "https://services9.arcgis.com/BhzEj2fuR83yc3d3/ArcGIS/rest/services/MapaGeoSURCO/FeatureServer/14",
        }),
        searchFields: ["NOM_VIA", "COD_VIA"],
        displayField: "NOM_VIA",
        exactMatch: false,
        outFields: ["*"],
        name: "NOMBRE AV, CALLE, JIRON, PASAJE / COD. VIA",
        placeholder: "Ejemplo: ISABEL",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionsEnabled: true,
        minSuggestCharacters: 0,
        zoomScale: 1000,
        popupTemplate: {
          title: "NOMBRE: {NOM_VIA}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "NOM_VIA",
                  label: "<b><font color='#0C5EA3'>NOMBRE DE LA VIA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "COD_VIA",
                  label: "<b><font color='#0C5EA3'>CODIGO DE VIA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],
            },
          ],
        },
      },
      {
        layer: new FeatureLayer({
          url: "https://services9.arcgis.com/BhzEj2fuR83yc3d3/ArcGIS/rest/services/MapaGeoSURCO/FeatureServer/26",
        }),
        searchFields: ["N_HAB_URB"],
        displayField: "N_HAB_URB",
        exactMatch: false,
        outFields: ["*"],
        name: "NOMBRE HAB. URBANA",
        placeholder: "Ejemplo: CAPULLANA",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionsEnabled: true,
        minSuggestCharacters: 0,
        zoomScale: 5000,
        popupTemplate: {
          title: "NOMBRE: {N_HAB_URB}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "COD_H_URB",
                  label: "<b><font color='#0C5EA3'>CODIGO DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "GRUPO_URB",
                  label: "<b><font color='#0C5EA3'>TIPO DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "RES_H_URB",
                  label: "<b><font color='#0C5EA3'>RESOLUCION DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "PLN_H_URB",
                  label: "<b><font color='#0C5EA3'>PLANO DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "ESTAD",
                  label: "<b><font color='#0C5EA3'>ESTADO DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "OBSERV",
                  label: "<b><font color='#0C5EA3'>OBSERVACIONES DE HABILITACION URBANA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],
            },
          ],
        },
      },
      {
        layer: new FeatureLayer({
          url: "https://services9.arcgis.com/BhzEj2fuR83yc3d3/ArcGIS/rest/services/MapaGeoSURCO/FeatureServer/15",
        }),
        searchFields: ["NOM_PARQUE"],
        displayField: "NOM_PARQUE",
        exactMatch: false,
        outFields: ["*"],
        name: "NOMBRE DEL PARQUE",
        placeholder: "Ejemplo: EL SERENO",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionsEnabled: true,
        minSuggestCharacters: 0,
        zoomScale: 1000,
        popupTemplate: {
          title: "NOMBRE: {NOM_PARQUE}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "NOM_COMPLE",
                  label: "<b><font color='#0C5EA3'>NOMBRE DEL PARQUE</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "ID_LOTE",
                  label: "<b><font color='#0C5EA3'>CODIGO LOTE DEL PARQUE</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "PERIM",
                  label: "<b><font color='#0C5EA3'>PERIMETRO (m)</font></b>",
                  overwriteActions: true,
                  format: {
                    digitSeparator: true, // Uses a comma separator in numbers >999
                    places: 2 // Sets the number of decimal places to 0 and rounds up
                  }
                },
                {
                  fieldName: "AREA",
                  label: "<b><font color='#0C5EA3'>AREA (m²)</font></b>",
                  format: {
                    digitSeparator: true, // Uses a comma separator in numbers >999
                    places: 2 // Sets the number of decimal places to 0 and rounds up
                  }
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
