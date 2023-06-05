'use client'
// import MapboxMap from "./components/mapbox";
import Form from "./components/form";
import MapboxMap from "./components/mapbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-5xl font-bold mb-20">T3 🌎</h1>
      <Form />
    </main>
  )
}
