import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapCenter = [31.7947, -7.0849]; // Set your desired map center coordinates

  return (
    <MapContainer center={mapCenter} zoom={6} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapCenter}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
