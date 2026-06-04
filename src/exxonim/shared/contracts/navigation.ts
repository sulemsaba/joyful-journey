import type { ApiContentStatus } from "./content";

/**
 * API contract for the navigation tree.
 *
 * BACKEND / ADMIN INTEGRATION NOTES (FastAPI):
 * ─────────────────────────────────────────────
 * This is the shape the FastAPI backend must return from GET /navigation.
 *
 * Tree structure rules for the admin:
 *   - 3-level hierarchy: primary → group → secondary.
 *   - `kind` values: "primary" (top-bar link), "group" (dropdown column header),
 *     "secondary" (dropdown item). Extend as needed but the frontend only
 *     renders these three kinds.
 *   - `order` controls position within the same parent. Must be unique per level.
 *   - `status` / `is_active`: The frontend maps these to `isActive`.
 *     Only active/published items are shown.
 *   - `parent_id`: Links a child to its parent group. Null for top-level items.
 *   - `children`: Nested items for dropdown content. Empty array for leaf nodes.
 *   - `url`: Internal route path (e.g., "/services/") or external URL.
 *     The frontend normalizes trailing slashes for route matching.
 *   - `description`: Optional. Currently not rendered in the nav bar but available
 *     for future tooltip or SEO use.
 *
 * Admin CRUD endpoints:
 *   - GET  /admin/navigation         — list all items (flat, with parent_id)
 *   - GET  /admin/navigation/:id     — single item
 *   - POST /admin/navigation         — create item
 *   - PUT  /admin/navigation/:id     — update item (including reorder)
 *   - DELETE /admin/navigation/:id   — soft-delete (set status to "archived")
 *
 * The admin UI should provide:
 *   - Drag-and-drop tree editor for reordering.
 *   - Visual preview of the navigation bar.
 *   - Validation: max 7 top-level items, max 2 groups per dropdown,
 *     max 5 secondary items per group.
 *   - Warning when deleting a parent that has children.
 */
export interface ApiNavigationItem {
  id: number;
  title: string;
  url: string;
  description?: string | null;
  kind: string;
  order: number;
  status?: ApiContentStatus;
  is_active?: boolean;
  parent_id?: number | null;
  created_at: string;
  updated_at: string;
  children: ApiNavigationItem[];
}
