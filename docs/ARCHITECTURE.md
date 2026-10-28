# Architecture

The React/Vite client calls the versioned Express API. The API validates request schemas and guest ownership, the case service coordinates Gemini generation and persistence, and Mongoose stores a case separately from its session progress.

Gemini output passes Zod shape checks plus deterministic ID/reference/count checks before persistence. The `publicCase` serializer explicitly selects fields and never emits the solution. Accusations are compared against the persisted culprit; result data is available only after the server marks progress complete.

MongoDB and Gemini are required for the complete generation flow. The frontend works without external image services by displaying clear fictional visual reconstruction placeholders. CCTV entries are labeled as reconstructions rather than actual recordings.
