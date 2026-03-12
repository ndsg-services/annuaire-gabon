import Link from "next/link";
import { Suspense } from "react";
import { getCompanies } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { CompanyCard } from "@/components/company-card";
import { SearchBar } from "@/components/search-bar";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function countValues(
  list: Array<Record<string, string | null>>,
  field: string
): Array<[string, number]> {
  const counts: Record<string, number> = {};

  list.forEach((item) => {
    const value = item[field];
    if (!value) return;

    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;
  const companies = await getCompanies(q);

  const { data: sectorStats } = await supabase
    .from("companies")
    .select("sector")
    .not("sector", "is", null);

  const { data: cityStats } = await supabase
    .from("companies")
    .select("city")
    .not("city", "is", null);

  const topSectors = countValues(
    (sectorStats ?? []) as Array<Record<string, string | null>>,
    "sector"
  );

  const topCities = countValues(
    (cityStats ?? []) as Array<Record<string, string | null>>,
    "city"
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Annuaire des entreprises du Gabon
            </h1>
           
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Recherchez une entreprise, explorez par secteur, ville ou dirigeant.
            </p>
            <p className="mt-2 text-sm">
  <Link
    href="/a-propos"
    className="text-emerald-600 hover:underline dark:text-emerald-400"
  >
    À propos de ce projet
  </Link>
</p>
            <div className="mt-6">
              <Suspense fallback={<SearchBarFallback />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Secteurs populaires
              </h2>

              <ul className="mt-4 space-y-2">
                {topSectors.map(([sector, count]) => (
                  <li key={sector}>
                    <Link
                      href={`/secteur/${toSlug(sector)}`}
                      className="text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      {sector}
                    </Link>{" "}
                    <span className="text-sm text-zinc-500">({count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Villes
              </h2>

              <ul className="mt-4 space-y-2">
                {topCities.map(([city, count]) => (
                  <li key={city}>
                    <Link
                      href={`/ville/${toSlug(city)}`}
                      className="text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      {city}
                    </Link>{" "}
                    <span className="text-sm text-zinc-500">({count})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Entreprises
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {companies.length} résultat(s)
          </p>
        </div>

        {companies.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {q
              ? "Aucune entreprise trouvée pour cette recherche."
              : "Aucune entreprise enregistrée."}
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-1">
            {companies.map((company) => (
              <li key={company.id}>
                <CompanyCard company={company} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function SearchBarFallback() {
  return (
    <div className="flex max-w-xl gap-2">
      <div className="h-12 flex-1 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-12 w-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}