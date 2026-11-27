"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export type TocItem = { id: string; title: string }

/**
 * Sticky "On this page" rail for long legal pages. Highlights the section
 * currently in view so readers always know where they are.
 */
export function LegalToc({ items }: { items: readonly TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Pick the first section (in document order) that is in the reading band.
        const first = items.find((item) => visible.has(item.id))
        if (first) setActiveId(first.id)
      },
      // Reading band: just below the sticky header down to ~40% of the viewport.
      { rootMargin: "-96px 0px -60% 0px" }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="sticky top-24 flex flex-col gap-3">
      <p className="text-xs uppercase text-muted-foreground">On this page</p>
      <ol className="flex flex-col border-l">
        {items.map((item, index) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "-ml-px flex gap-2 border-l py-1.5 pl-3 text-xs transition-colors",
                  active
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="tabular-nums">{index + 1}.</span>
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
