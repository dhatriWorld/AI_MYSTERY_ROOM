import { z } from 'zod';
const suspect = z.object({ suspectId: z.string(), name: z.string(), age: z.number().optional(), role: z.string(), background: z.string(), motive: z.string(), alibi: z.string(), relationships: z.array(z.string()), publicDescription: z.string() });
const evidence = z.object({ evidenceId: z.string(), type: z.enum(['chat','image','cctv','document','clue']), title: z.string(), description: z.string(), source: z.string(), timestamp: z.string().optional(), content: z.object({ text: z.string().optional(), messages: z.array(z.object({ sender: z.string(), text: z.string(), timestamp: z.string().optional() })).optional(), observations: z.array(z.object({ timestamp: z.string(), event: z.string() })).optional() }).passthrough(), relatedSuspectIds: z.array(z.string()), relatedEvidenceIds: z.array(z.string()), tags: z.array(z.string()) });
export const GeneratedCase = z.object({ title: z.string().min(3), description: z.string(), briefing: z.string(), setting: z.object({ location: z.string(), period: z.string(), incidentTime: z.string() }), suspects: z.array(suspect), timeline: z.array(z.object({ time: z.string(), event: z.string() })), evidence: z.array(evidence), solution: z.object({ culpritSuspectId: z.string(), motive: z.string(), method: z.string(), opportunity: z.string(), decisiveEvidenceIds: z.array(z.string()).min(2), reasoning: z.string(), suspectEliminations: z.array(z.object({ suspectId: z.string(), explanation: z.string() })), revealExplanation: z.string() }) });
export function validateCase(value, counts) {
  const parsed = GeneratedCase.parse(value);
  const suspectIds = parsed.suspects.map(s => s.suspectId), evidenceIds = parsed.evidence.map(e => e.evidenceId);
  if (parsed.suspects.length !== counts.suspectCount || parsed.evidence.length !== counts.evidenceCount) throw new Error('Generated case has an unexpected number of suspects or clues.');
  if (new Set(suspectIds).size !== suspectIds.length || new Set(evidenceIds).size !== evidenceIds.length) throw new Error('Generated case contains duplicate IDs.');
  if (!suspectIds.includes(parsed.solution.culpritSuspectId)) throw new Error('Generated case refers to an unknown culprit.');
  if (parsed.solution.decisiveEvidenceIds.some(id => !evidenceIds.includes(id))) throw new Error('Generated case refers to missing decisive evidence.');
  if (parsed.evidence.some(e => e.relatedSuspectIds.some(id => !suspectIds.includes(id)) || e.relatedEvidenceIds.some(id => !evidenceIds.includes(id)))) throw new Error('Generated case contains broken evidence references.');
  if (parsed.solution.suspectEliminations.some(s => !suspectIds.includes(s.suspectId))) throw new Error('Generated case contains broken solution references.');
  for (const item of parsed.evidence) {
    if (item.type === 'chat' && !item.content.messages?.length) throw new Error('Chat evidence must include messages.');
    if (item.type === 'cctv' && !item.content.observations?.length && !item.content.text) throw new Error('CCTV evidence must include observations or a reconstruction.');
    if (['image', 'document', 'clue'].includes(item.type) && !item.content.text) throw new Error('Evidence must include readable text or a fallback description.');
  }
  const culpritName = parsed.suspects.find(s => s.suspectId === parsed.solution.culpritSuspectId).name;
  const escapedName = culpritName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const leakedName = new RegExp(`(?:culprit|responsible|committed the crime|stole it)\\s*(?:is|:)?\\s*${escapedName}`, 'i');
  const publicFields = [parsed.title, parsed.description, parsed.briefing, ...parsed.suspects.map(s => s.publicDescription), ...parsed.evidence.map(e => `${e.title} ${e.description}`)];
  if (publicFields.some(field => leakedName.test(field))) throw new Error('Generated case reveals its solution in public-facing text.');
  return parsed;
}
