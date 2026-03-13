import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

function slugToSector(slug: string) {
  const value = slug.replace(/-/g, " ").toLowerCase();

  const mapping: Record<string, string> = {
    banque: "Banque",
    telecom: "Télécom",
    transport: "Transport",
    mines: "Mines",
    distribution: "Distribution",
    industrie: "Industrie",
    energie: "Énergie",
    aviation: "Aviation",
    it: "IT",
    services: "Services",
    fintech: "Fintech",
  };

  return mapping[value] || value;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = slugToSector(slug);

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .eq("sector", sector)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          ← Retour à l&apos;annuaire
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Entreprises du secteur {sector}
      </h1>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {companies?.length ?? 0} entreprise(s)
      </p>

      <div className="mt-8 grid gap-4">
        {companies?.map((company) => (
          <Link
            key={company.id}
            href={`/entreprise/${company.slug}`}
            className="block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800"
          >
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
              {company.name}
            </h2>

            {(company.city || company.dirigeant) && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {[company.city, company.dirigeant && `Dirigeant : ${company.dirigeant}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            {company.description && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                {company.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}