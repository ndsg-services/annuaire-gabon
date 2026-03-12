import Link from "next/link";
import type { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800">
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
        <Link
          href={`/entreprise/${company.slug}`}
          className="hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
        >
          {company.name}
        </Link>
      </h2>

      {(company.sector || company.city) && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {company.sector && (
            <Link
              href={`/secteur/${toSlug(company.sector)}`}
              className="hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
            >
              {company.sector}
            </Link>
          )}

          {company.sector && company.city && " · "}

          {company.city && (
            <Link
              href={`/ville/${toSlug(company.city)}`}
              className="hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
            >
              {company.city}
            </Link>
          )}
        </p>
      )}

      {company.dirigeant && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="font-medium">Dirigeant :</span> {company.dirigeant}
        </p>
      )}

      {company.description && (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
          {company.description}
        </p>
      )}
    </article>
  );
}