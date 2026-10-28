export function notFound(req, res) { res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found.' } }); }
export function errorHandler(err, req, res, next) {
  const status = err.status || (err.name === 'ZodError' ? 400 : 500);
  if (status >= 500) console.error(err.message);
  res.status(status).json({ success: false, error: { code: err.code || (status === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR'), message: status >= 500 && !err.status ? 'An unexpected server error occurred.' : err.message } });
}
