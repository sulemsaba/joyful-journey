import axios from "axios";
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import type {
  ApiPublicConsultationSubmission,
  ApiPublicConsultationSubmissionResponse,
  ApiTrackingLookupRequest,
  ApiTrackingLookupResult,
} from "@/exxonim/types/api";

/**
 * Submit a new public consultation (contact form).
 *
 * BACKEND TEAM (FastAPI): This creates a new case in the database.
 * The backend should:
 *   1. Generate a tracking code (5 digits + 1 letter) using secrets.choice
 *   2. Create a new case record with the tracking code
 *   3. Create case_milestones records for the service type's milestones
 *   4. Send WhatsApp notification to the client with their tracking code:
 *      "Your tracking number is 84 72 9A. Check your file status anytime at exxonim.tz/track."
 *   5. Optionally send an email with the same info
 */
export async function submitPublicConsultation(
  payload: ApiPublicConsultationSubmission
) {
  const response = await api.post<ApiPublicConsultationSubmissionResponse>(
    apiRoutes.public.consultations.create,
    payload
  );

  return response.data;
}

/**
 * Look up a case by tracking code (public tracking page).
 *
 * BACKEND TEAM (FastAPI): This is the core public endpoint.
 *
 * Endpoint: POST /api/track
 * Request:  { trackingNumber: "84729A" }
 *
 * The frontend sends the raw 6-char code (spaces stripped, uppercased).
 * Format: 5 digits + 1 uppercase letter.
 * The backend should:
 *   1. Validate the code format (5 digits + 1 letter)
 *   2. Query the cases table: SELECT * FROM cases WHERE tracking_code = $1
 *   3. If not found: return 404 { status: "not_found", message: "..." }
 *      (same response for invalid/expired/closed — no info leakage)
 *   4. If found: query milestones + case_milestones, filter visible_to_client,
 *      and return the extended response shape (see ApiTrackingLookupResponse)
 *
 * RATE LIMITING (enforced by backend):
 *   - Per IP: 20 failed lookups/min → IP blocked 5 min
 *   - Per tracking code: 10 failed attempts total → code locked 24h
 *
 * SECURITY:
 *   - Use POST (not GET) to keep codes out of URLs and server logs
 *   - All communication over HTTPS
 *   - Return same 404 shape for all failure cases (no info leakage)
 *
 * IMPLEMENTATION NOTE: This uses fetch() with a RELATIVE path instead of the
 * shared Axios client. The Axios client uses an absolute baseURL which may not
 * be reachable from the browser in proxied/sandbox environments. A relative
 * path (/api/v1/track) resolves through the caddy gateway correctly in all
 * environments.
 */
export async function lookupTrackingCode(
  payload: ApiTrackingLookupRequest
): Promise<ApiTrackingLookupResult> {
  const url = `/api/v1${apiRoutes.public.track.lookup}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // 404 is a valid business response for tracking lookups (not_found).
      // Return the data as-is so the page can render the not-found card.
      // BACKEND: Always returns same 404 shape for invalid/expired/non-existent
      // codes to prevent information leakage.
      if (response.status === 404) {
        return data as ApiTrackingLookupResult;
      }
      // Other errors (500, 429 rate-limited, etc.) — throw to show generic error
      throw new Error(data.message || data.detail || "Lookup failed");
    }

    return data as ApiTrackingLookupResult;
  } catch (error) {
    // Re-throw fetch errors (network failure, CORS, etc.)
    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your connection and try again.");
    }
    throw error;
  }
}
