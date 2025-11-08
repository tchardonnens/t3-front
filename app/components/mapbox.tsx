import axios from 'axios';
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from 'react';
import Map, {
  GeolocateControl, Layer, Marker, Source,
} from "react-map-gl/mapbox";

export default function MapboxMap({ points }: any) {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  // Fetch the directions when the points change.
  useEffect(() => {
    const fetchDirections = async () => {
      if (!points || points.length < 2) return;

      const coordinates = points.map((p: { lng: any; lat: any; }) => `${p.lng},${p.lat}`).join(';');
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      console.log(url);
      try {
        const response = await axios.get(url);
        setRouteGeoJSON(response.data.routes[0].geometry);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDirections();
  }, [points]);

  // Return early if no points are provided
  if (!points || points.length === 0) {
    return <div>No points to display on map</div>;
  }

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: points[0].lng,
          latitude: points[0].lat,
          zoom: 12,
        }}
        style={{
          width: "100%",
          height: "70vh",
          borderRadius: "15px",
          border: "1px solid black",
        }}
        mapStyle="mapbox://styles/tom78/clikblx6900g801r06zf71lyi"
      >
        {routeGeoJSON && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': '#8941d1',
                'line-width': 5
              }}
            />
          </Source>
        )}
        {points.map((point: any, index: any) => (
          <Marker key={index} longitude={point.lng} latitude={point.lat}>
            <div style={{ color: 'blue', background: 'white', padding: '2px 5px', borderRadius: '50%' }}>
              {index + 1}
            </div>
          </Marker>
        ))}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </Map>
    </div>
  );
}