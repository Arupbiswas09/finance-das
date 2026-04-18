import type { NextConfig } from "next";

/**
 * Vercel sets `VERCEL=1` during `next build`. Without a dashboard env var, deploys were
 * still shipping the marketing `/` page. Default showcase routes on Vercel unless
 * `NEXT_PUBLIC_SHOWCASE_MODE` is explicitly set (e.g. `false` for a full-app deployment).
 */
function resolvedShowcaseMode(): string {
  const explicit = process.env.NEXT_PUBLIC_SHOWCASE_MODE;
  if (explicit !== undefined && explicit !== "") {
    return explicit;
  }
  if (process.env.VERCEL === "1") {
    return "true";
  }
  return "";
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SHOWCASE_MODE: resolvedShowcaseMode(),
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
