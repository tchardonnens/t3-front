import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  GeolocateControl,
} from "react-map-gl";

export default function MapboxMap() {
  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN
  return (

    <div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoidG9tNzgiLCJhIjoiY2xnbTkwYnQ0MDNkbzNsb2V3d3hvd3Q2diJ9.efwRWl4ud5nylL_H3kuhIQ"
        initialViewState={{
          longitude: 2.33,
          latitude: 48.86,
          zoom: 10,
        }}
        style={{
          width: "80vw",
          height: "80vh",
          borderRadius: "15px",
          border: "1px solid black",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}

        />
      </Map>
    </div>
  );
}