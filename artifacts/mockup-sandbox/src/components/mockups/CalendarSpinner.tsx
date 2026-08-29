import React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Spinner } from "@/components/ui/spinner"

const previewMonth = new Date(2026, 7, 1)
const selectedDay = new Date(2026, 7, 12)
const rangeStart = new Date(2026, 7, 18)
const rangeEnd = new Date(2026, 7, 22)
const disabledDay = new Date(2026, 7, 20)

function CalendarSpinner() {
  return (
    <main className="min-h-screen bg-muted/30 p-6 text-foreground sm:p-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            UI regression preview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Calendar and loading states
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Stable reference states for checking layout, focus affordances, and
            loading feedback after UI dependency updates.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section
            aria-labelledby="calendar-preview-title"
            className="rounded-xl border bg-background p-5 shadow-sm"
            data-testid="calendar-preview"
          >
            <div className="mb-5 space-y-1">
              <h2
                className="text-lg font-semibold"
                id="calendar-preview-title"
              >
                Calendar states
              </h2>
              <p className="text-sm text-muted-foreground">
                Selected day, selected range, disabled day, and outside days.
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <div
                aria-label="Single date selection"
                className="overflow-auto rounded-lg border bg-card"
                data-testid="calendar-single"
                role="group"
              >
                <Calendar
                  aria-label="Single date selection"
                  defaultMonth={previewMonth}
                  disabled={disabledDay}
                  mode="single"
                  selected={selectedDay}
                />
              </div>

              <div
                aria-label="Date range selection"
                className="overflow-auto rounded-lg border bg-card"
                data-testid="calendar-range"
                role="group"
              >
                <Calendar
                  aria-label="Date range selection"
                  defaultMonth={previewMonth}
                  disabled={disabledDay}
                  mode="range"
                  selected={{ from: rangeStart, to: rangeEnd }}
                />
              </div>
            </div>
          </section>

          <section
            aria-labelledby="spinner-preview-title"
            className="rounded-xl border bg-background p-5 shadow-sm"
            data-testid="spinner-preview"
          >
            <div className="mb-5 space-y-1">
              <h2
                className="text-lg font-semibold"
                id="spinner-preview-title"
              >
                Loading state
              </h2>
              <p className="text-sm text-muted-foreground">
                The status indicator remains visible while content loads.
              </p>
            </div>

            <div className="flex min-h-32 items-center justify-center rounded-lg border bg-card">
              <Spinner aria-label="Loading calendar data" />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export { CalendarSpinner }