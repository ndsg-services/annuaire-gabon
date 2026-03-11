import { supabase } from "./supabase";
import type { Company } from "@/types/company";

export async function getCompanies(search?: string): Promise<Company[]> {
  let query = supabase
    .from("companies")
    .select("*")
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
