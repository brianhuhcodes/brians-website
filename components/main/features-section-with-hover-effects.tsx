import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
}

export function FeaturesSectionWithHoverEffects({ features }: { features?: FeatureItem[] }) {
  const defaultFeatures: FeatureItem[] = [
    {
      title: "Built for developers",
      description: "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description: "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Pricing like no other",
      description: "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description: "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description: "If you donot like EveryAI, we will convince you to like us.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <IconHeart />,
    },
  ];

  const data = features ?? defaultFeatures;

  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-3">
      {data.map((feature, index) => (
        <Feature key={`${feature.title}-${index}`} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  href,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
  href?: string;
}) => {
  const card = (
    <div
      className={cn(
        "group/feature relative flex h-full w-full flex-col rounded-2xl border border-white/20 bg-white/5 py-8 backdrop-blur-sm"
      )}
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-t from-white/10 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      <div className="relative z-10 mb-4 px-10 text-white/70">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-white/30 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-400" />
        <span className="inline-block text-white transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-white/70">{description}</p>
      {href ? (
        <p className="pointer-events-none absolute bottom-4 right-6 z-10 text-xs font-medium text-blue-300 opacity-0 transition duration-200 group-hover/feature:opacity-100">
          Click to open file
        </p>
      ) : null}
    </div>
  );

  if (!href) return card;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
  );
};
