import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — SPARKS Lab" },
      { name: "description", content: "Photographs from the lab, workshops, conferences, hackathons and student life at SPARKS Lab, NIT Trichy." },
      { property: "og:title", content: "Gallery · SPARKS Lab" },
      { property: "og:description", content: "Inside the lab." },
    ],
  }),
  component: GalleryPage,
});

const imageModules = import.meta.glob("../../gallery_pics/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const palettes = [
  ["from-accent/30", "to-ember/20"],
  ["from-sage/20", "to-accent/20"],
  ["from-ink/80", "to-ink/40"],
  ["from-ember/30", "to-accent/10"],
  ["from-sage/30", "to-ink/10"],
  ["from-accent/40", "to-sage/20"],
];

const categoryMap: Record<string, string> = {
  Collaborations: "Collaborations",
  "Conferences attended": "Conferences",
  "Events Conducted": "Events",
  "NITT Club Activities": "Club Activities",
  Talks: "Talks",
  "With students": "Students",
};

const items = Object.entries(imageModules).map(([path, src], index) => {
  const relativePath = path.replace("../../gallery_pics/", "");
  const topLevelFolder = relativePath.split("/")[0];
  const caption = (relativePath.split("/").pop() || "Gallery image").replace(/\.[^.]+$/, "");

  return {
    id: index + 1,
    src,
    cat: categoryMap[topLevelFolder] ?? "Collaborations",
    caption,
    ratio: index % 4 === 0 ? "row-span-2" : "",
    palette: palettes[index % palettes.length],
  };
});

const categories = ["All", "Collaborations", "Conferences", "Events", "Club Activities", "Talks", "Students"];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      <PageHeader
        title={
          <>
            Moments inside the <br />
            <span className="italic font-light text-ink/50">lab.</span>
          </>
        }
      />

      <section className="space-y-3 border-t border-hairline pb-16 pt-12">
        {[0, 1].map((row) => (
          <div key={row} className="relative overflow-hidden">
            <div
              className="flex animate-marquee gap-3 py-2"
              style={{ animationDirection: row % 2 ? "reverse" : "normal", animationDuration: "60s" }}
            >
              {[...items, ...items].map((it, i) => (
                <div
                  key={`${row}-${i}`}
                  className={`relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${it.palette[0]} ${it.palette[1]} ring-1 ring-border`}
                >
                  <img src={it.src} alt={it.caption} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between font-mono text-[10px] text-canvas/90">
                    <span>{it.caption}</span>
                    <span>{it.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container-page pb-32">
        <Reveal className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                filter === c ? "bg-ink text-canvas" : "bg-surface ring-1 ring-border hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto self-center eyebrow">{filtered.length} photos</div>
        </Reveal>

        <AnimatePresence mode="wait">
          <Stagger key={filter} className="grid grid-cols-2 gap-3 auto-rows-[180px] md:grid-cols-3 lg:grid-cols-4" stagger={0.04}>
            {filtered.map((it) => (
              <StaggerItem key={it.id} className={it.ratio}>
                <figure className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${it.palette[0]} ${it.palette[1]} ring-1 ring-border transition-transform hover:scale-[1.02]`}>
                  <img src={it.src} alt={it.caption} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-canvas">
                    <div className="eyebrow text-canvas/60 text-[9px]">{it.cat}</div>
                    <div className="text-sm font-medium">{it.caption}</div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </AnimatePresence>
      </section>
    </>
  );
}
