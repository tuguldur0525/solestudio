import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { WordmarkCompact } from "@/components/Flower";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "New Arrivals", to: "/shop" },
  { label: "Footwear", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Journal", to: "/about" },
  { label: "Store", to: "/store" },
];

export function SiteHeader() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar — cement / workshop vibe */}
      <div className="hidden bg-ink px-5 py-2 text-center text-[10px] tracking-[0.28em] text-ink-foreground/60 md:block">
        ULAANBAATAR — CEMENT & WOOD — EST 2024 — CRAFTED FOR MEN
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background transition-all",
          scrolled ? "border-border shadow-sm" : "border-transparent",
        )}
      >
        {/* Main bar — LEFT logotype, RIGHT nav + tools. Not centered like Vinci. */}
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 md:h-[72px] md:px-10">
          {/* Left: mobile menu + wordmark block */}
          <div className="flex items-center gap-4">
            <button
              className="-ml-1 p-2 md:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" aria-label="Sole Studio home" className="block border-l-2 border-primary pl-4">
              <WordmarkCompact className="text-ink" />
            </Link>
          </div>

          {/* Center-right: nav with industrial numbering */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item, idx) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-foreground/70 hover:text-foreground"
              >
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary">
                  0{idx + 1}
                </span>
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Right tools — cement divider + burgundy cart block */}
          <div className="flex items-center gap-4">
            <div className="hidden h-8 w-px bg-border sm:block" />
            <Link to="/shop" aria-label="Search" className="hidden p-2 sm:block">
              <Search className="h-[16px] w-[16px]" />
            </Link>
            <Link to="/auth" aria-label="Account" className="hidden p-2 sm:block">
              <User className="h-[16px] w-[16px]" />
            </Link>
            <button
              onClick={open}
              aria-label={`Shopping bag, ${count} items`}
              className="relative flex items-center gap-2 bg-ink px-4 py-2.5 text-ink-foreground"
            >
              <ShoppingBag className="h-[14px] w-[14px]" />
              <span className="hidden text-[11px] font-semibold tracking-[0.18em] sm:block">BAG</span>
              <span className="flex h-5 min-w-5 items-center justify-center bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary line — subtle cement ticker when scrolled */}
        <div className={cn("h-px w-full bg-border transition-opacity", scrolled ? "opacity-100" : "opacity-0")} />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-ink text-ink-foreground md:hidden"
          >
            <div className="flex h-[68px] items-center justify-between px-5">
              <WordmarkCompact className="text-ink-foreground" />
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="border border-ink-foreground/20 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 pt-10">
              <p className="font-mono text-[11px] tracking-[0.24em] text-ink-foreground/40">NAVIGATION — 01/05</p>
              <nav className="mt-6 flex flex-col">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between border-b border-ink-foreground/10 py-6"
                    >
                      <span className="font-display text-[2.2rem] tracking-wide">
                        0{i + 1} — {item.label.toUpperCase()}
                      </span>
                      <span className="text-ink-foreground/40">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-10 flex gap-6">
                <Link to="/auth" onClick={() => setMenuOpen(false)} className="eyebrow text-ink-foreground/60">
                  Account
                </Link>
                <Link to="/track-order" onClick={() => setMenuOpen(false)} className="eyebrow text-ink-foreground/60">
                  Track order
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
