import { NextResponse } from "next/server";
import { siteOrigin } from "@/exxonim/seo/constants";
import { fallbackBlogPosts } from "@/exxonim/content/fallbackPublicContent";

/**
 * RSS 2.0 feed for the Exxonim Consult blog.
 *
 * Route: GET /blog/rss.xml
 *
 * This feed provides a standards-compliant RSS 2.0 XML document containing
 * all published blog posts. It supports:
 *   - Auto-discovery via <link rel="alternate"> in the layout
 *   - Feed reader compatibility (RSS 2.0 spec)
 *   - Content aggregators and newsletter tools
 *
 * BACKEND INTEGRATION:
 *   Currently uses fallback (static) blog posts. When the blog API is live,
 *   replace `fallbackBlogPosts` with a call to `listPublicBlogPosts()`.
 *   The rest of the RSS generation logic stays the same.
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(dateStr: string): string {
  // RSS 2.0 uses RFC 822 format
  const date = new Date(`${dateStr}T00:00:00Z`);
  return date.toUTCString();
}

function stripHtml(html: string): string {
  // Remove HTML tags for the plain-text description
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const posts = fallbackBlogPosts;

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteOrigin}/resources/${post.slug}/`;
      const description = post.excerpt || (post.content?.introduction ? stripHtml(post.content.introduction) : "");
      const contentSnippet = post.content?.introduction
        ? `<p>${escapeXml(post.content.introduction)}</p>`
        : "";

      // Build a simple HTML content block for the feed
      const contentHtml = post.content?.html
        ? escapeXml(post.content.html)
        : contentSnippet;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(description)}</description>
      ${contentHtml ? `<content:encoded><![CDATA[${post.content?.html || contentSnippet}]]></content:encoded>` : ""}
      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
      ${post.author ? `<dc:creator>${escapeXml(post.author.name)}</dc:creator>` : ""}
      ${post.category ? `<category>${escapeXml(post.category.label)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>Exxonim Consult Blog</title>
    <link>${siteOrigin}/resources/</link>
    <description>Registration, licensing, and practical compliance support for businesses, NGOs, and institutions in Tanzania.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteOrigin}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <generator>Exxonim Consult Next.js</generator>
    <image>
      <url>${siteOrigin}/branding/exxonimLogoLight.webp</url>
      <title>Exxonim Consult</title>
      <link>${siteOrigin}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
