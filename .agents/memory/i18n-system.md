---
name: i18n system
description: Lightweight custom i18n for the mobile app — architecture, file locations, and key decisions
---

## Architecture

- `artifacts/mobile/i18n/index.tsx` — `LanguageProvider` + `useTranslation()` hook + `Translations` type
- `artifacts/mobile/i18n/fr.ts` — French (source of truth)
- `artifacts/mobile/i18n/en.ts` — English
- `artifacts/mobile/i18n/mos.ts` — Mooré (Mossi, Burkina Faso)
- `artifacts/mobile/i18n/dyo.ts` — Dioula (Jula/Bambara, Mali/Côte d'Ivoire)
- `artifacts/mobile/i18n/ful.ts` — Fulfuldé (Fula/Peul, Sahel)

## Integration

- `LanguageProvider` wraps `AppProvider` in `app/_layout.tsx`
- Language code (`LangCode = 'fr'|'en'|'mos'|'dyo'|'ful'`) persisted to AsyncStorage under `@animaux_sacres_language`
- `useTranslation()` returns `{ t, lang, setLang }` — `t` is the full `Translations` object for current lang

## Key decisions

**Why no external library (i18next etc.)?**
Avoided extra dependencies for a self-contained app; flat typed object gives full TypeScript autocomplete on every key.

**Why `LanguageProvider` separate from `AppContext`?**
Kept concerns separate; language is UI-level, app state (favorites, quiz) is data-level.

**Quiz questions translation strategy:**
Quiz scoring logic stays in `data/quiz.ts` (unchanged). `quiz.tsx` overlays translated text from `t.quiz_questions[currentQ].{q,a,b}` at display time. Falls back to French question text if translation array is shorter.

**French strings with apostrophes:**
fr.ts MUST use double-quote delimiters for string values (not single quotes) because French text contains l', d', j', etc. that break JS single-quote strings. Other language files use single quotes safely.

**Animal content (descriptions, legends):**
Long descriptive content stays in French for all languages (not duplicated in translation files). Only UI strings + quiz questions + category names are translated.
