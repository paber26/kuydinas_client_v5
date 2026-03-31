const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000/api";
const ADMIN_SUBDOMAIN = "admin";
const USER_SUBDOMAIN = "user";

const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const isIpAddress = (hostname = "") => /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

const replaceSubdomain = (origin, sourceSubdomain, targetSubdomain) => {
  if (!origin) {
    return "";
  }

  try {
    const url = new URL(origin);

    if (url.hostname === "localhost" || isIpAddress(url.hostname)) {
      // In local development, typically mapped by ports rather than subdomains, so fallback or adapt if needed.
      // E.g. user on 5173, admin on 5174.
      if (sourceSubdomain === 'user' && targetSubdomain === 'admin') {
         if (url.port === '5173') url.port = '5174';
      } else if (sourceSubdomain === 'admin' && targetSubdomain === 'user') {
         if (url.port === '5174') url.port = '5173';
      }
      return trimTrailingSlash(url.origin);
    }

    if (url.hostname === sourceSubdomain) {
      url.hostname = targetSubdomain;
      return trimTrailingSlash(url.origin);
    }

    const sourcePrefix = `${sourceSubdomain}.`;

    if (url.hostname.startsWith(sourcePrefix)) {
      url.hostname = `${targetSubdomain}.${url.hostname.slice(sourcePrefix.length)}`;
    }

    return trimTrailingSlash(url.origin);
  } catch {
    return trimTrailingSlash(origin);
  }
};

const parseUserPayload = (rawUser) => {
  if (!rawUser) {
    return null;
  }

  const parsers = [
    () => JSON.parse(rawUser),
    () => JSON.parse(decodeURIComponent(rawUser)),
    () => JSON.parse(atob(rawUser)),
    () => JSON.parse(atob(rawUser.replace(/-/g, "+").replace(/_/g, "/"))),
  ];

  for (const parser of parsers) {
    try {
      const user = parser();

      if (user && typeof user === "object") {
        return user;
      }
    } catch {
      continue;
    }
  }

  return null;
};

const currentOrigin =
  typeof window !== "undefined" ? trimTrailingSlash(window.location.origin) : "";

const resolveOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
};

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
);

export const BACKEND_ORIGIN = resolveOrigin(API_BASE_URL);

export const USER_AUTH_API_BASE_URL = `${API_BASE_URL}/user`;

export const USER_APP_URL = trimTrailingSlash(
  import.meta.env.VITE_USER_APP_URL || currentOrigin
);

export const ADMIN_APP_URL = trimTrailingSlash(
  import.meta.env.VITE_ADMIN_APP_URL || replaceSubdomain(USER_APP_URL, USER_SUBDOMAIN, ADMIN_SUBDOMAIN)
);

export const GOOGLE_CALLBACK_PATH = "/auth/google/callback";

export const saveAuthSession = ({ token, role, user }) => {
  if (!token) {
    return;
  }

  localStorage.setItem("token", token);
  localStorage.setItem("role", role || user?.role || "user");

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

export const redirectToAdminApp = (path = "/login") => {
  if (typeof window === "undefined" || !ADMIN_APP_URL) {
    return;
  }

  const targetUrl = new URL(path, `${ADMIN_APP_URL}/`);
  window.location.replace(targetUrl.toString());
};

export const buildUserGoogleLoginUrl = () => {
  const loginUrl = new URL(`${USER_AUTH_API_BASE_URL}/auth/google/redirect`);

  if (USER_APP_URL) {
    loginUrl.searchParams.set(
      "redirect_url",
      `${USER_APP_URL}${GOOGLE_CALLBACK_PATH}`
    );
  }

  loginUrl.searchParams.set("role", "user");
  loginUrl.searchParams.set("source", "user");

  return loginUrl.toString();
};

export const getGoogleCallbackSession = (searchParams) => {
  const user = parseUserPayload(
    searchParams.get("user") ||
      searchParams.get("user_data") ||
      searchParams.get("user_json")
  );

  return {
    token:
      searchParams.get("token") ||
      searchParams.get("access_token") ||
      searchParams.get("api_token"),
    role: user?.role || searchParams.get("role") || "user",
    user,
    error: searchParams.get("error") || searchParams.get("message") || "",
  };
};
