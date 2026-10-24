import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="relative z-10">
        <p className="eyebrow mb-6">Error · 404</p>
        <h1 className="display-1 text-foreground text-balance mb-6">
          This page
          <br />
          <span className="text-foreground-secondary">isn&rsquo;t here.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-foreground-secondary">
          The link may be broken, or the page may have been moved. Head back
          to where the work lives.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          <ArrowLeft
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />
          Return home
        </Link>
      </div>
    </main>
  );
}
