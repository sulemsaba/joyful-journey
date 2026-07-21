import { cn } from "@/exxonim/utils/cn";
import {
  TZ, KE, UG, RW, BI, CD, MZ, MW, ZM, ZW, BW, NA, ZA, ET, NG, GH, EG, MA, SN, CG,
  SD, SO, ER, DJ, SS, MG, AE, SA, QA, KW, OM, BH, IN, CN, PK, BD, TR, GB, DE, FR,
  NL, SE, IT, ES, CH, PT, US, CA, BR, AU,
} from "country-flag-icons/react/3x2";

/**
 * CountryFlag - real inline-SVG flags via `country-flag-icons`.
 *
 * Windows browsers don't render regional-indicator flag EMOJI (they show the
 * bare "TZ"/"KE" letters), so we never use emoji. These SVGs render identically
 * on every platform. Codes are imported explicitly (not a namespace import) so
 * the bundle only carries the flags this app's phone picker actually lists.
 *
 * A code with no imported flag falls back to a clean 2-letter chip - deliberate
 * and consistent, never a broken glyph.
 *
 * Flags are 3:2; size via `className` (e.g. "h-4 w-6").
 */
const FLAGS: Record<string, typeof TZ> = {
  TZ, KE, UG, RW, BI, CD, MZ, MW, ZM, ZW, BW, NA, ZA, ET, NG, GH, EG, MA, SN, CG,
  SD, SO, ER, DJ, SS, MG, AE, SA, QA, KW, OM, BH, IN, CN, PK, BD, TR, GB, DE, FR,
  NL, SE, IT, ES, CH, PT, US, CA, BR, AU,
};

export function CountryFlag({ code, className }: { code: string; className?: string }) {
  const Flag = FLAGS[code];

  if (Flag) {
    return (
      <span
        className={cn("inline-flex overflow-hidden rounded-[3px] ring-1 ring-black/10", className)}
        aria-hidden="true"
      >
        <Flag className="h-full w-full" />
      </span>
    );
  }

  // Render-safe fallback: a clean country-code chip (never a broken emoji).
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[3px] bg-page-strong/60 ring-1 ring-black/10",
        "font-mono text-[0.6rem] font-bold uppercase leading-none text-text-muted",
        className,
      )}
      aria-hidden="true"
    >
      {code}
    </span>
  );
}
