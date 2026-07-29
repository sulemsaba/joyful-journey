/**
 * FASTAPI ROUTER STRUCTURE:
 * ────────────────────────
 * This file defines all API route paths used by the frontend. When the FastAPI
 * backend is live, these paths will map to the following router modules:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ PUBLIC ROUTER (api/v1/)                    → app/routers/public.py     │
 * │   /track                 POST              → Track lookup              │
 * │   /consultations         POST              → Submit consultation       │
 * │   /blog/posts            GET               → List blog posts           │
 * │   /blog/posts/{slug}     GET               → Get blog post             │
 * │   /blog/categories       GET               → List categories           │
 * │   /blog/authors          GET               → List authors              │
 * │   /blog/authors/{slug}   GET               → Get author                │
 * │   /pages                 GET               → List pages                │
 * │   /pages/{slug}          GET               → Get page                  │
 * │   /jobs                  GET               → List published jobs       │
 * │   /jobs/{slug}           GET               → Get job                   │
 * │   /jobs/{id}/apply       POST              → Submit application        │
 * │   /navigation            GET               → List nav items            │
 * │   /pricing/plans         GET               → List pricing plans        │
 * │   /testimonials          GET               → List testimonials         │
 * │   /site-settings/{key}   GET               → Get site setting          │
 * │   /privacy/consent       GET|POST          → Get/update consent        │
 * │   /faq                   GET               → List FAQ items            │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ ADMIN ROUTER (admin/)                      → app/routers/admin.py      │
 * │   /auth/*                POST|GET          → Auth (login/refresh/...)  │
 * │   /blog/*                CRUD              → Blog management           │
 * │   /media/*               CRUD|UPLOAD       → Media uploads             │
 * │   /pages/*               CRUD              → Page management           │
 * │   /navigation/*          CRUD              → Navigation management     │
 * │   /pricing/*             CRUD              → Pricing management        │
 * │   /testimonials/*        CRUD              → Testimonial management    │
 * │   /jobs/*                CRUD              → Job management            │
 * │   /consultations/*       GET               → Consultation management   │
 * │   /service-requests/*    CRUD              → Service request mgmt      │
 * │   /site-settings/*       GET|PUT           → Site setting mgmt         │
 * │   /privacy-requests/*    CRUD              → Privacy request mgmt      │
 * │   /users/*               CRUD              → User management           │
 * │   /notifications/*       GET|PUT           → Notification mgmt         │
 * │   /dashboard/*           GET               → Dashboard data            │
 * │   /reports/*             GET               → Reports & analytics       │
 * │   /documents/*           GET               → Document downloads        │
 * │   /staff                 GET               → Staff directory           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PostgreSQL Database: exxonim_db
 * All routes prefixed with /api/v1 in production (Caddy reverse proxy).
 * Admin routes require JWT authentication (Bearer token).
 * Public routes are rate-limited per IP.
 */
export const apiRoutes = {
  admin: {
    auth: {
      login: "/admin/auth/login",
      refresh: "/admin/auth/refresh",
      logout: "/admin/auth/logout",
      me: "/admin/auth/me",
    },
    blog: {
      posts: {
        list: "/admin/blog/posts",
        byId: (id: number) => `/admin/blog/posts/${id}`,
        submit: (id: number) => `/admin/blog/posts/${id}/submit`,
        approve: (id: number) => `/admin/blog/posts/${id}/approve`,
        reject: (id: number) => `/admin/blog/posts/${id}/reject`,
        publish: (id: number) => `/admin/blog/posts/${id}/publish`,
        archive: (id: number) => `/admin/blog/posts/${id}/archive`,
        previewToken: (id: number) => `/admin/blog/posts/${id}/preview-token`,
      },
      categories: {
        list: "/admin/blog/categories",
        byId: (id: number) => `/admin/blog/categories/${id}`,
      },
      authors: {
        list: "/admin/blog/authors",
        byId: (id: number) => `/admin/blog/authors/${id}`,
        me: "/admin/blog/authors/me",
      },
    },
    media: {
      list: "/admin/media",
      byId: (id: number) => `/admin/media/${id}`,
      upload: "/admin/media/upload",
    },
    pages: {
      list: "/admin/pages",
      byId: (id: number) => `/admin/pages/${id}`,
      submit: (id: number) => `/admin/pages/${id}/submit`,
      approve: (id: number) => `/admin/pages/${id}/approve`,
      reject: (id: number) => `/admin/pages/${id}/reject`,
      publish: (id: number) => `/admin/pages/${id}/publish`,
      archive: (id: number) => `/admin/pages/${id}/archive`,
    },
    navigation: {
      list: "/admin/navigation",
      byId: (id: number) => `/admin/navigation/${id}`,
    },
    pricing: {
      plans: {
        list: "/admin/pricing/plans",
        byId: (id: number) => `/admin/pricing/plans/${id}`,
      },
    },
    testimonials: {
      list: "/admin/testimonials",
      byId: (id: number) => `/admin/testimonials/${id}`,
      submit: (id: number) => `/admin/testimonials/${id}/submit`,
      approve: (id: number) => `/admin/testimonials/${id}/approve`,
      reject: (id: number) => `/admin/testimonials/${id}/reject`,
      publish: (id: number) => `/admin/testimonials/${id}/publish`,
      archive: (id: number) => `/admin/testimonials/${id}/archive`,
    },
    jobs: {
      list: "/admin/jobs",
      bySlug: (slug: string) => `/admin/jobs/${slug}`,
    },
    consultations: {
      list: "/admin/consultations",
      byId: (id: number) => `/admin/consultations/${id}`,
    },
    serviceTypes: "/admin/service-types",
    customers: {
      list: "/admin/customers",
      byId: (id: string) => `/admin/customers/${id}`,
      timeline: (id: string) => `/admin/customers/${id}/timeline`,
    },
    serviceRequests: {
      list: "/admin/service-requests",
      byId: (id: string) => `/admin/service-requests/${id}`,
      markRead: (id: string) => `/admin/service-requests/${id}/mark-read`,
      status: (id: string) => `/admin/service-requests/${id}/status`,
      bulkMarkRead: "/admin/service-requests/bulk/mark-read",
      bulkStatus: "/admin/service-requests/bulk/status",
      bulkAssign: "/admin/service-requests/bulk/assign",
      bulkPriority: "/admin/service-requests/bulk/priority",
      assignments: (id: string) => `/admin/service-requests/${id}/assignments`,
      assignmentById: (id: string, assignmentId: string) =>
        `/admin/service-requests/${id}/assignments/${assignmentId}`,
      threads: (id: string) => `/admin/service-requests/${id}/threads`,
      messages: (id: string) => `/admin/service-requests/${id}/messages`,
      notes: (id: string) => `/admin/service-requests/${id}/notes`,
      documents: (id: string) => `/admin/service-requests/${id}/documents`,
    },
    worklists: "/admin/dashboard/worklists",
    reviewQueue: "/admin/review-queue",
    notifications: {
      list: "/admin/notifications",
      byId: (id: string) => `/admin/notifications/${id}`,
      markRead: (id: string) => `/admin/notifications/${id}/read`,
      markAllRead: "/admin/notifications/mark-all-read",
      preferences: "/admin/notifications/preferences",
    },
    documents: {
      download: (id: string) => `/admin/documents/${id}/download`,
    },
    staff: "/admin/staff",
    dashboard: {
      summary: "/admin/dashboard/summary",
    },
    reports: {
      operations: "/admin/reports/operations",
      adminActivity: "/admin/reports/activity/admin",
      contentActivity: "/admin/reports/activity/content",
    },
    siteSettings: {
      list: "/admin/site-settings",
      byKey: (key: string) => `/admin/site-settings/${key}`,
    },
    privacyRequests: {
      list: "/admin/privacy-requests",
      byId: (id: string) => `/admin/privacy-requests/${id}`,
    },
    access: {
      users: {
        list: "/admin/users",
        byId: (id: number) => `/admin/users/${id}`,
        role: (id: number) => `/admin/users/${id}/role`,
        status: (id: number) => `/admin/users/${id}/status`,
      },
      roles: "/admin/roles",
    },
  },
  public: {
    /**
     * Public tracking lookup - POST /track
     *
     * BACKEND (FastAPI): The spec defines this as POST /api/track.
     * The Next.js mock API uses POST /api/v1/track (catch-all route convention).
     * When the FastAPI backend is live, update this constant to "/track"
     * and update the Next.js rewrite/proxy rules accordingly.
     *
     * Tracking code format: 5 digits + 1 uppercase letter (e.g., "84729A")
     * Request:  { trackingNumber: "84729A" }
     * Response: ApiTrackingLookupResponse (200) or ApiTrackingNotFoundResponse (404)
     */
    track: {
      lookup: "/track",
    },
    consultations: {
      create: "/consultations",
    },
    blog: {
      posts: {
        list: "/blog/posts",
        bySlug: (slug: string) => `/blog/posts/${slug}`,
      },
      categories: {
        list: "/blog/categories",
      },
      authors: {
        list: "/blog/authors",
        bySlug: (slug: string) => `/blog/authors/${slug}`,
      },
    },
    pages: {
      list: "/pages",
      bySlug: (slug: string) => `/pages/${slug}`,
    },
    jobs: {
      list: "/jobs",
      bySlug: (slug: string) => `/jobs/${slug}`,
      apply: (id: string) => `/jobs/${id}/apply`,
    },
    newsletter: {
      subscribe: "/newsletter/subscribe",
    },
    navigation: {
      list: "/navigation",
    },
    pricing: {
      plans: {
        list: "/pricing/plans",
      },
      // Segment × tier packages — admin-managed (service_packages table).
      packages: {
        list: "/pricing/packages",
      },
    },
    testimonials: {
      list: "/testimonials",
    },
    siteSettings: {
      byKey: (key: string) => `/site-settings/${key}`,
    },
    privacy: {
      consent: "/privacy/consent",
    },
    faq: {
      list: "/faq",
    },
    holidays: {
      list: "/holidays",
    },
  },
} as const;
