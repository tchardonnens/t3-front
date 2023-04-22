import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  GeolocateControl,
} from "react-map-gl";

export default function MapboxMap() {

  return (

    <div>
      <Map
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
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