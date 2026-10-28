# API reference

Base URL: `http://localhost:5000/api/v1`. Except `/health`, send a UUID in `x-session-id`. Successful responses have `{ success, data, message }`; errors have `{ success: false, error: { code, message } }`.

| Method and path | Purpose |
| --- | --- |
| `GET /health` | API health check |
| `POST /cases` | Generate a case from `premise`, optional `difficulty`, `genre`, `suspectCount`, `evidenceCount`, and `constraints` |
| `GET /cases` | List this session's cases |
| `GET /cases/:caseId` | Public briefing, suspects, timeline, and evidence |
| `GET /cases/:caseId/evidence` | Evidence metadata |
| `GET /cases/:caseId/evidence/:evidenceId` | One evidence item |
| `GET /cases/:caseId/progress` | Current session progress |
| `PATCH /cases/:caseId/progress` | Update reviewed IDs, notes, and suspect/evidence links |
| `POST /cases/:caseId/accusation` | Submit `{ suspectId, reasoning? }`; response does not reveal the answer |
| `GET /cases/:caseId/result` | Reveal stored solution after accusation |
| `DELETE /cases/:caseId` | Delete this session's case and progress |

The server compares the accusation with the stored culprit. It does not accept a client-provided correctness value.
