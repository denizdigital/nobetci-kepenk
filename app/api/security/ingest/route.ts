import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appendSecurityEvent } from "@/lib/security/store";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

async function parseBody(request: NextRequest): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  const raw = await request.text();

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    const params = new URLSearchParams(raw);
    return Object.fromEntries(params.entries());
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await parseBody(request);
    const url = new URL(request.url);

    const type = String(body.type || "page_view") as
      | "page_view"
      | "page_leave"
      | "cta_click";

    const eventPath =
      typeof body.path === "string" && body.path.length > 0
        ? body.path
        : url.pathname;

    const eventSearch =
      typeof body.search === "string" && body.search.length > 0
        ? body.search
        : null;

    await appendSecurityEvent({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      type,
      visitorId: request.cookies.get("vid")?.value ?? null,
      ip: getClientIp(request),
      forwardedFor: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent") || "unknown",
      referer: request.headers.get("referer"),
      path: eventPath,
      search: eventSearch,
      method: request.method,
      payload: body,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("security ingest error:", error);
    return NextResponse.json(
      { ok: false, error: "ingest_failed" },
      { status: 500 }
    );
  }
}