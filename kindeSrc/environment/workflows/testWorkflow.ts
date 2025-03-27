 import {
   onUserTokenGeneratedEvent,
   accessTokenCustomClaims,
   WorkflowSettings,
   WorkflowTrigger,
   fetch,
   getEnvironmentVariable,
 } from "@kinde/infrastructure";

 export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  name: "Add access token claim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

function getRandomFact() {
  const myFacts = [
    "I was born on March 29, 1988.",
    "I’m 182.9 cm tall and weigh around 74.6 kg.",
    "I work as a technical writer at Kinde.com.",
    "I'm a DigitalOcean Wavemaker for the Dhaka chapter.",
    "I love coding with JavaScript, React, Next.js, and Python.",
    "My dream is to become a programming influencer in Bangladesh.",
    "I’m saving for a MacBook and a Bali trip for Christmas 2025.",
    "I go to the gym three times a week and track my protein intake.",
    "I’m planning to organize tech meetups and start a company for it.",
    "I enjoy reading books like *48 Laws of Power* and *Atomic Habits*."
  ];

  const randomIndex = Math.floor(Math.random() * myFacts.length);
  return myFacts[randomIndex];
}

export default async function TestWorkflow(event: onUserTokenGeneratedEvent) {

  const accessToken = accessTokenCustomClaims<{
    myCustomFact: string;
  }>();

  accessToken.myCustomFact = getRandomFact();
       
}