import { useState } from "react";
import "./FileLoader.css";

function FileLoader({ setTrack, setMapBounds }) {
  const [file, setFile] = useState(null);

  const fileChangeHandler = (event) => {
    var reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, "text/xml");
      const trkpts = Array.from(xmlDoc.getElementsByTagName("trkpt"));
      const new_track = [];

      let minLat = 9999;
      let minLon = 9999;
      let maxLat = -9999;
      let maxLon = -9999;

      trkpts.forEach((trkpt) => {
        let lat = trkpt.getAttribute("lat");
        let lon = trkpt.getAttribute("lon");

        if (lat < minLat) {
          minLat = lat;
        }
        if (lon < minLon) {
          minLon = lon;
        }
        if (lat > maxLat) {
          maxLat = lat;
        }
        if (lon > maxLon) {
          maxLon = lon;
        }

        new_track.push({ lat, lon });
      });

      setMapBounds([
        [minLat, minLon],
        [maxLat, maxLon],
      ]);
      setTrack(new_track);
    });

    if (event.target.files[0]) {
      reader.readAsText(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="file-loader-container">
      <input className="file-input" type="file" onChange={fileChangeHandler} />
    </div>
  );
}

export default FileLoader;
