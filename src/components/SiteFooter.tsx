import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t-4 border-ink bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Top spec bar */}
        <div className="flex flex-wrap gap-4 border-b border-ink-foreground/15 py-4 font-mono text-[11px] tracking-[0.18em] text-ink-foreground/50">
          <span>CEMENT — WOOD — OXBLOOD</span>
          <span className="hidden sm:inline">·</span>
          <span>FULL-GRAIN LEATHER</span>
          <span className="ml-auto">EST 2024 — ULAANBAATAR</span>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] md:py-16">
          <div className="border-l-2 border-primary pl-6">
            <p className="font-display text-[2rem] tracking-[0.18em]">SOLE STUDIO</p>
            <p className="font-mono text-[10px] tracking-[0.28em] text-ink-foreground/50">
              CRAFTED FOR MEN
            </p>
            <p className="mt-6 max-w-xs font-mono text-xs leading-relaxed text-ink-foreground/60">
              Premium men's footwear. Cemented, wood-pegged, resoleable. Built on the studio floor.
            </p>
            <div className="mt-6 h-1 w-12 bg-primary" />
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-foreground/40">
              SHOP — 01
            </p>
            <ul className="mt-4 space-y-2 font-mono text-xs">
              <li>
                <Link to="/shop" className="hover:text-primary">
                  01 — New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary">
                  02 — Footwear
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-primary">
                  03 — Collections
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary">
                  04 — All Builds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-foreground/40">
              HOUSE — 02
            </p>
            <ul className="mt-4 space-y-2 font-mono text-xs">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-primary">
                  Store
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-foreground/40">
              STAY ON THE LIST — 03
            </p>
            <form
              className="mt-4 flex border border-ink-foreground/20"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  toast.error("Please enter a valid email address.");
                  return;
                }
                setEmail("");
                toast.success("You're on the list.");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent px-4 py-3 font-mono text-xs outline-none placeholder:text-ink-foreground/40"
              />
              <button
                type="submit"
                className="shrink-0 bg-primary px-6 font-mono text-xs font-bold tracking-[0.14em] text-primary-foreground hover:bg-ink-foreground hover:text-ink"
              >
                JOIN
              </button>
            </form>
            <div className="mt-6 flex gap-4 font-mono text-xs">
              <a
                href="https://instagram.com/solestudio.mn"
                target="_blank"
                rel="noreferrer"
                className="border border-ink-foreground/20 px-3 py-1.5 hover:border-primary hover:text-primary"
              >
                IG
              </a>
              <a
                href="https://facebook.com/solestudio"
                target="_blank"
                rel="noreferrer"
                className="border border-ink-foreground/20 px-3 py-1.5 hover:border-primary hover:text-primary"
              >
                FB
              </a>
              <span className="ml-auto text-ink-foreground/40">ULAANBAATAR, GEM PALACE 302</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ink-foreground/10 py-6 font-mono text-[11px] tracking-wide text-ink-foreground/40 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} SOLE STUDIO — ULAANBAATAR</p>
          <Link to="/admin" className="hover:text-ink-foreground">
            STORE ADMIN →
          </Link>
        </div>
      </div>
    </footer>
  );
}
