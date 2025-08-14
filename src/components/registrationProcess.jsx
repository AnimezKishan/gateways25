import React from "react";
import { Timeline } from "./timeline";

const registrationSteps = [
  {
    title: "Step 1",
    description:
      "Browse through the events given above or in the events page and clicking on an event you wish to participate.",
  },
  {
    title: "Step 2",
    description:
      "Read all details about the event carefully and click on register button to redirect to the form and fill the details as mentioned in the following steps",
  },
  {
    title: "Step 3",
    description: "Name of the college the student is currently studying in",
  },
  {
    title: "Step 4",
    description:
      "Name, College provided student register number and phone number of Member-1 who is the team leader ",
  },
  {
    title: "Step 5",
    description:
      "Details of other teammates in the team. (Only applicable for Team Events)",
  },
  {
    title: "Step 6",
    description:
      "Open the payment link provided in the google form and make the payment to register for the event. Payment has to be done only once per  individual.",
  },
  {
    title: "Step 7",
    description:
      "In case, if the Individual / Team is registering for another event, they can upload the same payment screenshot/s that displays the Transaction ID.",
  },
  {
    title: "Step 8",
    description:
      "Upload the screenshot of the payment made either in an image format or pdf format. (No other formats will be accepted). All the payment screenshots of the team members need to be added in a single pdf file.",
  },
  {
    title: "Step 9",
    description:
      "Details of other teammates in the team. (Only applicable for Team Events)",
  },
  {
    title: "Step 10",
    description:
      "Click on the Submit button in the google form to submit the details mentioned in the form and successfully complete the registration for the event.",
  },
];

const RegistrationProcess = () => {
  const data = registrationSteps.map((step) => ({
    title: step.title,
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-300 md:text-base">
          {step.description}
        </p>
      </div>
    ),
  }));

  return (
    <div
      style={{
        background:
          "linear-gradient(252deg, #1c1829 0%, #1b1828 8.61%, #191724 17.21%, #161520 25.82%, #14131c 34.42%, #121218 43.03%, #111117 51.63%)",
      }}
    >
      <Timeline data={data} />
    </div>
  );
};

export default RegistrationProcess;
