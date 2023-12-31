import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
//libreria de ArcGIS
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import Expand from '@arcgis/core/widgets/Expand.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import ScaleBar from '@arcgis/core/widgets/ScaleBar.js';
import Search from "@arcgis/core/widgets/Search.js";
import Zoom from '@arcgis/core/widgets/Zoom.js';
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster.js"

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
    const buscarFicha = 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/DGPPVU/Mapa_Validacion/MapServer/1';
    const buscardistrito = 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/2';
    const buscarprovincia = 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/3';
    const buscardepartamento = 'https://dportalgis.vivienda.gob.pe/dhtserver/rest/services/LIMITES_POLITICOS/MapServer/4,'
    //Cargado de capas
    const limDistrito = new FeatureLayer({ url: buscardistrito, title: 'LIMITE DE DISTRITO', legendEnabled: false }); mapa.add(limDistrito);
    const limProvincia = new FeatureLayer({ url: buscarprovincia, title: 'LIMITE DE PROVINCIA', legendEnabled: false }); mapa.add(limProvincia);
    const limDepartamento = new FeatureLayer({ url: buscardepartamento, title: 'LIMITE DE DEPARTAMENTO', legendEnabled: false }); mapa.add(limDepartamento);
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
    }); mapa.add(lotesCofopri);
    const buscarCapas = [
      //buscar por ficha
      {
        layer: new FeatureLayer({
          url: buscarFicha,
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
          title: "FICHA N°{nro_ficha}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "estado",
                  label: "<b><font color='#0C5EA3'>ESTADO DE LA VIVIENDA</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
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
                {
                  fieldName: "longitud",
                  label: "<b><font color='#0C5EA3'>LONGITUD</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "latitud",
                  label: "<b><font color='#0C5EA3'>LATITUD</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],

            },
            {
              type: "media",
              mediaInfos: [
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto1}"
                  }
                },
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto2}"
                  }
                },
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto3}"
                  }
                }
              ]
            }
          ]
        },
      },
      //Buscar por distrito
      {
        layer: new FeatureLayer({
          url: buscarFicha,
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
          title: "FICHA N° {nro_ficha}",
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
                {
                  fieldName: "longitud",
                  label: "<b><font color='#0C5EA3'>LONGITUD</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
                {
                  fieldName: "latitud",
                  label: "<b><font color='#0C5EA3'>LATITUD</font></b>",
                  visible: true,
                  stringFieldOption: "text-box",
                },
              ],

            },
            {
              type: "media",
              mediaInfos: [
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto1}"
                  }
                },
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto2}"
                  }
                },
                {
                  type: "image",
                  value: {
                    sourceURL: "{foto3}"
                  }
                }
              ]
            }
          ]
        },
      },
    ];
    const validacion = new FeatureLayer({
      url: buscarFicha,
      title: "VALIDACION EN CAMPO",
      popupTemplate: {
        title: "FICHA N° {nro_ficha}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "estado",
                label: "<b><font color='#0C5EA3'>ESTADO DE LA VIVIENDA</font></b>",
                visible: true,
                stringFieldOption: "text-box",
              },
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
              {
                fieldName: "longitud",
                label: "<b><font color='#0C5EA3'>LONGITUD</font></b>",
                visible: true,
                stringFieldOption: "text-box",
              },
              {
                fieldName: "latitud",
                label: "<b><font color='#0C5EA3'>LATITUD</font></b>",
                visible: true,
                stringFieldOption: "text-box",
              },
            ],

          },
          {
            type: "media",
            mediaInfos: [
              {
                type: "image",
                value: {
                  sourceURL: "{foto1}"
                }
              },
              {
                type: "image",
                value: {
                  sourceURL: "{foto2}"
                }
              },
              {
                type: "image",
                value: {
                  sourceURL: "{foto3}"
                }
              }
            ]
          }
        ]
      },


    });
    const featureReduction = new FeatureReductionCluster({
      clusterRadius: 50, // Radio de agrupación en píxeles
      clusterMinSize: 25, // Tamaño mínimo de agrupación
    }); validacion.featureReduction = featureReduction; mapa.add(validacion);

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
      allPlaceholder: "BUSQUEDA",
      includeDefaultSources: false,
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
    }); view.ui.add(leyendaExpand, { position: 'bottom-right' });
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
    //Funcion de medidas
    const distanciaWidget = new DistanceMeasurement2D({ view: view });
    const distanciaExpand = new Expand({ expandIconClass: "esri-icon-measure-line", view: view, expandTooltip: "MEDIR DISTANCIA", content: distanciaWidget }); view.ui.add(distanciaExpand, { position: "top-right" });
    const areaWidget = new AreaMeasurement2D({ view: view });
    const areaExpand = new Expand({ expandIconClass: "esri-icon-measure-area", view: view, expandTooltip: "MEDIR AREA", content: areaWidget }); view.ui.add(areaExpand, { position: "top-right" });
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
