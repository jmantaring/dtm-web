export type PhaseStatus = "done" | "current" | "next" | "later"
export type ItemStatus = "done" | "in-progress" | "planned"

export type RoadmapPhase = {
  id: string
  title: string
  /** Exact month for past phases; quarter or half for future ones. */
  when: string
  status: PhaseStatus
  summary: string
  items: { label: string; status: ItemStatus }[]
}

export const roadmapStartedAt = "Sep 2026"
/** ISO date. Bump this every time the roadmap below changes. */
export const roadmapUpdatedAt = "2026-11-28"

// Set `status` by hand: exactly one phase should be "current". It drives the
// "We are here" marker on the roadmap page and the teaser on the home page.
export const roadmap: RoadmapPhase[] = [
  {
    id: "foundations",
    title: "Foundations",
    when: "Sep 2026",
    status: "done",
    summary: "The groundwork for listening privately and accurately.",
    items: [
      { label: "Real-time, on-device transcription", status: "done" },
      { label: "Speaker detection, so it knows who said what", status: "done" },
      { label: "Secure local storage for your data", status: "done" },
    ],
  },
  {
    id: "private-knowledge",
    title: "Your private knowledge",
    when: "Oct 2026",
    status: "done",
    summary: "Teaching it what you know, without your files leaving your device.",
    items: [
      { label: "Import docs, PDFs, notes, and slides", status: "done" },
      { label: "On-device indexing and search across your files", status: "done" },
      { label: "Bring-your-own-model support", status: "done" },
    ],
  },
  {
    id: "live-cues",
    title: "Live cues",
    when: "Nov 2026 – Q1 2027",
    status: "current",
    summary: "Connecting what's being said to what you know, as it happens.",
    items: [
      { label: "Detect topics, questions, and names live", status: "in-progress" },
      { label: "Match moments to the right facts in your files", status: "in-progress" },
      { label: "Choose an on-device or a well-known hosted model", status: "planned" },
    ],
  },
  {
    id: "private-alpha",
    title: "Private alpha",
    when: "Q2 2027",
    status: "next",
    summary: "The first hands-on version, with a small group of invited testers.",
    items: [
      { label: "Desktop app with a live cue overlay", status: "planned" },
      { label: "Works alongside Zoom, Google Meet, Teams, and in person", status: "planned" },
      { label: "Recap after every conversation", status: "planned" },
    ],
  },
  {
    id: "early-access",
    title: "Early access",
    when: "Q3 2027",
    status: "later",
    summary: "Opening up to the waitlist and connecting the tools you already use.",
    items: [
      { label: "Waitlist invites, sent in waves", status: "planned" },
      { label: "Connect Google Drive and Notion", status: "planned" },
      { label: "Custom cue rules", status: "planned" },
    ],
  },
  {
    id: "public-launch",
    title: "Public launch",
    when: "Late 2027",
    status: "later",
    summary: "Available to everyone.",
    items: [
      { label: "General availability", status: "planned" },
      { label: "Mobile companion app", status: "planned" },
      { label: "Shared spaces for teams", status: "planned" },
    ],
  },
]

export function getCurrentPhase() {
  const index = roadmap.findIndex((phase) => phase.status === "current")
  return index === -1 ? null : { phase: roadmap[index], number: index + 1, total: roadmap.length }
}

export function formatRoadmapDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
