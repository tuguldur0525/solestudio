import { cn } from "@/lib/utils";

/**
 * SOLE STUDIO mark — circular badge, inspired by the provided logo:
 * SOLE STUDIO / CRAFTED FOR MEN with double-rule.
 * Kept as pure SVG so it works at any size and on dark backgrounds.
 */
export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("h-6 w-6", className)} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M32 50 H38 M62 50 H68" opacity="0.0" />
      </g>
      {/* inner construction cross — subtle industrial mark */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.9">
        <line x1="50" y1="14" x2="50" y2="22" />
        <line x1="50" y1="78" x2="50" y2="86" />
        <line x1="14" y1="50" x2="22" y2="50" />
        <line x1="78" y1="50" x2="86" y2="50" />
      </g>
      <circle cx="50" cy="50" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="font-display flex items-baseline gap-[0.35em] text-[1.7rem] font-medium tracking-[0.22em]">
        <span>SOLE</span>
        <span className="font-light opacity-90">STUDIO</span>
      </span>
      <span className="mt-1 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-current opacity-60" />
        <span className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] opacity-80">
          CRAFTED FOR MEN
        </span>
        <span className="h-px flex-1 bg-current opacity-60" />
      </span>
    </span>
  );
}

/** Compact horizontal wordmark for header — stays legible at 16-20px height */
export function WordmarkCompact({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display flex gap-[0.35em] text-[1.35rem] font-medium tracking-[0.18em]">
        <span>SOLE</span>
        <span className="font-light">STUDIO</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-px w-6 bg-current opacity-50" />
        <span className="font-sans text-[0.52rem] font-semibold py-1 tracking-[0.28em] opacity-70">
          CRAFTED FOR MEN
        </span>
        <span className="h-px w-6 bg-current opacity-50" />
      </span>
    </span>
  );
}
