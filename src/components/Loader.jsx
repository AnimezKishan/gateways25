'use client';

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Loader() {
    const videoRef = useRef(null)
    const loader = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
        
        // console.log('Loader mounted');

        const tl = gsap.timeline()
        
        tl.to(loader.current, {
            delay: 2.5,
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            ease: "power2.inOut"
        })

        return () => {
            tl.kill() 

        }
    }, [])

    return (
        <div 
        ref={loader}
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        className="fixed inset-0 h-screen w-screen z-50 bg-black flex items-center justify-center"
        >
            <div className="flex-col gap-4 w-fit flex items-center justify-center absolute z-100 bottom-10 right-10 ">
                <div
                    className="w-20 h-20 border-4 border-transparent text-[#D4FF00] text-4xl animate-spin flex items-center justify-center border-t-[#D4FF00] rounded-full"
                >
                    {/* <div
                        className="w-16 h-16 border-4 border-transparent text-[#00ffff] text-2xl animate-spin flex items-center justify-center border-t-[#00ffff] rounded-full"
                    ></div> */}
                </div>
            </div>

            {/* Background Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/loader.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* SVG Mask Overlay */}
            <div className="relative z-10 w-full h-full">
                <svg
                    viewBox="0 0"
                    className="w-full h-full"
                    style={{
                        maskComposite: 'subtract',
                    }}
                >
                    <defs>
                        <mask id="textMask">
                            {/* White background - this will be transparent */}
                            <rect width="100%" height="100%" fill="white" />

                            {/* Black text - this will show the video */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                fontSize="120"
                                fontWeight="bold"
                                fontFamily="Orbitron, monospace"
                                letterSpacing="8px"
                            >
                                GATEWAYS
                            </text>

                            <text
                                x="50%"
                                y="65%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                fontSize="60"
                                fontWeight="normal"
                                fontFamily="Orbitron, monospace"
                                letterSpacing="4px"
                            >
                                2025
                            </text>
                        </mask>
                    </defs>

                    {/* Black overlay that covers everything except the masked text */}
                    <rect
                        width="100%"
                        height="100%"
                        fill="black"
                        mask="url(#textMask)"
                    />
                </svg>
            </div>

            {/* Alternative CSS-based approach (commented out) */}
            {/* 
      <div 
        className="absolute inset-0 bg-black text-white flex items-center justify-center"
        style={{
          WebkitMask: 'radial-gradient(circle, transparent 30%, black 30%)',
          mask: 'radial-gradient(circle, transparent 30%, black 30%)',
        }}
      >
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold font-orbitron tracking-wider">
            GATEWAYS
          </h1>
          <p className="text-2xl md:text-3xl font-orbitron tracking-widest mt-4">
            2025
          </p>
        </div>
      </div>
      */}
        </div>
    )
}

export { Loader }
