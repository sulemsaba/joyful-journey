import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPrivacyConsent, updatePrivacyConsent } from "@/exxonim/services/privacyService";


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
            <a href="/privacy/" className="text-accent no-underline">Privacy policy</a>
            <a href="/cookies/" className="text-accent no-underline">Cookie notice</a>
            <a href="/data-rights/" className="text-accent no-underline">Data rights</a>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-extrabold border border-border-soft bg-surface/80 text-text transition-all hover:bg-surface hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            type="button"
            onClick={() => {
              consentMutation.mutate({
                preferences: false,
                source_path: pathname,
              });
            }}
            disabled={consentMutation.isPending}
          >
            Necessary only
          </button>
          <button
            className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold bg-accent text-accent-contrast transition-all hover:bg-accent-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            type="button"
            onClick={() => {
              consentMutation.mutate({
                preferences: true,
                source_path: pathname,
              });
            }}
            disabled={consentMutation.isPending}
          >
            Allow preferences
          </button>
        </div>
      </aside>
    </>
  );
}
