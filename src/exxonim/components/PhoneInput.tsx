/**
 * PhoneInput — Integrated country-code + phone number input.
 *
 * Design:
 *   Single control: [ 🇹🇿 +255 | 712 345 678 ]
 *   - Country flag + dial code as a clickable prefix
 *   - Dropdown to select country (auto-focused, searchable)
 *   - Auto-format phone number as user types
 *   - E.164 output for backend storage: +255712345678
 *
 * UX decisions:
 *   - Default country: Tanzania (🇹🇿 +255)
 *   - Top countries shown first (TZ, KE, UG, RW, BI, CD)
 *   - Phone is always required when this component is used
 *   - Auto-detect country from browser timezone (falls back to TZ)
 *   - Format: groups of 3 digits for readability
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/exxonim/utils/cn";

/* ═══════════════════════════════════════════════════════════════
 * Country data
 * ═══════════════════════════════════════════════════════════════ */
interface Country {
  code: string;       // ISO 3166-1 alpha-2
  name: string;
  dialCode: string;   // e.g. "+255"
  flag: string;       // emoji flag
  /** Phone number length (local, without dial code) */
  localLength: number;
  /** Example local format */
  placeholder: string;
}

const COUNTRIES: Country[] = [
  { code: "TZ", name: "Tanzania",      dialCode: "+255", flag: "🇹🇿", localLength: 9, placeholder: "712 345 678" },
  { code: "KE", name: "Kenya",         dialCode: "+254", flag: "🇰🇪", localLength: 9, placeholder: "712 345 678" },
  { code: "UG", name: "Uganda",        dialCode: "+256", flag: "🇺🇬", localLength: 9, placeholder: "712 345 678" },
  { code: "RW", name: "Rwanda",        dialCode: "+250", flag: "🇷🇼", localLength: 9, placeholder: "712 345 678" },
  { code: "BI", name: "Burundi",       dialCode: "+257", flag: "🇧🇮", localLength: 8, placeholder: "7123 4567" },
  { code: "CD", name: "Congo (DRC)",   dialCode: "+243", flag: "🇨🇩", localLength: 9, placeholder: "812 345 678" },
  { code: "ET", name: "Ethiopia",      dialCode: "+251", flag: "🇪🇹", localLength: 9, placeholder: "912 345 678" },
  { code: "MW", name: "Malawi",        dialCode: "+265", flag: "🇲🇼", localLength: 9, placeholder: "912 345 678" },
  { code: "MZ", name: "Mozambique",    dialCode: "+258", flag: "🇲🇿", localLength: 9, placeholder: "812 345 678" },
  { code: "ZM", name: "Zambia",        dialCode: "+260", flag: "🇿🇲", localLength: 9, placeholder: "912 345 678" },
  { code: "GB", name: "United Kingdom",dialCode: "+44",  flag: "🇬🇧", localLength: 10, placeholder: "7123 456789" },
  { code: "US", name: "United States", dialCode: "+1",   flag: "🇺🇸", localLength: 10, placeholder: "(712) 345-6789" },
  { code: "DE", name: "Germany",       dialCode: "+49",  flag: "🇩🇪", localLength: 10, placeholder: "171 2345678" },
  { code: "IN", name: "India",         dialCode: "+91",  flag: "🇮🇳", localLength: 10, placeholder: "91234 56789" },
  { code: "CN", name: "China",         dialCode: "+86",  flag: "🇨🇳", localLength: 11, placeholder: "131 2345 6789" },
  { code: "AE", name: "UAE",           dialCode: "+971", flag: "🇦🇪", localLength: 9, placeholder: "50 123 4567" },
  { code: "SA", name: "Saudi Arabia",  dialCode: "+966", flag: "🇸🇦", localLength: 9, placeholder: "50 123 4567" },
  { code: "ZA", name: "South Africa",  dialCode: "+27",  flag: "🇿🇦", localLength: 9, placeholder: "71 234 5678" },
  { code: "NG", name: "Nigeria",       dialCode: "+234", flag: "🇳🇬", localLength: 10, placeholder: "802 345 6789" },
  { code: "GH", name: "Ghana",         dialCode: "+233", flag: "🇬🇭", localLength: 9, placeholder: "23 456 7890" },
];

const COUNTRY_MAP = new Map(COUNTRIES.map((c) => [c.code, c]));

/* ═══════════════════════════════════════════════════════════════
 * Auto-detect country from timezone
 * ═══════════════════════════════════════════════════════════════ */
function detectCountryCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzCountryMap: Record<string, string> = {
      "Africa/Dar_es_Salaam": "TZ",
      "Africa/Nairobi": "KE",
      "Africa/Kampala": "UG",
      "Africa/Kigali": "RW",
      "Africa/Bujumbura": "BI",
      "Africa/Kinshasa": "CD",
      "Africa/Addis_Ababa": "ET",
      "Africa/Blantyre": "MW",
      "Africa/Maputo": "MZ",
      "Africa/Lusaka": "ZM",
      "Africa/Johannesburg": "ZA",
      "Africa/Lagos": "NG",
      "Africa/Accra": "GH",
      "Europe/London": "GB",
      "America/New_York": "US",
      "Europe/Berlin": "DE",
      "Asia/Kolkata": "IN",
      "Asia/Shanghai": "CN",
      "Asia/Dubai": "AE",
      "Asia/Riyadh": "SA",
    };
    return tzCountryMap[tz] || "TZ";
  } catch {
    return "TZ";
  }
}

/* ═══════════════════════════════════════════════════════════════
 * Phone formatting
 * ═══════════════════════════════════════════════════════════════ */

/** Strip all non-digit characters from a phone string */
function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Format a local phone number for display.
 * Groups digits for readability: "712345678" → "712 345 678"
 */
function formatLocalNumber(digits: string, country: Country): string {
  const d = digits.slice(0, country.localLength);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  // Default: groups of 3
  const groups: string[] = [];
  let i = 0;
  while (i < d.length) {
    groups.push(d.slice(i, i + 3));
    i += 3;
  }
  return groups.join(" ");
}

/**
 * Build E.164 format from country + local digits.
 * Example: country=TZ, localDigits="712345678" → "+255712345678"
 */
function toE164(country: Country, localDigits: string): string {
  const clean = stripNonDigits(localDigits).slice(0, country.localLength);
  return `${country.dialCode}${clean}`;
}

/* ═══════════════════════════════════════════════════════════════
 * Props
 * ═══════════════════════════════════════════════════════════════ */
export interface PhoneInputProps {
  /** Called with E.164 formatted value on every change */
  value: string;
  onChange: (e164: string) => void;
  /** Whether the field is required */
  required?: boolean;
  /** External validation: is the current value valid? */
  isValid?: boolean;
  /** Label text (defaults to "Phone number") */
  label?: string;
  /** Additional class for the outer wrapper */
  className?: string;
  /** HTML id for the input */
  id?: string;
  /** Disable the input */
  disabled?: boolean;
}

/* ═══════════════════════════════════════════════════════════════
 * Component
 * ═══════════════════════════════════════════════════════════════ */
export function PhoneInput({
  value,
  onChange,
  required = true,
  isValid,
  label = "Phone number",
  className,
  id: externalId,
  disabled = false,
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = externalId || generatedId;

  /* ── Detect initial country ── */
  const [countryCode, setCountryCode] = useState(() => detectCountryCode());
  const country = COUNTRY_MAP.get(countryCode) || COUNTRIES[0];

  /* ── Parse E.164 value into local digits ── */
  const [localDigits, setLocalDigits] = useState(() => {
    if (!value) return "";
    // Strip the dial code if present
    const digits = stripNonDigits(value);
    const dialDigits = stripNonDigits(country.dialCode);
    if (digits.startsWith(dialDigits)) {
      return digits.slice(dialDigits.length);
    }
    return digits;
  });

  /* ── Sync external value changes ── */
  useEffect(() => {
    if (!value) {
      setLocalDigits("");
      return;
    }
    const digits = stripNonDigits(value);
    const dialDigits = stripNonDigits(country.dialCode);
    if (digits.startsWith(dialDigits)) {
      const local = digits.slice(dialDigits.length);
      if (local !== localDigits) {
        setLocalDigits(local);
      }
    }
  }, [value, country.dialCode, localDigits]);

  /* ── Country selector dropdown ── */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  /* Focus search input when dropdown opens */
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [dropdownOpen]);

  /* ── Handlers ── */
  const handleCountrySelect = useCallback((c: Country) => {
    setCountryCode(c.code);
    setDropdownOpen(false);
    setSearchQuery("");
    // Re-emit value with new country code
    const currentLocalDigits = stripNonDigits(localDigits);
    if (currentLocalDigits) {
      onChange(toE164(c, currentLocalDigits));
    }
  }, [localDigits, onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = stripNonDigits(e.target.value);
    const trimmed = raw.slice(0, country.localLength);
    setLocalDigits(trimmed);
    onChange(toE164(country, trimmed));
  }, [country, onChange]);

  const handleDropdownToggle = useCallback(() => {
    if (disabled) return;
    setDropdownOpen((prev) => !prev);
    setSearchQuery("");
  }, [disabled]);

  /* ── Derived state ── */
  const formattedDisplay = formatLocalNumber(localDigits, country);
  const isComplete = localDigits.length === country.localLength;
  const validationState = isValid !== undefined ? isValid : (localDigits.length === 0 || isComplete);

  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-text mb-1.5">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>

      <div className={cn(
        "flex items-stretch rounded-xl border transition-all",
        "bg-page-strong/40",
        validationState
          ? "border-border-soft focus-within:ring-2 focus-within:ring-accent/20 focus-within:border-accent/40"
          : "border-error/40 focus-within:ring-2 focus-within:ring-error/20 focus-within:border-error/40",
        disabled && "opacity-50 cursor-not-allowed",
      )}>
        {/* ── Country selector button ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleDropdownToggle}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 border-r border-border-soft",
              "text-sm font-medium text-text whitespace-nowrap",
              "hover:bg-page-strong/40 transition-colors rounded-l-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
              "min-w-[5.5rem]",
            )}
            aria-label={`Select country, currently ${country.name}`}
            aria-expanded={dropdownOpen}
          >
            <span className="text-base leading-none" aria-hidden="true">{country.flag}</span>
            <span className="text-text-muted">{country.dialCode}</span>
            <ChevronDown className={cn(
              "w-3 h-3 text-text-soft transition-transform",
              dropdownOpen && "rotate-180",
            )} />
          </button>

          {/* ── Dropdown ── */}
          {dropdownOpen && (
            <div
              className={cn(
                "absolute top-full left-0 z-50 mt-1",
                "w-64 bg-surface border border-border-soft rounded-xl shadow-xl",
                "animate-in fade-in slide-in-from-top-1 duration-150",
                "overflow-hidden",
              )}
              role="listbox"
              aria-label="Select country"
            >
              {/* Search */}
              <div className="p-2 border-b border-border-soft">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-page-strong/40">
                  <Search className="w-3.5 h-3.5 text-text-soft flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full bg-transparent text-sm text-text placeholder:text-text-soft focus:outline-none"
                  />
                </div>
              </div>

              {/* Country list */}
              <div className="max-h-52 overflow-y-auto scrollbar-thin">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={c.code === countryCode}
                    onClick={() => handleCountrySelect(c)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left",
                      "hover:bg-accent-soft/50 transition-colors",
                      c.code === countryCode && "bg-accent-soft/30",
                    )}
                  >
                    <span className="text-base leading-none" aria-hidden="true">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-text-soft text-xs">{c.dialCode}</span>
                    {c.code === countryCode && (
                      <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    )}
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <p className="px-3 py-4 text-sm text-text-soft text-center">No countries found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Phone number input ── */}
        <input
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={formattedDisplay}
          onChange={handleInputChange}
          required={required}
          disabled={disabled}
          placeholder={country.placeholder}
          className={cn(
            "flex-1 min-w-0 px-3.5 py-3 bg-transparent text-text text-sm",
            "placeholder:text-text-soft",
            "focus:outline-none rounded-r-xl",
          )}
        />
      </div>

      {/* ── Validation hint ── */}
      {!validationState && (
        <p className="mt-1 text-xs text-error">
          Enter a valid {country.localLength}-digit phone number
        </p>
      )}
    </div>
  );
}
