'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import './styles.css'
import ScrollVideo from '../ScrollVideo'
import CircularText from '../CircularText'

export default function Hero() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date('2025-09-15T00:00:00').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = targetDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // First step
    gsap.from(".hero-main-container", {
      scale: 1.45,
      duration: 2.8,
      ease: "power3.out",
    });

    gsap.to(".overlay", {
      opacity: 0,
      duration: 2.8,
      ease: "power3.out",
      onComplete: () => {
        document.body.style.overflow = "visible";
        document.body.style.overflowX = "hidden";
      },
    });

    // Scroll Indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const bounceTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    bounceTimeline.to(scrollIndicator, {
      y: 20,
      opacity: 0.6,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        scrub: 2,
        pin: true,
        start: "top top",
        end: "+=2000",
        ease: "none",
      },
    });

    // Need to ensure that the scale is like this otherwise some flicks happens
    tl.set(".hero-main-container", {
      scale: 1.25,
    });

    // tl.to(".custom-class", {
    //   opacity: 0,
    //   duration:1,
    // })

    tl.to(".hero-main-container", {
      scale: 1,
      duration: 1,
    });

    tl.to(
      ".hero-main-logo",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<" // starts at the same time of previous animation
    );

    tl.to(
      ".hero-main-image",
      {
        opacity: 0,
        duration: 0.9,
      },
      "<+=0.5"
    );

    tl.to(
      ".hero-main-container",
      {
        backgroundSize: "28vh",
        duration: 1.5,
      },
      "<+=0.2"
    );

    tl.fromTo(
      ".hero-text",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(212, 255, 0, 0) 0,
          rgba(0, 255, 255, 0.5) 90vh,
          rgba(0, 255, 255, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(
          circle at 50% 3.9575vh,
          rgb(212, 255, 0) 0vh,
          rgb(0, 255, 255) 50.011vh,
          rgb(0, 200, 200) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh
        )`,
        duration: 3,
      },
      "<1.2"
    );


    // logo purple
    tl.fromTo(
      ".hero-text-logo",

      {
        opacity: 0,
        maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
      },
      {
        opacity: 1,
        maskImage: `radial-gradient(
        circle at 50% 105.594%,
        rgb(0, 0, 0) 62.9372%,
        rgba(0, 0, 0, 0) 81.4686%
      )`,
        duration: 3,
      },
      "<0.2"
    );

    tl.set(".hero-main-container", { opacity: 0 });

    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");

    tl.set(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
      },
      "<+=2.1"
    );

    tl.to(
      ".hero-1-container",
      {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: 2,
      },
      "<+=0.2" // Start 0.2 seconds after the mask is set
    );

    tl.set(".hero-1-container", { opacity: 0 });
    tl.set(".hero-2-container", { visibility: "visible" });
    tl.set(".scroll-indicator", { visibility: "hidden" });

    tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2");

    tl.fromTo(
      ".hero-2-container",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(212, 255, 0, 0) 0,
          rgba(0, 255, 255, 0.5) 90vh,
          rgba(0, 255, 255, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(
          circle at 50% 3.9575vh,
          rgb(212, 255, 0) 0vh,
          rgb(0, 255, 255) 50.011vh,
          rgb(0, 200, 200) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh
        )`,
        duration: 3,
      },
      "<1.2" // starts 1.2s before the previous animation
    );

    tl.to(".gateways-logo", {
      opacity: 0,
      duration: 2,
    })

    tl.set(
      ".hero-2-container",
      {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
      },
      "<+=2.1"
    );

    tl.to(
      ".hero-2-container",
      {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: 2,
      },
      "<+=0.2" // Start 0.2 seconds after the mask is set
    );

    tl.set(".hero-2-container", { opacity: 0 });
    tl.set(".hero-3-container", { visibility: "visible" });

    tl.to(".hero-3-container", { opacity: 1, duration: 3 }, "<+=0.2");

    tl.fromTo(
      ".hero-3-container",
      {
        backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(212, 255, 0, 0) 0,
          rgba(0, 255, 255, 0.5) 90vh,
          rgba(0, 255, 255, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
      },
      {
        backgroundImage: `radial-gradient(
          circle at 50% 3.9575vh,
          rgb(212, 255, 0) 0vh,
          rgb(0, 255, 255) 50.011vh,
          rgb(0, 200, 200) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh
        )`,
        duration: 3,
      },
      "<1.2" // starts 1.2s before the previous animation
    );

    tl.set(
      ".hero-3-container",
      {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
      },
      "<+=2.1"
    );

    tl.to(
      ".hero-3-container",
      {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: 2,
      },
      "<+=0.2" // Start 0.2 seconds after the mask is set
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="hero-1-container relative">
        <div className="hero-main-container">
          {/* <Image
            className="hero-main-logo"
            draggable={false}
            src="/gta_logo_cut.webp"
            alt="gta logo"
            fill
            style={{ objectFit: 'cover' }}
          /> */}
          {/* <Image
            className="hero-main-image"
            draggable={false}
            src="/gta_hero.webp"
            alt="gta hero"
            fill
            style={{ objectFit: 'cover' }}
          /> */}
          <video src="/hero.mp4"className="hero-main-image"
            draggable={false}
            alt="hero"
            autoPlay
            loop
            muted
            style={{ objectFit: 'cover', scale: "1.2" }}></video>

          {/* <CircularText
            text="SCROLL*TO*REVEAL*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class absolute top-[85%] left-[75%] scale-75"
          /> */}
        </div>
        <div className="hero-text-logo-container">
          <div className="hero-text-logo"></div>
          <div>
            <h3 className="hero-text font-orbitron font-bold">
              Coming<br />
              Sept 15<br />
              2025
            </h3>
            <div className="countdown-timer font-orbitron text-sm mt-2" style={{ color: '#D4FF00', backgroundImage: 'none', WebkitTextFillColor: '#D4FF00' }}>
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold">{countdown.days.toString().padStart(2, '0')}</div>
                  <div className="text-xs">DAYS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{countdown.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs">HOURS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{countdown.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs">MINS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{countdown.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs">SECS</div>
                </div>
              </div>
            </div>
            {/* <p className='text-center text-lg font-orbitron mt-2'>Department of Computer Science, Central Campus, Bangalore</p> */}
          </div>
        </div>
      </div>
      <div className="hero-2-container relative">
        {/* <img src="/gateways-logo.png" alt="gateways logo" className='absolute top-50  left-240 scale-70' /> */}
        <h3 className='font-orbitron font-bold'>Gateways</h3>
        <div className='w-full flex justify-between items-center'>
          <p className='font-content text-justify w-[70%]'>
            Gateways is the national technical fest, held annually for over 25 years by the Department of Computer Science at CHRIST (Deemed to be University), Bangalore. Organized by students of the post-graduate MCA (Master of Computer Applications) and MSc AI-ML (Artificial Intelligence and Machine Learning) programs, it aims to be at the forefront of innovation and collaboration, with new ideas and events presented each year.
            We invite colleges from all over India, with enthusiastic participation from those who join us for this gathering of minds. An essential part of Gateways is its robust and dynamic theme, reflecting both current trends and the rich history of the discipline.
          </p>
          <img src="/gateways-logo.png" alt="gateways logo" className='w-[25%]' />
        </div>
      </div>

      <div className="hero-3-container relative">
        <h3 className='font-orbitron font-bold'>Neon Nexus</h3>
        <div className='w-full flex justify-between items-center'>
          <p className='font-content text-justify w-[70%]'>
            In the pulsating heart of Nova City, where neon lights cut through the haze and data flows like lifeblood, Neon Nexus transforms Gateways into a living cyberpunk saga. This year’s theme is a convergence of innovation, creativity, and rebellion—a space where coders, creators, and dreamers unite to rewrite the system.
            Through thrilling competitions and electrifying events, participants will navigate a city shaped by algorithms and alive with possibility. Gateways 2025 invites tech enthusiasts nationwide to step into the grid, embrace the chaos, and become part of the uprising.
          </p>
          <img src="/neon-nexus.png" alt="nn logo" className='nn-logo w-[25%]' />
        </div>
      </div>
      {/* <div className="hero-4-container relative">
        <ScrollVideo />
      </div> */}
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <svg
          width="34"
          height="14"
          viewBox="0 0 34 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="_1smfa210"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
