import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { Reveal, Stagger, StaggerItem, RevealChars, RevealWords } from "../components/Reveal";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — SPARKS Lab" },
      { name: "description", content: "Dr. A. Abdullah, founder of SPARKS Lab — research vision, journey and contributions to AI at NIT Tiruchirappalli." },
      { property: "og:title", content: "Meet the Founder · SPARKS Lab" },
      { property: "og:description", content: "Vision, journey and research philosophy behind SPARKS Lab." },
    ],
  }),
  component: FounderPage,
});

const journey = [
  { year: "2024", title: "Founded SPARKS Lab", institution: "NIT Tiruchirappalli", body: "Established the laboratory to advance research in AI and knowledge systems with national-scale ambition." },
  { year: "2022", title: "Distinguished Research Fellow", institution: "International Recognition", body: "Recognized internationally for foundational contributions to explainable AI and neuro-symbolic reasoning." },
  { year: "2020", title: "Associate Professor", institution: "Department of CSE, NIT Trichy", body: "Joined the faculty with a focus on intelligent systems and knowledge representation." },
  { year: "2018", title: "Postdoctoral Research", institution: "Leading International AI Lab", body: "Postdoctoral fellowship focused on multi-modal representation learning." },
  { year: "2017", title: "Ph.D. in Computer Science", institution: "Doctoral Research", body: "Dissertation on neuro-symbolic reasoning and large-scale knowledge representation." },
  { year: "2012", title: "M.Tech in CSE", institution: "Graduate School", body: "Master's degree with research focus on probabilistic graphical models." },
];

const founderStats = [
  { value: 152, suffix: "+", label: "Publications" },
  { value: 4800, suffix: "+", label: "Citations" },
  { value: 38, suffix: "", label: "h-index" },
  { value: 12, suffix: "", label: "Patents" },
  { value: 23, suffix: "", label: "Awards" },
  { value: 18, suffix: "", label: "Years experience" },
  { value: 140, suffix: "+", label: "Students mentored" },
  { value: 11, suffix: "", label: "Industry collabs" },
];

function FounderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Founder & Principal Investigator"
        title={
          <>
            A researcher building{" "}
            <span className="italic font-light text-ink/50">institutional</span> AI.
          </>
        }
        description="The vision, scholarship and philosophy behind SPARKS Lab — and the trajectory that brought it to NIT Tiruchirappalli."
      />

      <section className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-16 pb-24">
        <div className="lg:sticky lg:top-24 self-start">
          <FounderPortrait />
          <Stagger className="mt-6 grid grid-cols-3 gap-3" stagger={0.08}>
            {[["38", "h-index"], ["152+", "publications"], ["12", "patents"]].map(([v, k]) => (
              <StaggerItem key={k}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 30px -12px oklch(0.68 0.165 55 / 0.35)" }}
                  className="rounded-xl bg-surface ring-1 ring-border p-4 cursor-default"
                >
                  <div className="font-display text-xl font-semibold">{v}</div>
                  <div className="eyebrow text-[9px] mt-1">{k}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="space-y-12 text-ink-soft leading-relaxed">
          <Reveal>
            <p className="eyebrow text-accent mb-4">Biography</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-6 leading-[1.05]">
              <RevealChars text="Dr. A. Abdullah" charDelay={0.03} />
            </h2>
            <p className="text-xl text-ink font-light leading-snug text-balance">
              <RevealWords
                text="Associate Professor at the Department of Computer Science & Engineering, NIT Tiruchirappalli, and the founding Principal Investigator of SPARKS Lab. His research sits at the intersection of machine learning, knowledge representation, and the human disciplines that give intelligent systems their meaning."
                wordDelay={0.015}
              />
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-accent mb-4">Research interests</p>
            <div className="flex flex-wrap gap-2">
              {["Neuro-symbolic reasoning", "Knowledge graphs", "Explainable AI", "Multilingual NLP", "Multi-modal learning", "Healthcare AI", "Edge intelligence"].map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.5 }}
                  whileHover={{ y: -2, scale: 1.04, backgroundColor: "oklch(0.68 0.165 55 / 0.12)" }}
                  className="rounded-full bg-surface ring-1 ring-border px-3 py-1.5 text-xs font-medium cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow text-accent mb-4">A message from the founder</p>
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
              className="relative border-l-2 border-accent pl-6 text-lg text-ink font-light italic leading-relaxed"
            >
              <motion.span
                aria-hidden
                className="absolute -left-[2px] top-0 w-[2px] bg-accent/40"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              "We believe the next decade of AI will be defined not by who builds the
              largest models, but by who builds the most trustworthy, interpretable and
              consequential ones. SPARKS Lab exists to do that work, here in India, with
              students who will lead it."
            </motion.blockquote>
          </Reveal>

          <div className="flex flex-wrap gap-4 pt-2">
            <MagneticButton href="/research" primary>Explore research</MagneticButton>
            <MagneticButton href="/contact">Get in touch →</MagneticButton>
          </div>
        </div>
      </section>

      <FounderStatsSection />
      <JourneySection />
    </>
  );
}

function FounderPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 120, damping: 14 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.015 }}
      className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent/25 via-muted to-sage/10 ring-1 ring-border overflow-hidden relative group will-change-transform"
    >
      <div className="absolute inset-0 bg-dotgrid opacity-30" />
      <motion.div
        className="absolute -top-10 -right-10 size-48 rounded-full bg-accent/25 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-12 size-56 rounded-full bg-sage/30 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 group-hover:ring-accent/40 transition-all duration-500" />
      <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-ink/90 to-transparent text-canvas">
        <div className="eyebrow text-accent text-[9px] mb-2">Founder</div>
        <div className="font-display text-3xl font-semibold leading-tight">Dr. A. Abdullah</div>
        <div className="mt-2 text-sm text-canvas/70">Associate Professor · Dept. of CSE, NIT Trichy</div>
      </div>
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
        primary
          ? "bg-ink text-canvas hover:bg-accent"
          : "ring-1 ring-border bg-surface hover:ring-ink/40 text-ink"
      }`}
    >
      {children}
    </motion.a>
  );
}

function FounderStatsSection() {
  return (
    <section className="container-page py-24 border-y border-hairline">
      <Reveal className="max-w-2xl mb-14">
        <p className="eyebrow text-accent mb-4">Founder by the numbers</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-[0.98] text-balance">
          <RevealWords text="Two decades of scholarship, distilled." wordDelay={0.05} />
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {founderStats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { value: number; suffix: string; label: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-surface ring-1 ring-border p-6 overflow-hidden hover:ring-accent/40 transition-all"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,oklch(0.68_0.165_55_/_0.18),transparent_60%)]"
      />
      <div className="relative">
        <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
          <CountUp to={stat.value} />
          <span className="text-accent">{stat.suffix}</span>
        </div>
        <div className="eyebrow text-[10px] mt-3">{stat.label}</div>
      </div>
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.07, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function CountUp({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{Math.round(val).toLocaleString()}</span>;
}

function JourneySection() {
  return (
    <section className="bg-muted/40 py-32 border-b border-hairline relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.68_0.165_55_/_0.08),transparent_60%)]"
      />
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <p className="eyebrow text-accent mb-4">The Journey</p>
          <h2 className="font-display text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.95] text-balance">
            <RevealWords
              text="From a doctoral question to a research institute."
              wordDelay={0.06}
            />
          </h2>
        </Reveal>

        <Timeline />
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 50%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-hairline md:-translate-x-1/2" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent/0 md:-translate-x-1/2 origin-top"
      />
      {/* Scroll progress indicator */}
      <motion.div
        style={{ top: indicatorY, opacity: indicatorOpacity }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="relative -translate-y-1/2">
          <motion.div
            className="size-4 rounded-full bg-accent shadow-[0_0_20px_oklch(0.68_0.165_55_/_0.6)]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 size-4 rounded-full bg-accent/40 blur-md" />
        </div>
      </motion.div>

      <div className="space-y-16 md:space-y-24">
        {journey.map((j, i) => (
          <TimelineItem key={j.year} item={j} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: typeof journey[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });

  return (
    <div className="relative grid md:grid-cols-2 md:gap-12 items-center">
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 md:left-1/2 top-8 z-10 -translate-x-1/2"
      >
        <AnimatePresence>
          {inView && (
            <motion.div
              key="glow"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 size-3 rounded-full bg-accent/50 blur-md"
            />
          )}
        </AnimatePresence>
        <div className={`size-3 rounded-full ring-4 ring-canvas transition-colors duration-500 ${inView ? "bg-accent shadow-[0_0_0_1px_oklch(0.68_0.165_55_/_0.4)]" : "bg-ink/30"}`} />
        <motion.div
          className="absolute inset-0 size-3 rounded-full bg-accent"
          animate={inView ? { scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      {/* Connector */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden md:block absolute top-[2.4rem] h-px bg-gradient-to-r from-accent/60 to-transparent ${
          isLeft
            ? "right-1/2 mr-1.5 w-12 origin-right bg-gradient-to-l from-accent/60 to-transparent"
            : "left-1/2 ml-1.5 w-12 origin-left"
        }`}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pl-12 md:pl-0 ${isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
      >
        <div className={`relative ${isLeft ? "md:ml-auto" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`font-display text-[5rem] font-semibold text-ink/10 leading-none ${isLeft ? "md:text-right" : ""}`}
          >
            {item.year}
          </motion.div>
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl bg-surface ring-1 ring-border p-6 mt-2 shadow-sm hover:shadow-2xl hover:ring-accent/40 transition-all text-left overflow-hidden"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.165_55_/_0.12),transparent_60%)]"
            />
            <div className="relative">
              <div className="eyebrow text-accent text-[9px] mb-2">{item.institution}</div>
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{item.body}</p>
            </div>
            <motion.div
              aria-hidden
              className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 w-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
