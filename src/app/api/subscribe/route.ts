import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { email, source } = (body ?? {}) as {
    email?: string;
    source?: string;
  };

  if (!email || typeof email !== "string" || !emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  const normalized = email.trim().toLowerCase();
  const safeSource =
    typeof source === "string" && source.length <= 64 ? source : "site";

  const supabase =
    createSupabaseServiceClient() ?? (await createSupabaseServerClient());

  if (!supabase) {
    // Supabase not configured yet — accept gracefully so the UI still
    // works locally without env vars. The submission is discarded.
    console.warn(
      "[subscribe] Supabase env not configured; skipping insert for",
      normalized
    );
    return NextResponse.json({ ok: true, pending: true });
  }

  const { error } = await supabase
    .from("subscribers")
    .upsert(
      { email: normalized, source: safeSource },
      { onConflict: "email", ignoreDuplicates: false }
    );

  if (error) {
    console.error("[subscribe] supabase error", error);
    return NextResponse.json(
      { ok: false, error: "Could not record your address. Try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
