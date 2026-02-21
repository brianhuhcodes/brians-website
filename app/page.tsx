import { AetherHero } from "@/components/main/hero";
import { GlowingEffect } from "@/components/main/glowing-effect";
import Image from "next/image";

const strengths = [
  {
    title: "Product Strategy",
    description:
      "I turn ambiguity into clear plans that align user value, business goals, and execution priorities.",
  },
  {
    title: "Execution",
    description:
      "I drive work from idea to launch with speed, accountability, and a strong focus on outcomes.",
  },
  {
    title: "Cross-Functional Leadership",
    description:
      "I align engineering, design, and stakeholders to reduce friction and keep teams moving forward.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "I use metrics and feedback loops to validate direction, prioritize effectively, and iterate with confidence.",
  },
  {
    title: "Communication",
    description:
      "I simplify complex ideas into clear narratives for leadership, collaborators, and customers.",
  },
  {
    title: "Ownership",
    description:
      "I take end-to-end responsibility and make sure shipped work creates measurable impact.",
  },
];

export default function Home() {
  const basePath = process.env.NODE_ENV === "production" ? "/brians-website" : "";

  return (
    <main className="bg-black text-white">
      <section className="relative">
        <AetherHero
          className="z-20"
          layer="boxes"
          title="Brian Huh"
          subtitle="Product Manager and problem-solver"
          ctaLabel="View Strengths"
          ctaHref="#strengths"
          secondaryCtaLabel="Contact"
          secondaryCtaHref="#"
        />
        <div className="pointer-events-none absolute bottom-0 right-0 z-40 block sm:right-2 lg:right-4 xl:right-12">
          <Image
            src={`${basePath}/bhuh2-3.png`}
            alt="Brian Huh"
            width={510}
            height={690}
            className="h-auto w-[48vw] min-w-[220px] max-w-[320px] object-contain object-bottom sm:w-[42vw] sm:max-w-[380px] lg:w-[clamp(420px,36vw,680px)] lg:max-w-[680px]"
            priority
          />
        </div>
        <AetherHero
          className="pointer-events-none z-50"
          layer="lines"
          showContent={false}
          showOverlay={false}
          absoluteFill
        />
      </section>

      <section
        id="strengths"
        className="px-6 pb-24 pt-10 sm:px-10 lg:px-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Strengths</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            One continuous page. Scroll down to see the strengths that define how I build and lead.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item) => (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
              >
                <GlowingEffect
                  blur={0}
                  spread={46}
                  proximity={90}
                  inactiveZone={0.3}
                  borderWidth={2}
                  disabled={false}
                  alwaysAnimate
                />
                <h3 className="relative text-xl font-semibold">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-white/80">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
