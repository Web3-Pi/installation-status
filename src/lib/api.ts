/**
 * Wrapper around fetch that adds the api url to the path
 * @param path Path starting with /
 */
export function fetchApi(path: string, init?: RequestInit) {
  const timeout = AbortSignal.timeout(1000);

  // in development we use the local server
  if (import.meta.env.DEV) {
    return fetch(`http://localhost:3000/api${path}`, {
      signal: timeout,
      ...init,
    });
  }
  // in production the api is on the same host as the app
  return fetch("/api" + path, { signal: timeout, ...init });
}
