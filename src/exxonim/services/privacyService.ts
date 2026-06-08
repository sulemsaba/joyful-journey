/**
 * FASTAPI BACKEND ENDPOINTS:
 * ──────────────────────────
 * GET    /api/v1/privacy/consent              — Get current user's privacy consent state
 * POST   /api/v1/privacy/consent              — Update/record privacy consent preferences
 * GET    /api/v1/privacy-requests             — List privacy requests (admin only)
 * POST   /api/v1/privacy-requests             — Create privacy request (public)
 * GET    /api/v1/privacy-requests/{id}        — Get single privacy request (admin only)
 * PUT    /api/v1/privacy-requests/{id}        — Update privacy request status (admin only)
 *
 * PostgreSQL Tables:
 *   privacy_consents — id, session_id, categories (JSONB), source_path,
 *                      consent_recorded, created_at, updated_at
 *   privacy_requests — id, type, status, email, description,
 *                      admin_notes, created_at, updated_at
 *
 * Request Schema — Update Consent (POST /api/v1/privacy/consent):
 *   { preferences: bool, source_path: str }
 *
 * Response Schema — Get/Update Consent:
 *   { consent_recorded: bool, categories: { necessary: bool, preferences: bool, analytics: bool },
 *     source_path: str | None, created_at: datetime | None }
 *
 * Categories:
 *   necessary   — Always true. Required for session handling, auth, security.
 *   preferences — Optional. Theme persistence, UI preferences.
 *   analytics   — Optional. Usage analytics (future).
 */
import { api } from "@/exxonim/app/apiClient";
import { apiRoutes } from "@/exxonim/shared/api/routes";
import type {
  ApiPrivacyConsentState,
  ApiPrivacyConsentUpdate,
} from "@/exxonim/types/api";

export const PRIVACY_CONSENT_EVENT = "exxonim:privacy-consent";

function dispatchConsentEvent(consent: ApiPrivacyConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(PRIVACY_CONSENT_EVENT, {
      detail: {
        preferencesEnabled: consent.categories.preferences,
      },
    })
  );
}

export async function getPrivacyConsent() {
  const response = await api.get<ApiPrivacyConsentState>(apiRoutes.public.privacy.consent, {
    withCredentials: true,
  });
  dispatchConsentEvent(response.data);
  return response.data;
}

export async function updatePrivacyConsent(payload: ApiPrivacyConsentUpdate) {
  const response = await api.post<ApiPrivacyConsentState>(
    apiRoutes.public.privacy.consent,
    payload,
    {
      withCredentials: true,
    }
  );
  dispatchConsentEvent(response.data);
  return response.data;
}
