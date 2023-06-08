import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TripPlan } from "../types/trip-plan";
import { PlaceType } from "../enums/place-type";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MapboxMap from "./mapbox";

export default function Form() {
  const [location, setLocation] = useState('')
  const [days, setDays] = useState('')
  const [types, setTypes] = useState(PlaceType.MUSEUM);
  const [data, setData] = useState<TripPlan | null>(null)
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (location.length > 2) { // Don't make request for very short query
      axios.get('https://api.t3.verycurious.xyz/api/v1/locations', {
        params: { q: location }
      }).then(response => {
        setSuggestions(response.data.locations || []);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [location]);

  const handleSelectChange = (event: any) => {
    setTypes(event.target.value);
  };

  const toastPostParameters = () => {
    toast.promise(
      postParameters(),
      {
        loading: 'Searching best places to visit... ⏳',
        success: <b>We have a trip for you! 🥳</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  }

  const postParameters = async () => {
    if (!location || !days || !types) {
      throw new Error('Missing data');
    }

    // Validate the number of days
    if (Number(days) <= 1 || Number(days) > 30) { // Assuming 30 is a reasonable max number of days
      throw new Error('Number of days should be greater than 1 and less than or equal to 30');
    }

    // Validate location - alphanumeric and spaces (modify the regex to allow more characters if needed)
    // adapt regex to all french characters and accents and add dashes
    const locationRegex = /^[a-zA-Z0-9À-ÿ\s-\s()]*$/;
    if (!locationRegex.test(location)) {
      throw new Error('Location should only contain alphanumeric characters and spaces');
    }

    // Validate types
    if (!Object.values(PlaceType).includes(types)) {
      throw new Error('Invalid type selected');
    }

    try {
      const response = await axios.post('https://api.t3.verycurious.xyz/api/v1/tsp', {
        location: location,
        days: Number(days),
        types: types
      });

      console.log(response);
      setData(response.data);

    } catch (error: any) {
      console.error(error);
      let errorMessage = "Something went wrong";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  }

  return (
    // TODO: fill the action url
    <>
      <Toaster />
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 md:gap-0 w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="days">Number of days 📅</label>
            <input value={days} onChange={e => setDays(e.target.value)} className="md:w-40 w-60 p-2 rounded-lg bg-white dark:bg-black outline outline-black dark:outline-white" type="number" id="days" name="days" required />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="location">Location 📍</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              list="location-suggestions"
              className="w-60 p-2 rounded-lg bg-white dark:bg-black outline outline-black dark:outline-white"
              type="text"
              id="location"
              name="location"
              required
            />
            <datalist id="location-suggestions"> {/* Add datalist element here */}
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="type">Type of sites 🏛️</label>
            <select
              value={types}
              onChange={handleSelectChange}
              className="block appearance-none md:w-40 w-60 p-2 rounded-lg bg-white dark:bg-black outline outline-black dark:outline-white"
            >
              {Object.values(PlaceType).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" onClick={toastPostParameters} className="mt-10 w-60 h-15 dark:bg-white bg-black dark:text-black text-white rounded-lg p-2 outline dark:outline-black outline-white ">Search →</button>
        </div>
      </div>
      <br />
      {data && (
        <div className="flex flex-col justify-center items-center">
          <h1>{data.Days}-Days Trip to {data.Location}</h1>
          <p className="mb-5">Type of attractions: {data.Types}</p>

          <Tabs className="mb-10">
            <TabList>
              {data.TSP.map((day, index) => day && day.length > 0 && (
                <Tab key={index}>Day {index + 1}</Tab>
              ))}
            </TabList>
            {data.TSP.map((day, index) => day && day.length > 0 && (
              <TabPanel key={index}>
                <div className="lg:grid lg:grid-cols-2 md:flex flex-col" style={{ width: '80vw', margin: '0 auto' }}>
                  <div className="flex flex-col">
                    {day.map(museum => (
                      <div key={museum.id}>
                        <h3>🏛️ {museum.name} </h3>
                        <p>📍 {museum.address}, {museum.city}, {museum.department}, {museum.region}</p>
                        {/* <p>🧭 Latitude: {museum.lat || 'Not available'}</p>
                        <p>🧭 Longitude: {museum.lng || 'Not available'}</p> */}
                        {museum.website && (
                          <p>🌍 Website: <a href={museum.website} target="_blank" rel="noopener noreferrer">{museum.website}</a></p>
                        )}

                        {museum.description && (
                          <p>📝 Description: {museum.description}</p>
                        )}
                        <br />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <MapboxMap points={day} />
                  </div>

                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}