import assert from "node:assert/strict"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { CalendarSpinner } from "../src/components/mockups/CalendarSpinner"

const markup = renderToStaticMarkup(<CalendarSpinner />)

assert.equal(
  (markup.match(/data-testid="calendar-preview"/g) ?? []).length,
  1,
  "the calendar preview should render once",
)
assert.equal(
  (markup.match(/data-slot="calendar"/g) ?? []).length,
  2,
  "the preview should render both calendar states",
)
assert.match(
  markup,
  /data-testid="calendar-single"[\s\S]*data-selected-single="true"/,
  "the single-selection calendar should expose its selected day",
)
assert.match(
  markup,
  /data-testid="calendar-range"[\s\S]*data-range-start="true"[\s\S]*data-range-end="true"/,
  "the range calendar should expose both range boundaries",
)
assert.match(
  markup,
  /data-testid="calendar-single"[\s\S]*?data-day="2026-08-20" data-disabled="true"[\s\S]*?disabled=""/,
  "the calendar should expose its disabled day",
)
assert.match(
  markup,
  /data-testid="calendar-single"[\s\S]*class="[^"]*outside/,
  "outside-month days should remain rendered in the default preview",
)
assert.match(
  markup,
  /data-testid="spinner-preview"[\s\S]*role="status"/,
  "the loading indicator should expose the status role",
)
assert.match(
  markup,
  /data-testid="spinner-preview"[\s\S]*aria-label="Loading calendar data"/,
  "the loading indicator should expose its accessible label",
)

console.log("Calendar and spinner visual contract passed.")