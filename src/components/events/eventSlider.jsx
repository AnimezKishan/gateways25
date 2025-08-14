'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/events/Slider.module.css';
import slides from '@/data/slides'; // Adjust path as needed
import EventModal from '@/components/EventModal';
import eventDetails from '@/data/EventDetails.json';

// You'll need to install these as dependencies or use CDN in _document.js
// npm install gsap split-type

const SliderComponent = () => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollAllowed, setScrollAllowed] = useState(true);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const totalSlides = slides.length;

    useEffect(() => {
        // Load GSAP and SplitType from CDN if not installed via npm
        const loadScripts = async () => {
            if (typeof window !== 'undefined') {
                // Check if GSAP is already loaded
                if (!window.gsap) {
                    await new Promise((resolve) => {
                        const script1 = document.createElement('script');
                        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
                        script1.onload = resolve;
                        document.head.appendChild(script1);
                    });
                }

                // Check if SplitType is already loaded
                if (!window.SplitType) {
                    await new Promise((resolve) => {
                        const script2 = document.createElement('script');
                        script2.src = 'https://unpkg.com/split-type';
                        script2.onload = resolve;
                        document.head.appendChild(script2);
                    });
                }

                // Initialize slides after scripts are loaded
                initializeAllSlides();
            }
        };

        loadScripts();

        // Cleanup function
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    const handleLearnMore = (slideData) => {
        // Find the corresponding event from EventDetails.json
        const event = eventDetails.find(event => event["Sl No."] === slideData.eventId);
        if (event) {
            setSelectedEvent(event);
            setIsModalOpen(true);
        }
    };

    const createSlide = (slideIndex) => {
        const slideData = slides[slideIndex - 1];

        if (!slideData) {
            console.error(`No slide data found for index ${slideIndex}`);
            return null;
        }

        return (
            <div
                key={slideIndex}
                className={`${styles.slide} ${styles.slideStack}`}
                data-slide-index={slideIndex}
            >
                <div className={styles.slideImg}>
                    <Image
                        src={slideData.slideImg}
                        alt={slideData.slideTitle}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={slideIndex === 1}
                    />
                </div>

                <div className={styles.slideHeader}>
                    <div className={styles.slideTitle}>
                        <h1>{slideData.slideTitle}</h1>
                    </div>
                    <div className={styles.slideDescription}>
                        <p>{slideData.slideDescription}</p>
                    </div>
                    <div className={styles.slideLink}>
                        <button 
                            onClick={() => handleLearnMore(slideData)}
                            className=" hover:text-cyan-400 transition-colors duration-200 cursor-pointer font-inherit border border-[#D4FF00] text-[#D4FF00] font-black font-orbitron p-2 rounded-md bg-black/40"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                <div className={styles.slideInfo}>
                    <div className={styles.slideTags}>
                        <p>Tags: </p>
                        {slideData.slideTags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                    </div>

                    <div className={styles.slideIndexWrapper}>
                        <p>{slideIndex.toString().padStart(2, "0")}</p>
                        <p> / </p>
                        <p>{totalSlides.toString().padStart(2, "0")}</p>
                    </div>
                </div>
            </div>
        );
    };

    const splitText = (slide) => {
        if (typeof window === 'undefined' || !window.SplitType) return;

        // Split heading into words
        const slideHeader = slide.querySelector(`.${styles.slideTitle} h1`);
        if (slideHeader) {
            if (slideHeader._splitType) {
                slideHeader._splitType.revert();
            }
            new window.SplitType(slideHeader, { types: 'words', wordClass: 'word' });
        }

        // Split paragraphs and links into lines
        const slideContent = slide.querySelectorAll("p, a");
        slideContent.forEach((element) => {
            if (element._splitType) {
                element._splitType.revert();
            }
            new window.SplitType(element, { types: 'lines', lineClass: 'line' });
        });
    };

    const initializeAllSlides = () => {
        if (typeof window === 'undefined' || !window.gsap) return;

        const slider = sliderRef.current;
        if (!slider) return;

        const slides = slider.querySelectorAll('[data-slide-index]');

        slides.forEach((slideElement, index) => {
            const slideIndex = index + 1;
            const isActive = slideIndex === 1;

            if (isActive) {
                slideElement.classList.add('active');
                window.gsap.set(slideElement, {
                    y: '0',
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    display: 'block',
                    zIndex: totalSlides + 1
                });
            } else {
                window.gsap.set(slideElement, {
                    opacity: 0,
                    display: 'none',
                    zIndex: -1
                });

                const textElements = slideElement.querySelectorAll(`.${styles.slideHeader}, .${styles.slideInfo}`);
                window.gsap.set(textElements, { opacity: 0 });
            }

            window.gsap.set(slideElement, { display: 'block' });
        });

        // Get active slide and split its text
        const activeSlide = slider.querySelector('.active');
        if (activeSlide) {
            const activeSlideImg = activeSlide.querySelector(`.${styles.slideImg}`);
            if (activeSlideImg) {
                window.gsap.set(activeSlideImg, { opacity: 1 });
            }

            splitText(activeSlide);

            // Animate words and lines for first slide
            const words = activeSlide.querySelectorAll(".word");
            const lines = activeSlide.querySelectorAll(".line");

            window.gsap.set([...words, ...lines], {
                y: "100%",
                force3d: true,
                opacity: 0,
            });

            const tl = window.gsap.timeline();

            // Animate header words
            tl.to(activeSlide.querySelectorAll(`.${styles.slideTitle} .word`), {
                y: "0%",
                duration: .5,
                ease: "power4.out",
                stagger: 0.1,
                force3d: true,
                opacity: 1,
            }, 0.2);

            // Animate description, tags and other text
            const tagsLines = activeSlide.querySelectorAll(`.${styles.slideTags} .line`);
            const indexLines = activeSlide.querySelectorAll(`.${styles.slideIndexWrapper} .line`);
            const descriptionLines = activeSlide.querySelectorAll(`.${styles.slideDescription} .line`);

            tl.to(tagsLines, {
                y: "0%",
                duration: .5,
                ease: "power4.out",
                stagger: 0.1,
                opacity: 1,
            }, "-=0.75");

            tl.to(indexLines, {
                y: "0%",
                duration: .5,
                ease: "power4.out",
                stagger: 0.1,
                opacity: 1,
            }, "<");

            tl.to(descriptionLines, {
                y: "0%",
                duration: .5,
                ease: "power4.out",
                stagger: 0.1,
                opacity: 1,
            }, "<");

            const linkLines = activeSlide.querySelectorAll(`.${styles.slideLink} .line`);
            tl.to(linkLines, {
                y: "0%",
                duration: .5,
                ease: "power4.out",
                stagger: 0.1,
                opacity: 1,
            }, "-=1");
        }
    };

    const animateSlide = (direction) => {
        if (isAnimating || !scrollAllowed || typeof window === 'undefined' || !window.gsap) return;

        setIsAnimating(true);
        setScrollAllowed(false);

        const slider = sliderRef.current;
        if (!slider) return;

        // Get current active slide
        const currentActiveSlide = slider.querySelector(".active");
        const currentIndex = parseInt(currentActiveSlide.getAttribute('data-slide-index'));

        // Calculate next slide index
        let nextSlideIndex;
        if (direction === "down") {
            nextSlideIndex = currentSlide === totalSlides ? 1 : currentSlide + 1;
        } else {
            nextSlideIndex = currentSlide === 1 ? totalSlides : currentSlide - 1;
        }

        setCurrentSlide(nextSlideIndex);

        // console.log(`Transitioning from slide ${currentIndex} to slide ${nextSlideIndex}`);

        // Find the next slide that will become active
        const nextActiveSlide = slider.querySelector(`[data-slide-index="${nextSlideIndex}"]`);

        if (!nextActiveSlide) {
            console.error(`Could not find slide with index ${nextSlideIndex}`);
            setIsAnimating(false);
            setScrollAllowed(true);
            return;
        }

        // Define exit and entry animations based on direction
        const exitY = direction === "down" ? "-200vh" : "200vh";
        const exitRotation = direction === "down" ? 30 : -30;

        // 1. Animate current active slide exit
        window.gsap.to(currentActiveSlide, {
            scale: 0.25,
            opacity: 0,
            rotation: exitRotation,
            y: exitY,
            duration: 1,
            ease: "power4.inOut",
            force3d: true,
            onComplete: () => {
                // After exit animation, properly reset the slide for future use
                currentActiveSlide.classList.remove('active');

                // Hide text content
                const textElements = currentActiveSlide.querySelectorAll(`.${styles.slideHeader}, .${styles.slideInfo}`);
                window.gsap.set(textElements, { opacity: 0 });

                // Reset the slide completely and hide it for future use
                window.gsap.set(currentActiveSlide, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 0,
                    zIndex: -1,
                    display: 'none',
                    clearProps: "clip-path"
                });

                // Reset the slide image to ensure it's properly displayed when needed again
                const slideImg = currentActiveSlide.querySelector(`.${styles.slideImg}`);
                if (slideImg) {
                    window.gsap.set(slideImg, {
                        opacity: 1,
                        clearProps: "transform"
                    });
                }
            }
        });

        // 2. Make sure next slide is properly styled and positioned for entry
        const entryY = direction === "down" ? "100vh" : "-100vh";
        const entryClipPath = direction === "down"
            ? "polygon(20% 20%, 80% 20%, 80% 100%, 20% 100%)"
            : "polygon(20% 0%, 80% 0%, 80% 80%, 20% 80%)";

        // First make sure all other slides are hidden
        const otherSlides = slider.querySelectorAll(`[data-slide-index]`);
        otherSlides.forEach(slide => {
            if (slide !== currentActiveSlide && slide !== nextActiveSlide) {
                window.gsap.set(slide, {
                    opacity: 0,
                    display: 'none',
                    zIndex: -1
                });
            }
        });

        // Reset the next slide completely before setting up the animation
        window.gsap.set(nextActiveSlide, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            display: 'block',
            clearProps: "clip-path transform"
        });

        // Make next slide fully visible and set entry position
        window.gsap.set(nextActiveSlide, {
            y: entryY,
            clipPath: entryClipPath,
            zIndex: totalSlides + 1,
            force3d: true
        });

        // Ensure the next slide's image is properly visible
        const nextSlideImg = nextActiveSlide.querySelector(`.${styles.slideImg}`);
        if (nextSlideImg) {
            window.gsap.set(nextSlideImg, {
                opacity: 1,
                clearProps: "transform"
            });
        }

        // Show text elements on the next active slide
        const nextTextElements = nextActiveSlide.querySelectorAll(`.${styles.slideHeader}, .${styles.slideInfo}`);
        window.gsap.set(nextTextElements, { opacity: 1 });

        // Apply text splitting to the next active slide
        splitText(nextActiveSlide);

        // Set initial state for text animations
        const words = nextActiveSlide.querySelectorAll(".word");
        const lines = nextActiveSlide.querySelectorAll(".line");

        window.gsap.set([...words, ...lines], {
            y: "100%",
            force3d: true,
            opacity: 0
        });

        // 3. Hide all other slides during the animation (keep black background)
        const allSlides = slider.querySelectorAll('[data-slide-index]');

        // Hide all slides except current and next active slide during animation
        allSlides.forEach(slide => {
            if (slide !== nextActiveSlide && slide !== currentActiveSlide) {
                window.gsap.set(slide, {
                    opacity: 0,
                    display: 'none',
                    zIndex: -1
                });
            }
        });

        // 4. Animate the next active slide entry with delay
        setTimeout(() => {
            // Mark as active
            nextActiveSlide.classList.add('active');

            // Ensure slide and image are fully visible and properly positioned
            const nextSlideImg = nextActiveSlide.querySelector(`.${styles.slideImg}`);
            if (nextSlideImg) {
                window.gsap.set(nextSlideImg, {
                    opacity: 1,
                    clearProps: "transform"
                });
            }

            // Final reset to ensure clean state
            window.gsap.set(nextActiveSlide, {
                rotation: 0,
                scale: 1,
                x: 0,
                zIndex: totalSlides + 1
            });

            // Animate slide entry
            window.gsap.to(nextActiveSlide, {
                y: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "power4.out",
                force3d: true,
                onStart: () => {
                    // Text animation timeline
                    const tl = window.gsap.timeline();

                    // Animate header words
                    const headerWords = nextActiveSlide.querySelectorAll(`.${styles.slideTitle} .word`);
                    tl.to(headerWords, {
                        y: "0%",
                        duration: .5,
                        ease: "power4.out",
                        stagger: 0.1,
                        force3d: true,
                        opacity: 1,
                    }, 0.75);

                    // Animate other text elements
                    const tagsLines = nextActiveSlide.querySelectorAll(`.${styles.slideTags} .line`);
                    const indexLines = nextActiveSlide.querySelectorAll(`.${styles.slideIndexWrapper} .line`);
                    const descriptionLines = nextActiveSlide.querySelectorAll(`.${styles.slideDescription} .line`);

                    tl.to(tagsLines, {
                        y: "0%",
                        duration: .5,
                        ease: "power4.out",
                        stagger: 0.1,
                        opacity: 1,
                    }, "-=0.75");

                    tl.to(indexLines, {
                        y: "0%",
                        duration: .5,
                        ease: "power4.out",
                        stagger: 0.1,
                        opacity: 1,
                    }, "<");

                    tl.to(descriptionLines, {
                        y: "0%",
                        duration: .5,
                        ease: "power4.out",
                        stagger: 0.1,
                        opacity: 1,
                    }, "<");

                    const linkLines = nextActiveSlide.querySelectorAll(`.${styles.slideLink} .line`);
                    tl.to(linkLines, {
                        y: "0%",
                        duration: .5,
                        ease: "power4.out",
                        stagger: 0.1,
                        opacity: 1,
                    }, "-=1");
                },
                onComplete: () => {
                    // Final cleanup - ensure the active slide is in perfect state
                    window.gsap.set(nextActiveSlide, {
                        clearProps: "clip-path",
                        y: 0,
                        x: 0,
                        rotation: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: totalSlides + 1
                    });

                    setIsAnimating(false);
                    setTimeout(() => {
                        setScrollAllowed(true);
                        setLastScrollTime(Date.now());
                    }, 100);
                },
            });
        }, 750);
    };

    const handleScroll = (direction) => {
        const now = Date.now();

        if (isAnimating || !scrollAllowed) return;
        if (now - lastScrollTime < 1000) return;

        setLastScrollTime(now);

        // Get active slide for pre-animation
        const currentActiveSlide = sliderRef.current?.querySelector(".active");

        if (!currentActiveSlide || typeof window === 'undefined' || !window.gsap) {
            console.error("No active slide found!");
            return;
        }

        // console.log(`Current active slide: ${currentActiveSlide.getAttribute('data-slide-index')}`);

        animateSlide(direction);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? "down" : "up";
        handleScroll(direction);
    };

    let touchStartY = 0;
    let isTouchActive = false;

    const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
        isTouchActive = true;
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (!isTouchActive || isAnimating || !scrollAllowed) return;

        const touchCurrentY = e.touches[0].clientY;
        const difference = touchStartY - touchCurrentY;

        if (Math.abs(difference) > 50) {
            isTouchActive = false;
            const direction = difference > 0 ? "down" : "up";
            handleScroll(direction);
        }
    };

    const handleTouchEnd = () => {
        isTouchActive = false;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("wheel", handleWheel, { passive: false });
            window.addEventListener("touchstart", handleTouchStart, { passive: false });
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("wheel", handleWheel);
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [isAnimating, scrollAllowed, lastScrollTime, currentSlide]);

    return (
        <>
            <div className={styles.slider} ref={sliderRef}>
                {slides.map((_, index) => createSlide(index + 1))}
            </div>
            
            <EventModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventData={selectedEvent}
            />
        </>
    );
};

export default SliderComponent;