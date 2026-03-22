# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ArtVista's marketing website (second edition). All source code lives under `art-vista/` — run all npm commands from that directory.

## Commands

All commands must be run from `art-vista/`:

```bash
cd art-vista

npm run start    # Local dev WITH Netlify functions (port 8888, uses netlify dev)
npm run serve    # Local dev WITHOUT Netlify functions (Vue CLI only)
npm run build    # Production build → dist/
npm run lint     # ESLint + Prettier
```

Use `npm run start` when working on features that touch Netlify serverless functions; use `npm run serve` for pure frontend work.

## Architecture

### Tech Stack
- **Vue 3** with Vue CLI (not Vite), Vue Router 4, Vuex 4 (store is currently empty — state is managed locally in components)
- **Netlify** for hosting and serverless functions
- **FontAwesome** for icons, **Inter** font (loaded via Google Fonts in `App.vue`)

### App Shell (`src/App.vue`)
Renders a `LoadingScreen` for 2.5s on first load, then fades it out and shows the routed view. The `#app` container is max-width 1600px centered.

### Routing (`src/router/index.js`)
| Path | View |
|---|---|
| `/` | Home |
| `/api` | Api |
| `/blog` | Blog |
| `/blog/:slug` | BlogPostDetail |
| `/about` | About |
| `/Contact` | Contact |
| `/terms` | Terms |

Unknown paths redirect to `/`.

### Views & Components
Views (`src/views/`) are thin shells that compose components from `src/components/`. The Home view stacks: `Header → Hero → Stats → ForArtEnthusiasts → ForArtists → Footer`. The Api view uses `HeroApi` which contains `ApiSearch` — the main interactive artwork-recognition feature.

### Netlify Serverless Functions (`netlify/functions/`)
These are the backend proxy layer — they hide API credentials from the frontend:

- **`analyze.js`** — Receives a raw image (base64), fetches a short-lived `id_token` from the ArtVista backend using `ARTVISTA_SECRET_TOKEN`, then forwards the image to `/get_bbox_for_website/` and returns detected bounding boxes.
- **`search.js`** — Receives `{ bbox, imageData }` JSON, authenticates the same way, crops the image, and calls `/artwork_search_for_website/` to identify the artwork.
- **`save_email.js`** — Proxies a GET to `/save_email/` on the ArtVista backend to capture newsletter signups.

Required environment variables (set in Netlify dashboard and local `.env`):
- `ARTVISTA_API_BASE_URL` — base URL of the ArtVista backend API
- `ARTVISTA_SECRET_TOKEN` — shared secret used to obtain short-lived tokens

### Styling
- Global styles: `src/assets/styles/global.css`
- Component-scoped styles use `<style scoped>`
- Brand colors: Blue `#1D88F0`, Purple `#BF03B0`
- Dark background: `#1a0933`
- No CSS framework — plain CSS with occasional BEM-style class naming

## Code Style

- Prefer `<script setup>` (Composition API) for new components; some existing views still use Options API
- Use descriptive boolean variable names (`isLoading`, `hasError`)
- `@` alias resolves to `src/`
- ESLint config: `plugin:vue/vue3-essential` + `eslint:recommended`; `vue/multi-word-component-names` is disabled
