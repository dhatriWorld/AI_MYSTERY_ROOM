const base = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const SESSION_KEY = 'mystery-room-session';
export function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id); }
  return id;
}
export async function api(path, options = {}) {
  const response = await fetch(`${base}${path}`, { ...options, headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId(), ...options.headers } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || 'Something went wrong. Please try again.');
  return body.data;
}
