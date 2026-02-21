"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function ResumePage() {
  const basePath = process.env.NODE_ENV === "production" ? "/brians-website" : "";
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const resumePath = `${basePath}/assets/bh_resume_2026_secure.pdf`;
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "ready">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [debugMessage, setDebugMessage] = useState("");
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string>("");
  const scriptLoadedRef = useRef(false);

  const renderTurnstile = () => {
    if (!widgetRef.current || !window.turnstile || !turnstileSiteKey || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (newToken: string) => {
        setToken(newToken);
        setStatus("ready");
        setMessage("");
        setDebugMessage("");
      },
      "expired-callback": () => {
        setToken("");
        setStatus("idle");
        setMessage("Captcha expired. Please verify again.");
      },
      "error-callback": () => {
        setToken("");
        setStatus("error");
        setMessage("Captcha failed to load. Refresh and try again.");
        setDebugMessage("Turnstile reported a widget error. Most common cause: hostname is not allowed.");
      },
    });
  };

  useEffect(() => {
    if (!turnstileSiteKey) {
      setDebugMessage("NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing at build time.");
      return;
    }
    renderTurnstile();
    const timeout = window.setTimeout(() => {
      if (!scriptLoadedRef.current) {
        setDebugMessage("Turnstile script did not load. Check network/privacy extensions.");
        return;
      }
      if (!widgetIdRef.current) {
        setDebugMessage(
          "Turnstile widget did not render. Check Cloudflare allowed hostnames (include localhost and deployed domain).",
        );
      }
    }, 2500);
    return () => window.clearTimeout(timeout);
  }, [turnstileSiteKey]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    if (!turnstileSiteKey) {
      setStatus("error");
      setMessage("Captcha site key is not configured.");
      return;
    }

    if (!token) {
      setStatus("error");
      setMessage("Please complete the captcha first.");
      return;
    }

    window.open(resumePath, "_blank", "noopener,noreferrer");
    setToken("");
    setStatus("idle");
    setMessage("Resume opened in a new tab.");
    if (window.turnstile) window.turnstile.reset(widgetIdRef.current);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white sm:px-10 lg:px-16">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          scriptLoadedRef.current = true;
          renderTurnstile();
        }}
        onError={() => {
          setStatus("error");
          setMessage("Captcha script failed to load.");
          setDebugMessage("Script request failed. Check connection or blocking extensions.");
        }}
      />
      <section className="mx-auto max-w-xl rounded-2xl border border-white/20 bg-white/5 p-8">
        <h1 className="text-3xl font-semibold">Resume Access</h1>
        <p className="mt-3 text-white/80">
          Resume download is gated to reduce scraping. Complete the captcha to continue.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div ref={widgetRef} />
          {debugMessage ? (
            <p className="text-xs leading-5 text-amber-300/90">
              Debug: {debugMessage}
            </p>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "submitting" || !token}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Checking..." : "Open Resume"}
            </button>
            {message ? (
              <p className={`text-sm ${status === "error" ? "text-red-300" : "text-emerald-300"}`}>{message}</p>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}
