import test, { after } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'production';
const { default: app } = await import('../src/app.js');
const server = app.listen(0, '127.0.0.1');
await new Promise(resolve => server.once('listening', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));

test('production health endpoint is available without a guest session', async () => {
  const response = await fetch(`${base}/api/v1/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, data: { status: 'ok' } });
});

test('production server serves the client and supports browser refresh routes', async () => {
  for (const path of ['/', '/cases/example/briefing']) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /Casefile/);
  }
});
