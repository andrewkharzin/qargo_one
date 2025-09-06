export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.CODESPACE_NAME) return `https://${process.env.CODESPACE_NAME}-3003.app.github.dev`;
  return `http://localhost:${process.env.PORT || 3000}`;
};

export const getOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (origin && origin.includes('github.dev')) {
    return origin;
  }
  if (host && host.includes('github.dev')) {
    return `https://${host}`;
  }
  return origin || `http://${host}`;
};
