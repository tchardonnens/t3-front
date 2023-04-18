'use client'
import MapboxMap from "./components/mapbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Tailored Tourist Tours</h1>
      <p className="text-2xl font-light">
        A curated list of the best tourist tours in the world.
      </p>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <MapboxMap />
      </div>
    </main>
  )
}
