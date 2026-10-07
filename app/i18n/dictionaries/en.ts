import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "Klock Tecnologia | Custom software development",
    description:
      "A software development consultancy in Cuiabá, Brazil, and the maker of Relent, an AI agent that follows up on pending tasks for you.",
  },
  nav: {
    label: "Main navigation",
    services: "Services",
    relent: "Relent",
    about: "About",
    contact: "Contact",
    language: "Language",
    home: "Klock Tecnologia — home",
  },
  hero: {
    title: "Custom software, built by people who understand your business.",
    subtitle:
      "We are a software development consultancy based in Cuiabá, Brazil, working with companies in Brazil and the United States.",
    cta: "Talk to us",
  },
  services: {
    title: "Services",
    items: [
      {
        title: "Websites and landing pages",
        text: "Fast, responsive pages built for the people who use them.",
      },
      {
        title: "Web applications",
        text: "Internal systems, APIs and integrations with the tools your company already uses.",
      },
      {
        title: "Consulting and support",
        text: "Architecture and code reviews, and technical guidance for products in production.",
      },
      {
        title: "Staff augmentation",
        text: "Klock developers working inside your team, as we already do for agencies in Brazil and the United States.",
      },
    ],
  },
  relentTeaser: {
    eyebrow: "Our product",
    tagline: "An AI agent that follows up on pending tasks for you.",
    text: "You explain what needs to get done: reschedule an appointment, chase a quote, request a document. Relent talks to the other party, follows up over the days and calls you in when it is resolved or when it needs your decision.",
    cta: "Discover Relent",
  },
  process: {
    title: "How we work",
    steps: [
      {
        title: "Conversation",
        text: "We understand the problem before we talk about solutions.",
      },
      {
        title: "Proposal",
        text: "Scope, timeline and price in writing.",
      },
      {
        title: "Development",
        text: "Delivery in stages, with direct contact with the people building it.",
      },
    ],
  },
  clients: {
    title: "Clients",
    subtitle: "Companies we work with directly or through developers embedded in their teams.",
  },
  about: {
    title: "About Klock",
    text: "Klock was founded in 2020 in Cuiabá, Brazil. We build and maintain software for companies in Brazil and the United States, with clear code and agreed deadlines.",
  },
  founder: {
    eyebrow: "Founder",
    name: "Evaldo Klock",
    role: "Founder and senior software engineer",
    bio: "Senior developer with 10+ years of experience building web platforms and distributed systems with Node.js, NestJS, TypeScript, PHP/Laravel and AWS. Works with clients in Brazil and the United States and leads the development of Relent.",
    links: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
    },
  },
  contact: {
    title: "Contact",
    text: "Tell us what you need. We reply within one business day.",
    cta: "Send an email",
  },
  skipLink: "Skip to content",
  footer: {
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    back: "Back to home",
  },
  relent: {
    meta: {
      title: "Relent | An AI agent that follows up for you",
      description:
        "Relent is an AI agent that talks to service providers for you until the pending task is resolved.",
    },
    eyebrow: "Relent · in development",
    title: "An AI agent that follows up on pending tasks for you.",
    subtitle:
      "Reschedule an appointment, chase a quote from the repair shop, request a document from the building manager. You say what you need, Relent talks to the other party and follows up politely until it is resolved or until it needs you.",
    waitlist: "Join the waitlist",
    waitlistSubject: "Relent waitlist",
    problem: {
      title: "The problem",
      text: "Waiting for a service provider to reply takes time and attention. Messages go unanswered, follow-ups are forgotten and tasks drag on for weeks.",
    },
    how: {
      title: "How it works",
      steps: [
        { title: "You describe it", text: "In plain language: what you need and from whom." },
        {
          title: "You confirm",
          text: "Relent turns the request into a task with a clear goal and completion criteria. It starts only after you approve.",
        },
        {
          title: "It talks and follows up",
          text: "It talks to the other party, reads every reply and sends new messages at the right interval, over days if needed.",
        },
        {
          title: "It finishes or calls you",
          text: "When the goal is met, it stops. On a refusal or anything only you can decide, it lets you know.",
        },
      ],
    },
    principles: {
      title: "Principles",
      items: [
        {
          title: "Identifies as AI",
          text: "It always says it is an AI agent acting for someone.",
        },
        {
          title: "No means no",
          text: "It does not haggle or pressure. The decision goes back to you.",
        },
        {
          title: "You stay in control",
          text: "Follow every conversation and pause, cancel or take over whenever you want.",
        },
        {
          title: "Privacy",
          text: "It uses only the personal data each task needs, in line with Brazil's LGPD.",
        },
      ],
    },
    channels: "Works on Telegram. Email and other channels are in development.",
    byok: {
      title: "Use your own key",
      text: "Relent works with your own API key from Anthropic (Claude), OpenAI, Google (Gemini) or OpenRouter. You choose the model and pay the provider directly.",
    },
    status: {
      title: "Status",
      text: "In development. Join the waitlist to hear when it opens.",
    },
  },
};
