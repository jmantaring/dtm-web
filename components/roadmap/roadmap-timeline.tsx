import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleHalfIcon,
  CircleIcon,
} from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { ItemStatus, PhaseStatus, RoadmapPhase } from "@/config/roadmap"

const phaseBadge: Record<
  PhaseStatus,
  { label: string; variant: "default" | "secondary" | "outline"; className?: string }
> = {
  done: { label: "Done", variant: "secondary" },
  current: { label: "In progress", variant: "default" },
  next: { label: "Up next", variant: "outline" },
  later: { label: "Later", variant: "outline", className: "text-muted-foreground" },
}

const itemStatus: Record<ItemStatus, { icon: typeof CheckCircleIcon; label: string; className: string }> = {
  done: { icon: CheckCircleIcon, label: "Done", className: "text-primary" },
  "in-progress": { icon: CircleHalfIcon, label: "In progress", className: "text-primary" },
  planned: { icon: CircleIcon, label: "Planned", className: "text-muted-foreground" },
}

function PhaseMarker({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <span className="relative z-10 flex size-7 items-center justify-center border border-primary bg-primary text-primary-foreground">
        <CheckIcon weight="bold" className="size-4" aria-hidden />
      </span>
    )
  }
  if (status === "current") {
    return (
      <span className="relative z-10 flex size-7 items-center justify-center border-2 border-primary bg-background">
        <span
          aria-hidden
          className="absolute -inset-0.5 border-2 border-primary/60 motion-safe:animate-ping"
        />
        <span aria-hidden className="size-2.5 bg-primary" />
      </span>
    )
  }
  return <span className="relative z-10 size-7 border border-foreground/30 bg-background" />
}

export function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  const currentIndex = phases.findIndex((p) => p.status === "current")

  return (
    <ol className="flex flex-col">
      {phases.map((phase, index) => {
        const isCurrent = phase.status === "current"
        const isLast = index === phases.length - 1
        // The rail is solid up to the current phase, then dashed for what's ahead.
        const railDone = currentIndex === -1 ? phase.status === "done" : index < currentIndex
        const badge = phaseBadge[phase.status]

        return (
          <li
            key={phase.id}
            id={phase.id}
            aria-current={isCurrent ? "step" : undefined}
            className="grid scroll-mt-24 grid-cols-[auto_1fr] gap-x-4 sm:grid-cols-[8rem_auto_1fr] sm:gap-x-6"
          >
            {/* Date column (desktop) */}
            <div className="hidden pt-4 sm:block">
              <p
                className={cn(
                  "text-sm",
                  isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                {phase.when}
              </p>
            </div>

            {/* Marker + rail */}
            <div className="relative flex justify-center pt-3.5">
              <PhaseMarker status={phase.status} />
              {!isLast && (
                <span
                  aria-hidden
                  className={cn(
                    // Overlaps into the next row so it meets that row's marker.
                    "absolute top-10 -bottom-4 left-1/2 -translate-x-1/2",
                    railDone ? "w-0.5 bg-primary" : "w-0 border-l border-dashed border-foreground/30"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn("min-w-0", !isLast && "pb-8 sm:pb-10")}>
              <div
                className={cn(
                  "flex flex-col gap-3 border p-4",
                  isCurrent ? "border-primary/40 bg-muted/40" : "border-transparent"
                )}
              >
                {isCurrent && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-primary">
                    <ArrowRightIcon weight="bold" className="size-3.5" aria-hidden />
                    We are here
                  </p>
                )}
                <p className="text-xs uppercase text-muted-foreground sm:hidden">{phase.when}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{phase.title}</h2>
                  <Badge variant={badge.variant} className={badge.className}>
                    {badge.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{phase.summary}</p>
                <ul className="flex flex-col gap-2">
                  {phase.items.map((item) => {
                    const { icon: Icon, label, className } = itemStatus[item.status]
                    return (
                      <li key={item.label} className="flex items-start gap-2 text-sm">
                        <Icon
                          weight={item.status === "done" ? "fill" : "regular"}
                          className={cn("mt-0.5 size-4 shrink-0", className)}
                          aria-hidden
                        />
                        <span>
                          {item.label}
                          <span className="sr-only"> ({label})</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
