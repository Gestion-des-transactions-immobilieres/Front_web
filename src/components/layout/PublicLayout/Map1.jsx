import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";

const position = [51.505, -0.09];

const MapWithEsriBasemap = () => {
  return (
    <MapContainer center={position} zoom={13} className="bg-black m-40">
      <BasemapLayer name="Topographic" />
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapWithEsriBasemap;
