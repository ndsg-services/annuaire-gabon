import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AboutPage() {
  const { count: companyCount } = await supabase
    .from("companies")
    .select("*", { count: "exact", head: true });

  const { data: sectors } = await supabase
    .from("companies")
    .select("sector")
    .not("sector", "is", null);

  const { data: cities } = await supabase
    .from("companies")
    .select("city")
    .not("city", "is", null);

  const uniqueSectors = new Set(
    (sectors ?? []).map((item) => item.sector).filter(Boolean)
  );

  const uniqueCities = new Set(
    (cities ?? []).map((item) => item.city).filter(Boolean)
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            ← Retour à l&apos;annuaire
          </Link>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            Projet pilote · Gabon
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            À propos de l’annuaire
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Cet annuaire a pour objectif de rendre les informations sur les
            entreprises gabonaises plus accessibles, plus lisibles et plus
            faciles à explorer.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Il s’agit d’un pilote centré sur le Gabon, avec l’ambition de
            construire une base de données claire, structurée et utile pour
            découvrir, consulter et vérifier des entreprises.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {companyCount ?? 0}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Entreprises
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {uniqueSectors.size}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Secteurs
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {uniqueCities.size}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Villes
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🔎</div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Rechercher
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Trouver une entreprise à partir de son nom et accéder rapidement à
              sa fiche.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🧭</div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Explorer
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Naviguer par secteur, ville ou dirigeant pour mieux comprendre le
              tissu économique local.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">🏢</div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Consulter
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Accéder à des fiches entreprises avec des informations
              progressivement enrichies.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Ce que vous pouvez faire
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <li>• Rechercher une entreprise par son nom</li>
              <li>• Explorer les entreprises par secteur</li>
              <li>• Explorer les entreprises par ville</li>
              <li>• Voir les entreprises associées à un dirigeant</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              État actuel du projet
            </h2>

            <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                Cette version est une <span className="font-medium">phase pilote</span>.
              </p>
              <p>
                Les informations proviennent de différentes sources publiques ou
                de recherches manuelles et sont progressivement enrichies.
              </p>
              <p>
                L’objectif est de construire un registre d’entreprises
                gabonaises plus clair, plus navigable et plus utile.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Vision
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            À terme, ce projet vise à devenir une référence simple et moderne
            pour la recherche et la consultation d’informations sur les
            entreprises au Gabon, avec une approche inspirée des grands
            registres d’entreprises.
          </p>
        </section>
      </div>
    </main>
  );
}