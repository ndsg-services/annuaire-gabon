import Link from "next/link";
import type { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/entreprise/${company.slug}`}
      className="block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800"
    >
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
        {company.name}
      </h2>
      {(company.sector || company.city) && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {[company.sector, company.city].filter(Boolean).join(" · ")}
        </p>
      )}
      {company.description && (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
          {company.description}
        </p>
      )}
    </Link>
  );
}
