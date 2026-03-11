export interface Company {
  id: string;
  slug: string;
  name: string;
  sector: string | null;
  city: string | null;
  description: string | null;
  rccm: string | null;
  nif: string | null;
  founded_at: string | null;
  status: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  source_name: string | null;
  source_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}
