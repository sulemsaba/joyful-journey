/**
 * FASTAPI BACKEND ENDPOINTS USED BY THIS COMPONENT:
 * ──────────────────────────────────────────────────
 * Get Consent State (via getPrivacyConsent → privacyService):
 *   GET    /api/v1/privacy/consent              — Get current user's privacy consent state
 *   Response: { consent_recorded: bool, categories: { necessary: bool, preferences: bool, analytics: bool },
 *              source_path: str | None }
 *
 * Update Consent (via updatePrivacyConsent → privacyService):
 *   POST   /api/v1/privacy/consent              — Record consent preferences
 *   Request: { preferences: bool, source_path: str }
 *   Response: { consent_recorded: bool, categories: { necessary: bool, preferences: bool, analytics: bool } }
 *
 * PostgreSQL Tables:
 *   privacy_consents — id, session_id, categories (JSONB), source_path,
 *                      consent_recorded, created_at, updated_at
 *
 * See: src/exxonim/services/privacyService.ts for full endpoint documentation.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPrivacyConsent, updatePrivacyConsent } from "@/exxonim/services/privacyService";
import { Button } from "./primitives/Button";
import { SmartLink } from "./primitives/SmartLink";


interface PrivacyConsentBannerProps {
  pathname: string;
}

export function PrivacyConsentBanner({ pathname }: PrivacyConsentBannerProps) {
  const queryClient = useQueryClient();
  const consentQuery = useQuery({
    queryKey: ["public", "privacy", "consent"],
    queryFn: getPrivacyConsent,
    staleTime: 60_000,
  });

  const consentMutation = useMutation({
    mutationFn: updatePrivacyConsent,
    onSuccess: async (data) => {
      queryClient.setQueryData(["public", "privacy", "consent"], data);
    },
  });

  if (consentQuery.isPending || consentQuery.isError || consentQuery.data?.consent_recorded) {
    return null;
  }

  const hasConsentError = consentMutation.isError;

  return (
    <>
      <aside
        className="fixed inset-x-4 bottom-4 z-50 max-w-[min(42rem,calc(100vw-2rem))] ml-auto grid gap-4 p-5 rounded-2xl border border-border-soft bg-surface-elevated"
        aria-live="polite"
      >
        <div className="grid gap-2">
          <p className="m-0 text-[0.82rem] tracking-[0.12em] uppercase text-text-soft">
            Privacy &amp; cookies
          </p>
          <h2 className="m-0 text-base leading-relaxed text-text">
            We only use browser storage for session handling, consent state, and optional preferences like theme memory.
          </h2>
          <p className="m-0 text-sm leading-relaxed text-text-muted">
            Business records such as customer history, service history, notes, and documents stay in the database. You can keep only necessary storage or allow preference storage too.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <SmartLink href="/privacy/" className="text-accent no-underline">Privacy policy</SmartLink>
            <SmartLink href="/cookies/" className="text-accent no-underline">Cookie notice</SmartLink>
            <SmartLink href="/data-rights/" className="text-accent no-underline">Data rights</SmartLink>
          </div>
        </div>

        {hasConsentError && (
          <p className="text-sm text-accent-hover m-0" role="alert">
            Could not save your preference. Please try again.
          </p>
        )}

        <div className="flex flex-wrap gap-3 justify-end">
          <Button
            size="standard"
            variant="secondary"
            type="button"
            onClick={() => {
              consentMutation.mutate({
                preferences: false,
                source_path: pathname,
              });
            }}
            disabled={consentMutation.isPending}
            isLoading={consentMutation.isPending}
          >
            Necessary only
          </Button>
          <Button
            size="standard"
            variant="primary"
            type="button"
            onClick={() => {
              consentMutation.mutate({
                preferences: true,
                source_path: pathname,
              });
            }}
            disabled={consentMutation.isPending}
            isLoading={consentMutation.isPending}
          >
            Allow preferences
          </Button>
        </div>
      </aside>
    </>
  );
}
