const DEFAULT_API_URL = 'http://localhost:8000';

export const API_BASE_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

export const getAuthTokens = () => {
  if (typeof window === 'undefined') return { accessToken: '', refreshToken: '' };
  return {
    accessToken: localStorage.getItem('lush_access_token') || '',
    refreshToken: localStorage.getItem('lush_refresh_token') || '',
  };
};

export const setAuthTokens = (tokens = {}) => {
  if (typeof window === 'undefined') return;
  // The API returns snake_case (access_token); accept both shapes.
  const accessToken = tokens.accessToken || tokens.access_token || '';
  const refreshToken = tokens.refreshToken || tokens.refresh_token || '';
  if (accessToken) localStorage.setItem('lush_access_token', accessToken);
  if (refreshToken) localStorage.setItem('lush_refresh_token', refreshToken);
};

export const clearAuthTokens = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('lush_access_token');
  localStorage.removeItem('lush_refresh_token');
};

async function rawFetch(path, { method = 'GET', body, token, headers = {}, formData = false } = {}) {
  const requestHeaders = { ...headers };
  if (token) requestHeaders.Authorization = `Bearer ${token}`;
  if (body && !formData && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body:
      body == null
        ? undefined
        : body instanceof FormData || formData
          ? body
          : JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    const error = new Error(errorText || `Request failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

let refreshPromise = null;

// Access tokens expire after 30 minutes; refresh once and retry so an editing
// session on the phone doesn't silently start failing mid-save.
async function refreshAccessToken() {
  if (!refreshPromise) {
    const { refreshToken } = getAuthTokens();
    if (!refreshToken) return null;
    refreshPromise = rawFetch('/api/auth/refresh', { method: 'POST', token: refreshToken })
      .then((result) => {
        setAuthTokens(result);
        if (result.user) localStorage.setItem('lush_user', JSON.stringify(result.user));
        return result.access_token;
      })
      .catch(() => {
        clearAuthTokens();
        localStorage.removeItem('lush_user');
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function apiFetch(path, options = {}) {
  const usesStoredToken = !options.token;
  const token = options.token || getAuthTokens().accessToken;

  try {
    return await rawFetch(path, { ...options, token });
  } catch (error) {
    const isAuthCall = path.startsWith('/api/auth/');
    if (error.status === 401 && usesStoredToken && !isAuthCall) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return rawFetch(path, { ...options, token: newToken });
      }
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.assign('/admin/login');
      }
    }
    throw error;
  }
}
