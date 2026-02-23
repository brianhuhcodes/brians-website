import { AetherHero } from "@/components/main/hero";
import { GlowingEffect } from "@/components/main/glowing-effect";
import { FeaturesSectionWithHoverEffects } from "@/components/main/features-section-with-hover-effects";
import { Timeline } from "@/components/main/timeline";
import { IconCloud, IconRouteAltLeft, IconTerminal2 } from "@tabler/icons-react";
import { Github, Linkedin } from "lucide-react";
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

const timelineData = [
  {
    id: "wipro-2025",
    title: "2025",
    company: "Wipro",
    role: "Sector Growth & Enablement Lead (Chief of Staff to VP)",
    description:
      "Led GTM strategy, sales enablement, executive strategy reviews, and partnership development across technology platform offerings.",
    logoSrc: "/logos/wipro.png",
    logoAlt: "Wipro logo",
    logoClassName: "h-20",
  },
  {
    id: "tepper-2023",
    title: "2023",
    company: "Carnegie Mellon University (Tepper School of Business)",
    role: "MBA - Strategy, Business Technologies, Operations Research",
    description:
      "Completed MBA while building strategy and product leadership skills applied across consulting and startup work.",
    logoSrc: "/logos/tepper.png",
    logoAlt: "Tepper logo",
    logoClassName: "h-20",
  },
  {
    id: "tomamor-2017-2023",
    title: "2017-2023",
    company: "Tomamor Photo",
    role: "Product Lead (Founder)",
    description:
      "Launched and scaled a photo processing startup, leading product lifecycle, user research, and data-driven growth through SEO and performance marketing.",
    logoSrc: "/logos/tomamor.png",
    logoAlt: "Tomamor logo",
    logoClassName: "h-20",
  },
  {
    id: "ibm-2022",
    title: "2022",
    company: "IBM",
    role: "Strategy Consultant - AI Applications",
    description:
      "Developed AI/ML SaaS roadmap and conducted market due diligence to support product positioning and sales engagement.",
    logoSrc: "/logos/ibm.svg",
    logoAlt: "IBM logo",
    logoClassName: "h-10",
  },
  {
    id: "ally-2021",
    title: "2021",
    company: "Ally Coffee (Grupo Montesanto Tavares)",
    role: "Account Manager / Lead Specialist Global",
    description:
      "Owned account growth, drove GTM expansion in Asia, and built analytics-enabled lead and conversion workflows.",
    logoSrc: "/logos/ally-coffee.png",
    logoAlt: "Ally Coffee logo",
    logoClassName: "h-20",
  },
  {
    id: "ecafe-2014",
    title: "2014",
    company: "E-Cafe Exportadora de Cafe de Chiapas",
    role: "Director of Marketing",
    description:
      "Led cross-functional operations and growth strategy, improving efficiency and expanding the customer base.",
    logoSrc: "/logos/ecafe-chiapas.png",
    logoAlt: "E-cafe Chiapas logo",
    logoClassName: "h-20",
  },
];

const sampleWorkFeatures = [
  {
    title: "Unmanaged Accounts Turnover Plan",
    description: "Commercial growth strategy and execution framework.",
    icon: <IconTerminal2 />,
    href: "/Sample%20Work/Drive%20Sales%20of%20Unmanaged%20Accounts%20-%20Brian%20Huh.pdf",
  },
  {
    title: "Data Center Industry Marketing - Market Research",
    description: "Positioning and go-to-market planning case work.",
    icon: <IconCloud />,
    href: "/Sample%20Work/Industry%20Marketing%20Manager%20Brian%20Huh.pdf",
  },
  {
    title: "Turkey Legs EBITDA Growth Plan",
    description: "Profitability growth model and operating plan.",
    icon: <IconRouteAltLeft />,
    href: "/Sample%20Work/Turkey%20Legs%20EBITDA%20Growth%20Plan.pdf",
  },
];

export default function Home() {
  const basePath = process.env.NODE_ENV === "production" ? "/brians-website" : "";

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute right-6 top-6 z-[60] flex items-center gap-3 sm:right-8 sm:top-8">
          <a
            href="https://www.linkedin.com/in/brianhuh0522"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-1 text-white/90 transition hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/brianhuhcodes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-1 text-white/90 transition hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <AetherHero
          className="z-20"
          layer="boxes"
          title="Brian Huh"
          subtitle="Product Manager and problem-solver"
          ctaLabel="View Strengths"
          ctaHref="#strengths"
          secondaryCtaLabel="View Timeline"
          secondaryCtaHref="#timeline"
          tertiaryCtaLabel="Sample Decks & Case Work"
          tertiaryCtaHref="#sample-work"
          quaternaryCtaLabel="View Resume"
          quaternaryCtaHref={`${basePath}/resume`}
        />
        <div className="pointer-events-none absolute bottom-0 right-0 z-40 block sm:right-2 lg:right-4 xl:right-12">
          <Image
            src={`${basePath}/profile-neon.png`}
            alt="Brian Huh"
            width={1200}
            height={1536}
            className="h-auto w-[104vw] min-w-[480px] max-w-[700px] translate-x-[22%] object-contain object-bottom sm:w-[92vw] sm:max-w-[840px] sm:translate-x-[18%] lg:w-[clamp(920px,76vw,1520px)] lg:max-w-[1520px] lg:translate-x-[35%]"
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
          <p className="mt-3 max-w-2xl text-white/80">Strengths that define how I build and lead.</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
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

      <section id="timeline" className="pb-24">
        <Timeline
          data={timelineData.map((item) => ({
            ...item,
            logoSrc: item.logoSrc ? `${basePath}${item.logoSrc}` : item.logoSrc,
          }))}
        />
      </section>

      <section id="sample-work" className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Sample Decks &amp; Case Work</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Click any feature card below to open the corresponding PDF file.
          </p>
          <FeaturesSectionWithHoverEffects
            features={sampleWorkFeatures.map((item) => ({
              ...item,
              href: `${basePath}${item.href}`,
            }))}
          />
        </div>
      </section>
    </main>
  );
}
