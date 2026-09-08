import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { brandImages } from "@/lib/brand";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sole Studio — Crafted For Men" },
      {
        name: "description",
        content:
          "Premium Mongolian men's footwear. Loafers, derbies, boots and hybrids — built from full-grain leather for men who move with purpose.",
      },
      { property: "og:title", content: "Sole Studio — Crafted For Men" },
      {
        property: "og:description",
        content: "Premium men's footwear from Ulaanbaatar. Crafted for men.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = useQuery(productsQuery());
  const categories = useQuery(categoriesQuery);
  const featuredList = (featured.data ?? []).filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* HERO — SPLIT, not full-bleed like Vinci. Cement left, image right with frame. */}
      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-center px-5 py-12 md:px-10 md:py-20 lg:py-24">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:block" />
            <p className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground">
              01 — AUTUMN / WINTER 2025 · MENS
            </p>

            <h1 className="mt-6 font-display text-[3.4rem] leading-[0.85] md:text-[5.2rem] lg:text-[6rem]">
              <span className="block font-light tracking-[0.02em] text-muted-foreground">BUILT FOR</span>
              <span className="block tracking-[0.02em]">THE STRIDE</span>
              <span className="mt-3 block h-1 w-24 bg-primary" />
            </h1>

            <p className="mt-8 max-w-[42ch] border-l-2 border-cement pl-5 text-sm leading-relaxed text-muted-foreground">
              Full-grain leather, cement construction, wood-pegged shank. No seasonal gimmicks — pairs that patina,
              resole, and stay on foot for years.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="bg-primary px-8 py-4 font-mono text-xs font-bold tracking-[0.14em] text-primary-foreground transition-colors hover:bg-ink"
              >
                SHOP NEW ARRIVALS →
              </Link>
              <Link
                to="/collections"
                className="border border-foreground px-8 py-4 font-mono text-xs font-bold tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background"
              >
                EXPLORE BUILDS
              </Link>
            </div>

            <div className="mt-12 flex gap-8 border-t pt-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">MATERIAL</p>
                <p className="mt-1 font-mono text-xs font-semibold">FULL-GRAIN • PATINA</p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">BUILD</p>
                <p className="mt-1 font-mono text-xs font-semibold">CEMENT • WOOD PEG</p>
              </div>
              <div className="hidden sm:block">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">SIZES</p>
                <p className="mt-1 font-mono text-xs font-semibold">39 — 45</p>
              </div>
            </div>
          </div>

          <div className="relative bg-bone p-6 md:p-8 lg:p-10">
            <div className="absolute inset-6 border border-border md:inset-8" />
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-cement">
              <img
                src={brandImages.campaignRedHeels}
                alt="Sole Studio oxblood loafer on cement slab"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-ink px-4 py-3 text-ink-foreground">
                <p className="font-mono text-[10px] tracking-[0.18em]">LOAFER — OXBLOOD</p>
                <p className="mt-1 font-display text-xl">No. 02 Cement Loafer</p>
              </div>
              <div className="absolute right-3 top-3 bg-background px-3 py-2 font-mono text-[10px] font-bold tracking-widest">
                02 / CEMENT
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-wide text-muted-foreground">
              PHOTOGRAPHED ON CEMENT SLAB — STUDIO FLOOR
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED — Horizontal index + dense grid, not Vinci's staggered pt-16 */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary">02 — SELECTION</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9]">MADE TO ENDURE.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Four lasts pulled from the current run. Each built to take polish and miles in equal measure.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 font-mono text-xs font-bold tracking-[0.16em] text-ink-foreground hover:bg-background hover:text-foreground"
            >
              VIEW ALL FOOTWEAR <span>→</span>
            </Link>
            <div className="mt-10 hidden h-px w-full bg-border lg:block" />
            <p className="mt-6 hidden font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground lg:block">
              SCROLL TO EXPLORE — CEMENT / WOOD / OXBLOOD
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {featured.isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border p-2">
                    <Skeleton className="aspect-[4/5] w-full" />
                    <Skeleton className="mt-3 h-4 w-2/3" />
                  </div>
                ))}
              {featuredList.map((p, i) => (
                <div key={p.id} className="relative">
                  <span className="absolute -left-2 -top-2 z-10 bg-primary px-1.5 py-1 font-mono text-[10px] font-bold text-primary-foreground">
                    0{i + 1}
                  </span>
                  <ProductCard product={p} priority={i < 2} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between border-t pt-4 font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
              <span>SOLE STUDIO — UB</span>
              <span>{featuredList.length} MODELS</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL — Dark ink split with offset frame, brutalist */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col justify-center px-5 py-16 md:px-10 md:py-24">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
            <p className="relative font-mono text-[11px] tracking-[0.22em] text-primary">03 — THE HOUSE</p>
            <h2 className="relative mt-4 font-display text-5xl leading-[0.9] md:text-6xl">
              A MONGOLIAN
              <br />
              IDEA OF
              <br />
              <span className="font-light">STRENGTH.</span>
            </h2>
            <div className="relative mt-8 max-w-md space-y-4 border-l border-ink-foreground/20 pl-6 text-sm leading-relaxed text-ink-foreground/70">
              <p>Cemented construction. Full-grain that patinas instead of cracking through winter.</p>
              <p>A last shaped for stride and stance — not the runway.</p>
            </div>
            <Link
              to="/about"
              className="relative mt-10 inline-flex w-fit items-center gap-3 border border-ink-foreground/30 px-8 py-4 font-mono text-xs font-bold tracking-[0.14em] hover:bg-ink-foreground hover:text-ink"
            >
              OUR STORY <span className="h-px w-6 bg-current" />
            </Link>
          </div>
          <div className="relative bg-[#1a1a1a] p-8 md:p-12">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border border-primary/40" />
              <img
                src={brandImages.campaignMirror}
                alt="Sole Studio loafer on cement display"
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover grayscale-[0.15]"
              />
              <div className="absolute bottom-4 left-4 bg-background px-4 py-3 text-foreground">
                <p className="font-mono text-[10px] tracking-[0.18em]">ATELIER — CEMENT FLOOR</p>
                <p className="font-mono text-xs">LAST #42 · OXBLOOD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES — List + thumbs, not Vinci's image grid with eyebrow */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary">04 — SHOP BY BUILD</p>
            <h2 className="mt-2 font-display text-5xl">THE BUILDS.</h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-muted-foreground">
            Each build named for its construction. Pick by how it’s made, not just how it looks.
          </p>
        </div>

        <div className="mt-8 divide-y border-y">
          {(categories.data ?? []).map((c, idx) => (
            <Link
              key={c.id}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group flex items-center justify-between gap-6 py-5 hover:bg-bone/60"
            >
              <div className="flex items-center gap-6">
                <span className="hidden font-mono text-xs text-muted-foreground md:block">0{idx + 1}</span>
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={c.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 border border-border object-cover grayscale transition-all group-hover:grayscale-0 md:h-20 md:w-20"
                  />
                )}
                <span className="font-display text-2xl tracking-wide md:text-4xl">{c.name.toUpperCase()}</span>
              </div>
              <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.16em]">
                SHOP <span className="flex h-8 w-8 items-center justify-center border border-foreground group-hover:bg-foreground group-hover:text-background">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ON FOOT — Full-width cement editorial, distinct from bone split */}
      <section className="border-y bg-bone">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative p-6 md:p-10">
            <div className="border border-border bg-background p-3">
              <img
                src={brandImages.campaignWhite}
                alt="Sole Studio derby on concrete pedestal"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-10 left-10 bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-ink-foreground">
              WORN DAILY — UB CITY
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-12 md:px-10">
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary">05 — ON FOOT</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9]">
              WORN BY MEN
              <br />
              WITH PURPOSE.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Boardrooms, late nights, concrete floors — our shoes are chosen, worn, and lived in. Patina tells the
              story. Share yours: tag the slab.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                brandImages.storeInterior,
                brandImages.campaignMirror,
                brandImages.campaignRedHeels,
              ].map((src) => (
                <img key={src} src={src} alt="" loading="lazy" className="aspect-square w-full border border-border object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM — Tight cement grid, no Vinci eyebrow */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl tracking-wide md:text-5xl">@SOLE.STUDIO_MN</h2>
          <a
            href="https://instagram.com/solestudio_mn"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold tracking-[0.16em] underline decoration-1 underline-offset-4"
          >
            FOLLOW ON INSTAGRAM →
          </a>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {[brandImages.storeInterior, brandImages.campaignMirror, brandImages.campaignWhite, brandImages.campaignRedHeels].map(
            (src) => (
              <a
                key={src}
                href="https://instagram.com/solestudio_mn"
                target="_blank"
                rel="noreferrer"
                className="group block border border-border p-1 hover:border-primary"
              >
                <img
                  src={src}
                  alt="Sole Studio on Instagram"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-500 group-hover:grayscale-0 grayscale"
                />
              </a>
            ),
          )}
        </div>
        <p className="mt-4 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
          CEMENT · WOOD · OXBLOOD — TAG THE SLAB
        </p>
      </section>
    </>
  );
}
