"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/app/lib/utils";

export function LampDemo() {
  const mentorImages = [
    { name: "Dr. Neha Singhal", image: "/about/neha.jpg" },
    { name: "Dr. Nisha Varghese", image: "/about/nisha.jpg" },
    { name: "Dr. Somnath Sinha", image: "/about/somnath.jpg" }
  ];

  const developerImages = [
    { name: "Kishan Kumar", image: "/about/kishan (1)_Nero_AI_Image_Denoiser.jpeg.jpg" },
    { name: "Tushar Ghosh", image: "/about/tushar.jpg" },
    { name: "Darshan Heble", image: "/about/placeholder.svg" },
    { name: "Vyshnavi K", image: "/about/placeholder.svg" }
  ];

  const coreTeamImages = [
    { name: "Aleena Ealias", image: "/about/ALEENA EALIAS .jpg" },
    { name: "Bomble Shivam", image: "/about/BOMBLE SHIVAM VIJAY.jpg" },
    { name: "R Sharanya", image: "/about/r_sharanya.JPG" },
    { name: "Ashish Khetal", image: "/about/ashish.jpeg.jpg" },
    { name: "Saumya", image: "/about/Saumya.jpg" },
    { name: "Vivek", image: "/about/Vivek.jpeg.jpg" },
    { name: "Angel Blessy", image: "/about/placeholder.svg" },
    { name: "Smitha M", image: "/about/placeholder.svg" },
    { name: "Hitesh Kumar", image: "/about/placeholder.svg" },
    { name: "Abhinav Jain", image: "/about/placeholder.svg" },
    { name: "Shambhavi Sinha", image: "/about/placeholder.svg" },
    { name: "Hari Prasad B K", image: "/about/placeholder.svg" }
  ];

  return (
    <>
      <LampContainer className="pt-70">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 bg-gradient-to-br from-white to-white py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl pt-45 font-orbitron">
          Coordinators <br /> 
        </motion.h1>
        {/* 3 rectangular containers */}
        <div className="mt-12 flex flex-wrap gap-8 justify-center items-center object-contain">
          {mentorImages.map((mentor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg rounded-xl w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex flex-col items-center justify-center text-cyan-200 text-xl font-semibold border border-cyan-500/30 overflow-hidden"
            >
              <div className={`w-full h-3/4 flex items-center justify-center bg-[white]/20 overflow-hidden `}>
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-contain scale-110 rounded-t-xl"
                />
              </div>
              <div className="h-1/4 flex items-center justify-center">
                {mentor.name}
              </div>
            </motion.div>
          ))}
        </div>
      </LampContainer>

      {/* Section 2: About Gateways */}
      <LampContainer className="mt-[-8rem] pt-84">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 bg-gradient-to-br from-white to-white py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-5xl pt-57 font-orbitron">
          The Developers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0.5, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="mt-4 text-lg text-white text-center max-w-2xl mx-auto"
        >
        </motion.p>
        {/* 2 rectangular containers */}
        <div className="mt-12 flex flex-wrap gap-8 justify-center items-center">
          {developerImages.map((developer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg rounded-xl w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex flex-col items-center justify-center text-cyan-200 text-xl font-semibold border border-purple-500/30 overflow-hidden"
            >
              <div className="w-full h-3/4 flex items-center justify-center bg-[white]/20  overflow-hidden">
                <img 
                  src={developer.image} 
                  alt={developer.name}
                  className="w-full h-full object-contain scale-110 rounded-t-xl"
                />
              </div>
              <div className="h-1/4 flex items-center justify-center">
                {developer.name}
              </div>
            </motion.div>
          ))}
        </div>
      </LampContainer>

      {/* Section 3: Core Team */}
      <LampContainer className="mt-[-8rem] min-h-[170vh] pt-85">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 bg-gradient-to-br from-white to-white py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-5xl pt-50 font-orbitron">
          Core Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0.5, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="mt-4 text-lg text-yellow-200 text-center max-w-2xl mx-auto"
        >
        </motion.p>
        {/* 12 rectangular containers */}
        <div className="mt-12 flex flex-wrap gap-8 justify-center items-center">
          {coreTeamImages.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg rounded-xl w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex flex-col items-center justify-center text-cyan-200 text-xl font-semibold border border-yellow-400/30 overflow-hidden"
            >
              {member.image ? (
                <>
                  <div className="w-full h-3/4 flex items-center justify-center bg-[white]/20 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-contain scale-110 rounded-t-xl"
                    />
                  </div>
                  <div className="h-1/4 flex items-center justify-center">
                    {member.name}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  {member.name}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </LampContainer>
    </>
  );
}

export const LampContainer = ({
  children,
  className
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}>
      <div
        className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]">
          <div
            className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div
            className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]">
          <div
            className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div
            className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div
          className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "></motion.div>

        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
