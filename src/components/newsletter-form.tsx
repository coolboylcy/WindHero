"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "ok" | "error";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false, error: "Unknown response" }));

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "出了点问题，请稍后再试。");
        return;
      }

      setStatus("ok");
      setMessage("你已经登上船员名册，请留意邮箱。");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("网络不通，请稍后再试。");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center border border-white/15 bg-white/[0.02] transition-colors focus-within:border-gold/70">
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="captain@example.com"
          className="h-12 flex-1 bg-transparent px-4 text-sm text-sail placeholder:text-mist/40 focus:outline-none"
          aria-label="邮箱地址"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex h-12 items-center gap-2 border-l border-white/10 px-4 text-[0.78rem] tracking-[0.32em] text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "ok" ? (
            <Check className="h-4 w-4" />
          ) : (
            <>
              登船
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
      <p
        className={
          "mt-2 min-h-[1.25rem] text-xs " +
          (status === "error"
            ? "text-rust"
            : status === "ok"
              ? "text-gold"
              : "text-mist/50")
        }
        aria-live="polite"
      >
        {message ?? "我们尊重你的邮箱，一键即可退订。"}
      </p>
    </form>
  );
}
