# 🕵️ AI Mystery Room

**Turn your imagination into a mystery. Investigate the evidence. Find the culprit.**

AI Mystery Room is an AI-powered interactive detective game where users create mysteries from their own story ideas and solve them by examining AI-generated evidence, analyzing suspects, uncovering contradictions, and identifying the culprit.

Powered by **Google Gemini** and built using the **MERN stack**, the platform transforms a simple scenario into an immersive investigation experience.

Deployed Link : https://ai-mystery-room-9r6h.onrender.com/

## ✨ Features

### 📝 AI-Powered Mystery Generation
- Create a mystery using a custom scenario or story premise.
- Choose a difficulty level: Easy, Medium, or Hard.
- Select a mystery genre, such as theft, murder mystery, missing person, or suspense.
- Generate fictional investigations with suspects, motives, alibis, timelines, and interconnected clues.

### 🕵️ Interactive Investigation
- Explore detailed suspect profiles.
- Examine fictional WhatsApp-style conversations.
- Investigate images and photographs.
- Review CCTV-style stills and timestamped observations.
- Analyze fictional documents, reports, and access records.
- Discover contradictions and connect evidence to suspects.

### 🧩 Investigation Board
- Associate clues with suspects.
- Record observations and investigative notes.
- Organize evidence before making a final accusation.

### ⚖️ Culprit Identification
- Select the suspect you believe is responsible.
- Submit a final accusation.
- Receive an evaluation based on the actual solution stored by the backend.
- Discover the culprit, motive, decisive evidence, and complete explanation.

### 💾 Persistent Investigations
- Save generated cases in MongoDB.
- Preserve investigation progress across page refreshes.
- Associate cases with guest sessions without requiring registration in the MVP.

### 📱 Responsive Experience
- Immersive detective-themed interface.
- Responsive layouts for desktop, tablet, and mobile.
- Dedicated evidence viewers and interactive investigation components.
- Loading, error, and empty states.

## 🎮 How It Works

1. **Create a case:** Enter a scenario, such as a priceless painting disappearing from a locked mansion.
2. **Generate the mystery:** Gemini creates the fictional incident, suspects, timeline, and evidence.
3. **Read the briefing:** Understand what happened and what needs to be investigated.
4. **Explore the evidence:** Inspect conversations, photographs, CCTV-style records, and documents.
5. **Connect the clues:** Compare alibis, identify inconsistencies, and associate evidence with suspects.
6. **Make your accusation:** Select the person you believe is responsible.
7. **Reveal the truth:** Discover whether you solved the mystery and read the explanation behind the case.

Every investigation is designed to provide a new detective experience based on the user's chosen premise.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| MongoDB | Store cases, suspects, evidence, and game progress |
| Express.js | Build REST APIs and handle backend requests |
| React | Build the interactive user interface |
| Node.js | Run backend services |
| Google Gemini | Generate fictional mysteries and investigation content |
| Mongoose | Define database schemas and interact with MongoDB |
| Vite | Frontend development and build tooling |
| Tailwind CSS | Responsive styling and UI design |
| React Router | Client-side navigation |
| Zod | Validate API requests and AI-generated data |

The Gemini integration uses Google's official JavaScript SDK, `@google/genai`. See the [official Gemini SDK documentation](https://ai.google.dev/gemini-api/docs/libraries).

## 🏗️ System Architecture

```text
                 USER
                  |
                  v
          React + Vite Frontend
                  |
             REST API / JSON
                  |
                  v
           Express.js Backend
                  |
        +---------+----------+
        |                    |
        v                    v
  Gemini AI Service      MongoDB
        |                    |
        v                    v
  Mystery Generation    Case Persistence
        |
        v
  Schema Validation
        |
        v
  Suspects + Evidence
  + Timeline + Solution
        |
        v
  Investigation Gameplay
        |
        v
  Server-Side Evaluation
        |
        v
      Case Results
```

**Important:** The backend determines and stores the culprit during mystery generation. The correct answer and private solution remain hidden until the user submits their final accusation.

## 📂 Project Structure

```text
ai-mystery-room/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── evidence/
│   │   │   ├── investigation/
│   │   │   └── suspects/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── ai/
│   │   │   ├── providers/
│   │   │   ├── prompts/
│   │   │   └── validators/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── API.md
│   └── ARCHITECTURE.md
│
├── SPEC.md
├── README.md
├── .gitignore
└── package.json
```

*The structure represents the planned architecture. Individual files and folders will be created during implementation.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) — use a version compatible with the installed dependencies.
- npm — included with Node.js.
- [MongoDB](https://www.mongodb.com/) — a local installation or MongoDB Atlas account.
- [Google AI Studio](https://aistudio.google.com/apikey) — to obtain a Gemini API key.
- Git — for cloning and managing the repository.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd ai-mystery-room
```

Replace `<YOUR_REPOSITORY_URL>` with your repository's actual URL.

### 2. Install Dependencies

If the root project is configured to install both applications:

```bash
npm install
```

Otherwise, install dependencies separately:

```bash
cd server
npm install
```

Then open another terminal:

```bash
cd client
npm install
```

If the project has not yet been scaffolded, initialize the frontend with Vite and create the Express backend according to `SPEC.md` before running these commands.

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```dotenv
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai_mystery_room
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the `client` directory:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Replace the placeholder values with your actual configuration.

**Security notes:**
- Never commit `.env` files.
- Never expose the Gemini API key through frontend environment variables.
- Keep API credentials exclusively on the backend.
- Use a currently supported Gemini model identifier.

### 4. Start MongoDB

If you use a local MongoDB installation, ensure the MongoDB service is running.

For MongoDB Atlas, configure `MONGODB_URI` with your database connection string and ensure your network access settings allow the backend to connect.

### 5. Start the Backend

Open a terminal:

```bash
cd server
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

Check the health endpoint:

```text
GET http://localhost:5000/api/v1/health
```

### 6. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, typically:

```text
http://localhost:5173
```

The exact commands depend on the scripts defined in the project's `package.json` files.

## 🔌 API Overview

Base URL:

```text
http://localhost:5000/api/v1
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend health |
| POST | `/cases` | Generate a new mystery |
| GET | `/cases` | List the current session's cases |
| GET | `/cases/:caseId` | Retrieve public case details |
| GET | `/cases/:caseId/evidence` | List case evidence |
| GET | `/cases/:caseId/evidence/:evidenceId` | Retrieve individual evidence |
| GET | `/cases/:caseId/progress` | Retrieve investigation progress |
| PATCH | `/cases/:caseId/progress` | Save evidence reviews and notes |
| POST | `/cases/:caseId/accusation` | Submit the final accusation |
| GET | `/cases/:caseId/result` | Retrieve the solution after accusation |
| DELETE | `/cases/:caseId` | Delete an owned case |

All endpoints except `/health` must enforce the guest-session and case-ownership rules defined in `SPEC.md`.

See [`docs/API.md`](docs/API.md) for detailed request and response contracts once implemented.

## 🧠 AI Mystery Generation

The mystery-generation pipeline follows these steps:

1. Accept and validate the user's scenario.
2. Send a structured generation prompt to Gemini.
3. Generate suspects, alibis, a timeline, evidence, and a solution.
4. Validate the generated data against the application schema.
5. Check references and reject clearly inconsistent cases.
6. Store the validated investigation in MongoDB.
7. Return only the public case information to the frontend.
8. Evaluate the final accusation using the stored solution.

### Evidence Types

| Evidence Type | Example |
|---|---|
| Chat | Fictional messaging conversations |
| Image | A photograph containing a clue |
| CCTV | Timestamped surveillance-style observations |
| Document | Visitor logs, receipts, or incident reports |
| Clue | An object, inconsistency, or other investigative detail |

**Media note:** The MVP supports image URLs and CCTV-style stills or text-based recording reconstructions. Actual AI-generated video requires a separately configured video-generation provider and is not a prerequisite for the core game.

## 🔐 Security and Reliability

The application is designed to:

- Validate user inputs and AI-generated responses.
- Keep the Gemini API key on the backend.
- Separate public case data from the hidden solution.
- Enforce guest-session ownership checks.
- Prevent duplicate final accusations.
- Apply request limits and timeouts to expensive AI operations.
- Handle invalid AI output and provider failures gracefully.
- Avoid executing or trusting AI-generated instructions as application code.

Guest sessions provide lightweight case ownership for the MVP; full account authentication is a potential future enhancement.

## 🧪 Testing

Run tests from the relevant project directory after the testing scripts have been configured.

Example:

```bash
cd server
npm test
```

```bash
cd client
npm test
```

The test suite should cover:

- Mystery-generation schema validation.
- Public/private solution separation.
- Case ownership and access restrictions.
- Evidence retrieval and progress persistence.
- Correct and incorrect accusations.
- Prevention of duplicate submissions.
- Gemini failure handling.
- The complete gameplay flow.

Use a mocked Gemini provider for deterministic automated tests rather than relying on live AI calls.

## 📋 Project Specification

[`SPEC.md`](SPEC.md) is the **single source of truth** for the product requirements and implementation decisions.

It defines:

- Functional requirements.
- System architecture.
- Database schemas.
- API contracts.
- AI generation and validation.
- Security rules.
- UI/UX requirements.
- Testing requirements.
- Acceptance criteria.
- Development phases.

When changing a requirement, update `SPEC.md` deliberately and keep the implementation aligned with it.


## ⚠️ Disclaimer

AI Mystery Room is designed for fictional entertainment and logical reasoning.

All generated cases, characters, messages, documents, photographs, and surveillance-style records are fictional or simulated. They must not be represented as authentic evidence from real-world investigations.


**AI Mystery Room — Every clue matters. Every suspect has a story. Can you find the truth?**
