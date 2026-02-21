import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  body?: string;
  website?: string;
  startedAt?: number;
};

type RateLimitEntry = {
  attempts: number[];
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const MIN_FORM_FILL_MS = 4000;
const limiter = new Map<string, RateLimitEntry>();

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = limiter.get(ip) ?? { attempts: [] };
  current.attempts = current.attempts.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (current.attempts.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    limiter.set(ip, current);
    return true;
  }

  current.attempts.push(now);
  limiter.set(ip, current);
  return false;
}

async function sendWithResend({
  to,
  from,
  subject,
  html,
  replyTo,
}: {
  to: string;
  from: string;
  subject: string;
  html: string;
  replyTo: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const payload = await response.text().catch(() => "");
    throw new Error(`Resend API failed: ${payload || response.statusText}`);
  }
}

export async function POST(request: NextRequest) {
  let parsed: ContactBody;
  try {
    parsed = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = String(parsed.name ?? "").trim();
  const email = String(parsed.email ?? "").trim();
  const body = String(parsed.body ?? "").trim();
  const website = String(parsed.website ?? "").trim();
  const startedAt = Number(parsed.startedAt ?? 0);
  const now = Date.now();

  if (website.length > 0) {
    return NextResponse.json({ message: "Blocked." }, { status: 400 });
  }

  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FORM_FILL_MS) {
    return NextResponse.json({ message: "Please wait a moment and try again." }, { status: 400 });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ message: "Please enter a valid name." }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }

  if (body.length < 10 || body.length > 3000) {
    return NextResponse.json({ message: "Message must be between 10 and 3000 characters." }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>";

  if (!to || !process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { message: "Contact form is not configured on the server yet." },
      { status: 500 },
    );
  }

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(body).replace(/\n/g, "<br />");
    await sendWithResend({
      to,
      from,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${escapedMessage}</p>`,
    });
  } catch (error) {
    console.error("Contact submit failed", error);
    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Unable to send right now. Please try again later.";
    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
