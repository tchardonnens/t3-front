'use client'
import Form from "./components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-2">Tailored tours 🇫🇷</h1>
      <p className="text-xl mb-10">Plan your next visits in France!</p>
      <Form />
      <footer className="mt-auto">
        <b><a href="https://thomascdnns.com">Made by Thomas Chardonnens ✌️</a></b>
      </footer>
    </main>
  )
}
