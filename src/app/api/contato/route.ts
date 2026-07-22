import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { ContactSubmissionError, handleContactSubmission } from "@/services/contact-service";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ message: "Contato enviado com sucesso." });
    }

    const rateLimit = checkRateLimit(request);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente." },
        { status: 429 },
      );
    }

    await handleContactSubmission(parsed.data);

    return NextResponse.json({ message: "Contato enviado com sucesso." });
  } catch (error) {
    if (error instanceof ContactSubmissionError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json({ message: "Não foi possível enviar o contato agora." }, { status: 500 });
  }
}

function checkRateLimit(request: Request) {
  const key = getClientIp(request);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  pruneRateLimitStore(now);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true };
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "local";
}

function pruneRateLimitStore(now: number) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}
