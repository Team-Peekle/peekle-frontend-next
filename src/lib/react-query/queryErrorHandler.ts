type Meta = Record<string, unknown>;

export default function queryErrorHandler(error: unknown, meta?: Meta) {
  const title = error instanceof Error ? error.message : 'error connecting to server';

  const logData = {
    title,
    error,
    ...meta,
  };

  console.error('Error caught by queryErrorHandler', logData);
}
