'use client';

import gsap from 'gsap'
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const PageTransitionLoader = forwardRef(({ onComplete }, ref) => {
    const videoRefLeft = useRef(null)
    const videoRefRight = useRef(null)
    const leftHalfRef = useRef(null)
    const rightHalfRef = useRef(null)
    const loaderRef = useRef(null)

    useImperativeHandle(ref, () => ({
        show: showTransition,
        hide: hideTransition
    }));

    const showTransition = () => {
        console.log('Starting page transition');
        console.log('Left half ref:', leftHalfRef.current);
        console.log('Right half ref:', rightHalfRef.current);
        
        // Ensure videos play when component shows
        if (videoRefLeft.current) {
            videoRefLeft.current.play()
        }
        if (videoRefRight.current) {
            videoRefRight.current.play()
        }

        // Show loader container
        gsap.set(loaderRef.current, { display: 'flex' });
        
        // Reset positions - halves start from opposite sides off-screen
        gsap.set(leftHalfRef.current, { 
            x: '-100%', 
            opacity: 1,
            display: 'block',
            visibility: 'visible'
        });
        gsap.set(rightHalfRef.current, { 
            x: '100%', 
            opacity: 1,
            display: 'block',
            visibility: 'visible'
        });

        console.log('Left half styles after gsap.set:', getComputedStyle(leftHalfRef.current));
        console.log('Right half styles after gsap.set:', getComputedStyle(rightHalfRef.current));

        // Animate halves converging to center
        const tl = gsap.timeline();
        
        tl.to([leftHalfRef.current, rightHalfRef.current], {
            x: '0%',
            duration: 0.8,
            ease: "power3.out",
        })
        // Hold the converged state
        .to({}, { duration: 2.5 })
        // Auto-disperse after holding
        .call(() => {
            hideTransition();
        });

        return tl;
    };

    const hideTransition = () => {
        console.log('Hiding page transition');
        
        const tl = gsap.timeline();
        
        // Split halves apart to opposite sides
        tl.to(leftHalfRef.current, {
            x: '-100%',
            duration: 0.8,
            ease: "power3.in",
        })
        .to(rightHalfRef.current, {
            x: '100%',
            duration: 0.8,
            ease: "power3.in",
        }, "<") // Start at same time as left half
        .set(loaderRef.current, { display: 'none' })
        .call(() => {
            if (onComplete) {
                onComplete();
            }
        });

        return tl;
    };

    return (
        <div 
            ref={loaderRef}
            className="fixed inset-0 h-screen w-screen z-[70] bg-black items-center justify-center"
            style={{ display: 'none' }}
        >
            {/* Left Half */}
            <div 
                ref={leftHalfRef}
                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                style={{ 
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    transform: 'translateX(-100%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 0, 0, 0.3)' // Temporary red for debugging
                }}
            >
                {/* Spinner - Left */}
                <div className="absolute bottom-10 left-10 z-20">
                    <div className="w-20 h-20 border-4 border-transparent text-[#D4FF00] border-t-[#D4FF00] rounded-full animate-spin"></div>
                </div>

                {/* Background Video - Left Half */}
                <video
                    ref={videoRefLeft}
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
                            <mask id="textMaskLeftTransition">
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
                            mask="url(#textMaskLeftTransition)"
                        />
                    </svg>
                </div>
            </div>

            {/* Right Half */}
            <div 
                ref={rightHalfRef}
                className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden"
                style={{ 
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    transform: 'translateX(100%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 255, 0, 0.3)' // Temporary green for debugging
                }}
            >
                {/* Spinner - Right */}
                <div className="absolute bottom-10 right-10 z-20">
                    <div className="w-20 h-20 border-4 border-transparent text-[#D4FF00] border-t-[#D4FF00] rounded-full animate-spin"></div>
                </div>

                {/* Background Video - Right Half */}
                <video
                    ref={videoRefRight}
                    className="absolute inset-0 w-[200%] h-full object-cover"
                    style={{ right: '0%' }}
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
                            <mask id="textMaskRightTransition">
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
                            mask="url(#textMaskRightTransition)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
});

PageTransitionLoader.displayName = 'PageTransitionLoader';

export default PageTransitionLoader;
