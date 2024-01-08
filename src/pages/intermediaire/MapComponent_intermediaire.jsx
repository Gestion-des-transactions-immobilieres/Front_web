import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import axios from 'axios';

import markerIcon from '/assets/img/leaflet/marker-icon.png';
import markerIconcluster from '/assets/img/leaflet/images_cluster.png';
import markerShadow from '/assets/img/leaflet/marker-shadow.png';

const MapComponent = ({annonces_props}) => {

  console.log("immmmm point ",annonces_props)
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef(null);

  useEffect(() => {
    const mapElement = mapRef.current;
  
    if (mapElement && !mapInstance.current) {
      const map = L.map(mapElement, {
        center: [31.7917, -7.0926],
        zoom: 6
      });
  
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 22
      }).addTo(map);
  
      mapInstance.current = map;

      markersRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: function(cluster) {
          const childCount = cluster.getChildCount();
          let iconUrl = markerIcon;
      
          if (childCount > 1) {
            iconUrl = markerIconcluster;
          }
      
          return L.divIcon({
            html: `<div style="color: white; font-size: 18px; font-family: Arial; border-radius: 50%; width: 40px; height: 40px; background-color: red; display: flex; align-items: center; justify-content: center;"><span>${childCount}</span></div>`,
            className: 'marker-cluster-custom',
            iconSize: L.point(40, 40, true),
            iconUrl: iconUrl,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!markersRef.current || !mapInstance.current) return;
  
    if (!Array.isArray(annonces_props)) return;
  
    const points = annonces_props.map(point => {
      const customIcon = L.icon({
        html: `<span>100</span>`,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
  
      const marker = L.marker([point.latitude, point.longitude], { icon: customIcon });
      marker.bindPopup(`<b>${point.description}</b><br>Type de bien: ${point.type_bien}</b><br>Type d'operation: ${point.type_operation}</b>`);
      return marker;
    });

    markersRef.current.clearLayers();
  
    markersRef.current.addLayers(points);
    if (!mapInstance.current.hasLayer(markersRef.current)) {
      mapInstance.current.addLayer(markersRef.current);
    }
  }, []);

  return (
    <div className="map-container" style={{ height: '500px', width: '100%' }} ref={mapRef}></div>
  );
};

export default MapComponent;