import "./App.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Polyline,
  Marker,
} from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import FileLoader from "./FileLoader";
import bikeSVG from "./bike-svgrepo-com.svg";

const defalutMapPosition = [51.505, -0.09];

let markerIcon = Leaflet.icon({
  iconUrl: bikeSVG,
  iconRetinaUrl: bikeSVG,
  iconAnchor: [16, 32],
  iconSize: [32, 32],
});

function App() {
  const [track, setTrack] = useState([]);
  const [mapBounds, setMapBounds] = useState([]);
  const [markerPosition, SetMarkerPosition] = useState(defalutMapPosition);

  function ChangeView({ mapBounds }) {
    const map = useMap();
    map.fitBounds(mapBounds);
    setMapBounds([]);
    return null;
  }

  useEffect(() => {


    let currentPointIndex = 0;
    const interval = setInterval(() => {
      if (track.length > 0) {
        SetMarkerPosition(track[currentPointIndex]);
        currentPointIndex = currentPointIndex + 1;
      }
    }, 300);


    return () => clearInterval(interval);
  }, [track]);

  return (
    <div className="App">
      <section className="section-header">
        <h1>Leaflet Test</h1>
      </section>

      <section className="section-file">
        <FileLoader setTrack={setTrack} setMapBounds={setMapBounds} />
      </section>

      <section className="section-map" id="section_map">
        <div className="map__container">
          <MapContainer
            center={defalutMapPosition}
            zoom={13}
            scrollWheelZoom={false}
          >
            {mapBounds.length === 2 && <ChangeView mapBounds={mapBounds} />}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {track && <Polyline key={1} positions={track} color={"red"} />}
            <Marker
              position={markerPosition}
              icon={markerIcon}
              style={{ color: "red" }}
            />
          </MapContainer>
        </div>
      </section>
    </div>
  );
}

export default App;
