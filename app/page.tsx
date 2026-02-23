"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { AetherHero } from "@/components/main/hero";
import { GlowingEffect } from "@/components/main/glowing-effect";
import { FeaturesSectionWithHoverEffects } from "@/components/main/features-section-with-hover-effects";
import { Timeline } from "@/components/main/timeline";
import { IconCloud, IconRouteAltLeft, IconTerminal2 } from "@tabler/icons-react";
import { Github, Linkedin, Menu } from "lucide-react";
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

const navigationLinks = [
  { href: "#strengths", label: "View Strengths", submenu: false },
  { href: "#timeline", label: "View Timeline", submenu: false },
  { href: "#sample-work", label: "Sample Decks & Case Work", submenu: false },
  { href: "/resume", label: "View Resume", submenu: false },
];

export default function Home() {
  const basePath = process.env.NODE_ENV === "production" ? "/brians-website" : "";
  const [activeSection, setActiveSection] = useState<string>("home");
  const activeSectionLabel =
    activeSection === "home"
      ? "Home"
      : activeSection === "strengths"
        ? "View Strengths"
        : activeSection === "timeline"
          ? "View Timeline"
          : "Sample Decks & Case Work";

  useEffect(() => {
    const sectionIds = ["home", "strengths", "timeline", "sample-work"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "home";

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-black text-white">
      <header
        className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-black/55 backdrop-blur-md"
        style={{
          fontFamily:
            "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <details className="relative md:hidden">
              <summary className="flex size-8 list-none items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/90">
                <Menu className="h-4 w-4" />
              </summary>
              <div className="absolute left-0 top-10 w-64 rounded-lg border border-white/15 bg-black/90 p-2 shadow-xl">
                <ul className="space-y-2 text-sm">
                  {navigationLinks.map((link, index) => (
                    <li key={`${link.label}-${index}`} className="rounded-md px-2 py-1.5">
                      <a
                        href={link.href.startsWith("/") ? `${basePath}${link.href}` : link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        className={`block transition hover:text-white ${
                          link.href.startsWith("#") && activeSection === link.href.slice(1)
                            ? "text-white"
                            : "text-white/80"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <a href="#" className="mr-5 text-sm font-semibold tracking-wide text-white/90">
              Brian Huh
            </a>
            <a
              href="#"
              onClick={(event) => handleNavClick(event, "#home")}
              className={`rounded-md px-2 py-1.5 text-sm transition hover:bg-white/10 hover:text-white ${
                activeSection === "home" ? "bg-white/10 text-white" : "text-white/80"
              }`}
            >
              Home
            </a>
            <nav className="max-md:hidden">
              <ul className="flex items-center gap-1 text-sm">
                {navigationLinks.map((link, index) => (
                  <li key={`${link.label}-${index}`} className="group relative">
                    {"submenu" in link && link.submenu ? (
                      <>
                        <button className="rounded-md px-2 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white">
                          {link.label}
                        </button>
                        <div className="invisible absolute left-0 top-10 z-50 min-w-[360px] rounded-lg border border-white/15 bg-black/95 p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                          <ul
                            className={
                              link.type === "description" ? "grid gap-2" : "grid grid-cols-2 gap-2"
                            }
                          >
                            {link.items.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href.startsWith("/") ? `${basePath}${item.href}` : item.href}
                                  target={item.href.startsWith("http") ? "_blank" : undefined}
                                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="block rounded-md p-2 transition hover:bg-white/10"
                                >
                                  {link.type === "description" ? (
                                    <>
                                      <div className="text-sm font-medium">{item.label}</div>
                                      {"description" in item ? (
                                        <p className="mt-1 text-xs text-white/65">{item.description}</p>
                                      ) : null}
                                    </>
                                  ) : (
                                    <div className="text-sm font-medium">{item.label}</div>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <a
                        href={link.href.startsWith("/") ? `${basePath}${link.href}` : link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        className={`rounded-md px-2 py-1.5 transition hover:bg-white/10 hover:text-white ${
                          link.href.startsWith("#") && activeSection === link.href.slice(1)
                            ? "bg-white/10 text-white"
                            : "text-white/80"
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="max-md:text-xs text-white/70 md:hidden">{activeSectionLabel}</span>
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
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <AetherHero
          className="z-20"
          layer="boxes"
          title="Brian Huh"
          subtitle="Product Manager and problem-solver"
          ctaLabel="Discover More"
          ctaHref="#strengths"
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
        className="scroll-mt-24 px-6 pb-24 pt-10 sm:px-10 lg:px-16"
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

      <section id="timeline" className="scroll-mt-24 pb-24">
        <Timeline
          data={timelineData.map((item) => ({
            ...item,
            logoSrc: item.logoSrc ? `${basePath}${item.logoSrc}` : item.logoSrc,
          }))}
        />
      </section>

      <section id="sample-work" className="scroll-mt-24 px-6 pb-24 sm:px-10 lg:px-16">
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
