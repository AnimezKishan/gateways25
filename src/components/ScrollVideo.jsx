"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FuzzyText from "./FuzzyText";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [images, setImages] = useState([]);

  const totalFrames = 192; // Number of images

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= totalFrames; i++) {
      const frameNumber = String(i).padStart(4, "0"); // 001, 002...
      loadedImages.push(`/frames/frame_${frameNumber}.jpg`);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (!images.length) return;

    let frameObj = { frame: 0 };

    // Create the scroll animation

    const fadeInAnimation = gsap.fromTo(containerRef.current, 
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=350", // Trigger when component is 150px from entering viewport
          end: "top center",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
        onComplete: () => {
          // Scroll-based text reveal animation
          gsap.fromTo(".reveal-text", 
            {
              opacity: 0,
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              delay: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".reveal-text",
                start: "top bottom-=100",
                end: "top center",
                scrub: 0.5,
                toggleActions: "play none none reverse",
              }
            }
          )
        }
      }
    );

    const scrollAnimation = gsap.to(frameObj, {
      frame: images.length - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom+=2000 top",
        scrub: 1, // Add slight lag for smoother animation with Lenis
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1,
      },
      onUpdate: () => {
        if (imageRef.current && images[Math.round(frameObj.frame)]) {
          imageRef.current.src = images[Math.round(frameObj.frame)];
        }
      },
    });

    // Refresh ScrollTrigger to ensure proper integration with Lenis
    ScrollTrigger.refresh();

    return () => {
      fadeInAnimation.kill();
      scrollAnimation.kill();
    };
  }, [images]);

  return (
    <div ref={containerRef} className="h-[100vh] w-full flex items-center justify-center bg-transparent relative">
      <img
        ref={imageRef}
        src={images[0]}
        alt="scroll animation"
        className="bg-transparent max-w-full max-h-full object-cover scale-130"
      />
      <div className="bg-transparent absolute reveal-text opacity-0 scale-20">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
        >
          Events Unlocked
        </FuzzyText>
      </div>
    </div>
  );
};

export default ScrollVideo;
