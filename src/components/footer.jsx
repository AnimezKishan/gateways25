import React from "react";

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    url: "https://www.instagram.com/christ_university_bangalore/",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    url: "https://www.linkedin.com/school/christ-university-bangalore/",
  },
];

const developers = [
  { name: "Kishan Kumar", linkedin: "https://www.linkedin.com/in/kishan-kumar-4ba257200/" },
  { name: "Tushar Ghosh", linkedin: "https://www.linkedin.com/in/tushar-ghosh-315142219/" },
  { name: "Darshan Heble", linkedin: "https://www.linkedin.com/in/darshanheble/" },
  { name: "Vyshnavi K", linkedin: "https://www.linkedin.com/in/vyshnavi-kathrine/" },
];

const Footer = () => {
  return (
    <footer className="bg-black p-5 pr-14 px-12">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="font-bold font-orbitron text-xl">Gateways 25</span>
        </div>
        <div className="flex gap-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      
      {/* Developed By Section */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 font-orbitron">Developed By</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {developers.map((developer, index) => (
              <a
                key={index}
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {developer.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
