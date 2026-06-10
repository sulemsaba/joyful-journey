export interface ServiceCatalogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  primary_segment: string[];
  badge: string | null;
  short_description: string;
  deliverables: string[];
  deliverables_full: string[] | null;
  cta_text: string;
  cta_link: string;
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
