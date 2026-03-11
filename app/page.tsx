import { Suspense } from "react";
import { getCompanies } from "@/lib/queries";
import { CompanyCard } from "@/components/company-card";
import { SearchBar } from "@/components/search-bar";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;
  const companies = await getCompanies(q);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Annuaire des entreprises du Gabon
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Recherchez une entreprise par son nom
          </p>
          <div className="mt-6">
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
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
