import {
  MapContainer,
  ImageOverlay,
  
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { MapInitializer } from "./MapInitializer";
import { WrapMap } from "./WrapMap";
import mapUrl from "./map.png";
import { MAP_SIZE } from "../const";



function ArbitrageMap() {

  

  return (
    <div className="flex">
      
      <div className="flex-grow" style={{ height: "600px", width: "600px" }}>
        <MapContainer
          center={[MAP_SIZE / 2, MAP_SIZE / 2]}
          zoom={0}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#1F2937",
          }}
          crs={L.CRS.Simple}
          minZoom={-2}
          maxZoom={2}
          zoomControl={true}
          maxBoundsViscosity={0} // Allow the map to be dragged outside bounds
        >
          <MapInitializer />
          <WrapMap />
          {[
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 0],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ].map(([y, x]) => (
            <ImageOverlay
              key={`${y}-${x}`}
              url={mapUrl}
              bounds={[
                [y! * MAP_SIZE, x! * MAP_SIZE],
                [(y! + 1) * MAP_SIZE, (x! + 1) * MAP_SIZE],
              ]}
              opacity={1}
            />
          ))}
          
          

          

        </MapContainer>
      </div>
     
    </div>
  );
}

export default ArbitrageMap;
