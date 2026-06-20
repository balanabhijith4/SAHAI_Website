  import { createFileRoute } from "@tanstack/react-router";
  import { useState } from "react";
  import { motion } from "framer-motion";
  import { PageHeader } from "../components/PageHeader";
  import { Reveal, Stagger, StaggerItem } from "../components/Reveal";

  export const Route = createFileRoute("/publications")({
    head: () => ({
      meta: [
        { title: "Publications — SPARKS Lab" },
        { name: "description", content: "Peer-reviewed publications, conference papers, journal articles and patents from SPARKS Lab researchers." },
        { property: "og:title", content: "Publications · SPARKS Lab" },
        { property: "og:description", content: "152+ publications spanning the leading AI venues." },
      ],
    }),
    component: PublicationsPage,
  });

  type Pub = {
    venue: string;
    type: string;
    year: number;
    date: string;
    title: string;
    authors: string;
    body: string;
    citations: number;
    category: string;
    gradient: string;
    link: string; // now required — every pub needs a Read link
};
const pubs: Pub[] = [
    {
  venue: "ACM Transactions on Knowledge Discovery from Data",
  type: "Journal",
  year: 2026,
  date: "2026",
  category: "Data Mining",
  title: "CGS: Configurable Graph Summarization with Bounded Neighborhood Loss and Query Support",
  authors: "Mitra S., Elza Simon S., Oswald C., Bhattacharya A., Pal A.",
  body: "A configurable graph summarization framework offering lossless and lossy variants with bounded neighborhood loss, enabling accurate shortest-path and reachability queries on compressed graphs.",
  citations: 0,
  gradient: "from-sage/30 via-canvas to-accent/20",
  link: "https://dl.acm.org/doi/10.1145/3786788"
},
{
  venue: "ACM Transactions on the Web",
  type: "Journal",
  year: 2022,
  date: "2022",
  category: "NLP",
  title: "Spotspam: Intention Analysis–Driven SMS Spam Detection Using BERT Embeddings",
  authors: "Oswald C., Simon S.E., Bhattacharya A.",
  body: "SMS spam detection using contextual BERT embeddings and intention-aware classification.",
  citations: 0,
  gradient: "from-sage/30 via-canvas to-accent/20",
  link: "https://dl.acm.org/doi/10.1145/3538491"
},
{
  venue: "Data Science Journal",
  type: "Journal",
  year: 2018,
  date: "2018",
  category: "Data Compression",
  title: "Text and Image Compression Based on Data Mining Perspective",
  authors: "Oswald C., Sivaselvan B.",
  body: "A cluster of hybrid text and image compression algorithms using frequent pattern mining and clustering, achieving notable gains over conventional Huffman-based methods.",
  citations: 0,
  gradient: "from-blush/30 via-canvas to-sage/20",
  link: "http://doi.org/10.5334/dsj-2018-012"
},
{
  venue: "The Computer Journal",
  type: "Journal",
  year: 2023,
  date: "2023",
  category: "Data Compression",
  title: "Smart Multimedia Compressor—Intelligent Algorithms for Text and Image Compression",
  authors: "Oswald C., Sivaselvan B.",
  body: "Introduces a universal Huffman Tree-based encoding scheme for word-level text compression that generalizes effectively across diverse corpora and domains.",
  citations: 0,
  gradient: "from-blush/30 via-canvas to-sage/20",
  link: "https://doi.org/10.1093/comjnl/bxab173"
},
{
  venue: "Concurrency and Computation: Practice and Experience",
  type: "Journal",
  year: 2021,
  date: "2021",
  category: "Image Compression",
  title: "An Efficient and Novel Data Clustering and Run Length Encoding Approach to Image Compression",
  authors: "Oswald C., Haritha E., Akash Raja A., Sivaselvan B.",
  body: "A lossy image compression approach combining pixel clustering with cluster-label-based run length encoding to improve compression efficiency.",
  citations: 0,
  gradient: "from-accent/30 via-canvas to-blush/20",
  link: "https://onlinelibrary.wiley.com/doi/10.1002/cpe.6185"
},
{
  venue: "Journal of Ambient Intelligence and Humanized Computing",
  type: "Journal",
  year: 2018,
  date: "2018",
  category: "Data Compression",
  title: "An Optimal Text Compression Algorithm Based on Frequent Pattern Mining",
  authors: "Oswald C., Sivaselvan B.",
  body: "A frequent pattern mining–based Huffman encoding algorithm that prunes pattern sets via hash-based counting to reduce code table size and improve compression efficiency.",
  citations: 0,
  gradient: "from-sage/30 via-canvas to-accent/20",
  link: "https://doi.org/10.1007/s12652-017-0540-2"
},
{
  venue: "International Journal of Computer Information Systems and Industrial Management Applications",
  type: "Journal",
  year: 2023,
  date: "2023",
  category: "Security",
  title: "A Novel and Efficient Multilayered Approach to CAPTCHA: Design, Performance and Usability Evaluation",
  authors: "Goel N., Kumar T., Oswald C.",
  body: "Proposes and evaluates a multilayered CAPTCHA design across multiple variations, assessing security against bot attacks alongside usability and performance.",
  citations: 0,
  gradient: "from-blush/30 via-canvas to-sage/20",
  link: "https://www.mirlabs.org/ijcisim/regular_papers_2023/Paper39.pdf"
},

];

  

  const filters = ["All", "Conference", "Journal", "Preprint"];

  function PublicationsPage() {
    const [filter, setFilter] = useState("All");
    const filtered = pubs.filter((p) => filter === "All" || p.type === filter);

    return (
      <>
        <PageHeader
          eyebrow="Publications · 152+"
          title={<>Scholarship as <span className="italic font-light text-ink/50">contribution.</span></>}
          description="Peer-reviewed work from SPARKS Lab researchers across the leading venues in machine learning, vision, language, and applied AI."
        />

        <section className="container-page pb-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 ${
                    filter === f
                      ? "bg-ink text-canvas shadow-md"
                      : "bg-surface ring-1 ring-border text-ink-soft hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
              <div className="ml-auto font-mono text-xs text-ink-soft">
                {filtered.length} papers
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container-page pb-32">
          <Stagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {filtered.map((p, i) => (
              <StaggerItem key={p.title}>
                <PubCard pub={p} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </>
    );
  }

  function PubCard({ pub, index }: { pub: Pub; index: number }) {
    return (
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border hover:ring-ink hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] transition-all"
      >
        {/* Image */}
        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${pub.gradient}`}>
          <div className="absolute inset-0 bg-dotgrid opacity-30" />
          <motion.div
            className="absolute inset-0 grid place-items-center"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <PubGlyph variant={index % 4} />
          </motion.div>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-canvas/90 backdrop-blur ring-1 ring-border px-3 py-1 eyebrow text-[9px] text-ink">
              {pub.category}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-ink/60">
            {pub.venue}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-[10px] font-mono text-ink-soft mb-3">
            <span>{pub.date}</span>
            <span className="size-1 rounded-full bg-ink/30" />
            <span>{pub.type}</span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-tight text-ink group-hover:text-accent transition-colors">
            {pub.title}
          </h3>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
            {pub.body}
          </p>
          <p className="mt-4 text-xs font-mono text-ink-soft truncate">{pub.authors}</p>

          <div className="mt-auto pt-5 flex items-center justify-between border-t border-hairline">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-semibold text-accent">{pub.citations}</span>
              <span className="eyebrow text-[9px]">cites</span>
            </div>
            <div className="flex gap-1">
              {["PDF", "Cite", "Read"].map((b) => (
                <button
                  key={b}
                  className="rounded-full bg-muted hover:bg-ink hover:text-canvas px-2.5 py-1 text-[10px] font-mono transition-colors"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  function PubGlyph({ variant }: { variant: number }) {
    const stroke = "oklch(0.18 0.012 60 / 0.5)";
    const accent = "oklch(0.68 0.165 55)";
    if (variant === 0) {
      return (
        <svg viewBox="0 0 200 120" className="w-2/3 h-2/3">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={30 + i * 47} cy="60" r="14" fill="oklch(0.985 0.005 80)" stroke={accent} strokeWidth="1.2" />
          ))}
          {[0, 1, 2].map((i) => (
            <line key={i} x1={44 + i * 47} y1="60" x2={62 + i * 47} y2="60" stroke={stroke} strokeWidth="1" />
          ))}
        </svg>
      );
    }
    if (variant === 1) {
      return (
        <svg viewBox="0 0 200 120" className="w-2/3 h-2/3">
          {[20, 50, 80, 110, 140, 170].map((x, i) => (
            <rect key={i} x={x} y={70 - i * 6} width="14" height={20 + i * 10} rx="2" fill={accent} opacity={0.3 + i * 0.1} />
          ))}
        </svg>
      );
    }
    if (variant === 2) {
      return (
        <svg viewBox="0 0 200 120" className="w-2/3 h-2/3">
          <path d="M10,90 Q60,20 100,60 T190,40" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M10,100 Q60,40 100,70 T190,60" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
          {[10, 60, 100, 140, 190].map((x, i) => (
            <circle key={i} cx={x} cy={[90, 50, 60, 50, 40][i]} r="3" fill={accent} />
          ))}
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 200 120" className="w-2/3 h-2/3">
        <circle cx="100" cy="60" r="38" fill="none" stroke={accent} strokeWidth="1.2" />
        <circle cx="100" cy="60" r="24" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="100" cy="60" r="10" fill={accent} />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const r = 38;
          const x = 100 + r * Math.cos((deg * Math.PI) / 180);
          const y = 60 + r * Math.sin((deg * Math.PI) / 180);
          return <circle key={deg} cx={x} cy={y} r="3" fill={accent} />;
        })}
      </svg>
    );
  }
