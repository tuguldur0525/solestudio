import { createFileRoute, Link } from "@tanstack/react-router";
import { brandImages } from "@/lib/brand";
import { Flower } from "@/components/Flower";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sole Studio — Crafted For Men" },
      {
        name: "description",
        content:
          "The story of Sole Studio: a premium Mongolian men's footwear house built on cement, leather and lasting form.",
      },
      { property: "og:title", content: "About Sole Studio — Crafted For Men" },
      { property: "og:description", content: "A premium Mongolian men's footwear house." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 wood-wash opacity-30" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <Flower className="h-10 w-10 text-primary" />
          <h1 className="mt-8 font-display text-6xl leading-[0.9] md:text-8xl">
            SOLE STUDIO
            <br />
            <span className="font-light tracking-[0.12em] text-ink-foreground/80">BUILT FOR THE STRIDE.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-foreground/60">
            Dark grey. Cement. Burgundy. Wood. A palette drawn from the workshop floor.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div className="max-w-lg">
          <span className="eyebrow text-primary">The house</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">BORN IN ULAANBAATAR, BUILT FOR HOW MEN MOVE.</h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sole Studio began with a simple conviction: that a Mongolian man deserves a shoe that holds the line
              between work and night — a shoe that gains character instead of losing it.
            </p>
            <p>
              Every last is cut for weight, balance and finish — a loafer vamp that holds its shape, a derby seam that
              sits flat for years, full-grain leathers that patina rather than crack in a Mongolian winter.
            </p>
            <p>
              The circle in our mark is the studio floor. Concrete, scuffed by lasts and hammered by hand. It is how
              we think about style: grounded, resilient, unmistakably ours.
            </p>
          </div>
        </div>
        <img
          src={brandImages.campaignWhite}
          alt="Sole Studio leather loafer on cement"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-10" />
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 md:grid-cols-3 md:px-10 md:py-28">
          {[
            {
              t: "CONSTRUCTION",
              d: "Cemented and stitch-down builds, leather linings, wood-pegged shanks — made to be resoled.",
            },
            { t: "PRESENCE", d: "Lasts engineered around stride and stance, so confidence comes standard." },
            {
              t: "PATINA",
              d: "Small runs, deep oxbloods and cement greys, leathers that get better every year.",
            },
          ].map((item) => (
            <div key={item.t}>
              <Flower className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-2xl tracking-wide">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 text-center md:px-10 md:py-28">
        <h2 className="font-display text-5xl md:text-6xl">STEP INTO SOLE STUDIO.</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Crafted for men. Built to stay.</p>
        <Link
          to="/shop"
          className="eyebrow mt-10 inline-block bg-primary px-10 py-4 text-primary-foreground transition-colors hover:bg-ink"
        >
          Shop the collection
        </Link>
      </section>
    </>
  );
}
