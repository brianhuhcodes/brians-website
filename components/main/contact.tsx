"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useMemo(() => Date.now(), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      body: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      startedAt: Number(formData.get("startedAt") ?? startedAt),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send your message.");
      }

      setState("success");
      setMessage("Message sent. I will get back to you soon.");
      form.reset();
      return;
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your message.");
    }
  }

  return (
    <section id="contact" className="px-6 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">Contact Me</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          Email is intentionally hidden to reduce scraping and spam. Use this form to reach me directly.
        </p>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <input type="hidden" name="startedAt" value={startedAt} />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">Name</span>
            <input
              required
              name="name"
              maxLength={120}
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none ring-white/0 transition focus:border-white/40 focus:ring-2"
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">Email</span>
            <input
              required
              type="email"
              name="email"
              maxLength={200}
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none ring-white/0 transition focus:border-white/40 focus:ring-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">Message</span>
            <textarea
              required
              name="message"
              rows={6}
              maxLength={3000}
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none ring-white/0 transition focus:border-white/40 focus:ring-2"
              placeholder="How can I help?"
            />
          </label>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "submitting" ? "Sending..." : "Send Message"}
            </button>
            {message && (
              <p className={state === "error" ? "text-sm text-red-300" : "text-sm text-emerald-300"}>{message}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
