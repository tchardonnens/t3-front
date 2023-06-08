import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  GeolocateControl, Layer, Marker, Source,
} from "react-map-gl";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MapboxMap({ points }: any) {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  // Fetch the directions when the points change.
  useEffect(() => {
    const fetchDirections = async () => {
      if (points.length < 2) return;

      const coordinates = points.map((p: { lng: any; lat: any; }) => `${p.lng},${p.lat}`).join(';');
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
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
  return (

    <div>
      <Map
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
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
        // color
        mapStyle="mapbox://styles/tom78/clikblx6900g801r06zf71lyi"
      // dark
      //mapStyle="mapbox://styles/tom78/clikbwaoj00ga01r0bjcxcnzd"
      // light
      // mapStyle="mapbox://styles/tom78/clhhr8vh601ad01qt34ixevgu"
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