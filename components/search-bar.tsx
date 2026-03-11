"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = value.trim();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      router.push(q ? `/?${params.toString()}` : "/");
    },
    [router, value]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Rechercher une entreprise..."
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          aria-label="Rechercher par nom d'entreprise"
        />
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}
