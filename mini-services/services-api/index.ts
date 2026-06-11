import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "../../node_modules/@prisma/client";

const prisma = new PrismaClient();

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Helper: format a service for the API response
async function formatService(service: any) {
  const segmentNames = service.segments?.map((s: any) => s.segment?.name).filter(Boolean) ?? [];

  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    category: service.category?.name ?? null,
    primary_segment: segmentNames,
    badge: service.badge ?? null,
    short_description: service.shortDescription,
    deliverables: JSON.parse(service.deliverables || "[]"),
    deliverables_full: service.deliverablesFull ? JSON.parse(service.deliverablesFull) : null,
    cta_text: service.ctaText,
    cta_link: service.ctaLink,
    status: service.status,
    sort_order: service.sortOrder,
    created_at: service.createdAt,
    updated_at: service.updatedAt,
  };
}

// GET /api/services — Returns all published services
app.get("/api/services", async (c) => {
  try {
    const segmentFilter = c.req.query("segment");
    const categoryFilter = c.req.query("category");

    // Build where clause
    const where: any = {
      status: "published",
    };

    if (categoryFilter) {
      where.category = {
        slug: categoryFilter,
      };
    }

    if (segmentFilter) {
      where.segments = {
        some: {
          segment: {
            slug: segmentFilter,
          },
        },
      };
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
        segments: {
          include: {
            segment: true,
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    // Get all categories for the response
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { sort_order: "asc" },
    });

    const formatted = await Promise.all(services.map(formatService));

    return c.json({
      success: true,
      data: {
        services: formatted,
        total: formatted.length,
        categories: categories.map((cat) => cat.name),
      },
    });
  } catch (error: any) {
    console.error("Error fetching services:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /api/services/:slug — Returns a single service by slug
app.get("/api/services/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
        segments: {
          include: {
            segment: true,
          },
        },
      },
    });

    if (!service) {
      return c.json({ success: false, error: "Service not found" }, 404);
    }

    return c.json({
      success: true,
      data: await formatService(service),
    });
  } catch (error: any) {
    console.error("Error fetching service:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /api/categories — Returns all categories
app.get("/api/categories", async (c) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { sort_order: "asc" },
      include: {
        _count: {
          select: { services: { where: { status: "published" } } },
        },
      },
    });

    return c.json({
      success: true,
      data: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        sort_order: cat.sort_order,
        service_count: cat._count.services,
        created_at: cat.createdAt,
        updated_at: cat.updatedAt,
      })),
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /api/segments — Returns all segments
app.get("/api/segments", async (c) => {
  try {
    const segments = await prisma.serviceSegment.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { services: { where: { service: { status: "published" } } } },
        },
      },
    });

    return c.json({
      success: true,
      data: segments.map((seg) => ({
        id: seg.id,
        name: seg.name,
        slug: seg.slug,
        sort_order: seg.sortOrder,
        service_count: seg._count.services,
        created_at: seg.createdAt,
        updated_at: seg.updatedAt,
      })),
    });
  } catch (error: any) {
    console.error("Error fetching segments:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /api/admin/services — Create a service
app.post("/api/admin/services", async (c) => {
  try {
    const body = await c.req.json();

    const {
      title,
      slug,
      categoryId,
      badge,
      shortDescription,
      deliverables,
      deliverablesFull,
      ctaText,
      ctaLink,
      status,
      sortOrder,
      segmentIds,
    } = body;

    // Validate required fields
    if (!title || !slug || !categoryId || !shortDescription || !deliverables) {
      return c.json(
        {
          success: false,
          error: "Missing required fields: title, slug, categoryId, shortDescription, deliverables",
        },
        400
      );
    }

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        categoryId,
        badge: badge ?? null,
        shortDescription,
        deliverables: JSON.stringify(deliverables),
        deliverablesFull: deliverablesFull ? JSON.stringify(deliverablesFull) : null,
        ctaText: ctaText ?? "Get Started →",
        ctaLink: ctaLink ?? "/contact",
        status: status ?? "published",
        sortOrder: sortOrder ?? 0,
        segments: segmentIds
          ? {
              create: segmentIds.map((segmentId: string) => ({
                segmentId,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        segments: {
          include: {
            segment: true,
          },
        },
      },
    });

    return c.json(
      {
        success: true,
        data: await formatService(service),
      },
      201
    );
  } catch (error: any) {
    console.error("Error creating service:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PUT /api/admin/services/:id — Update a service
app.put("/api/admin/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const {
      title,
      slug,
      categoryId,
      badge,
      shortDescription,
      deliverables,
      deliverablesFull,
      ctaText,
      ctaLink,
      status,
      sortOrder,
      segmentIds,
    } = body;

    // Build update data
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (badge !== undefined) updateData.badge = badge;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (deliverables !== undefined) updateData.deliverables = JSON.stringify(deliverables);
    if (deliverablesFull !== undefined)
      updateData.deliverablesFull = deliverablesFull ? JSON.stringify(deliverablesFull) : null;
    if (ctaText !== undefined) updateData.ctaText = ctaText;
    if (ctaLink !== undefined) updateData.ctaLink = ctaLink;
    if (status !== undefined) updateData.status = status;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    // If segmentIds provided, replace segments
    if (segmentIds !== undefined) {
      // Delete existing segments
      await prisma.serviceToSegment.deleteMany({
        where: { serviceId: id },
      });

      // Create new segments
      updateData.segments = {
        create: segmentIds.map((segmentId: string) => ({
          segmentId,
        })),
      };
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        segments: {
          include: {
            segment: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: await formatService(service),
    });
  } catch (error: any) {
    console.error("Error updating service:", error);
    if (error.code === "P2025") {
      return c.json({ success: false, error: "Service not found" }, 404);
    }
    return c.json({ success: false, error: error.message }, 500);
  }
});

// DELETE /api/admin/services/:id — Soft-delete (set status=archived)
app.delete("/api/admin/services/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const service = await prisma.service.update({
      where: { id },
      data: { status: "archived" },
      include: {
        category: true,
        segments: {
          include: {
            segment: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: await formatService(service),
    });
  } catch (error: any) {
    console.error("Error archiving service:", error);
    if (error.code === "P2025") {
      return c.json({ success: false, error: "Service not found" }, 404);
    }
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Health check
app.get("/api/health", (c) => {
  return c.json({ success: true, status: "ok" });
});

/* ── Tracking Code Lookup: POST /api/v1/track ──
 * Mock endpoint for the Track Your Consultation page.
 * Format: 5 digits + 1 uppercase letter in any position (e.g., "A11111" or "11111A")
 * Display format: "A1 11 11" or "11 11 1A" (three groups of 2, space-separated)
 */
const MOCK_CASES: Record<string, {
  status: "active" | "completed" | "on_hold";
  serviceType: string;
  milestone: string;
  lastUpdated: string;
  nextMilestone: string | null;
  message?: string;
  completedSteps: number;
  totalSteps: number;
  visibleMilestones: Array<{ label: string; status: "completed" | "current" | "upcoming"; date: string | null }>;
}> = {
  "A11111": {
    status: "active",
    serviceType: "Company Registration",
    milestone: "Document Verification",
    lastUpdated: "2026-06-04T09:42:00Z",
    nextMilestone: "Submission to BRELA",
    completedSteps: 3,
    totalSteps: 6,
    visibleMilestones: [
      { label: "Consultation Received", status: "completed", date: "2026-05-20" },
      { label: "Name Clearance Filed", status: "completed", date: "2026-05-22" },
      { label: "Name Approved", status: "completed", date: "2026-05-28" },
      { label: "Document Verification", status: "current", date: null },
      { label: "Submission to BRELA", status: "upcoming", date: null },
      { label: "Certificate Issued", status: "upcoming", date: null },
    ],
  },
  "22A222": {
    status: "completed",
    serviceType: "TIN Application",
    milestone: "All processes completed",
    lastUpdated: "2026-05-30T14:30:00Z",
    nextMilestone: null,
    message: "Your TIN application is complete. Contact us if you have any questions.",
    completedSteps: 4,
    totalSteps: 4,
    visibleMilestones: [
      { label: "Consultation Received", status: "completed", date: "2026-05-10" },
      { label: "Document Preparation", status: "completed", date: "2026-05-15" },
      { label: "TRA Submission", status: "completed", date: "2026-05-22" },
      { label: "TIN Certificate Issued", status: "completed", date: "2026-05-30" },
    ],
  },
  "333A33": {
    status: "on_hold",
    serviceType: "Business Licensing",
    milestone: "Awaiting Client Documents",
    lastUpdated: "2026-06-01T11:00:00Z",
    nextMilestone: "Document Verification",
    message: "Your consultation is on hold pending additional documents. Check your WhatsApp for details, or message us directly.",
    completedSteps: 1,
    totalSteps: 5,
    visibleMilestones: [
      { label: "Consultation Received", status: "completed", date: "2026-05-25" },
      { label: "Awaiting Client Documents", status: "current", date: null },
      { label: "Document Verification", status: "upcoming", date: null },
      { label: "Licence Application", status: "upcoming", date: null },
      { label: "Licence Issued", status: "upcoming", date: null },
    ],
  },
  "4444A4": {
    status: "active",
    serviceType: "Work Permit Application",
    milestone: "Labour Committee Review",
    lastUpdated: "2026-06-03T16:15:00Z",
    nextMilestone: "Immigration Submission",
    completedSteps: 4,
    totalSteps: 7,
    visibleMilestones: [
      { label: "Consultation Received", status: "completed", date: "2026-05-12" },
      { label: "Document Collection", status: "completed", date: "2026-05-14" },
      { label: "Employer Verification", status: "completed", date: "2026-05-20" },
      { label: "Labour Committee Review", status: "current", date: null },
      { label: "Immigration Submission", status: "upcoming", date: null },
      { label: "Permit Approval", status: "upcoming", date: null },
      { label: "Permit Issued", status: "upcoming", date: null },
    ],
  },
};

app.post("/api/v1/track", async (c) => {
  let body: { trackingNumber?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json(
      { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
      404
    );
  }

  const raw = (body.trackingNumber ?? "").replace(/\s/g, "").toUpperCase();
  // Format: 6 chars = 5 digits + 1 uppercase letter (letter can be in any position)
  const isValid = raw.length === 6 &&
    (raw.match(/[0-9]/g) || []).length === 5 &&
    (raw.match(/[A-Z]/g) || []).length === 1;

  if (!isValid) {
    return c.json(
      { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
      404
    );
  }

  const mockCase = MOCK_CASES[raw];
  if (!mockCase) {
    return c.json(
      { status: "not_found", message: "No matching consultation found. Please check your tracking number." },
      404
    );
  }

  return c.json({
    status: mockCase.status,
    trackingCode: raw,
    serviceType: mockCase.serviceType,
    milestone: mockCase.milestone,
    lastUpdated: mockCase.lastUpdated,
    nextMilestone: mockCase.nextMilestone,
    message: mockCase.message ?? null,
    completedSteps: mockCase.completedSteps,
    totalSteps: mockCase.totalSteps,
    visibleMilestones: mockCase.visibleMilestones,
  });
});

/* ── Consultation Submission: POST /api/v1/consultations ── */
const TRACKING_DIGITS = "0123456789";
const TRACKING_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

app.post("/api/v1/consultations", async (c) => {
  const digits = Array.from({ length: 5 }, () =>
    TRACKING_DIGITS[Math.floor(Math.random() * TRACKING_DIGITS.length)]
  ).join("");
  const letter = TRACKING_LETTERS[Math.floor(Math.random() * TRACKING_LETTERS.length)];
  // Insert letter at a random position (0-5)
  const pos = Math.floor(Math.random() * 6);
  const trackingCode = digits.slice(0, pos) + letter + digits.slice(pos);

  return c.json({
    consultation_id: Math.floor(Math.random() * 9000 + 1000),
    service_request_id: `sr-${Date.now()}`,
    tracking_id: trackingCode,
    status: "pending",
    message: "Your consultation request has been received. We will follow up shortly.",
    received_at: new Date().toISOString(),
  });
});

const port = 3031;

console.log(`Services API running on port ${port}`);

Bun.serve({
  port,
  fetch: app.fetch,
});
