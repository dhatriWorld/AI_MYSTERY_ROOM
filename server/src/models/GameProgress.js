import mongoose from 'mongoose';
const GameProgressSchema = new mongoose.Schema({ caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'MysteryCase', index: true }, ownerSessionId: String, reviewedEvidenceIds: [String], investigationNotes: [{ text: String, createdAt: { type: Date, default: Date.now } }], suspectEvidenceLinks: [{ suspectId: String, evidenceId: String }], accusation: mongoose.Schema.Types.Mixed, result: mongoose.Schema.Types.Mixed, startedAt: { type: Date, default: Date.now }, completedAt: Date, status: { type: String, default: 'in_progress' } }, { timestamps: true });
GameProgressSchema.index({ caseId: 1, ownerSessionId: 1 }, { unique: true });
export default mongoose.model('GameProgress', GameProgressSchema);
