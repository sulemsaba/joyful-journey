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
 *   1. Generate a 6-char alphanumeric tracking code (secrets.choice)
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
 * The backend should:
 *   1. Validate the code format (6 chars, alphanumeric)
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
 */
export async function lookupTrackingCode(
  payload: ApiTrackingLookupRequest
): Promise<ApiTrackingLookupResult> {
  try {
    const response = await api.post<ApiTrackingLookupResult>(
      apiRoutes.public.track.lookup,
      payload
    );
    return response.data;
  } catch (error) {
    // Axios throws on non-2xx status codes, but 404 is a valid business
    // response for tracking lookups (not_found). Extract and return it.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return error.response.data as ApiTrackingLookupResult;
    }
    throw error;
  }
}
