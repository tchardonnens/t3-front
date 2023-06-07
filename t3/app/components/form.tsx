import { useState } from "react";
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

  const handleSelectChange = (event: any) => {
    setTypes(event.target.value);
  };

  const toastPostParameters = () => {
    toast.promise(
      postParameters(),
      {
        loading: 'Searching best places to visit... ⏳',
        success: <b>We have a trip for you! 🥳</b>,
        error: <b>Hmmm... Sorry we could not find anything for the location {location} 😣</b>,
      }
    );
  }

  const postParameters = async () => {
    if (!location || !days || !types) {
      throw new Error('Missing data');
    }

    try {
      const response = await axios.post('https://api.t3.verycurious.xyz/api/v1/tsp', {
        location: location,
        days: Number(days),
        types: types
      });

      console.log(response);
      setData(response.data);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    // TODO: fill the action url
    <>
      <Toaster />
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 md:gap-0 w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="location">Location 📍</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-40 p-2 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="text" id="location" name="location" required />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="days">Number of days 📅</label>
            <input value={days} onChange={e => setDays(e.target.value)} className="w-40 p-2 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="number" id="days" name="days" required />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label className="text-lg mb-2" htmlFor="type">Type of sites 🏛️</label>
            <select
              value={types}
              onChange={handleSelectChange}
              className="block appearance-none w-40 p-2 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white"
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
          <button type="submit" onClick={toastPostParameters} className="mt-10 w-60 h-15 bg-white dark:bg-black text-black dark:text-white rounded-lg p-2 outline outline-black dark:outline-white">Search →</button>
        </div>
      </div>
      <br />
      {data && (
        <div className="flex flex-col justify-center items-center">
          <h1>{data.Days}-Day Trip to {data.Location}</h1>
          <p>Type of attractions: {data.Types}</p>

          <Tabs>
            <TabList>
              {data.TSP.map((day, index) => day && day.length > 0 && (
                <Tab key={index}>Day {index + 1}</Tab>
              ))}
            </TabList>
            {data.TSP.map((day, index) => day && day.length > 0 && (
              <TabPanel key={index}>
                <div className="flex flex-row" style={{ width: '80vw', margin: '0 auto' }}>
                  <div className="flex flex-col mr-20">
                    <h2>Day {index + 1}</h2>
                    {day.map(museum => (
                      <div key={museum.id}>
                        <h3>🏛️ {museum.name} </h3>
                        <p>📍 Address: {museum.address}, {museum.city}, {museum.department}, {museum.region}</p>
                        {/* <p>🧭 Latitude: {museum.lat || 'Not available'}</p>
                        <p>🧭 Longitude: {museum.lng || 'Not available'}</p> */}
                        <p>🌍 Website: <a href={museum.website} target="_blank" rel="noopener noreferrer">{museum.website}</a></p>
                        <p>📝 Description: {museum.description || 'Not available'}</p>
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