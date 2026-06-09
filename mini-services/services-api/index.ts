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

const port = 3031;

console.log(`Services API running on port ${port}`);

Bun.serve({
  port,
  fetch: app.fetch,
});
