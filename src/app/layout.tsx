import './globals.css'
import { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Afro Fashion Fest 2025',
  description: 'Official site of Afro Fashion Fest 2025 — showcasing African designers, models, and cultural creativity.',
  keywords: 'Afro Fashion Fest, African fashion, designers, models, Umuahia, Nigeria, fashion festival, Five Stars Digital Media',
  author: 'Five Stars Digital Media',
  icons: {
    icon: '/logo.jpg',   // favicon in public folder
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Afro Fashion Fest 2025",
    startDate: "2025-11-27T10:00:00+01:00",
    endDate: "2025-11-28T20:00:00+01:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Umuahia Cultural Center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Macaulay Street",
        addressLocality: "Umuahia",
        addressRegion: "Abia",
        postalCode: "",
        addressCountry: "NG",
      },
    },
    image: ["https://www.afrofashionfest.com/logo.jpg"],
    description: "Afro Fashion Fest 2025 celebrates African designers, models, and culture. Powered by Five Stars Digital Media.",
    organizer: {
      "@type": "Organization",
      name: "Five Stars Digital Media",
      url: "https://www.fivestarsdigitalmedia.com",
    },
  }

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.afrofashionfest.com" />
        <meta property="og:site_name" content="Afro Fashion Fest" />
        <meta property="og:image" content="https://www.afrofashionfest.com/logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Afro Fashion Fest 2025" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://www.afrofashionfest.com/logo.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
