import { GoogleGenAI } from '@google/genai';
import { mysteryPrompt } from '../prompts/mysteryPrompt.js';
import { validateCase } from '../validators/case.js';
export async function generateMystery(input) {
  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) throw Object.assign(new Error('Mystery generation is not configured. Add GEMINI_API_KEY and GEMINI_MODEL to the server environment.'), { status: 503, code: 'AI_UNAVAILABLE' });
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { timeout: 120_000 } });
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const prompt = mysteryPrompt(input) + (attempt ? `\nRepair attempt: Correct this validation issue and return the entire JSON. Issue: ${lastError.message}` : '');
      const result = await client.models.generateContent({ model: process.env.GEMINI_MODEL, contents: prompt, config: { responseMimeType: 'application/json', temperature: 0.72 } });
      const raw = result.text?.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
      console.log("Gemini raw response:", raw);
      return validateCase(JSON.parse(raw), input);
    } catch (error) { lastError = error; }
  }
  console.error('Mystery generation error:', lastError);
  throw Object.assign(new Error('The investigation could not be generated reliably. Please try again.'), { status: 502, code: 'GENERATION_FAILED' });
}
