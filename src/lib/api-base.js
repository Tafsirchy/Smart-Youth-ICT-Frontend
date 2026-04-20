const LOCAL_API_URL = "http://localhost:5000/api";
const DEFAULT_PROD_API_URL = "https://syict-backend.vercel.app/api";

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function getExplicitApiUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  );
}

function getDeploymentOrigin() {
  return process.env.NEXT_PUBLIC_APP_URL || "";
}

export function getApiBaseUrl({ absolute = false } = {}) {
  const explicit = getExplicitApiUrl();
  if (explicit) {
    return stripTrailingSlash(explicit);
  }

  const isLocalDev =
    process.env.NODE_ENV !== "production" && !process.env.VERCEL;
  if (isLocalDev) {
    return LOCAL_API_URL;
  }

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return DEFAULT_PROD_API_URL;
  }

  const deploymentOrigin = getDeploymentOrigin();
  if (deploymentOrigin) {
    return `${stripTrailingSlash(deploymentOrigin)}/api`;
  }

  return absolute ? DEFAULT_PROD_API_URL : "/api";
}
