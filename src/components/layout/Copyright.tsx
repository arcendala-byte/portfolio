/**
 * Server Component — reads the current year at build time.
 *
 * `"use cache"` captures the timestamp when the cache entry is created
 * (during the build). The year updates on each deploy / cache revalidation,
 * which is the correct lifecycle for a copyright.
 *
 * `©` is explicitly rendered with a system fallback because Geist Mono's
 * glyph subset doesn't include it consistently.
 */
export async function Copyright() {
  "use cache";
  const year = new Date().getFullYear();
  return (
    <span className="micro text-white/55">
      <span style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        ©
      </span>{" "}
      {year}
    </span>
  );
}
