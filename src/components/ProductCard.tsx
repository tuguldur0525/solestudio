import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { formatMnt } from "@/lib/brand";
import { colorsOf, effectivePrice, primaryImage, sortedImages, type Product } from "@/lib/catalog";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const images = sortedImages(product);
  const image = primaryImage(product);
  const hoverImage = images[1]?.image_url;
  const colors = colorsOf(product);
  const onSale = product.sale_price != null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-border bg-background"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        {/* Industrial frame — top hairline in burgundy, thick cement outer */}
        <div className="relative overflow-hidden bg-bone p-2">
          <div className="relative overflow-hidden bg-cement/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
            {image && (
              <img
                src={image}
                alt={product.name}
                loading={priority ? "eager" : "lazy"}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            )}
            {hoverImage && (
              <img
                src={hoverImage}
                alt=""
                loading="lazy"
                aria-hidden="true"
                className="absolute inset-0 aspect-[4/5] w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
            {/* Tags — small industrial stamps, left top */}
            <div className="absolute left-2 top-3 flex flex-col items-start gap-1">
              {product.new_arrival && (
                <span className="bg-ink px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-ink-foreground">
                  NEW
                </span>
              )}
              {onSale && (
                <span className="bg-primary px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-primary-foreground">
                  SALE
                </span>
              )}
            </div>
            {/* Quick view — bottom bar, cement style, not pill */}
            <span className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-1 bg-ink px-3 py-2 text-center font-mono text-[11px] font-semibold tracking-[0.16em] text-ink-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              QUICK VIEW →
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-3 pb-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-[13px] font-semibold leading-tight tracking-wide">
              {product.name.toUpperCase()}
            </h3>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
              {product.product_variants?.length ?? 0} SZ
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            {onSale && (
              <span className="font-mono text-xs text-muted-foreground line-through">
                {formatMnt(product.price)}
              </span>
            )}
            <span
              className={`font-mono text-sm font-semibold ${onSale ? "text-primary" : "text-foreground"}`}
            >
              {formatMnt(effectivePrice(product))}
            </span>
          </div>

          {colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-border" />
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {colors.join(" · ").toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
