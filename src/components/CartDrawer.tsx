import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatMnt } from "@/lib/brand";

export function CartDrawer() {
  const { isOpen, close, lines, setQuantity, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-label="Close bag"
            className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-background shadow-2xl"
            role="dialog"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b-2 border-ink px-6 py-5">
              <div>
                <h2 className="font-display text-xl tracking-wide">BAG — {lines.length}</h2>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">SOLE STUDIO — UB</p>
              </div>
              <button onClick={close} aria-label="Close bag" className="border border-border p-2">
                <X className="h-4 w-4" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="h-1 w-12 bg-primary" />
                <p className="font-display text-3xl">BAG EMPTY</p>
                <p className="max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
                  Every Sole Studio pair begins with cement and a last. Start with the new loafers.
                </p>
                <Link
                  to="/shop"
                  onClick={close}
                  className="mt-2 bg-ink px-8 py-3 font-mono text-xs font-bold tracking-[0.16em] text-ink-foreground hover:bg-primary"
                >
                  SHOP ALL →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-2">
                  {lines.map((line) => (
                    <div key={line.key} className="flex gap-4 border-b py-5 last:border-0">
                      {line.image && (
                        <div className="border border-border bg-bone p-1">
                          <img src={line.image} alt={line.name} loading="lazy" className="h-28 w-24 object-cover" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <Link
                            to="/products/$slug"
                            params={{ slug: line.slug }}
                            onClick={close}
                            className="font-mono text-xs font-bold leading-tight"
                          >
                            {line.name.toUpperCase()}
                          </Link>
                          <button
                            onClick={() => remove(line.key)}
                            aria-label={`Remove ${line.name}`}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground">
                          {line.color.toUpperCase()} · EU {line.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border">
                            <button
                              className="px-2 py-1.5 hover:bg-bone"
                              aria-label="Decrease quantity"
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-sm">{line.quantity}</span>
                            <button
                              className="px-2 py-1.5 hover:bg-bone"
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(line.key, line.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-semibold">{formatMnt(line.price * line.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t-2 border-ink bg-bone px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.16em]">SUBTOTAL</span>
                    <span className="font-display text-2xl">{formatMnt(subtotal)}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">Delivery calculated at checkout.</p>
                  <Link
                    to="/checkout"
                    onClick={close}
                    className="mt-4 block bg-primary py-4 text-center font-mono text-xs font-bold tracking-[0.16em] text-primary-foreground hover:bg-ink"
                  >
                    CHECKOUT →
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
