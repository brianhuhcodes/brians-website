"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  alwaysAnimate?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
    alwaysAnimate = false,
    baseIntensity = 0.72,
    hoverIntensity = 1,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      const element = containerRef.current;
      if (!element) return;
      const parent = element.parentElement;
      if (!parent) return;

      const onEnter = () => element.style.setProperty("--intensity", String(hoverIntensity));
      const onLeave = () => element.style.setProperty("--intensity", String(baseIntensity));

      element.style.setProperty("--intensity", String(baseIntensity));
      element.style.setProperty("--hover", "0");
      const onHoverEnter = () => {
        element.style.setProperty("--intensity", String(hoverIntensity));
        element.style.setProperty("--hover", "1");
      };
      const onHoverLeave = () => {
        element.style.setProperty("--intensity", String(baseIntensity));
        element.style.setProperty("--hover", "0");
      };
      parent.addEventListener("pointerenter", onEnter);
      parent.addEventListener("pointerleave", onLeave);
      parent.addEventListener("mouseenter", onHoverEnter);
      parent.addEventListener("mouseleave", onHoverLeave);

      return () => {
        parent.removeEventListener("pointerenter", onEnter);
        parent.removeEventListener("pointerleave", onLeave);
        parent.removeEventListener("mouseenter", onHoverEnter);
        parent.removeEventListener("mouseleave", onHoverLeave);
      };
    }, [baseIntensity, hoverIntensity]);

    useEffect(() => {
      if (alwaysAnimate && containerRef.current) {
        const element = containerRef.current;
        const startOffset = Math.random() * 360;
        element.style.setProperty("--active", "1");

        const tick = (now: number) => {
          const angle = (startOffset + now * 0.039) % 360;
          element.style.setProperty("--start", String(angle));
          animationFrameRef.current = requestAnimationFrame(tick);
        };

        animationFrameRef.current = requestAnimationFrame(tick);

        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        };
      }

      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled, alwaysAnimate]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--intensity": String(baseIntensity),
              "--hover": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)),
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className="absolute inset-0 rounded-[inherit] transition-opacity duration-200"
            style={
              {
                padding: "var(--glowingeffect-border-width)",
                background:
                  "linear-gradient(120deg, #dd7bbb 0%, #d79f1e 30%, #5a922c 65%, #4c7894 100%)",
                backgroundAttachment: "fixed",
                opacity: "calc(var(--hover) * var(--intensity))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                filter: "drop-shadow(0 0 12px rgba(221,123,187,0.45))",
              } as CSSProperties
            }
          />
          <div
            className="absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={
              {
                padding: "var(--glowingeffect-border-width)",
                background: `conic-gradient(
                  from calc(var(--start) * 1deg),
                  transparent 0deg,
                  transparent calc(360deg - var(--spread) * 1deg),
                  #dd7bbb calc(360deg - var(--spread) * 1deg),
                  #d79f1e calc(360deg - var(--spread) * 0.7deg),
                  #5a922c calc(360deg - var(--spread) * 0.4deg),
                  #4c7894 calc(360deg - var(--spread) * 0.15deg),
                  transparent 360deg
                )`,
                opacity: "calc(var(--active) * var(--intensity) * (1 - var(--hover)))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                filter: "drop-shadow(0 0 10px rgba(221,123,187,0.35))",
              } as CSSProperties
            }
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
