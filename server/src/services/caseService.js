import { randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import MysteryCase from '../models/MysteryCase.js';
import GameProgress from '../models/GameProgress.js';
import { generateMystery } from '../ai/providers/gemini.js';
export const publicCase = c => ({ id: c._id, caseCode: c.caseCode, title: c.title, premise: c.premise, genre: c.genre, difficulty: c.difficulty, status: c.status, briefing: c.briefing, description: c.description, setting: c.setting, suspects: c.suspects, evidence: c.evidence, timeline: c.timeline, createdAt: c.createdAt });
export async function createCase(input, ownerSessionId) {
  const story = await generateMystery(input);
  const doc = await MysteryCase.create({ ...story, ownerSessionId, premise: input.premise, genre: input.genre, difficulty: input.difficulty, caseCode: `MR-${randomBytes(3).toString('hex').toUpperCase()}`, status: 'ready', generationMetadata: { model: process.env.GEMINI_MODEL, retries: 0 } });
  await GameProgress.create({ caseId: doc._id, ownerSessionId });
  return doc;
}
export async function ownedCase(id, owner) {
  if (!mongoose.isValidObjectId(id)) throw Object.assign(new Error('Case not found.'), { status: 404, code: 'NOT_FOUND' });
  const doc = await MysteryCase.findOne({ _id: id, ownerSessionId: owner });
  if (!doc) throw Object.assign(new Error('Case not found.'), { status: 404, code: 'NOT_FOUND' });
  return doc;
}
export async function getProgress(doc, owner) { return GameProgress.findOneAndUpdate({ caseId: doc._id, ownerSessionId: owner }, { $setOnInsert: { caseId: doc._id, ownerSessionId: owner } }, { upsert: true, new: true }); }
