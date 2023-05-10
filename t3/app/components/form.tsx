export default function Form() {
  return (
    // TODO: fill the action url 
    <form action="" method="post" className="w-full">
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-evenly gap-8 sm:gap-0 w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="location">Location 📍</label>
          <input className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="text" id="location" name="location" required />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="days">Number of days 📅</label>
          <input className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="number" id="days" name="days" required />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-lg mb-2" htmlFor="type">Type of sites 🏛️</label>
          <input className="w-40 p-1 rounded-lg bg-slate-200 dark:bg-black outline outline-black dark:outline-white" type="text" id="type" name="type" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="mt-10 w-60 h-15 bg-white dark:bg-black text-black dark:text-white rounded-lg p-2 outline outline-black dark:outline-white">Search →</button>
      </div>
    </form>
  );
}