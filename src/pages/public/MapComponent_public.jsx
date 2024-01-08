import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent_public = ({ annonces_props }) => {
  
  const mapRef = useRef(null);

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/geometry/Point', 'esri/layers/FeatureLayer'], { css: true })
      .then(([Map, MapView, Graphic, Point, FeatureLayer]) => {
        const map = new Map({
          basemap: "streets-vector"
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-6.2423, 33.8818], // Coordonnées du Maroc
          zoom: 6 // Zoom pour afficher le pays
        });

        axios.get('http://localhost:3002/annonces/Annonces_publie')
          .then((response) => {
            const clusteredPoints = [];
            annonces_props.forEach(point => {
              const existingPoint = clusteredPoints.find(clusteredPoint =>
                clusteredPoint.geometry.latitude === point.latitude &&
                clusteredPoint.geometry.longitude === point.longitude
              );

              if (existingPoint) {
                existingPoint.clusterCount += 1;
              } else {
                clusteredPoints.push({
                  geometry: new Point({
                    longitude: point.longitude,
                    latitude: point.latitude
                  }),
                  attributes: {
                    name: point.description,
                    Operation: point.type_bien
                  },
                  clusterCount: 1
                });
              }
            });

            const pointRenderer = {
              type: 'simple',
              symbol: {
                type: 'simple-marker',
                color: 'blue',
                size: '8px'
              },
              visualVariables: [{
                type: 'size',
                field: 'clusterCount',
                stops: [
                  { value: 1, size: '8px' },
                  { value: 100, size: '40px' }
                ]
              }]
            };
            const featureLayer = new FeatureLayer({
              source: clusteredPoints,
              objectIdField: 'ObjectID',
              geometryType: 'point',
              spatialReference: view.spatialReference,
              fields: [
                { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
                { name: 'name', alias: 'Name', type: 'string' },
                { name: 'Operation', alias: 'Operation', type: 'string' },
                { name: 'clusterCount', alias: 'Cluster Count', type: 'integer' } 

              ],
              renderer: {
                type: 'simple',
                symbol: {
                  type: 'simple-marker',
                  color: 'blue',
                  size: '8px'
                },
                visualVariables: [{
                  type: 'size',
                  field: 'clusterCount',
                  stops: [
                    { value: 1, size: '8px' },
                    { value: 100, size: '40px' }
                  ]
                }]
              },
              featureReduction: {
                type: 'cluster',
                clusterRadius: '100px',
                popupTemplate: {
                  title: 'Cluster',
                  content: 'Ce cluster contient {cluster_count} annonces.'
                }
              },
              labelingInfo: [{
                labelExpressionInfo: {
                  expression: "$feature.clusterCount"
                },
                symbol: {
                  type: "text",
                  color: "black",
                  haloColor: "white",
                  haloSize: "2px",
                  font: {
                    size: "12px",
                    weight: "bold"
                  }
                },
                labelPlacement: "center-center",
              }],
              popupTemplate: {
                title: '{name}',
                content: [{
                  type: 'text',
                  text: 'Type d\'opération: ' + '{Operation}'
                }, {
                  type: 'text',
                  text: 'Nombre de points: ' + '{clusterCount}'
                }]
              },
              clusterPopupTemplate: {
                title: 'Cluster',
                content: 'Ce cluster contient {clusterCount} annonces.'
              }
            });

            map.add(featureLayer);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données:', error);
          });
      })
      .catch((error) => {
        console.error('Impossible de charger l\'API ArcGIS', error);
      });
  }, [annonces_props]);

  return (
    <div className="h-screen -z-10 " style={{ height: '100vh', width: '100%', marginTop: '2rem'}} ref={mapRef}>
    </div>
  );
};

export default MapComponent_public;
