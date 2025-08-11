'use client'

import { useState, useEffect } from 'react'
import Hero from "@/components/Hero/Hero";
import ScrollVideo from "@/components/ScrollVideo";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Set a minimum loading time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Add a small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 500)
    }, 4000) // Show loader for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loader />
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        {/* Scroll video component */}
        {/* <ScrollVideo /> */}
        
        <Hero />
      </div>
    </div>
  );
}
