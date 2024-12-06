import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

function Map({ shelters, mapPosition, setActiveStateIndex }) {
  return (
    <div className="mapContainer w-[80%] md:w-[63%] h-[55rem] rounded-[2rem]">
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full rounded-[2rem]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shelters.map((shelter) => (
          <Marker
            key={shelter._id}
            position={[
              shelter.position.coordinates[1],
              shelter.position.coordinates[0],
            ]}
          >
            <Popup>{shelter.companyName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick
          shelters={shelters}
          setActiveStateIndex={setActiveStateIndex}
        />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 7);
  return null;
}
function DetectClick({ shelters, setActiveStateIndex }) {
  useMapEvent({
    click: (e) => {
      const mapLng = e.latlng.lng.toFixed(0);
      const mapLat = e.latlng.lat.toFixed(0);
      console.log(mapLng);
      console.log(mapLat);
      const shelter = shelters.filter(
        (shelter) =>
          shelter.position.coordinates[1].toFixed(0) == mapLat &&
          shelter.position.coordinates[0].toFixed(0) == mapLng
      );
      setActiveStateIndex(shelters.indexOf(...shelter));
    },
  });
}
export default Map;
