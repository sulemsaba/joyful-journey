export interface ServiceCatalogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  primary_segment: string[];
  badge: string | null;
  short_description: string | null;
  body: string | null;
  hero_image: string | null;
  deliverables: string[];
  deliverables_full: string[] | null;
  process_steps: Array<{ step: string; title: string; detail: string }> | null;
  cta_text: string;
  cta_link: string;
  hover_hint: string | null;
  card_preview: string | null;
  faqs: Array<{ question: string; answer: string }> | null;
  status: 'draft' | 'published' | 'archived';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  sort_order: number;
}

export interface ServiceSegment {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface ServicesResponse {
  success: boolean;
  data: {
    services: ServiceCatalogItem[];
    total: number;
    categories: string[];
  };
}

export type SegmentFilter = 'all' | 'local-entrepreneurs' | 'foreign-investors' | 'enterprises' | 'ngos';
