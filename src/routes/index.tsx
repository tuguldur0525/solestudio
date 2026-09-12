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
      {/* HERO — Image-background, visually tuned for cement + ink contrast */}
      <section className="relative min-h-[86vh] w-full overflow-hidden bg-ink">
        <img
          src={brandImages.heroMain}
          srcSet={brandImages.heroMainSrcSet}
          sizes="100vw"
          width={1920}
          height={1014}
          fetchPriority="high"
          decoding="async"
          alt="Sole Studio oxblood loafers on cement slab"
          className="absolute inset-0 h-full w-full object-cover object-[63%_38%] brightness-[1.04] contrast-[1.06] md:object-[50%_38%]"
        />
        {/* subtle base dim — keeps cement texture visible */}
        <div className="absolute inset-0 bg-ink/[0.36]" />
        {/* left legibility wash — strong near text, fades by 62% */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/42 to-transparent md:from-ink/82 md:via-ink/28" />
        {/* bottom vignette to anchor CTAs */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[86vh] max-w-[1600px] flex-col justify-center px-5 py-16 md:px-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[560px] text-ink-foreground"
          >
            <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink-foreground/65">
              <span className="h-px w-3 bg-primary" />
              CRAFTED FOR MEN
            </p>

            <h1 className="mt-5 font-display text-[3.5rem] leading-[0.86] tracking-[-0.03em] md:text-[5.6rem]">
              <span className="block font-light tracking-[0.015em] text-ink-foreground/62 py-2">
                BUILT FOR
              </span>
              <span className="block drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]">THE STRIDE.</span>
            </h1>
            <div className="mt-5 h-[2px] w-[56px] bg-primary" />

            <p className="mt-6 max-w-[30ch] sm:max-w-[40ch] text-[14px] leading-relaxed text-ink-foreground/72 md:text-[15px]">
              Full-grain leather. Cement build. Wood-pegged shank. Pairs that patina and resole —
              not replace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="bg-primary px-7 py-[14px] font-mono text-xs font-bold tracking-[0.14em] text-primary-foreground shadow-[0_6px_20px_rgba(90,21,16,0.35)] transition-colors hover:bg-background hover:text-foreground"
              >
                SHOP NEW ARRIVALS
              </Link>
              <Link
                to="/collections"
                className="border border-ink-foreground/28 bg-ink-foreground/5 px-7 py-[14px] font-mono text-xs font-bold tracking-[0.14em] text-ink-foreground backdrop-blur-[2px] transition-colors hover:border-ink-foreground hover:bg-ink-foreground hover:text-ink"
              >
                EXPLORE BUILDS
              </Link>
            </div>

            <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-ink-foreground/40">
              CEMENT · WOOD · OXBLOOD — ULAANBAATAR
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED — Horizontal index + dense grid, not Vinci's staggered pt-16 */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary">02 — SELECTION</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.9]">MADE TO ENDURE.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Four lasts pulled from the current run. Each built to take polish and miles in equal
              measure.
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
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
            <p className="relative font-mono text-[11px] tracking-[0.22em] text-ink-foreground/70">
              03 — THE HOUSE
            </p>
            <h2 className="relative mt-4 font-display text-5xl leading-[0.9] md:text-6xl">
              A MONGOLIAN
              <br />
              IDEA OF
              <br />
              <span className="font-light">STRENGTH.</span>
            </h2>
            <div className="relative mt-8 max-w-md space-y-4 border-l border-ink-foreground/20 pl-6 text-sm leading-relaxed text-ink-foreground/70">
              <p>
                Cemented construction. Full-grain that patinas instead of cracking through winter.
              </p>
              <p>A last shaped for stride and stance — not the runway.</p>
            </div>
            <Link
              to="/about"
              className="relative mt-10 inline-flex w-fit items-center gap-3 border border-ink-foreground/30 px-8 py-4 font-mono text-xs font-bold tracking-[0.14em] hover:bg-ink-foreground hover:text-ink"
            >
              OUR STORY <span className="h-px w-6 bg-current" />
            </Link>
          </div>
          <div className="relative bg-[#1a1a1a] p-5 md:p-8">
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -left-2 -top-2 h-full w-full border border-primary/40" />
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
            <p className="font-mono text-[11px] tracking-[0.22em] text-primary">
              04 — SHOP BY BUILD
            </p>
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
                <span className="hidden font-mono text-xs text-muted-foreground md:block">
                  0{idx + 1}
                </span>
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={c.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 border border-border object-cover grayscale transition-all group-hover:grayscale-0 md:h-20 md:w-20"
                  />
                )}
                <span className="font-display text-2xl tracking-wide md:text-4xl">
                  {c.name.toUpperCase()}
                </span>
              </div>
              <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-[0.16em]">
                SHOP{" "}
                <span className="flex h-8 w-8 items-center justify-center border border-foreground group-hover:bg-foreground group-hover:text-background">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ON FOOT — Full-width cement editorial, distinct from bone split */}
      <section className="border-y bg-bone">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative p-4 md:p-6">
            <div className="mx-auto max-w-[520px] border border-border bg-background p-2">
              <img
                src={brandImages.campaignWhite}
                alt="Sole Studio derby on concrete pedestal"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-7 left-7 bg-ink px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-ink-foreground">
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
              Boardrooms, late nights, concrete floors — our shoes are chosen, worn, and lived in.
              Patina tells the story. Share yours: tag the slab.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                brandImages.campaignMirror,
                brandImages.campaignBlack,
                brandImages.campaignRedHeels,
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full border border-border object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM — Tight cement grid, no Vinci eyebrow */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl tracking-wide md:text-5xl">@SOLESTUDIO.MN</h2>
          <a
            href="https://www.instagram.com/solestudio.mn/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold tracking-[0.16em] underline decoration-1 underline-offset-4"
          >
            FOLLOW ON INSTAGRAM →
          </a>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {[
            brandImages.campaignBlack,
            brandImages.campaignMirror,
            brandImages.campaignWhite,
            brandImages.campaignRedHeels,
          ].map((src) => (
            <a
              key={src}
              href="https://www.instagram.com/solestudio.mn/"
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
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
          CEMENT · WOOD · OXBLOOD — TAG THE SLAB
        </p>
      </section>
    </>
  );
}
