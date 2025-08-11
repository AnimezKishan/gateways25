"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      scrollAnimation.kill();
    };
  }, [images]);

  return (
    <div ref={containerRef} className="h-[100vh] w-full bg-black flex items-center justify-center">
      <img
        ref={imageRef}
        src={images[0]}
        alt="scroll animation"
        className="max-w-full max-h-full object-cover scale-130"
      />
    </div>
  );
};

export default ScrollVideo;
