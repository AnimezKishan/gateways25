"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const sponsorLogos = [
  "/gateways-logo.png",
  "/techOlympus.png",
  "/gateways-logo.png",
  "/techOlympus.png",
  "/gateways-logo.png",
  "/techOlympus.png",
  "/gateways-logo.png",
  "/techOlympus.png",
  "/gateways-logo.png",
];

const SponsorsMarquee = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(208deg, #1c1829 0%, #1b1828 8.61%, #191724 17.21%, #161520 25.82%, #14131c 34.42%, #121218 43.03%, #111117 51.63%)",
      }}
    >
      <div className="mb-12 text-center">
        <h1 className="mx-auto text-[3.5rem] w-fit text-center font-bold px-44 bg-gradient-to-r from-cyan-300 to-[#D4ff00] bg-clip-text text-transparent">
          Trusted by the Best
        </h1>
        <p className="mt-2 text-lg text-neutral-400">Our Sponsors</p>

        <Marquee className="my-5">
          {[...sponsorLogos, ...sponsorLogos].map((src, index) => (
            <div
              key={index}
              className="mx-8 flex flex-shrink-0 items-center justify-center sm:mx-12"
            >
              <Image
                width={180}
                height={180}
                src={src}
                alt={`Sponsor Logo ${(index % sponsorLogos.length) + 1}`}
                className="h-32 object-contain grayscale transition-all duration-300 hover:grayscale-0 sm:h-40"
              />
            </div>
          ))}
        </Marquee>

        <div className=""></div>
      </div>
      <div className="w-full"></div>
    </section>
  );
};

export default SponsorsMarquee;
