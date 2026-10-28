# Casefile — AI Mystery Room

A fictional detective game where players create a premise, investigate an AI generated case, connect clues, and make one final accusation. Built with React/Vite, Express, MongoDB/Mongoose, and Google Gemini.

## Requirements

- Node.js 20 or newer
- MongoDB local or Atlas connection
- Google Gemini API key and a currently supported model name

## Setup

1. Install dependencies from the project root with `npm install`.
2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `GEMINI_API_KEY`, and `GEMINI_MODEL`.
3. Copy `client/.env.example` to `client/.env` if your API is not at the default URL.
4. Start both apps with `npm run dev`.
5. Open `http://localhost:5173`. The API health endpoint is `http://localhost:5000/api/v1/health`.

Generation is synchronous and returns a case only after the server validates it. Gemini is never called from the browser. Without provider configuration, case generation returns a clear error; there is no fake production fallback.

## Commands

- `npm run dev` — start frontend and backend.
- `npm run build` — create the production frontend build.
- `npm test` — run backend validation tests and frontend tests.
- `npm run dev -w server` — start only the API.
- `npm run dev -w client` — start only the Vite app.

## Configuration

Backend variables are documented in `server/.env.example`; frontend API configuration is in `client/.env.example`. The browser creates a random guest session ID and sends it in `x-session-id`; backend ownership checks scope every case operation to that value. This is lightweight guest ownership, not account authentication.

All scenarios, suspects, and evidence are fictional. Image and CCTV evidence are text-first reconstructions unless a media provider is configured separately.

## API and design

See [docs/API.md](docs/API.md) for routes and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the public/private data boundary.
