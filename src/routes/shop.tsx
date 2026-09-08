import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { categoriesQuery, colorsOf, effectivePrice, productsQuery } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Shoes — Sole Studio" },
      {
        name: "description",
        content:
          "Browse the full Sole Studio collection: loafers, derbies, boots, oxfords and hybrids in Mongolian sizes 39–45.",
      },
      { property: "og:title", content: "Shop All Shoes — Sole Studio" },
      { property: "og:description", content: "The full Sole Studio men's footwear collection." },
    ],
  }),
  component: Shop,
});

const SORTS = [
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;

function Shop() {
  const products = useQuery(productsQuery());
  const categories = useQuery(categoriesQuery);
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("new");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allColors = useMemo(
    () => Array.from(new Set((products.data ?? []).flatMap((p) => colorsOf(p)))),
    [products.data],
  );

  const visible = useMemo(() => {
    let rows = [...(products.data ?? [])];
    if (category) rows = rows.filter((p) => p.categories?.slug === category);
    if (color) rows = rows.filter((p) => colorsOf(p).includes(color));
    if (sort === "price-asc") rows.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "price-desc") rows.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    return rows;
  }, [products.data, category, color, sort]);

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">BUILD</p>
        <ul className="mt-4 space-y-2">
          <li>
            <button
              onClick={() => setCategory(null)}
              className={cn(
                "flex w-full justify-between border px-3 py-2 font-mono text-xs",
                !category ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground",
              )}
            >
              <span>All builds</span> <span>{products.data?.length ?? 0}</span>
            </button>
          </li>
          {(categories.data ?? []).map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setCategory(c.slug)}
                className={cn(
                  "flex w-full justify-between border px-3 py-2 font-mono text-xs",
                  category === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
                )}
              >
                <span>{c.name.toUpperCase()}</span>
                <span>→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">COLOUR</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <button
              onClick={() => setColor(null)}
              className={cn(
                "border px-3 py-1.5 font-mono text-xs",
                !color ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground",
              )}
            >
              ALL
            </button>
          </li>
          {allColors.map((c) => (
            <li key={c}>
              <button
                onClick={() => setColor(c)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-xs",
                  color === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
                )}
              >
                {c.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">SORT</p>
        <ul className="mt-4 space-y-1">
          {SORTS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => setSort(s.id)}
                className={cn(
                  "w-full border px-3 py-2 text-left font-mono text-xs",
                  sort === s.id ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground",
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-10">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-primary">03 — COLLECTION</p>
          <h1 className="mt-2 font-display text-5xl">ALL BUILDS</h1>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-muted-foreground">{products.isLoading ? "Loading…" : `${visible.length} MODELS`}</p>
          <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground">CEMENT / WOOD / OXBLOOD</p>
        </div>
      </header>

      <div className="mt-8 flex gap-8">
        <aside className="hidden w-[260px] shrink-0 border border-border bg-bone p-5 lg:block">{filters}</aside>

        <div className="flex-1">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="mb-6 flex items-center gap-2 border-2 border-ink bg-ink px-4 py-3 font-mono text-xs font-bold tracking-[0.14em] text-ink-foreground lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> FILTERS
          </button>
          {filtersOpen && <div className="mb-8 border border-border bg-bone p-5 lg:hidden">{filters}</div>}

          {products.isError && (
            <p className="py-20 text-center font-mono text-sm text-muted-foreground">
              We couldn't load the collection. Please refresh and try again.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {products.isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border p-2">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="mt-3 h-4 w-2/3" />
                </div>
              ))}
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>

          {!products.isLoading && visible.length === 0 && (
            <p className="py-24 text-center font-display text-2xl">NOTHING MATCHES THESE FILTERS.</p>
          )}
        </div>
      </div>
    </div>
  );
}
