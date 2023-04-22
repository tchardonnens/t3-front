import './globals.css'

export const metadata = {
  title: 'Tailored Tourist Tours',
  description: 'Your next trip, tailored to you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property='og:title' content={metadata.title} />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:url' content='https://tailoredtouristtours.vercel.app/' />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
