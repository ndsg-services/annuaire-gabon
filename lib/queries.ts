import { supabase } from "./supabase";
import type { Company } from "@/types/company";

export async function getCompanies(search?: string): Promise<Company[]> {
  let query = supabase
  .from("companies")
  .select("*")
  .eq("is_published", true)
    .order("name", { ascending: true });

  if (search && search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching companies:", error);
    return [];
  }

  return (data ?? []) as Company[];
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // not found
    }
    console.error("Error fetching company:", error);
    return null;
  }

  return data as Company;
}

function slugifyDirigeant(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

export async function getCompaniesByDirigeantSlug(
  slug: string
): Promise<{ dirigeantName: string; companies: Company[] } | null> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .not("dirigeant", "is", null)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching companies by dirigeant:", error);
    return null;
  }

  const companies = (data ?? []) as Company[];
  const match = companies.find(
    (c) => c.dirigeant && slugifyDirigeant(c.dirigeant) === slug
  );
  if (!match?.dirigeant) return null;

  const dirigeantName = match.dirigeant;
  const filtered = companies.filter(
    (c) => c.dirigeant && slugifyDirigeant(c.dirigeant) === slug
  );

  return { dirigeantName, companies: filtered };
}
