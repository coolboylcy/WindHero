"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchTerms, categoryInfo } from "@/lib/glossary/data";

export function GlossarySearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTerms(query).slice(0, 12), [query]);

  return (
    <div className="relative max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索中文术语 / 英文 / 缩写（如：信风、apparent wind、MOB）"
          className="w-full rounded-sm border border-line bg-paper py-3 pl-11 pr-10 text-[0.95rem] text-ink placeholder-mist focus:border-sea-deep focus:outline-none"
          aria-label="搜索词典"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-ink"
            aria-label="清空"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {query.trim() ? (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-[60vh] overflow-y-auto rounded-sm border border-line/70 bg-paper shadow-sm">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[0.86rem] text-mist">
              没找到。试着用中文、英文或缩写搜，例如「视风」「AW」。
            </p>
          ) : (
            <ul>
              {results.map((t) => (
                <li key={t.slug} className="border-b border-line/40 last:border-b-0">
                  <Link
                    href={`/glossary/${t.slug}`}
                    className="block px-4 py-3 transition-colors hover:bg-paper-soft/60"
                    onClick={() => setQuery("")}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display text-base text-ink">{t.zh}</span>
                      <span className="font-mono text-[0.72rem] text-sea-deep">
                        {t.en}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.82rem] leading-[1.6] text-ink-soft">
                      {t.short}
                    </p>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-mist">
                      {categoryInfo[t.category].label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
