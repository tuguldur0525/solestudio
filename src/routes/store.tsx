import { createFileRoute } from "@tanstack/react-router";
import { brandImages } from "@/lib/brand";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Sole Studio Store — Ulaanbaatar" },
      {
        name: "description",
        content:
          "Visit the Sole Studio boutique — cement, wood and burgundy in Ulaanbaatar. Opening hours, phone and directions.",
      },
      { property: "og:title", content: "Sole Studio Store — Ulaanbaatar" },
      { property: "og:description", content: "Visit the Sole Studio boutique in Ulaanbaatar." },
    ],
  }),
  component: Store,
});

const HOURS = [
  ["Monday — Friday", "10:00 — 20:00"],
  ["Saturday", "10:00 — 20:00"],
  ["Sunday", "11:00 — 19:00"],
];

function Store() {
  return (
    <>
      <section className="relative">
        <img
          src={brandImages.campaignRedHeels}
          alt="Interior of the Sole Studio boutique — concrete floors, wood shelving, burgundy wall"
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-5 pb-10 md:px-10">
          <span className="eyebrow text-ink-foreground/70">Come and see</span>
          <h1 className="mt-2 font-display text-5xl text-ink-foreground md:text-7xl">
            SOLE STUDIO
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <span className="eyebrow text-primary">Workshop & Store</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">SOLE STUDIO STORE</h2>
          <p className="mt-6 font-display text-2xl font-light tracking-wide">
            GEM PALACE, 3F
            <br />
            302, Ulaanbaatar, Mongolia
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Cement floors, warm wood, oxblood walls. Try every size — our team measures, fits and
            laces you in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=Tara+Center+Ulaanbaatar"
              target="_blank"
              rel="noreferrer"
              className="eyebrow bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-ink"
            >
              Open in maps
            </a>
            <a
              href="tel:+97699000000"
              className="eyebrow border border-input px-8 py-4 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Call the store
            </a>
          </div>
        </div>

        <div className="border-t pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="eyebrow text-muted-foreground">Opening hours</p>
          <ul className="mt-5 space-y-3 text-sm">
            {HOURS.map(([day, time]) => (
              <li key={day} className="flex justify-between border-b pb-3">
                <span>{day}</span>
                <span className="text-muted-foreground">{time}</span>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-12 text-muted-foreground">Find us online</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href="https://instagram.com/solestudio.mn"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Instagram — @solestudio.mn
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/solestudio"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Facebook — Sole Studio
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
