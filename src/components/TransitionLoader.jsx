'use client';

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function TransitionLoader({ isVisible, onComplete }) {
    const videoRef = useRef(null)
    const leftHalfRef = useRef(null)
    const rightHalfRef = useRef(null)
    const loaderRef = useRef(null)

    useEffect(() => {
        console.log('TransitionLoader isVisible changed:', isVisible);
        if (isVisible) {
            showLoader();
        } else {
            hideLoader();
        }
    }, [isVisible]);

    const showLoader = () => {
        console.log('Showing transition loader');
        // Ensure video plays when component shows
        if (videoRef.current) {
            videoRef.current.play()
        }

        // Show loader container first
        gsap.set(loaderRef.current, { display: 'flex' });
        
        // Reset positions - left half starts from left, right half starts from right
        gsap.set(leftHalfRef.current, { x: '-100%', opacity: 1 });
        gsap.set(rightHalfRef.current, { x: '100%', opacity: 1 });

        // Animate halves converging from opposite sides
        const tl = gsap.timeline();
        
        // Both halves slide in simultaneously from opposite directions
        tl.to(leftHalfRef.current, {
            x: '0%',
            duration: 1,
            ease: "power3.out",
        })
        .to(rightHalfRef.current, {
            x: '0%',
            duration: 1,
            ease: "power3.out",
        }, "<") // Start at same time as left half
        
        // Hold the converged state
        .to({}, { duration: 1.2 });

        // Auto-hide after showing (you can control this externally)
        if (onComplete) {
            tl.call(onComplete);
        }
    };

    const hideLoader = () => {
        if (!loaderRef.current) return;

        const tl = gsap.timeline();
        
        // Split and move halves apart to opposite sides
        tl.to(leftHalfRef.current, {
            x: '-100%',
            duration: 1,
            ease: "power3.in",
        })
        .to(rightHalfRef.current, {
            x: '100%',
            duration: 1,
            ease: "power3.in",
        }, "<") // Start at same time as left half
        .set(loaderRef.current, { display: 'none' });
    };

    return (
        <div 
            ref={loaderRef}
            className="fixed inset-0 h-screen w-screen z-[60] bg-black items-center justify-center"
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            {/* Left Half */}
            <div 
                ref={leftHalfRef}
                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                style={{ 
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    transform: 'translateX(-100%)'
                }}
            >
                {/* Background Video - Left Half */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-[200%] h-full object-cover"
                    style={{ left: '0%' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/loader.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* SVG Mask Overlay - Left Half */}
                <div className="relative z-10 w-full h-full">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <mask id="textMaskLeft">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    x="100%"
                                    y="50%"
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fill="black"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fontFamily="Orbitron, monospace"
                                    letterSpacing="0.8"
                                >
                                    GATE
                                </text>
                                <text
                                    x="100%"
                                    y="65%"
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fill="black"
                                    fontSize="6"
                                    fontWeight="normal"
                                    fontFamily="Orbitron, monospace"
                                    letterSpacing="0.4"
                                >
                                    20
                                </text>
                            </mask>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="black"
                            mask="url(#textMaskLeft)"
                        />
                    </svg>
                </div>

                {/* Spinner - Left */}
                <div className="absolute bottom-10 left-10 z-20">
                    <div className="w-16 h-16 border-4 border-transparent text-[#D4FF00] border-t-[#D4FF00] rounded-full animate-spin"></div>
                </div>
            </div>

            {/* Right Half */}
            <div 
                ref={rightHalfRef}
                className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
                style={{ 
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    transform: 'translateX(100%)'
                }}
            >
                {/* Background Video - Right Half */}
                <video
                    className="absolute inset-0 w-[200%] h-full object-cover"
                    style={{ right: '0%', left: '-100%' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/loader.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* SVG Mask Overlay - Right Half */}
                <div className="relative z-10 w-full h-full">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <mask id="textMaskRight">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    x="0%"
                                    y="50%"
                                    textAnchor="start"
                                    dominantBaseline="middle"
                                    fill="black"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fontFamily="Orbitron, monospace"
                                    letterSpacing="0.8"
                                >
                                    WAYS
                                </text>
                                <text
                                    x="0%"
                                    y="65%"
                                    textAnchor="start"
                                    dominantBaseline="middle"
                                    fill="black"
                                    fontSize="6"
                                    fontWeight="normal"
                                    fontFamily="Orbitron, monospace"
                                    letterSpacing="0.4"
                                >
                                    25
                                </text>
                            </mask>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="black"
                            mask="url(#textMaskRight)"
                        />
                    </svg>
                </div>

                {/* Spinner - Right */}
                <div className="absolute bottom-10 right-10 z-20">
                    <div className="w-16 h-16 border-4 border-transparent text-[#D4FF00] border-t-[#D4FF00] rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}

export { TransitionLoader }
