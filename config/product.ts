import {
  BooksIcon,
  BriefcaseIcon,
  CloudIcon,
  EarIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeadsetIcon,
  LaptopIcon,
  LightningIcon,
  PlugsConnectedIcon,
  UserFocusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"

// Product copy shared by the home and roadmap pages. Keep privacy claims in
// sync with how the product actually works before changing them.
export const product = {
  name: "Conversation Cue",
  tagline: "Real-time intelligence for every conversation",
  summary:
    "A private AI that listens to your conversations and cues you in real time with what's in your own files.",
  description:
    "Conversation Cue listens alongside you and surfaces the right fact, figure, or follow-up from your own files the moment you need it. It runs on your device, and you choose which AI model powers it.",
  steps: [
    {
      icon: EarIcon,
      title: "Listen",
      body: "Follows the conversation in real time and understands who said what.",
    },
    {
      icon: BooksIcon,
      title: "Recall",
      body: "Finds what's relevant in your private files, notes, and documents.",
    },
    {
      icon: LightningIcon,
      title: "Cue",
      body: "Shows a short, glanceable prompt so you never miss a beat.",
    },
  ],
  useCases: [
    {
      icon: HandshakeIcon,
      title: "Sales calls",
      body: "Pricing, case studies, and objection handling from your own playbooks, right when the prospect asks.",
      cue: "They mentioned budget cuts. Your pricing sheet has a 12-month plan.",
    },
    {
      icon: HeadsetIcon,
      title: "Customer support",
      body: "Answers from your docs, policies, and past tickets while the customer is still on the line.",
      cue: "Refunds after 30 days need manager approval (Support policy, p. 4).",
    },
    {
      icon: UserFocusIcon,
      title: "Hiring interviews",
      body: "Follow-up questions grounded in the candidate's resume and your interview scorecard.",
      cue: "They led the data migration at Acme. Ask how they handled the rollback.",
    },
    {
      icon: BriefcaseIcon,
      title: "Client meetings",
      body: "Past decisions, agreed scope, and client history, surfaced as soon as the client brings them up.",
      cue: "Phase 2 moved to Q3 in your Oct 4 call notes.",
    },
    {
      icon: UsersThreeIcon,
      title: "Team meetings",
      body: "Decisions, owners, and numbers from your notes, so meetings move forward instead of in circles.",
      cue: "This was decided on Oct 12. Maria owns the follow-up.",
    },
    {
      icon: GraduationCapIcon,
      title: "Learning & research",
      body: "Connects what a lecturer or expert says to your own reading, highlights, and notes.",
      cue: "Related: your highlight from chapter 3 on retrieval methods.",
    },
  ],
  privacy: [
    {
      icon: LaptopIcon,
      title: "On your device",
      body: "Listening and processing happen locally on your own device.",
    },
    {
      icon: PlugsConnectedIcon,
      title: "Bring your own model",
      body: "Plug in an AI model you already trust and run it on your terms.",
    },
    {
      icon: CloudIcon,
      title: "Or pick a well-known model",
      body: "Prefer a popular hosted model? Switch to it whenever you like. The choice is yours.",
    },
  ],
} as const
