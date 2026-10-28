# SPEC.md — AI Mystery Room
**Project:** AI Mystery Room  
**Document type:** Product + Technical Specification  
**Purpose:** Single source of truth for Codex and all future development  
**Status:** Initial implementation specification  
**Primary stack:** MongoDB, Express.js, React, Node.js (MERN)  
**AI provider:** Google Gemini  
**Target:** Responsive web application  
**Development approach:** Spec-driven development

---

# 1. Project Overview

## 1.1 Product Description

AI Mystery Room is an AI-powered interactive detective game in which users become investigators and solve fictional mysteries using evidence generated dynamically by AI.

The user provides a short scenario, story idea, or mystery premise. The application uses Google Gemini to transform that input into a complete fictional investigation containing a crime or unexplained incident, a set of suspects, a timeline, interconnected evidence, and one predetermined culprit.

The investigator explores the evidence, examines contradictions, forms a theory, and selects the person they believe is responsible. The application evaluates their decision against the actual solution and provides an explanation of the mystery.

**Core product principle:** The AI should generate a mystery that the user can solve through evidence and logical reasoning, not merely guess the culprit from a list of characters.

## 1.2 Problem Statement

Traditional mystery games frequently rely on fixed stories, predetermined puzzles, or repetitive gameplay. AI Mystery Room aims to provide replayable investigations with different scenarios, suspects, evidence, and solutions.

## 1.3 Product Goals

1. Allow users to create mysteries from their own story prompts.
2. Generate coherent, fictional investigations using Gemini.
3. Present evidence through realistic, interactive investigation interfaces.
4. Ensure the culprit and solution are fixed before the investigation begins.
5. Make clues discoverable without revealing the answer prematurely.
6. Evaluate the user's final accusation and explain the correct reasoning.
7. Provide a polished, immersive, responsive detective experience.
8. Keep the architecture extensible for additional evidence types, AI models, and game modes.

## 1.4 Target Users

- Mystery and detective-story enthusiasts.
- Casual gamers who enjoy solving puzzles.
- Users interested in interactive storytelling.
- Users who want to create and play custom investigation scenarios.

## 1.5 MVP Definition

The minimum viable product must allow a user to:

1. Open the website.
2. Enter a mystery premise and configure basic difficulty.
3. Generate a complete investigation.
4. View the case briefing and suspects.
5. investigate evidence such as fictional chat conversations, images, and CCTV-style records.
6. Select a suspect and submit a final accusation.
7. Receive the result, explanation, and case statistics.
8. Start another investigation.

The application must work end to end with real backend persistence and Gemini integration. A static mockup alone does not satisfy the requirements.

---

# 2. Scope and Feature Priorities

## 2.1 P0 — Mandatory MVP Features

| Feature | Requirement |
|---|---|
| Landing page | Explain the game and provide a clear start action |
| Mystery creation | Accept a user-written premise |
| Configuration | Select difficulty and optional genre |
| AI generation | Generate a complete investigation using Gemini |
| Case briefing | Show the incident, location, and timeline context |
| Suspect profiles | Display suspects with believable backgrounds and motives |
| Evidence room | Organize evidence into categories |
| Chat evidence | Render fictional WhatsApp-style conversations |
| Image evidence | Display generated or otherwise configured fictional images |
| CCTV evidence | Display CCTV-style stills and timestamped incident records |
| Investigation board | Connect suspects, clues, and observations |
| Final accusation | Allow exactly one final culprit selection |
| Case evaluation | Reveal the actual culprit and explain the solution |
| Persistence | Save cases and game progress in MongoDB |
| Error handling | Handle failed generation, invalid data, and server errors |
| Responsive design | Support desktop, tablet, and mobile layouts |

## 2.2 P1 — Enhancements After the MVP

- User registration and login.
- User profiles and investigation history across devices.
- Multiple endings or branching narratives.
- Optional hints with a scoring penalty.
- Difficulty calibration based on player performance.
- Additional evidence types, including audio transcripts and forensic reports.
- Downloadable case reports.
- Leaderboards and achievement systems.
- AI-generated investigation summaries.

## 2.3 Explicitly Out of Scope for the Initial MVP

- Multiplayer investigations.
- Real-time cooperative detective gameplay.
- Actual access to WhatsApp, CCTV networks, private accounts, or real-world surveillance systems.
- Real-world criminal identification or accusations.
- Mandatory paid subscriptions or payment processing.
- Unconfigured third-party image or video generation services.

Do not implement P1 or out-of-scope functionality at the expense of completing the P0 user journey.

---

# 3. Core User Journey

The following flow defines the expected application behavior.

1. **Home:** The user opens AI Mystery Room and selects "Create a Mystery."
2. **Create:** The user enters a scenario, such as a valuable painting disappearing from a locked mansion.
3. **Configure:** The user selects a difficulty and optionally chooses a mystery genre.
4. **Generate:** The frontend sends the configuration to the backend.
5. **Prepare the case:** The backend asks Gemini to generate a structured investigation, validates the output, checks narrative consistency, and stores the case.
6. **Briefing:** The user reads the incident report and meets the suspects.
7. **Investigate:** The user opens the evidence room, reviews clues, inspects messages and images, and compares timelines.
8. **Reason:** The user uses the investigation board to associate evidence with suspects.
9. **Accuse:** The user chooses a culprit and confirms the final accusation.
10. **Evaluate:** The backend evaluates the answer against the stored solution.
11. **Reveal:** The frontend displays whether the accusation was correct, the actual culprit, the decisive evidence, and the complete explanation.
12. **Replay:** The user can create a new case.

**Important:** The correct culprit must be determined during case generation and stored securely. It must never be generated again independently when the user submits an accusation.

---

# 4. Functional Requirements

## FR-01: Landing Page

The landing page must contain:

- Product name and branding.
- A concise explanation of the experience.
- A prominent "Create a Mystery" CTA.
- A section explaining how the game works.
- A sample mystery preview or demo.
- A responsive navigation layout.
- Loading and error states where applicable.

The main CTA must navigate to the mystery creation screen.

## FR-02: Mystery Creation

The user must be able to enter:

- **Scenario:** Required free-text description of the mystery.
- **Difficulty:** Easy, Medium, or Hard.
- **Genre:** Optional selection, including Murder Mystery, Theft, Missing Person, Suspense, or General Mystery.
- **Additional constraints:** Optional details such as setting, number of suspects, or desired tone.

Default configuration:

| Setting | Default |
|---|---|
| Difficulty | Medium |
| Genre | General Mystery |
| Suspects | 4 |
| Evidence items | 8 |
| Maximum scenario length | 2,000 characters |

The frontend must validate required fields before submission. The backend must repeat validation independently.

If generation fails, retain the user's input so they can retry without rewriting it.

## FR-03: AI Investigation Generation

The generated case must include:

- A unique case ID.
- A title.
- A short description.
- A fictional incident.
- The setting and relevant time period.
- A case briefing.
- Four suspects by default.
- Suspect profiles, motives, alibis, and relevant relationships.
- A chronological incident timeline.
- Eight evidence items by default.
- Evidence descriptions and source metadata.
- Explicit clue-to-suspect relationships.
- At least one decisive clue.
- Plausible red herrings.
- A predetermined culprit.
- A complete solution and explanation.
- A difficulty classification.

The generator must produce a solvable mystery with one intended culprit. Suspects should have plausible reasons to be investigated, but the decisive evidence must distinguish the culprit from the others.

Generation must be validated before the case becomes playable.

If the AI produces invalid JSON or an inconsistent case, the backend should attempt a limited repair or regeneration. If validation still fails, return a meaningful error rather than saving a broken investigation.

## FR-04: Case Briefing

The briefing page must display:

- Case title and case ID.
- Incident description.
- Location and time of the incident.
- The investigator's objective.
- A summary of known facts.
- Number of suspects and evidence items.
- A button to enter the investigation.

The briefing must not expose the hidden culprit or the complete solution.

## FR-05: Suspect Profiles

Each suspect profile must contain:

- Unique suspect ID.
- Name.
- Fictional profile image or avatar.
- Age, when relevant to the story.
- Role or occupation.
- Relationship to the incident.
- Possible motive.
- Stated alibi.
- Relevant background.
- Evidence that supports or contradicts their account.

Suspects must be distinguishable through their names, roles, descriptions, and evidence relationships.

Suspect information must be generated consistently across all pages.

## FR-06: Evidence Room

Evidence is the primary gameplay interface.

The evidence room must provide:

- Category filters.
- Evidence cards.
- A detail view or modal for each item.
- Evidence IDs and timestamps where applicable.
- A description of where the evidence was found.
- Relevant suspect associations, when appropriate.
- A way to mark evidence as reviewed.
- A count of reviewed and total evidence items.

Required evidence categories:

1. Chat messages.
2. Images and photographs.
3. CCTV records.
4. Documents and reports.
5. General clues.

The evidence room must support the following formats.

### A. Chat Messages

Display fictional messaging conversations in a chat-style interface.

Each message should include:

- Sender.
- Message text.
- Timestamp.
- Optional attachment.
- Conversation ID.

Messages must have a meaningful relationship to the investigation. Some messages can be misleading, but the overall set must support a fair solution.

### B. Images and Photographs

Images should depict fictional locations, objects, scenes, or relevant clues.

Each image must include:

- Image URL or storage reference.
- Image description.
- Evidence ID.
- Timestamp or estimated time, where relevant.
- Source or location.
- A text fallback if the image fails to load.

Use a configured image-generation provider when available. If no image-generation provider is configured, the game must remain playable through text evidence, placeholder illustrations, or clearly identified visual mockups.

Do not assume that a text-generation Gemini model can directly create images.

### C. CCTV Records

For the MVP, CCTV evidence should be represented through:

- CCTV-style still images where available.
- Recording timestamps.
- Camera location.
- A description of visible events.
- Optional timestamped observation records.
- Any relevant gaps, inconsistencies, or limitations.

Actual AI-generated video is not required for the MVP. Implementing genuine video generation must be a separate enhancement using a supported, configured provider.

Never represent a textual reconstruction as an actual video recording.

### D. Documents and Reports

Examples include:

- Incident reports.
- Visitor logs.
- Emails.
- Receipts.
- Access records.
- Fictional forensic summaries.

Each document must be readable and associated with the relevant case.

## FR-07: Investigation Board

Provide a simple visual board where users can connect suspects and evidence.

The MVP may use a lightweight relationship interface instead of a complex free-form canvas.

Users should be able to:

- Select a suspect.
- Associate one or more evidence items with that suspect.
- Add a short observation or note.
- Remove or update their associations.
- Review their investigation before making an accusation.

The board represents the user's reasoning and must not automatically reveal the correct solution.

## FR-08: Final Accusation

The accusation interface must:

- Show all suspects.
- Allow selection of one suspect.
- Require confirmation before final submission.
- Optionally allow a short explanation of the user's reasoning.
- Prevent repeated submissions for the same completed attempt.

After confirmation, the accusation is final for that attempt.

The server must evaluate the submitted suspect ID against the case's stored culprit ID.

Do not trust a client-provided correctness flag, culprit ID, or solution.

## FR-09: Results and Explanation

The results screen must show:

- Whether the accusation was correct.
- The user's selected suspect.
- The actual culprit.
- The decisive clues.
- An explanation of how the incident occurred.
- How the culprit's motive and opportunity connect to the evidence.
- Why other suspects were less likely to be responsible.
- The user's investigation score, if scoring is implemented.
- Options to view the evidence again or start another case.

The explanation must be consistent with the original case. It must not introduce entirely new facts required to solve the mystery.

## FR-10: Persistence

Cases and game progress must be persisted in MongoDB.

For the MVP, use a guest-session model rather than requiring account registration.

- Generate a random guest session identifier.
- Associate the user's cases and progress with that session.
- Store the session identifier in browser storage.
- Validate its format and enforce access checks on the backend.
- Never treat the session identifier as authorization to access arbitrary cases.

The backend must ensure users can access only cases associated with their session.

---

# 5. AI Architecture and Gemini Integration

## 5.1 Architecture Principle

Gemini is the story-generation engine, not the authority for game state.

The backend controls case persistence, culprit identity, accusation evaluation, progress, and access permissions.

Recommended pipeline:

1. Receive and validate user configuration.
2. Build a structured generation prompt.
3. Call the configured Gemini model.
4. Parse the structured response.
5. Validate the response against the case schema.
6. Check suspect references, evidence references, clue coverage, and solution consistency.
7. Repair or regenerate invalid output within a bounded retry limit.
8. Persist the validated case.
9. Return only the public case data to the frontend.

The solution and culprit must be separated from public case data before the response is sent.

## 5.2 Gemini SDK

Use Google's supported JavaScript/TypeScript Gemini SDK, `@google/genai`, from the backend.

Requirements:

- Read the API key from `GEMINI_API_KEY`.
- Read the model identifier from `GEMINI_MODEL`.
- Do not hardcode model names throughout the codebase.
- Use structured JSON output where supported by the selected model.
- Validate all model output even when structured output is enabled.
- Set request timeouts and bounded retries.
- Handle rate limits, quota errors, unavailable models, and malformed responses.
- Never send API credentials to the frontend.

Use a currently supported Gemini model configured through environment variables. Verify model availability when setting up the project; do not assume a specific model identifier will remain available indefinitely.

## 5.3 System Prompt Requirements

Create a dedicated prompt module, such as `server/src/ai/prompts/mysteryPrompt.js`.

The generation prompt must instruct Gemini to:

- Generate entirely fictional investigations.
- Follow the user's premise while preserving a coherent narrative.
- Produce exactly one intended culprit.
- Create believable suspects with distinct motives and alibis.
- Establish a consistent timeline.
- Ensure all decisive facts are supported by evidence available to the player.
- Include plausible but fair red herrings.
- Avoid contradictions unless they are intentional clues.
- Assign stable IDs to suspects and evidence.
- Reference only existing suspect and evidence IDs.
- Produce valid JSON matching the specified schema.
- Keep the hidden solution separate from public-facing case content.
- Avoid revealing the culprit in public descriptions or evidence titles.
- Avoid relying on obscure knowledge outside the case.

The model must not be allowed to redefine backend rules or access application secrets.

## 5.4 Narrative Validation

Implement deterministic server-side checks for:

- Required fields.
- Valid difficulty and genre.
- Correct number of suspects.
- Correct number of evidence items, subject to documented configuration.
- Unique IDs.
- Valid suspect references.
- Valid evidence references.
- Valid culprit ID.
- Non-empty solution explanation.
- Chronological consistency where timestamps are provided.
- Existence of decisive evidence supporting the stored solution.
- No direct answer leakage in public case fields.
- Consistency between evidence, alibis, timeline, and solution.

Use schema validation, preferably Zod, at API and AI boundaries.

AI-generated content cannot be guaranteed logically perfect through prompt instructions alone. Validation must reject clearly inconsistent cases. Where full logical verification is impractical, use bounded regeneration and test cases rather than claiming that every narrative is automatically proven correct.

## 5.5 Image and Video Generation

Keep visual asset generation behind a provider interface.

Example responsibilities:

- `generateImage(prompt)` returns a generated asset or a controlled failure.
- `getAssetStatus(assetId)` checks asynchronous generation when supported.
- `getAssetUrl(assetId)` returns a usable asset reference.

The initial application must not depend on an unconfigured image or video service.

Text generation and image generation are separate capabilities. Implement them separately, and use only a provider/model that explicitly supports the requested modality.

If video generation is introduced later, define its own provider, supported formats, cost limits, timeouts, and storage lifecycle.

---

# 6. Technology Stack

## 6.1 Frontend

- React.
- Vite.
- JavaScript with JSX for the initial implementation.
- React Router for client-side navigation.
- Tailwind CSS for styling.
- A reusable component library or custom components for the investigation UI.
- Fetch API or Axios for backend communication.

Use JavaScript consistently unless the repository already establishes TypeScript. Do not mix conventions unnecessarily.

## 6.2 Backend

- Node.js.
- Express.js.
- MongoDB.
- Mongoose.
- `@google/genai` for Gemini integration.
- Zod for request and AI-output validation.
- `dotenv` for local environment configuration.
- A structured logging library or a consistent built-in logging approach.

## 6.3 Supporting Libraries

Use libraries only when they provide a clear benefit.

Potential choices:

- `lucide-react` for icons.
- `react-hot-toast` or an equivalent notification system.
- `helmet` for HTTP security headers.
- `express-rate-limit` for abuse prevention.
- `cors` for configured cross-origin requests.
- `crypto.randomUUID()` or an equivalent secure ID-generation mechanism.

Avoid unnecessary dependencies and do not introduce a second state-management library unless required.

## 6.4 Development and Deployment

- Git for version control.
- `.env` for local configuration.
- `.env.example` for documented environment variables.
- MongoDB Atlas or a local MongoDB instance.
- A frontend host and Node-compatible backend host.
- A configured production database connection.

The deployed frontend must communicate with the deployed backend through a configurable API base URL.

---

# 7. System Architecture

Use a modular MERN architecture.

```text
React Frontend
    |
    | HTTP / JSON
    v
Express API
    |
    +--> Request Validation
    |
    +--> Mystery Service
    |       |
    |       +--> Gemini Provider
    |       +--> Narrative Validation
    |       +--> Public/Private Data Separation
    |
    +--> Game Service
    |       |
    |       +--> Evidence Access
    |       +--> Progress Management
    |       +--> Accusation Evaluation
    |
    +--> MongoDB / Mongoose
    |
    +--> Optional Asset Provider
```

### Architectural rules

1. React must not call Gemini directly.
2. Gemini API keys must remain on the server.
3. Business logic must not be embedded entirely in Express route handlers.
4. Database operations must be separated from UI components.
5. Public and private case data must have separate serialization rules.
6. The server must be authoritative for progress and final results.
7. AI provider integration must be replaceable without rewriting the game.
8. Errors must be handled centrally and returned in a consistent format.

---

# 8. Project Directory Structure

Use the following structure unless an existing repository requires a justified adaptation.

```text
ai-mystery-room/
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
├── docs/
│   ├── API.md
│   └── ARCHITECTURE.md
├── SPEC.md
├── .gitignore
├── package.json
└── README.md
```

Keep the repository understandable and modular. Do not create empty files or unnecessary abstractions merely to match this tree.

---

# 9. Database Design

Use MongoDB with Mongoose. The following models define the minimum persistent data.

## 9.1 MysteryCase

Represents one generated investigation.

```text
MysteryCase
├── _id
├── caseCode
├── ownerSessionId
├── title
├── premise
├── genre
├── difficulty
├── status
├── briefing
├── setting
├── suspects[]
├── evidence[]
├── timeline[]
├── solution (private)
├── generationMetadata
├── createdAt
└── updatedAt
```

### Fields

- `caseCode`: Unique, human-readable case reference.
- `ownerSessionId`: Guest session that owns the case.
- `title`: Public case title.
- `premise`: Original user-provided premise.
- `genre`: Validated genre.
- `difficulty`: `easy`, `medium`, or `hard`.
- `status`: `generating`, `ready`, `failed`, or `completed`.
- `briefing`: Public incident description and known facts.
- `setting`: Location and relevant time period.
- `suspects`: Array of suspect profiles.
- `evidence`: Array of evidence records.
- `timeline`: Ordered incident events.
- `solution`: Private culprit and explanation.
- `generationMetadata`: Model identifier, generation version, timestamps, and retry count.
- `createdAt`, `updatedAt`: Managed timestamps.

Use Mongoose schema validation and appropriate indexes. Enforce ownership checks on every case operation.

## 9.2 Suspect Schema

```text
Suspect
├── suspectId
├── name
├── age (optional)
├── role
├── avatarUrl (optional)
├── background
├── motive
├── alibi
├── relationships[]
└── publicDescription
```

The suspect schema embedded in a case must not expose private solution annotations.

## 9.3 Evidence Schema

```text
Evidence
├── evidenceId
├── type
├── title
├── description
├── source
├── timestamp (optional)
├── content
├── assetUrl (optional)
├── relatedSuspectIds[]
├── relatedEvidenceIds[]
└── tags[]
```

Allowed `type` values:

- `chat`
- `image`
- `cctv`
- `document`
- `clue`

The `content` field must follow the appropriate structure for each evidence type. Do not store arbitrary unvalidated objects.

Chat evidence must support individual messages with sender, text, and timestamps. CCTV evidence must support timestamps, location, observations, and an optional asset reference.

Use separate validation rules for each evidence type.

## 9.4 Private Solution Schema

```text
Solution
├── culpritSuspectId
├── motive
├── method
├── opportunity
├── decisiveEvidenceIds[]
├── reasoning
├── suspectEliminations[]
└── revealExplanation
```

`SuspectEliminations` may contain a suspect ID and an explanation of why that suspect is not the culprit.

**Security requirement:** Never serialize the entire `MysteryCase` document directly to the client. The solution must be omitted from all pre-accusation responses.

## 9.5 GameProgress

Represents a player's progress through a case.

```text
GameProgress
├── _id
├── caseId
├── ownerSessionId
├── reviewedEvidenceIds[]
├── investigationNotes[]
├── suspectEvidenceLinks[]
├── accusation
├── result
├── startedAt
├── completedAt (optional)
├── status
└── updatedAt
```

Requirements:

- One active progress record per guest session and case.
- `status`: `in_progress` or `completed`.
- `accusation` remains unset until submission.
- `result` is created by the server.
- Completed accusations cannot be overwritten.
- Evidence review and notes must be validated against the relevant case.

## 9.6 Persistence and Indexes

- Index `caseCode` uniquely.
- Index cases by `ownerSessionId` and `createdAt`.
- Index progress by `caseId` and `ownerSessionId`.
- Use timestamps on all main models.
- Validate ObjectIds and references.
- Avoid storing large binary image/video files directly in ordinary MongoDB documents. Store asset URLs or storage references instead.

---

# 10. Backend API Specification

Base path: `/api/v1`

All endpoints must return JSON and use consistent HTTP status codes.

## 10.1 Standard Response Format

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The supplied input is invalid"
  }
}
```

Do not expose stack traces, internal prompts, secrets, or private solution fields in production responses.

## 10.2 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check server health |
| POST | `/cases` | Create and generate a mystery |
| GET | `/cases` | List cases belonging to the guest session |
| GET | `/cases/:caseId` | Get public case details |
| GET | `/cases/:caseId/evidence` | List evidence metadata |
| GET | `/cases/:caseId/evidence/:evidenceId` | Get a specific evidence item |
| GET | `/cases/:caseId/progress` | Get current progress |
| PATCH | `/cases/:caseId/progress` | Save reviewed evidence and notes |
| POST | `/cases/:caseId/accusation` | Submit the final accusation |
| GET | `/cases/:caseId/result` | Retrieve the result after completion |
| DELETE | `/cases/:caseId` | Delete an owned case and associated progress |

### POST `/cases`

Request:

```json
{
  "premise": "A priceless painting disappears from a locked mansion during a dinner party.",
  "difficulty": "medium",
  "genre": "theft",
  "suspectCount": 4,
  "evidenceCount": 8
}
```

The guest session identifier must be provided through the application's agreed session mechanism, not trusted from an arbitrary body field.

Response:

```json
{
  "success": true,
  "data": {
    "case": {
      "id": "case_id",
      "caseCode": "MR-EXAMPLE",
      "title": "The Missing Masterpiece",
      "status": "ready",
      "difficulty": "medium"
    }
  },
  "message": "Mystery generated successfully"
}
```

The sample values are illustrative, not hardcoded case data.

For the initial synchronous implementation, generation should return only after the case is ready. If generation latency makes asynchronous processing necessary, use an explicit `generating` state and a documented status-polling or job mechanism. Do not silently return an incomplete case as playable.

### GET `/cases/:caseId`

Returns the briefing, suspects, timeline information intended for players, and other public case fields.

Must not return:

- Culprit ID.
- Private solution.
- Private solution annotations.
- Hidden clue-to-culprit mappings that reveal the answer directly.

### PATCH `/cases/:caseId/progress`

Request example:

```json
{
  "reviewedEvidenceIds": ["EV-01", "EV-03"],
  "notes": [
    {
      "text": "The witness timeline may conflict with the CCTV timestamp."
    }
  ]
}
```

The server must validate all IDs, enforce ownership, and reject malformed or excessive input.

### POST `/cases/:caseId/accusation`

Request:

```json
{
  "suspectId": "SUS-02",
  "reasoning": "The access log contradicts the suspect's alibi."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "correct": false,
    "selectedSuspectId": "SUS-02",
    "completed": true,
    "resultAvailable": true
  },
  "message": "Accusation evaluated successfully"
}
```

The initial response must not reveal the culprit or solution. The frontend should then request the result endpoint.

### GET `/cases/:caseId/result`

Available only after the accusation has been submitted.

Returns:

- Correctness.
- Selected suspect.
- Actual culprit.
- Reveal explanation.
- Decisive evidence.
- Suspect elimination explanations.
- Optional score.

The server must independently verify that the case is completed and that the requesting session owns it.

### DELETE `/cases/:caseId`

Deletes the owned case and its progress. If asset storage is introduced, document and implement asset cleanup or a cleanup queue.

## 10.3 Status Codes

- `200`: Successful read or update.
- `201`: Successfully created resource.
- `400`: Invalid request.
- `401`: Missing or invalid authenticated identity, if authentication is introduced.
- `403`: Access denied.
- `404`: Resource not found.
- `409`: Conflicting operation, such as an already completed accusation.
- `422`: Valid request format but unprocessable business input.
- `429`: Rate limit exceeded.
- `500`: Unexpected server error.
- `502` or `503`: Upstream AI provider failure or unavailability, as appropriate.

Never return `200` for an operation that failed.

---

# 11. Frontend Pages and Routing

Use React Router.

| Route | Page | Purpose |
|---|---|---|
| `/` | HomePage | Introduce the game |
| `/create` | CreateMysteryPage | Enter premise and configuration |
| `/cases/:caseId/briefing` | CaseBriefingPage | Read the case briefing |
| `/cases/:caseId/investigate` | InvestigationPage | Explore suspects and evidence |
| `/cases/:caseId/board` | InvestigationBoardPage | Organize clues and notes |
| `/cases/:caseId/accuse` | AccusationPage | Submit the final decision |
| `/cases/:caseId/result` | ResultPage | Reveal the solution |
| `*` | NotFoundPage | Handle invalid routes |

### Investigation page layout

The investigation interface should have:

- A top bar with the case title, case code, and progress.
- A navigation section for briefing, suspects, evidence, and board.
- A main evidence viewing area.
- A suspect panel or accessible suspect navigation.
- Evidence review indicators.
- Clear controls to return to the case or continue the investigation.

Use responsive behavior so panels collapse into tabs, drawers, or stacked sections on smaller screens.

The evidence viewer must render different evidence types through dedicated components rather than a single large conditional component.

Suggested components:

- `CaseHeader`
- `CaseBriefing`
- `SuspectCard`
- `SuspectProfile`
- `EvidenceCard`
- `EvidenceFilters`
- `ChatEvidenceViewer`
- `ImageEvidenceViewer`
- `CCTVEvidenceViewer`
- `DocumentEvidenceViewer`
- `InvestigationBoard`
- `AccusationDialog`
- `ResultSummary`
- `LoadingState`
- `ErrorState`

---

# 12. UI/UX and Visual Design

## 12.1 Design Direction

The website should feel like a modern detective investigation interface: immersive, cinematic, polished, and easy to use.

Avoid making the entire experience look like a generic administration dashboard.

Suggested design system:

- Dark charcoal or midnight backgrounds.
- Warm off-white primary text.
- Muted slate secondary text.
- Amber or brass accents.
- Restrained red accents for warnings and case alerts.
- Subtle borders and shadows.
- Clear typographic hierarchy.
- Readable spacing and accessible contrast.
- Evidence cards with clear category indicators.

These are design defaults, not a requirement to sacrifice readability or accessibility for atmosphere.

## 12.2 Interaction Design

- Use subtle transitions for opening evidence and navigating the case.
- Display loading indicators while the AI generates a mystery.
- Prevent duplicate generation requests during submission.
- Show useful error messages with retry options.
- Provide confirmation before irreversible accusations or deletion.
- Use tooltips only where controls need explanation.
- Provide visible focus states and keyboard-accessible interactions.
- Do not rely exclusively on color to communicate evidence type or correctness.

## 12.3 Responsive Design

Test at a minimum of:

- 360 px mobile width.
- 768 px tablet width.
- 1280 px desktop width.

Avoid horizontal overflow, inaccessible modals, clipped evidence, and controls that cannot be used on touch devices.

## 12.4 Accessibility

Target WCAG 2.1 AA practices where practical.

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Appropriate form labels.
- Accessible modal behavior.
- Descriptive alternative text.
- Sufficient color contrast.
- Reduced-motion support.
- Text fallbacks for generated media.

---

# 13. Game Logic and Difficulty

## 13.1 Difficulty Rules

**Easy**
- Fewer timeline ambiguities.
- Clearer clue relationships.
- More direct elimination of innocent suspects.
- Minimal dependence on cross-referencing.

**Medium**
- Multiple connected clues.
- Plausible red herrings.
- Some timeline comparison.
- At least two pieces of evidence contributing to the decisive conclusion.

**Hard**
- More indirect clues.
- More conflicting statements.
- Greater emphasis on cross-referencing evidence.
- Stronger but fair red herrings.

Difficulty must change the reasoning challenge, not merely the length of the generated story.

## 13.2 Fairness Rules

- There must be exactly one intended culprit.
- The solution must be supported by evidence accessible before accusation.
- A decisive conclusion must not depend solely on a character's unsubstantiated confession.
- Red herrings must be explainable after the reveal.
- Contradictions must be intentional and resolvable.
- The solution must not depend on evidence invented only after the accusation.
- Suspect IDs must remain stable across the case.
- Evidence references must point to existing records.
- The culprit must not be obvious solely from formatting or disproportionate profile detail.

## 13.3 Scoring

A minimal MVP can evaluate correctness without implementing a complex scoring system.

If scoring is included, define it deterministically. Suggested initial score:

- Correct accusation: 100 points.
- Incorrect accusation: 0 points.
- Optional hint usage: subtract 10 points per hint.
- Optional evidence coverage bonus: award points for reviewing decisive clues.

Store the score on the server. Do not calculate the authoritative score only in React.

Do not include hints in the MVP unless their implementation and scoring are completed consistently.

---

# 14. Security, Privacy, and Abuse Prevention

1. Keep `GEMINI_API_KEY` on the backend.
2. Never commit `.env` files or API keys.
3. Validate all request bodies, path parameters, and query parameters.
4. Enforce ownership checks on every case and progress endpoint.
5. Use a cryptographically random guest session identifier.
6. Configure CORS to allow only intended frontend origins in production.
7. Add rate limiting to case creation and other expensive operations.
8. Limit prompt length, evidence size, and generated output size.
9. Apply timeouts and bounded retries to AI calls.
10. Never execute code, commands, or database queries generated by Gemini.
11. Treat user prompts and model responses as untrusted input.
12. Render AI-generated content as text by default; sanitize any intentionally supported rich content.
13. Do not use `dangerouslySetInnerHTML` for untrusted AI output.
14. Avoid logging API keys, session identifiers, private solutions, or complete sensitive request payloads.
15. Keep private solution fields out of all public API serializers.
16. Ensure completed accusations cannot be submitted again.
17. Add cleanup and retention policies for guest data where appropriate.
18. Use fictional names and scenarios. Do not claim that generated evidence is genuine evidence from a real investigation.

For the MVP, a random session ID is a lightweight ownership mechanism, not a full authentication system. If session security, cross-device access, or account recovery becomes necessary, introduce proper authentication in a later phase.

---

# 15. Environment Configuration

Create root-level setup documentation and environment examples.

Backend `.env.example`:

```dotenv
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai_mystery_room
GEMINI_API_KEY=
GEMINI_MODEL=
CLIENT_URL=http://localhost:5173
```

Frontend `.env.example`:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If a visual asset provider is implemented, add its configuration separately and document whether it is optional or required.

Rules:

- `.env.example` must contain placeholders only.
- `.env` must be excluded from version control.
- Validate required environment variables at server startup.
- If MongoDB or Gemini is unavailable, provide a clear startup or request error.
- Never silently substitute fake AI responses in production.
- If a development mock mode exists, make it explicit and opt-in.

---

# 16. Error Handling and Reliability

Handle at least the following cases:

| Scenario | Expected behavior |
|---|---|
| Empty premise | Reject before generation |
| Premise exceeds limit | Return validation error |
| Gemini quota exceeded | Explain that generation is temporarily unavailable |
| Gemini timeout | Return a controlled error and allow retry |
| Invalid Gemini JSON | Validate and attempt bounded repair |
| Inconsistent investigation | Regenerate or reject the case |
| MongoDB unavailable | Return a server error without crashing the process |
| Unknown case ID | Return 404 |
| Access to another session's case | Deny access |
| Unknown evidence ID | Return 404 |
| Duplicate accusation | Reject without changing the original result |
| Result requested before accusation | Return conflict or forbidden response |
| Missing visual asset | Show fallback UI |
| Invalid route | Render the not-found page |
| Network interruption | Preserve recoverable user input and offer retry |

Implement centralized Express error-handling middleware.

Avoid exposing raw provider exceptions or internal implementation details to the browser.

---

# 17. Testing Requirements

Use a practical testing stack, such as Vitest and React Testing Library for the frontend, plus Supertest for Express API tests.

Backend services must be testable without making live Gemini requests.

## 17.1 Unit Tests

Test:

- Request validation.
- AI response schema validation.
- Suspect and evidence reference validation.
- Public versus private case serialization.
- Accusation evaluation.
- Score calculation, if implemented.
- Ownership checks.
- Completed-case immutability.

## 17.2 API Integration Tests

Test:

- Case creation with a mocked Gemini provider.
- Case retrieval.
- Evidence retrieval.
- Progress updates.
- Accusation submission.
- Result retrieval.
- Invalid requests.
- Missing resources.
- Unauthorized case access.
- Duplicate accusation attempts.
- AI provider failure.
- Database failure handling.

## 17.3 Frontend Tests

Test:

- Mystery form validation.
- Loading and error states.
- Case briefing rendering.
- Suspect profile rendering.
- Each evidence viewer.
- Evidence filtering and review status.
- Investigation board interactions.
- Accusation confirmation.
- Correct and incorrect result screens.
- Responsive navigation and accessible controls where feasible.

## 17.4 End-to-End Test

At least one complete end-to-end flow must verify:

1. A user creates a mystery.
2. A case is generated using a mocked AI provider.
3. The user views suspects and evidence.
4. The user marks evidence as reviewed.
5. The user submits an accusation.
6. The server evaluates the answer.
7. The result page displays the stored solution.
8. The completed case remains completed after refresh.

The test must verify that the culprit is not included in the initial public case response.

---

# 18. Definition of Done

The MVP is considered complete only when all mandatory criteria below are satisfied.

- [ ] The application starts using documented commands.
- [ ] The React frontend communicates with the Express backend.
- [ ] MongoDB persistence works.
- [ ] Gemini generates structured investigation data.
- [ ] Invalid AI output is handled safely.
- [ ] The user can generate a mystery from a custom premise.
- [ ] A complete case contains suspects, a timeline, and evidence.
- [ ] Chat evidence renders in a readable conversation interface.
- [ ] Image evidence supports real asset URLs and fallbacks.
- [ ] CCTV evidence renders as a clearly identified recording reconstruction or CCTV-style still, not a fabricated actual video.
- [ ] The investigation board supports basic clue organization.
- [ ] The user can submit one final accusation.
- [ ] The backend evaluates the accusation against the stored culprit.
- [ ] The solution is not leaked before accusation.
- [ ] The result screen explains the outcome.
- [ ] Case progress survives refresh.
- [ ] Guest-session ownership checks are implemented.
- [ ] Loading, empty, and error states exist.
- [ ] Desktop and mobile layouts work.
- [ ] Tests cover critical backend logic and the main gameplay flow.
- [ ] No secrets are committed to Git.
- [ ] README setup instructions are accurate.
- [ ] The application does not rely on unconfigured external services.

---

# 19. Development Plan for Codex

Implement the project in the following order.

## Phase 1 — Repository and Foundation

- Inspect the existing repository before modifying files.
- Create the React/Vite frontend and Express backend if needed.
- Configure environment variables.
- Configure MongoDB and Mongoose.
- Add centralized error handling.
- Add a health endpoint.
- Establish a consistent API response format.

**Exit condition:** Both applications start, and the backend can connect to MongoDB.

## Phase 2 — AI Generation and Data Models

- Implement the Gemini provider.
- Create the mystery-generation prompt.
- Define and validate the case schema.
- Implement narrative consistency checks.
- Separate public case data from private solution data.
- Add case persistence.
- Add mock-provider tests.

**Exit condition:** A valid mystery can be generated and stored, and the public endpoint does not reveal its solution.

## Phase 3 — Core Frontend

- Build the landing page.
- Build the mystery creation form.
- Build the case briefing.
- Build suspect profiles.
- Build the evidence room.
- Add chat, image, CCTV, and document viewers.
- Add loading, error, and empty states.

**Exit condition:** A user can create a case and explore its suspects and evidence.

## Phase 4 — Investigation and Results

- Implement progress persistence.
- Implement evidence review tracking.
- Implement the investigation board.
- Implement final accusation submission.
- Implement server-side evaluation.
- Implement the results screen.
- Prevent duplicate submissions.

**Exit condition:** The full gameplay flow works from premise to final reveal.

## Phase 5 — Polish and Verification

- Improve responsive layouts.
- Add accessibility improvements.
- Add API and frontend tests.
- Verify ownership enforcement and solution secrecy.
- Verify error handling.
- Finalize README documentation.
- Run production build checks.

**Exit condition:** All mandatory acceptance criteria pass.

Do not proceed to optional enhancements until the end-to-end MVP works.

---

# 20. Instructions for Codex

This document is the authoritative specification for the AI Mystery Room MVP.

When implementing the project, follow these rules:

1. **Read first:** Inspect `SPEC.md`, the existing repository, and current package configuration before changing files.
2. **Plan before coding:** Break implementation into small, verifiable tasks.
3. **Follow the spec:** Do not invent additional mandatory features or replace the chosen stack without a documented reason.
4. **Preserve existing work:** Modify existing files where appropriate instead of recreating the repository unnecessarily.
5. **Implement real functionality:** Do not replace required backend behavior with hardcoded frontend data.
6. **Validate AI output:** Treat Gemini output as untrusted data and validate it before persistence.
7. **Protect the solution:** Never expose the stored culprit or solution before the final accusation.
8. **Keep changes focused:** Avoid unnecessary abstractions, dependencies, and unrelated refactoring.
9. **Test each phase:** Run relevant tests and builds after completing each implementation stage.
10. **Report failures honestly:** Do not claim that a build, test, API call, or deployment succeeded unless it was actually verified.
11. **Document deviations:** If a requirement cannot be implemented as written, explain why and propose the smallest practical alternative.
12. **Update the spec deliberately:** If a requirement changes, update this document before implementing the change. Do not let undocumented implementation decisions become the new source of truth.
13. **Finish with a handoff:** Provide the implemented features, file changes, setup commands, required environment variables, tests executed, known limitations, and remaining tasks.

## Final acceptance principle

The project is not complete merely because the UI looks finished or Gemini returns a story.

It is complete when a user can create a mystery, investigate consistent evidence, make a final accusation, and receive a correct, server-validated explanation through a secure, persistent, responsive application.

---