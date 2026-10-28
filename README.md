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

## Deploy on Render

This repository includes a root `render.yaml` Blueprint. It deploys one Node web service that builds the React client and serves it from the Express app, so the browser and API share an origin. MongoDB Atlas stores case data; Gemini is called only by the server.

1. Push this repository to a GitHub repository. Confirm `server/.env` is not tracked (`git check-ignore server/.env` should print the path). Never commit that file or paste its secrets into GitHub.
2. Create a MongoDB Atlas project and cluster. Under **Database Access**, create a database user and password. After creating the Render service, open **Connect → Outbound** and add the service's listed outbound ranges under Atlas **Network Access**. Atlas blocks connections from IPs not on the project's access list. If the first deploy fails because Atlas blocks the connection, add those ranges and redeploy. Avoid allowing all IPs (`0.0.0.0/0`) for a production database.
3. In Google AI Studio, create or select a Gemini API key. Keep it private; do not put it in a `VITE_` variable or the client environment.
4. In Render, choose **New → Blueprint**, connect the GitHub repository, and apply the Blueprint. Render reads `render.yaml`, installs the workspace dependencies, builds `client/dist`, starts the Express service, and checks `/api/v1/health`.
5. In the Render service's **Environment** settings, fill in the prompted values:
   - `MONGODB_URI`: Atlas connection string for the database user you created. Replace the URI's password placeholder and specify the `ai_mystery_room` database name. URL-encode reserved characters in the username or password.
   - `GEMINI_API_KEY`: the server-side key from Google AI Studio.
   - `GEMINI_MODEL`: a currently supported Gemini model identifier available to your key.
6. Deploy. Open `https://<your-service>.onrender.com/api/v1/health`; expect JSON with `"status":"ok"`. Then open the service root URL, create a case, and verify it persists after a page refresh.
7. For a custom domain, add it in Render's **Settings → Custom Domains**, then follow the DNS instructions Render provides. The app uses relative `/api/v1` requests, so no frontend API URL change is needed.

For a separate frontend/API deployment later, set `VITE_API_BASE_URL` to the API's full `/api/v1` URL at frontend build time and set backend `CLIENT_URL` to the exact frontend origin. Multiple allowed origins can be comma-separated. Rebuild the frontend after changing its `VITE_` setting.

### Local environment

Use the committed examples as templates: copy `server/.env.example` to `server/.env`, then add local credentials. `client/.env.example` uses the Vite development proxy, so `npm run dev` sends `/api` requests to the local backend without needing a second API URL. Render receives environment variables through its dashboard and does not need either `.env` file.

## API and design

See [docs/API.md](docs/API.md) for routes and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the public/private data boundary.
