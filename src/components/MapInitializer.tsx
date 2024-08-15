import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MAP_SIZE } from "../const";

export function MapInitializer() {
  const map = useMap();

  useEffect(() => {
    L.gridLayer({
      tileSize: MAP_SIZE,
      noWrap: true,
    }).addTo(map);
  }, [map]);

  return null;
}
