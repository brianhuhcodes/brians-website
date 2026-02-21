"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  id: string;
  title: string;
  company: string;
  role: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-20 md:px-8 lg:px-10">
        <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">Timeline</h2>
        <p className="max-w-2xl text-sm text-white/70 md:text-base">
          Career milestones across strategy, product, operations, and growth.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex justify-start ${index === 0 ? "pt-1 md:pt-4" : "pt-10 md:pt-24"} md:gap-10`}
          >
            <div className="sticky top-36 z-40 flex w-full max-w-xs self-start md:max-w-sm md:flex-row md:items-center">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black">
                <div className="h-4 w-4 rounded-full border border-white/30 bg-white/70 p-2" />
              </div>
              <h3 className="hidden pl-20 text-2xl font-bold text-white/60 md:block md:text-4xl">{item.title}</h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-2xl font-bold text-white/70 md:hidden">{item.title}</h3>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-stretch gap-4">
                  <div className="flex w-[20%] shrink-0 items-center justify-center">
                    {item.logoSrc ? (
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt ?? `${item.company} logo`}
                        width={120}
                        height={40}
                        className={`w-auto max-w-full object-contain ${item.logoClassName ?? "h-10"}`}
                      />
                    ) : null}
                  </div>
                  <div className="w-[80%]">
                    <p className="text-lg font-semibold text-white">{item.company}</p>
                    <p className="mt-1 text-sm text-white/80">{item.role}</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-cyan-400 via-white to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
