import type { ApiAdminUser } from "./auth";
import type {
  ApiPaginatedResponse,
  ApiPaginationParams,
} from "./pagination";
import type {
  ApiServiceRequestPriority,
  ApiServiceRequestQueueView,
  ApiServiceRequestSourceChannel,
  ApiServiceRequestSort,
  ApiSortOrder,
  ApiCustomer,
  ApiInboxMessage,
  ApiRecordDocument,
  ApiRecordNote,
  ApiServiceRequestAssignment,
  ApiServiceType,
  ApiTimelineEvent,
} from "./service-requests";

export type ApiConsultationStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

export interface ApiConsultationStatusHistory {
  id: string;
  old_status?: ApiConsultationStatus | null;
  new_status: ApiConsultationStatus;
  comment?: string | null;
  created_at: string;
  changed_by_admin?: ApiAdminUser | null;
}

export interface ApiConsultation {
  id: number;
  tracking_id: string;
  idempotency_key: string;
  full_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  status: ApiConsultationStatus;
  assigned_to?: number | null;
  notes?: string | null;
  public_notes?: string | null;
  created_at: string;
  updated_at: string;
  assigned_admin?: ApiAdminUser | null;
  status_history?: ApiConsultationStatusHistory[];
  customer_id?: string | null;
  service_request_id?: string | null;
  customer?: ApiCustomer | null;
  service_type?: ApiServiceType | null;
  priority?: ApiServiceRequestPriority | null;
  source_channel?: ApiServiceRequestSourceChannel | null;
  opened_at?: string | null;
  closed_at?: string | null;
  last_activity_at?: string | null;
  last_customer_message_at?: string | null;
  unread: boolean;
  unread_count: number;
  assignments?: ApiServiceRequestAssignment[];
  messages?: ApiInboxMessage[];
  notes_records?: ApiRecordNote[];
  documents?: ApiRecordDocument[];
  timeline?: ApiTimelineEvent[];
}

export interface ApiPublicConsultationSubmission {
  full_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service_type_code?: string | null;
  message: string;
  idempotency_key?: string | null;
  source_channel?: ApiServiceRequestSourceChannel;
}

export interface ApiPublicConsultationSubmissionResponse {
  consultation_id: number;
  service_request_id: string;
  tracking_id: string;
  status: ApiConsultationStatus;
  message: string;
  received_at: string;
}

export interface ApiConsultationListParams extends ApiPaginationParams {
  status?: ApiConsultationStatus | "";
  search?: string;
  service_type?: string;
  priority?: ApiServiceRequestPriority | "";
  assignee_id?: number;
  source_channel?: ApiServiceRequestSourceChannel | "";
  view?: ApiServiceRequestQueueView;
  sort?: ApiServiceRequestSort;
  order?: ApiSortOrder;
}

export type ApiConsultationListResponse = ApiPaginatedResponse<ApiConsultation>;

/* ═══════════════════════════════════════════════════════════════════════════
 * PUBLIC TRACKING SYSTEM — Client Case Tracking
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * BACKEND TEAM (FastAPI + PostgreSQL) — READ THIS:
 * ──────────────────────────────────────────────
 * These types define the API contract for the public tracking lookup feature.
 *
 * TRACKING CODE FORMAT (v1.0 spec):
 *   - 6 characters, alphanumeric (A-Z, 0-9), case-insensitive
 *   - Display format: two groups of 3, space-separated → "84 72 9A"
 *   - Input: spaces stripped, uppercased before validation/lookup
 *   - Generation: cryptographically secure random (secrets.choice in Python)
 *   - Keyspace: 2.17 billion combinations (36^6)
 *   - Optional: exclude I, O, 0, 1 to avoid ambiguity → 32 chars → 1.07B combos
 *
 * DATABASE TABLES NEEDED:
 *   - cases (id, client_name, client_phone, service_type, tracking_code CHAR(6) UNIQUE,
 *            current_milestone_id FK→milestones.id, status, created_at, updated_at)
 *   - milestones (id, service_type, sequence_order, name, description,
 *                 visible_to_client BOOLEAN, client_label, auto_notify_client BOOLEAN)
 *   - case_milestones (id, case_id FK, milestone_id FK, completed_at TIMESTAMPTZ NULL)
 *
 * RATE LIMITING (defence in depth):
 *   - Per IP: 20 failed lookups/min → IP blocked 5 min
 *   - Per tracking code: 10 failed attempts total → code locked 24h
 *
 * SECURITY:
 *   - Always return generic 404 for invalid/expired/not-found codes (no information leakage)
 *   - Use POST (not GET) to keep codes out of URLs and server logs
 *   - All communication over HTTPS
 *   - Frontend sets Referrer-Policy: no-referrer
 *
 * See: "Exxonim Client Case Tracking System — Technical Design Report v1.0"
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Request body for the public tracking lookup.
 *
 * BACKEND: Endpoint is POST /api/track
 * The frontend currently calls POST /api/v1/track (Next.js convention).
 * When the FastAPI backend is live, update the API route constant to match.
 */
export interface ApiTrackingLookupRequest {
  /** 6-character alphanumeric tracking code (spaces stripped, uppercased) */
  trackingNumber: string;
}

/**
 * Status values for a tracked case.
 *
 * BACKEND: Must match the `status` column in the `cases` table.
 */
export type ApiTrackingCaseStatus = "active" | "completed" | "on_hold";

/**
 * A single visible milestone in the public tracking response.
 *
 * BACKEND: Only include milestones where `visible_to_client = TRUE` in the
 * `milestones` table. Use `client_label` if set, otherwise fall back to `name`.
 *
 * The `date` field:
 *   - For completed milestones: the `completed_at` timestamp from `case_milestones`
 *   - For the current milestone: null (it's in progress)
 *   - For upcoming milestones: null
 */
export interface ApiTrackingMilestone {
  /** Customer-facing milestone name (from milestones.client_label or milestones.name) */
  label: string;
  /** Status of this milestone */
  status: "completed" | "current" | "upcoming";
  /** Completion date (ISO 8601) for completed milestones, null otherwise */
  date: string | null;
}

/**
 * Response body for the public tracking lookup — SUCCESS.
 *
 * BACKEND: This is the EXTENDED response format that includes visible milestones
 * for a richer client experience. The minimal spec response (just status + milestone
 * + nextMilestone) is also supported — the frontend gracefully handles both.
 *
 * Minimal response (spec v1.0 §4):
 *   { status, milestone, lastUpdated, nextMilestone }
 *
 * Extended response (recommended for better UX):
 *   { status, milestone, lastUpdated, nextMilestone, trackingCode, serviceType,
 *     completedSteps, totalSteps, visibleMilestones, message }
 *
 * BACKEND: Return HTTP 200 for active/completed/on_hold cases.
 *          Return HTTP 404 for not-found/invalid codes.
 */
export interface ApiTrackingLookupResponse {
  /** Case status: "active" | "completed" | "on_hold" */
  status: ApiTrackingCaseStatus;

  /** The tracking code that was looked up (for display confirmation) */
  trackingCode?: string;

  /** Service type label (e.g., "Company Registration") — from service_type lookup */
  serviceType?: string;

  /** Current milestone label (customer-facing) */
  milestone: string;

  /** ISO 8601 timestamp of last update */
  lastUpdated: string;

  /** Next milestone label, or null if completed */
  nextMilestone: string | null;

  /** Optional message (e.g., completion message for completed cases) */
  message?: string | null;

  /**
   * EXTENDED FIELD: Progress indicator numerator.
   * Number of completed milestones (for progress bar).
   * BACKEND: COUNT(*) FROM case_milestones WHERE case_id = ? AND completed_at IS NOT NULL
   */
  completedSteps?: number;

  /**
   * EXTENDED FIELD: Progress indicator denominator.
   * Total number of visible milestones for this service type.
   * BACKEND: COUNT(*) FROM milestones WHERE service_type = ? AND visible_to_client = TRUE
   */
  totalSteps?: number;

  /**
   * EXTENDED FIELD: Array of visible milestones for timeline display.
   * Only milestones where visible_to_client = TRUE are included.
   * BACKEND: Join case_milestones + milestones, filter visible_to_client = TRUE,
   *          order by sequence_order ASC.
   */
  visibleMilestones?: ApiTrackingMilestone[];
}

/**
 * Response body for the public tracking lookup — NOT FOUND.
 *
 * BACKEND: Always return this exact shape for invalid, expired, or non-existent
 * tracking codes. Do NOT distinguish between "code doesn't exist" and
 * "code exists but case is closed/blocked" — this prevents information leakage.
 *
 * Return HTTP 404 with this body.
 */
export interface ApiTrackingNotFoundResponse {
  status: "not_found";
  message: string;
}

/**
 * Union type for all possible tracking lookup responses.
 */
export type ApiTrackingLookupResult =
  | ApiTrackingLookupResponse
  | ApiTrackingNotFoundResponse;
