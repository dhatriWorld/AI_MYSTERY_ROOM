import mongoose from 'mongoose';
const { Schema } = mongoose;
const suspectSchema = new Schema({ suspectId: String, name: String, age: Number, role: String, background: String, motive: String, alibi: String, relationships: [String], publicDescription: String }, { _id: false });
const evidenceSchema = new Schema({ evidenceId: String, type: String, title: String, description: String, source: String, timestamp: String, content: Schema.Types.Mixed, relatedSuspectIds: [String], relatedEvidenceIds: [String], tags: [String] }, { _id: false });
const MysteryCaseSchema = new Schema({ caseCode: { type: String, unique: true }, ownerSessionId: { type: String, index: true }, title: String, premise: String, genre: String, difficulty: String, status: { type: String, default: 'ready' }, briefing: String, description: String, setting: Schema.Types.Mixed, suspects: [suspectSchema], evidence: [evidenceSchema], timeline: [Schema.Types.Mixed], solution: Schema.Types.Mixed, generationMetadata: Schema.Types.Mixed }, { timestamps: true });
MysteryCaseSchema.index({ ownerSessionId: 1, createdAt: -1 });
export default mongoose.model('MysteryCase', MysteryCaseSchema);
