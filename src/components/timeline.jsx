"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="relative w-full overflow-hidden md:px-10"
      ref={containerRef}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 md:px-8 lg:px-10">
        <div className="relative mb-6">
          <h2 className="mb-4 w-fit bg-gradient-to-r from-cyan-300 to-[#D4ff00] bg-clip-text text-[3.5rem] font-bold text-transparent">
            How to Register
          </h2>

          <p className="text-sm text-[#D4FF00]/80 md:text-base">
            &gt; Participate in any number of events for ₹150/-
          </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-20 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              {/* Cyberpunk Timeline Node */}
              <div
                className="absolute left-2.5 -top-2 flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(252deg, #1c1829 0%, #1b1828 8.61%, #191724 17.21%, #161520 25.82%, #14131c 34.42%, #121218 43.03%, #111117 51.63%)",
                }}
              >
                <div className="h-4 w-4 rounded-full bg-[#D4FF00]"></div>
              </div>

              {/* Title with cyberpunk styling */}
              {/* drop-shadow-[0_0_10px_#D4FF00]  */}
              <h3 className="hidden  text-xl font-bold tracking-wider text-[#D4FF00] md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              {/* Mobile title */}
              <h3 className="mb-4 block text-left  text-2xl font-bold tracking-wider text-[#D4FF00] md:hidden">
                {item.title}
              </h3>

              {/* Content container with cyberpunk styling */}
              <div className="relative border border-[#D4FF00]/30 bg-gray-900/80 p-6 backdrop-blur-sm">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* Timeline Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute top-0 left-8 w-[3px] overflow-hidden bg-gradient-to-b from-transparent via-[#D4FF00]/10 to-transparent md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-cyan-600 via-[#D4FF00]/60 to-transparent shadow-[0_0_10px_#D4FF00]"
          />
        </div>
      </div>

      {/* Ambient Glow Effects */}
      {/* <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#D4FF00]/5 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-[#D4FF00]/10 blur-2xl"></div> */}
    </div>
  );
};
