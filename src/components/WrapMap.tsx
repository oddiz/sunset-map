import { LatLng } from "leaflet";
import { useRef, useCallback } from "react";
import { useMap, useMapEvents } from "react-leaflet";

export function WrapMap() {
  const MAP_SIZE = 1600;
  const map = useMap();
  const isAdjusting = useRef(false);

  const wrapCoordinate = useCallback((coord: number) => {
    return ((coord % MAP_SIZE) + MAP_SIZE) % MAP_SIZE;
  }, []);

  const adjustCenter = useCallback(() => {
    if (isAdjusting.current) return;

    const center = map.getCenter();
    const newLat = wrapCoordinate(center.lat);
    const newLng = wrapCoordinate(center.lng);

    if (
      Math.abs(center.lat - newLat) > 0.1 ||
      Math.abs(center.lng - newLng) > 0.1
    ) {
      isAdjusting.current = true;
      map.panTo(new LatLng(newLat, newLng), { animate: false, duration: 0 });
      setTimeout(() => {
        isAdjusting.current = false;
      }, 0);
    }
  }, [map, wrapCoordinate]);

  useMapEvents({
    moveend: adjustCenter,
    zoomend: adjustCenter,
  });

  return null;
}
