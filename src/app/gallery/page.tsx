'use client'

import { useEffect, useState, useRef } from 'react'

export default function GalleryPage() {
  const gold = '#CDA23B'
  const [animate, setAnimate] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const images = [1, 2, 3, 4, 5, 6] // Replace with actual gallery image paths

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Auto-scroll carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % images.length
        const scrollAmount = scrollRef.current.scrollWidth / images.length
        scrollRef.current.scrollTo({
          left: nextIndex * scrollAmount,
          behavior: 'smooth',
        })
        setActiveIndex(nextIndex)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [activeIndex, images.length])

  return (
    <section className="w-full py-32 bg-[#1A1A1A] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ color: gold }}
        >
          Gallery & Event Highlights
        </h2>

        <p
          className={`text-gray-300 mb-12 transition-all duration-1200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Subscribe to our YouTube channel for exclusive content: <br/>
          <a href="https://www.youtube.com/@fivestarsdigitalmedia" target="_blank" rel="noreferrer" className="underline text-white">
            @fivestarsdigitalmedia
          </a>
        </p>

        {/* Carousel Gallery */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 mb-6 scroll-smooth transition-all duration-1200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {images.map((i, index) => (
            <div
              key={i}
              className={`min-w-[280px] md:min-w-[320px] snap-start rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 ${
                activeIndex === index ? 'scale-105 shadow-2xl' : ''
              }`}
            >
              <img
                src={`/gallery/${i}.jpg`} // Replace with actual image paths
                alt={`Gallery ${i}`}
                className="w-full h-64 md:h-72 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${activeIndex === idx ? 'bg-gold' : 'bg-gray-600'}`}
              style={{ backgroundColor: activeIndex === idx ? gold : '#444' }}
            ></div>
          ))}
        </div>

        {/* YouTube Video */}
        <div
          className={`relative aspect-video mx-auto w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl border border-gray-700 transition-all duration-1200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <iframe
            title="Afro Fashion Fest 2025 Highlights"
            src="https://www.youtube.com/embed?list=PLZf5-LylzN7CxIU5fYro4JZGb6AN8w9BD"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </section>
  )
}
