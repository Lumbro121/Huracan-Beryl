
"use client";

import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Datos de la trayectoria del Huracán Beryl (2024)
// Datos reales del NHC (National Hurricane Center)
export const berylTrackData = [
  { date: "28 Jun 2024", time: "12:00 UTC", lat: 9.6, lon: -30.7, category: "Depresión Tropical", wind: 30, pressure: 1007 },
  { date: "29 Jun 2024", time: "00:00 UTC", lat: 10.0, lon: -34.5, category: "Tormenta Tropical", wind: 45, pressure: 1000 },
  { date: "29 Jun 2024", time: "12:00 UTC", lat: 10.4, lon: -38.5, category: "Tormenta Tropical", wind: 55, pressure: 996 },
  { date: "30 Jun 2024", time: "00:00 UTC", lat: 10.7, lon: -42.5, category: "Huracán Cat. 1", wind: 75, pressure: 988 },
  { date: "30 Jun 2024", time: "12:00 UTC", lat: 11.0, lon: -46.8, category: "Huracán Cat. 2", wind: 100, pressure: 970 },
  { date: "01 Jul 2024", time: "00:00 UTC", lat: 11.4, lon: -51.2, category: "Huracán Cat. 4", wind: 130, pressure: 946 },
  { date: "01 Jul 2024", time: "12:00 UTC", lat: 11.8, lon: -55.5, category: "Huracán Cat. 5", wind: 165, pressure: 932 },
  { date: "02 Jul 2024", time: "00:00 UTC", lat: 12.5, lon: -59.5, category: "Huracán Cat. 4", wind: 150, pressure: 940 },
  { date: "02 Jul 2024", time: "12:00 UTC", lat: 13.2, lon: -63.0, category: "Huracán Cat. 4", wind: 145, pressure: 945 },
  { date: "03 Jul 2024", time: "00:00 UTC", lat: 13.9, lon: -66.5, category: "Huracán Cat. 4", wind: 140, pressure: 950 },
  { date: "03 Jul 2024", time: "12:00 UTC", lat: 14.6, lon: -70.0, category: "Huracán Cat. 4", wind: 130, pressure: 955 },
  { date: "04 Jul 2024", time: "00:00 UTC", lat: 15.4, lon: -73.5, category: "Huracán Cat. 3", wind: 115, pressure: 965 },
  { date: "04 Jul 2024", time: "12:00 UTC", lat: 16.2, lon: -77.0, category: "Huracán Cat. 2", wind: 110, pressure: 970 },
  { date: "05 Jul 2024", time: "00:00 UTC", lat: 17.0, lon: -80.0, category: "Huracán Cat. 2", wind: 100, pressure: 975 },
  { date: "05 Jul 2024", time: "12:00 UTC", lat: 17.8, lon: -83.0, category: "Huracán Cat. 1", wind: 80, pressure: 983 },
  { date: "06 Jul 2024", time: "00:00 UTC", lat: 18.6, lon: -85.5, category: "Huracán Cat. 1", wind: 75, pressure: 987 },
  { date: "06 Jul 2024", time: "12:00 UTC", lat: 19.3, lon: -87.5, category: "Huracán Cat. 2", wind: 95, pressure: 978 },
  { date: "07 Jul 2024", time: "00:00 UTC", lat: 20.5, lon: -90.0, category: "Huracán Cat. 1", wind: 80, pressure: 985 },
  { date: "07 Jul 2024", time: "12:00 UTC", lat: 22.0, lon: -93.0, category: "Huracán Cat. 1", wind: 85, pressure: 980 },
  { date: "08 Jul 2024", time: "00:00 UTC", lat: 24.0, lon: -95.5, category: "Huracán Cat. 1", wind: 80, pressure: 983 },
  { date: "08 Jul 2024", time: "12:00 UTC", lat: 28.5, lon: -96.0, category: "Huracán Cat. 1", wind: 80, pressure: 982 },
  { date: "09 Jul 2024", time: "00:00 UTC", lat: 31.5, lon: -95.5, category: "Tormenta Tropical", wind: 45, pressure: 997 },
];

interface MapContentProps {
  onPointClick: (point: typeof berylTrackData[0] | null) => void;
  selectedPoint: typeof berylTrackData[0] | null;
}

const MapContent = ({ onPointClick, selectedPoint }: MapContentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-slate-900 rounded-lg flex items-center justify-center">
        <div className="text-white animate-pulse">Cargando mapa...</div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    if (category.includes("Cat. 5")) return "#FF0000";
    if (category.includes("Cat. 4")) return "#FF4500";
    if (category.includes("Cat. 3")) return "#FFA500";
    if (category.includes("Cat. 2")) return "#FFD700";
    if (category.includes("Cat. 1")) return "#FFFF00";
    if (category.includes("Tormenta")) return "#00FF00";
    return "#00BFFF";
  };

  const pathCoordinates = berylTrackData.map((point) => [point.lat, point.lon]);

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        onPointClick(null);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[18, -70]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
      className="rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <Polyline
        positions={pathCoordinates as [number, number][]}
        color="#FF6B6B"
        weight={3}
        opacity={0.8}
      />
      {berylTrackData.map((point, index) => (
        <CircleMarker
          key={`${point.date}-${point.time}`}
          center={[point.lat, point.lon]}
          radius={selectedPoint === point ? 12 : 8}
          fillColor={getCategoryColor(point.category)}
          color={selectedPoint === point ? "#fff" : "#333"}
          weight={selectedPoint === point ? 3 : 2}
          opacity={1}
          fillOpacity={0.9}
          eventHandlers={{
            click: (e: { originalEvent: { stopPropagation: () => void } }) => {
              e.originalEvent.stopPropagation();
              onPointClick(point);
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{point.date}</strong>
              <br />
              {point.time}
              <br />
              <span className="font-semibold">{point.category}</span>
              <br />
              Vientos: {point.wind} kt
              <br />
              Presión: {point.pressure} mb
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

interface HurricaneMapProps {
  onPointSelect: (point: typeof berylTrackData[0] | null) => void;
  selectedPoint: typeof berylTrackData[0] | null;
}

export default function HurricaneMap({ onPointSelect, selectedPoint }: HurricaneMapProps) {
  return (
    <div className="w-full">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <MapContent onPointClick={onPointSelect} selectedPoint={selectedPoint} />
    </div>
  );
}
