import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyBySlug } from "@/lib/queries";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const infoItems = [
    { label: "Secteur", value: company.sector },
    { label: "Ville", value: company.city },
    { label: "Statut", value: company.status },
    { label: "RCCM", value: company.rccm },
    { label: "NIF", value: company.nif },
    { label: "Créée le", value: formatDate(company.founded_at) },
    { label: "Téléphone", value: company.phone },
    { label: "Email", value: company.email },
    { label: "Adresse", value: company.address },
  ].filter((item) => item.value);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            ← Retour à l&apos;annuaire
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <article className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              {company.name}
            </h1>

            {company.description && (
              <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                {company.description}
              </p>
            )}

            <dl className="mt-6 grid gap-3 sm:grid-cols-1">
              {infoItems.map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="min-w-[7rem] text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {label}
                  </dt>
                  <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {company.website && (
              <p className="mt-6">
                <a
                  href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Site web →
                </a>
              </p>
            )}

            {(company.source_name || company.source_url) && (
              <p className="mt-4 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                Source :{" "}
                {company.source_url ? (
                  <a
                    href={company.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    {company.source_name ?? company.source_url}
                  </a>
                ) : (
                  company.source_name
                )}
              </p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
