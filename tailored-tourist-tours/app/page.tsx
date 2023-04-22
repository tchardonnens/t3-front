'use client'
import MapboxMap from "./components/mapbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1 className="text-6xl font-bold">Tailored Tourist Tours</h1>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <MapboxMap />
      </div>
    </main>
  )
}
