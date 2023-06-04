import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [location, setLocation] = useState('')
  const [days, setDays] = useState('')
  const [types, setTypes] = useState('')

  const postParameters = () => {
    axios.post('http://127.0.0.1:8080/api/v1/parameters', {
      location: location,
      days: Number(days),
      types: types
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    // TODO: fill the action url
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 md:gap-0 w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="location">Location 📍</label>
          <input value={location} onChange={e => setLocation(e.target.value)} className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="text" id="location" name="location" required />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="days">Number of days 📅</label>
          <input value={days} onChange={e => setDays(e.target.value)} className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="number" id="days" name="days" required />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="type">Type of sites 🏛️</label>
          <input value={types} onChange={e => setTypes(e.target.value)} className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="text" id="types" name="types" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" onClick={postParameters} className="mt-10 w-60 h-15 bg-white dark:bg-black text-black dark:text-white rounded-lg p-2 outline outline-black dark:outline-white">Search →</button>
      </div>
    </div>
  );
}