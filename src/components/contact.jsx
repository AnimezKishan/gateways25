import React from "react";

const Contact = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(324deg, #1c1829 0%, #1b1828 8.61%, #191724 17.21%, #161520 25.82%, #14131c 34.42%, #121218 43.03%, #111117 51.63%)",
      }}
    >
      <div className="relative z-10 mx-auto flex flex-col justify-center px-4 py-45">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            {/* drop-shadow-[0_0_10px_#D4FF00] */}
            <h1 className="text-[3.5rem] w-fit text-left font-bold md:text-7xl px-44 bg-gradient-to-r from-cyan-300 to-[#D4ff00] bg-clip-text text-transparent">
              Contact
            </h1>
          </div>

          <div className="mt-5">
            <p className="text-lg text-neutral-400">
              For any queries regarding the fest
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Mohit Contact Card */}
          <div className="group relative">
            {/* Glitch Effect Border */}
            <div className="absolute inset-0 translate-x-1 translate-y-1 transform border-2 border-[#D4FF00]/60 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            <div className="relative overflow-hidden border-2 border-[#D4FF00] bg-black/90 backdrop-blur-sm">
              {/* Name Section */}
              <div className="bg-[#D4FF00] px-10 py-4">
                <h3 className="text-xl font-bold text-black md:text-2xl">
                  Vivek
                </h3>
              </div>

              {/* Phone Section */}
              <div className="border-t border-[#D4FF00]/30 bg-black/80 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#D4FF00]">&gt;</span>
                  <span className="text-lg tracking-wider text-white md:text-xl">
                    8921893291
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sharanya Contact Card */}
          <div className="group relative">
            {/* Glitch Effect Border */}
            <div className="absolute inset-0 translate-x-1 translate-y-1 transform border-2 border-[#D4FF00]/60 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            <div className="relative overflow-hidden border-2 border-[#D4FF00] bg-black/90 backdrop-blur-sm">
              {/* Name Section */}
              <div className="bg-[#D4FF00] px-10 py-4">
                <h3 className="text-xl font-bold text-black md:text-2xl">
                  Sharanya
                </h3>
              </div>

              {/* Phone Section */}
              <div className="border-t border-[#D4FF00]/30 bg-black/80 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#D4FF00]">&gt;</span>
                  <span className="text-lg tracking-wider text-white md:text-xl">
                    9686224079
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Brochure Button */}
        {/* <div className="mt-16 text-center">
          <div className="group relative inline-block">
            Glitch Effect
            <div className="absolute inset-0 transform border-2 border-[#D4FF00]/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>

            <button className="relative border-2 border-[#D4FF00] bg-black px-8 py-4 text-lg text-white transition-colors duration-300 hover:bg-[#D4FF00]/10">
              Corner tech elements
              <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[#D4FF00]"></div>
              <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[#D4FF00]"></div>
              <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#D4FF00]"></div>
              <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[#D4FF00]"></div>
              <span className="mr-2 text-[#D4FF00]">&gt;</span>
              Download Brochure
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
