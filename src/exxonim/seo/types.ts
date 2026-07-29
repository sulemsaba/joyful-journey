export interface PageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  image: string;
  type: "website" | "article";
  robots: string;
  canonicalBaseUrl?: string;
}
