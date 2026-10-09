import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "Klock Tecnologia | Custom software development — Node.js, Laravel and AWS",
    description:
      "Software engineering consultancy in Brazil: web apps, APIs, legacy modernization, AI (MCP, RAG) and dedicated Node.js, Laravel and AWS developers for US teams.",
  },
  nav: {
    label: "Main navigation",
    menu: "Menu",
    services: "Services",
    products: "Products",
    openSource: "Open source",
    relent: "Relent",
    about: "About",
    contact: "Contact",
    cta: "Talk to us",
    language: "Language",
    home: "Klock Tecnologia — home",
  },
  hero: {
    strip: ["Klock Tecnologia", "Est. 2020", "Cuiabá, BR", "Brazil · USA"],
    title: "Custom software, engineered with rigor.",
    subtitle:
      "We build, maintain and modernize web applications, APIs and integrations with Node.js, TypeScript, Laravel and AWS for companies in Brazil and the United States. We work in UTC−3, so our hours overlap with yours: same-day meetings and replies.",
    primary: "Book a call",
    primarySubject: "New project",
    secondary: "See services",
    spec: {
      title: "Spec sheet",
      file: "klock.spec",
      rows: [
        { key: "Stack", value: "Node.js · NestJS · TypeScript · PHP/Laravel · AWS" },
        { key: "Experience", value: "10+ years with PHP/Laravel and TypeScript/JavaScript" },
        { key: "AI", value: "AI-assisted engineering · MCP · RAG · Agents" },
        { key: "Delivery", value: "New builds · Legacy maintenance · Dedicated teams" },
        { key: "Languages", value: "Portuguese · English" },
        { key: "Time zone", value: "UTC−3 · overlaps US business hours" },
        { key: "Response", value: "Within 1 business day" },
      ],
      now: "Now",
      clocks: { saoPaulo: "SAO", newYork: "NYC", portland: "PDX", lisbon: "LIS" },
    },
  },
  services: {
    label: "Services",
    title: "From new builds to legacy systems that can't go down.",
    intro:
      "10+ years of experience with PHP/Laravel and TypeScript/JavaScript, now with AI-assisted engineering every day: more speed without giving up clear, reviewed code and agreed deadlines.",
    items: [
      {
        title: "Web applications and APIs",
        text: "Internal systems, SaaS platforms and REST APIs, integrated with the tools your company already uses.",
        tagsLabel: "Technologies",
        tags: ["Node.js", "NestJS", "TypeScript", "Laravel"],
      },
      {
        title: "Legacy maintenance and modernization",
        text: "We take over systems that are already running and can't go down. Fixes, version upgrades, test coverage and gradual modernization, without rewriting everything from scratch.",
        tagsLabel: "Areas",
        tags: ["PHP / Laravel", "Upgrades", "Refactoring", "Ongoing support"],
      },
      {
        title: "AI applications",
        text: "Agents, MCP servers and RAG over your company's data, with the same engineering discipline as any production system. It's how we build Relent.",
        tagsLabel: "AI technologies",
        tags: ["MCP", "RAG", "AI agents", "Claude · OpenAI · Gemini"],
      },
      {
        title: "Dedicated developers",
        text: "Klock engineers inside your team, working in real time during your business hours, as we already do for agencies in Brazil and the United States.",
        tagsLabel: "Models",
        tags: ["Outsourcing", "Nearshore", "UTC−3"],
      },
      {
        title: "Architecture, cloud and consulting",
        text: "Architecture and code reviews, AWS infrastructure and technical guidance for products in production.",
        tagsLabel: "Areas",
        tags: ["AWS", "Distributed systems", "Code review"],
      },
      {
        title: "Websites and landing pages",
        text: "Fast, accessible, SEO-ready pages, built for the people who use them and to convert.",
        tagsLabel: "Focus",
        tags: ["Performance", "Technical SEO", "Accessibility"],
      },
      {
        title: "SEO",
        text: "Technical audits, content optimization and structured data so your site gets found, on Google and in AI answers.",
        tagsLabel: "Focus",
        tags: ["Technical SEO", "Content", "Search Console"],
      },
      {
        title: "Social media and video editing",
        text: "Planning and production of social media content, with video editing for Reels, Shorts and YouTube.",
        tagsLabel: "Focus",
        tags: ["Instagram", "Reels · Shorts", "YouTube"],
      },
    ],
  },
  products: {
    label: "Products",
    title: "Products we build and maintain.",
    intro: "Besides client projects, we build our own products: the same rigor, applied to our own problems.",
    status: "In development",
    tagline: "An AI agent that follows up on pending tasks for you.",
    text: "Reschedule an appointment, chase a quote, request a document. Relent talks to the other party, follows up politely for days and checks back with you when it's resolved, or when it needs your decision.",
    cta: "Discover Relent",
    steps: [
      { title: "You describe it", text: "What you need and from whom, in plain language." },
      { title: "You confirm", text: "It becomes a task with a clear goal. Nothing starts without your OK." },
      { title: "It talks and follows up", text: "Reads every reply and tries again at the right interval." },
      { title: "It finishes or calls you", text: "Stops when it is resolved. Tells you if it needs you." },
    ],
  },
  openSource: {
    label: "Open source",
    title: "Open tools for AI-assisted engineering.",
    intro: "Plugins, skills and CLIs we use every day with Claude Code, Pi and coding agents, published on GitHub.",
    profile: "github.com/ejklock",
    repos: {
      "living-docs-skill": {
        description:
          "Agent skill that keeps project documentation alive: constitution, ADRs, PRDs and Mermaid diagrams, with no drift.",
        tags: ["Agent skill", "Claude Code", "Cursor"],
      },
      "claude-code-mode": {
        description:
          "Code mode for Claude Code: the model writes a single script that calls the session's tools, and only the result comes back.",
        tags: ["Claude Code", "Tokens"],
      },
      "claude-mermaid-render": {
        description:
          "Plugin that renders Mermaid diagrams in the transcript: colored Unicode cards in the terminal, native SVG on desktop.",
        tags: ["Claude Code", "Mermaid"],
      },
      "claude-usage-mod": {
        description: "Status bar above the prompt: cache, tokens, cost and 5h/7d limits with countdown and forecast.",
        tags: ["Claude Code", "Observability"],
      },
      "claude-cache-statusline": {
        description: "Rust status line: accumulated tokens, cache, cost, active MCPs and tokens per second.",
        tags: ["Rust", "Claude Code"],
      },
      "pi-claude-hooks": {
        description: "Runs hooks written in Claude Code's settings.json format inside the Pi agent, with matching behavior.",
        tags: ["Pi", "Hooks"],
      },
      "jira-cli": {
        description: "CLI to browse and read Jira Cloud from the terminal, in a single Rust binary.",
        tags: ["Rust", "CLI"],
      },
      "active-collab-cli": {
        description: "Cross-platform CLI for self-hosted ActiveCollab (REST API v1): query tasks from the terminal.",
        tags: ["CLI", "ActiveCollab"],
      },
      "docker-php-env-generate": {
        description: "Generates ready-to-use Docker Compose environments for PHP applications in minutes.",
        tags: ["PHP", "Docker"],
      },
    },
  },
  process: {
    label: "How we work",
    title: "No surprises: everything agreed in writing.",
    stepPrefix: "STEP",
    steps: [
      {
        title: "Conversation",
        text: "We understand the problem and the business before we talk about solutions.",
      },
      {
        title: "Proposal",
        text: "Scope, timeline and price in writing. You know what you will receive.",
      },
      {
        title: "Development",
        text: "Delivery in stages, with direct contact with the people who write the code.",
      },
    ],
  },
  clients: {
    label: "Clients",
    strip: "Clients served directly or through embedded teams",
    regions: "BR · US",
  },
  about: {
    label: "About",
    title: "A small consultancy, by choice.",
    text: "Klock was founded in 2020 in Cuiabá, Brazil. We build and maintain software for companies in Brazil and the United States, with clear code, agreed deadlines and decision-makers always a message away.",
    facts: [
      { key: "Experience", value: "10+ years" },
      { key: "Founded", value: "2020" },
      { key: "Based in", value: "Cuiabá, MT" },
      { key: "Serving", value: "BR · US" },
    ],
  },
  founder: {
    eyebrow: "Founder",
    name: "Evaldo Klock",
    alt: "Evaldo Klock, founder of Klock Tecnologia",
    role: "Senior software engineer",
    bio: "10+ years building web platforms and distributed systems with Node.js, NestJS, TypeScript, PHP/Laravel and AWS. Works with clients in Brazil and the United States and leads the development of Relent.",
    links: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
    },
  },
  contact: {
    label: "Contact",
    title: "Have a project in mind? Let's talk.",
    text: "Tell us what you need. We reply within one business day, in English or Portuguese.",
    clocks: { saoPaulo: "SÃO PAULO", newYork: "NEW YORK", portland: "PORTLAND", lisbon: "LISBON" },
  },
  skipLink: "Skip to content",
  footer: {
    label: "Footer",
    tagline: "Custom software development for companies in Brazil and the United States.",
    navigation: "Navigation",
    social: "Social",
    rights: "All rights reserved.",
  },
  notFound: {
    code: "Error 404",
    title: "Page not found.",
    text: "The address may have changed or no longer exists.",
    back: "Back to home",
    relent: "Discover Relent",
  },
  relent: {
    meta: {
      title: "Relent | An AI agent that follows up for you",
      description:
        "Relent is an AI agent that talks to service providers for you until the pending task is resolved.",
    },
    breadcrumb: "Breadcrumb",
    title: "An AI agent that follows up on pending tasks for you.",
    subtitle:
      "You say what you need. Relent talks to the other party and follows up politely until it's resolved, or until it needs you.",
    waitlist: "Join the waitlist",
    waitlistSubject: "Relent waitlist",
    panel: {
      title: "Typical requests",
      file: "relent.tasks",
      tasks: [
        "Reschedule an appointment",
        "Chase a quote from the repair shop",
        "Request a document from the building manager",
      ],
      channel: "Channel: Telegram · email coming soon",
    },
    problem: {
      label: "The problem",
      lead: "Waiting on a service provider takes time and attention.",
      rest: "Messages go unanswered, follow-ups get forgotten and the task drags on for weeks.",
    },
    how: {
      label: "How it works",
      title: "You approve. It follows through.",
      channels: {
        label: "Channels",
        telegram: "Telegram",
        email: "Email · coming soon",
        other: "Other channels · coming soon",
      },
      steps: [
        { title: "You describe it", text: "In plain language: what you need and from whom." },
        {
          title: "You confirm",
          text: "The request becomes a task with a goal and a completion criterion. It starts only after you approve.",
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
      label: "Principles",
      title: "Persistent, never pushy.",
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
    byok: {
      label: "BYOK",
      title: "Use your own key.",
      text: "You choose the model and pay the provider directly. No middleman on your AI bill.",
      providersLabel: "Supported providers",
      providers: [
        { name: "Anthropic", models: "Claude" },
        { name: "OpenAI", models: "GPT" },
        { name: "Google", models: "Gemini" },
        { name: "OpenRouter", models: "Many models" },
      ],
    },
    status: {
      label: "Status",
      title: "Get notified when we open.",
      text: "Relent is in development. Join the waitlist and get your invite first.",
    },
  },
};
