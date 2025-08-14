"use client";

import React from "react";
import {
  Code,
  Shield,
  Zap,
  Wifi,
  Brain,
  Palette,
  Gamepad2,
  Users,
  Camera,
  Gift,
  Map,
} from "lucide-react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const eventsData = [
  {
    title: "Coding Debugging",
    description:
      "Debug complex algorithms and solve challenging coding problems to test your programming skills.",
    icon: Code,
  },
  {
    title: "Capture The Flag",
    description:
      "Cybersecurity challenges involving cryptography, reverse engineering, and vulnerability exploitation.",
    icon: Shield,
  },
  {
    title: "Hackathon",
    description:
      "48-hour coding marathon to build innovative solutions and showcase your development expertise.",
    icon: Zap,
  },
  {
    title: "IOT",
    description:
      "Internet of Things challenges combining hardware programming with creative software solutions.",
    icon: Wifi,
  },
  {
    title: "IT Quiz",
    description:
      "Test your knowledge across various IT domains including networking, databases, and emerging technologies.",
    icon: Brain,
  },
  {
    title: "UI/UX",
    description:
      "Design beautiful and intuitive user interfaces while creating exceptional user experiences.",
    icon: Palette,
  },
  {
    title: "Gaming",
    description:
      "Competitive esports tournaments featuring popular games and strategic gaming challenges.",
    icon: Gamepad2,
  },
  {
    title: "It Manager",
    description:
      "Leadership simulation challenges focusing on project management and team coordination skills.",
    icon: Users,
  },
  {
    title: "Photography",
    description:
      "Capture stunning moments and showcase your creative vision through the lens of photography.",
    icon: Camera,
  },
  {
    title: "Surprise Event",
    description:
      "Mystery challenge with unknown format - be prepared for anything and showcase your adaptability.",
    icon: Gift,
  },
  {
    title: "Treasure Hunt",
    description:
      "Adventure-based problem solving with clues, puzzles, and exploration challenges.",
    icon: Map,
  },
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This will apply a 0.1s delay to each child
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Events = () => {
  return (
    <section
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(298deg, #1c1829 0%, #1b1828 8.61%, #191724 17.21%, #161520 25.82%, #14131c 34.42%, #121218 43.03%, #111117 51.63%)",
      }}
    >
      <div className="mx-auto px-6">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white md:text-7xl">Events</h1>
        </motion.div>

        {/* <Card event={eventsData[0]} /> */}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pb-12">
          {eventsData.map((event, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeInOut",
                }}
                viewport={{ amount: 0.3 }}
              >
                <Card event={event} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Card = ({ event }) => {
  const IconComponent = event.icon;

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-gray-950/50 border-white/[0.2] rounded-xl p-6 border  ">
        <CardItem translateZ="100" className="w-full">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className=" object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
        >
          <IconComponent className="h-6 w-6 inline-block mr-2" />
          {event.title}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {event.description}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default Events;
