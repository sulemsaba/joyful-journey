/**
 * PhoneInput - Integrated country-code + phone number input.
 *
 * Design:
 *   Single control: [ 🇹🇿 +255 | 712 345 678 ]
 *   - Country flag + dial code as a clickable prefix
 *   - Dropdown to select country (auto-focused, searchable)
 *   - Auto-format phone number as user types
 *   - E.164 output for backend storage: +255712345678
 *
 * Smart parsing:
 *   - Handles paste with country code: "255768944888" → strips "255" prefix
 *   - Handles leading zero: "0734123456" → removes "0", keeps "734123456"
 *   - Handles "+255" prefix: "+255 768 944 888" → strips dial code
 *
 * UX decisions:
 *   - Default country: Tanzania (🇹🇿 +255)
 *   - Top countries shown first (TZ, KE, UG, RW, BI, CD)
 *   - Phone is always required when this component is used
 *   - Auto-detect country from browser timezone (falls back to TZ)
 *   - Format: groups of 3 digits for readability
 *   - Dropdown: full-screen overlay on mobile, popover on desktop
 */

import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";
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
  // ── East Africa (top priority) ──
  { code: "TZ", name: "Tanzania",      dialCode: "+255", flag: "🇹🇿", localLength: 9, placeholder: "712 345 678" },
  { code: "KE", name: "Kenya",         dialCode: "+254", flag: "🇰🇪", localLength: 9, placeholder: "712 345 678" },
  { code: "UG", name: "Uganda",        dialCode: "+256", flag: "🇺🇬", localLength: 9, placeholder: "712 345 678" },
  { code: "RW", name: "Rwanda",        dialCode: "+250", flag: "🇷🇼", localLength: 9, placeholder: "712 345 678" },
  { code: "BI", name: "Burundi",       dialCode: "+257", flag: "🇧🇮", localLength: 8, placeholder: "7123 4567" },
  { code: "CD", name: "Congo (DRC)",   dialCode: "+243", flag: "🇨🇩", localLength: 9, placeholder: "812 345 678" },
  // ── Southern Africa ──
  { code: "MZ", name: "Mozambique",    dialCode: "+258", flag: "🇲🇿", localLength: 9, placeholder: "812 345 678" },
  { code: "MW", name: "Malawi",        dialCode: "+265", flag: "🇲🇼", localLength: 9, placeholder: "912 345 678" },
  { code: "ZM", name: "Zambia",        dialCode: "+260", flag: "🇿🇲", localLength: 9, placeholder: "912 345 678" },
  { code: "ZW", name: "Zimbabwe",      dialCode: "+263", flag: "🇿🇼", localLength: 9, placeholder: "712 345 678" },
  { code: "BW", name: "Botswana",      dialCode: "+267", flag: "🇧🇼", localLength: 8, placeholder: "7123 4567" },
  { code: "NA", name: "Namibia",       dialCode: "+264", flag: "🇳🇦", localLength: 9, placeholder: "812 345 678" },
  { code: "ZA", name: "South Africa",  dialCode: "+27",  flag: "🇿🇦", localLength: 9, placeholder: "71 234 5678" },
  // ── Other Africa ──
  { code: "ET", name: "Ethiopia",      dialCode: "+251", flag: "🇪🇹", localLength: 9, placeholder: "912 345 678" },
  { code: "NG", name: "Nigeria",       dialCode: "+234", flag: "🇳🇬", localLength: 10, placeholder: "802 345 6789" },
  { code: "GH", name: "Ghana",         dialCode: "+233", flag: "🇬🇭", localLength: 9, placeholder: "23 456 7890" },
  { code: "EG", name: "Egypt",         dialCode: "+20",  flag: "🇪🇬", localLength: 10, placeholder: "100 234 5678" },
  { code: "MA", name: "Morocco",       dialCode: "+212", flag: "🇲🇦", localLength: 9, placeholder: "612 345 678" },
  { code: "SN", name: "Senegal",       dialCode: "+221", flag: "🇸🇳", localLength: 9, placeholder: "712 345 678" },
  { code: "CG", name: "Congo",         dialCode: "+242", flag: "🇨🇬", localLength: 9, placeholder: "612 345 678" },
  { code: "SD", name: "Sudan",         dialCode: "+249", flag: "🇸🇩", localLength: 9, placeholder: "912 345 678" },
  { code: "SO", name: "Somalia",       dialCode: "+252", flag: "🇸🇴", localLength: 8, placeholder: "7123 4567" },
  { code: "ER", name: "Eritrea",       dialCode: "+291", flag: "🇪🇷", localLength: 8, placeholder: "7123 4567" },
  { code: "DJ", name: "Djibouti",      dialCode: "+253", flag: "🇩🇯", localLength: 8, placeholder: "7123 4567" },
  { code: "SS", name: "South Sudan",   dialCode: "+211", flag: "🇸🇸", localLength: 9, placeholder: "912 345 678" },
  { code: "MG", name: "Madagascar",    dialCode: "+261", flag: "🇲🇬", localLength: 9, placeholder: "312 345 678" },
  // ── Middle East ──
  { code: "AE", name: "UAE",           dialCode: "+971", flag: "🇦🇪", localLength: 9, placeholder: "50 123 4567" },
  { code: "SA", name: "Saudi Arabia",  dialCode: "+966", flag: "🇸🇦", localLength: 9, placeholder: "50 123 4567" },
  { code: "QA", name: "Qatar",         dialCode: "+974", flag: "🇶🇦", localLength: 8, placeholder: "7123 4567" },
  { code: "KW", name: "Kuwait",        dialCode: "+965", flag: "🇰🇼", localLength: 8, placeholder: "7123 4567" },
  { code: "OM", name: "Oman",          dialCode: "+968", flag: "🇴🇲", localLength: 8, placeholder: "9123 4567" },
  { code: "BH", name: "Bahrain",       dialCode: "+973", flag: "🇧🇭", localLength: 8, placeholder: "7123 4567" },
  // ── Asia ──
  { code: "IN", name: "India",         dialCode: "+91",  flag: "🇮🇳", localLength: 10, placeholder: "91234 56789" },
  { code: "CN", name: "China",         dialCode: "+86",  flag: "🇨🇳", localLength: 11, placeholder: "131 2345 6789" },
  { code: "PK", name: "Pakistan",      dialCode: "+92",  flag: "🇵🇰", localLength: 10, placeholder: "312 345 6789" },
  { code: "BD", name: "Bangladesh",    dialCode: "+880", flag: "🇧🇩", localLength: 10, placeholder: "1712 345678" },
  { code: "TR", name: "Turkey",        dialCode: "+90",  flag: "🇹🇷", localLength: 10, placeholder: "512 345 6789" },
  // ── Europe ──
  { code: "GB", name: "United Kingdom",dialCode: "+44",  flag: "🇬🇧", localLength: 10, placeholder: "7123 456789" },
  { code: "DE", name: "Germany",       dialCode: "+49",  flag: "🇩🇪", localLength: 10, placeholder: "171 2345678" },
  { code: "FR", name: "France",        dialCode: "+33",  flag: "🇫🇷", localLength: 9, placeholder: "612 345 678" },
  { code: "NL", name: "Netherlands",   dialCode: "+31",  flag: "🇳🇱", localLength: 9, placeholder: "612 345 678" },
  { code: "SE", name: "Sweden",        dialCode: "+46",  flag: "🇸🇪", localLength: 9, placeholder: "712 345 678" },
  { code: "IT", name: "Italy",         dialCode: "+39",  flag: "🇮🇹", localLength: 10, placeholder: "312 345 6789" },
  { code: "ES", name: "Spain",         dialCode: "+34",  flag: "🇪🇸", localLength: 9, placeholder: "612 345 678" },
  { code: "CH", name: "Switzerland",   dialCode: "+41",  flag: "🇨🇭", localLength: 9, placeholder: "712 345 678" },
  { code: "PT", name: "Portugal",      dialCode: "+351", flag: "🇵🇹", localLength: 9, placeholder: "912 345 678" },
  // ── Americas ──
  { code: "US", name: "United States", dialCode: "+1",   flag: "🇺🇸", localLength: 10, placeholder: "(712) 345-6789" },
  { code: "CA", name: "Canada",        dialCode: "+1",   flag: "🇨🇦", localLength: 10, placeholder: "(712) 345-6789" },
  { code: "BR", name: "Brazil",        dialCode: "+55",  flag: "🇧🇷", localLength: 11, placeholder: "11 91234 5678" },
  // ── Oceania ──
  { code: "AU", name: "Australia",     dialCode: "+61",  flag: "🇦🇺", localLength: 9, placeholder: "412 345 678" },
];

const COUNTRY_MAP = new Map(COUNTRIES.map((c) => [c.code, c]));

/* Build a reverse lookup: dial-code digits → country code
 * Used for stripping country codes from pasted values */
const DIAL_CODE_LOOKUP = new Map<string, string>();
for (const c of COUNTRIES) {
  const digits = c.dialCode.replace(/\D/g, "");
  // Only map if not ambiguous (e.g. US and CA both have +1)
  if (!DIAL_CODE_LOOKUP.has(digits)) {
    DIAL_CODE_LOOKUP.set(digits, c.code);
  }
}

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
      "Africa/Harare": "ZW",
      "Africa/Gaborone": "BW",
      "Africa/Windhoek": "NA",
      "Africa/Johannesburg": "ZA",
      "Africa/Lagos": "NG",
      "Africa/Accra": "GH",
      "Africa/Cairo": "EG",
      "Africa/Casablanca": "MA",
      "Africa/Dakar": "SN",
      "Africa/Brazzaville": "CG",
      "Africa/Khartoum": "SD",
      "Africa/Mogadishu": "SO",
      "Africa/Asmara": "ER",
      "Africa/Djibouti": "DJ",
      "Africa/Juba": "SS",
      "Africa/Antananarivo": "MG",
      "Europe/London": "GB",
      "America/New_York": "US",
      "America/Toronto": "CA",
      "America/Sao_Paulo": "BR",
      "Europe/Berlin": "DE",
      "Europe/Paris": "FR",
      "Europe/Amsterdam": "NL",
      "Europe/Stockholm": "SE",
      "Europe/Rome": "IT",
      "Europe/Madrid": "ES",
      "Europe/Zurich": "CH",
      "Europe/Lisbon": "PT",
      "Asia/Kolkata": "IN",
      "Asia/Shanghai": "CN",
      "Asia/Karachi": "PK",
      "Asia/Dhaka": "BD",
      "Asia/Istanbul": "TR",
      "Asia/Dubai": "AE",
      "Asia/Riyadh": "SA",
      "Asia/Qatar": "QA",
      "Asia/Kuwait": "KW",
      "Asia/Muscat": "OM",
      "Asia/Bahrain": "BH",
      "Australia/Sydney": "AU",
    };
    return tzCountryMap[tz] || "TZ";
  } catch {
    return "TZ";
  }
}

/* ═══════════════════════════════════════════════════════════════
 * Phone formatting & smart parsing
 * ═══════════════════════════════════════════════════════════════ */

/** Strip all non-digit characters from a phone string */
function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Result of smart-parsing a phone number input.
 * `detectedCountryCode` is set when the input contains a dial code
 * that belongs to a *different* country than the one currently selected.
 */
interface SmartParseResult {
  localDigits: string;
  /** ISO country code detected from the input, if different from the selected country */
  detectedCountryCode?: string;
}

/**
 * Smart parse raw input into local digits for a given country.
 *
 * Handles:
 *   - "+255 768 944 888"  → strips "+255" dial code → "768944888", detects TZ
 *   - "255768944888"       → strips "255" prefix    → "768944888", detects TZ
 *   - "0734123456"         → removes leading "0"     → "734123456"
 *   - "734123456"          → keeps as-is              → "734123456"
 *
 * When a different country's dial code is detected, the function returns
 * the local digits for that country AND signals which country was detected
 * so the component can auto-switch.
 */
function smartParse(rawInput: string, country: Country): SmartParseResult {
  let digits = stripNonDigits(rawInput);

  // 1. Try to strip the selected country's dial code
  const dialDigits = stripNonDigits(country.dialCode);
  if (digits.startsWith(dialDigits) && digits.length > dialDigits.length) {
    return { localDigits: digits.slice(dialDigits.length).slice(0, country.localLength) };
  }

  // 2. Try to detect any known country dial code and strip it
  // Check longest dial codes first (e.g. +255 before +25)
  const sortedDialCodes = [...DIAL_CODE_LOOKUP.keys()].sort((a, b) => b.length - a.length);
  for (const dialCodeDigits of sortedDialCodes) {
    if (digits.startsWith(dialCodeDigits) && digits.length > dialCodeDigits.length) {
      const detectedCode = DIAL_CODE_LOOKUP.get(dialCodeDigits)!;
      const detectedCountry = COUNTRY_MAP.get(detectedCode)!;
      const remaining = digits.slice(dialCodeDigits.length);
      // Only strip if the remaining digits look like a valid local number
      if (remaining.length <= detectedCountry.localLength) {
        return {
          localDigits: remaining.slice(0, detectedCountry.localLength),
          // Signal country switch if the detected country differs from current selection
          detectedCountryCode: detectedCode !== country.code ? detectedCode : undefined,
        };
      }
    }
  }

  // 3. Remove leading zero (common in local formats: 0734... → 734...)
  if (digits.startsWith("0") && digits.length > 1) {
    digits = digits.slice(1);
  }

  return { localDigits: digits.slice(0, country.localLength) };
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
  /** Called when country changes */
  onCountryChange?: (countryCode: string) => void;
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
  onCountryChange,
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
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        (c.name?.toLowerCase().includes(q) ?? false) ||
        (c.dialCode?.includes(q) ?? false) ||
        (c.code?.toLowerCase().includes(q) ?? false)
    );
  }, [searchQuery]);

  /* Refs for portal-rendered dropdowns */
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [desktopDropdownPosition, setDesktopDropdownPosition] = useState({ top: 0, left: 0 });

  /* Close dropdown on outside click
   * Must check BOTH dropdownRef (desktop popover) AND mobileSheetRef (portal bottom sheet)
   * because the mobile sheet is rendered via createPortal to document.body.
   * Also listen for touchstart for mobile devices. */
  useEffect(() => {
    if (!dropdownOpen) return;
    const isInside = (target: Node) => {
      const insideTrigger = dropdownRef.current?.contains(target);
      const insideMobile = mobileSheetRef.current?.contains(target);
      const insideDesktop = desktopDropdownRef.current?.contains(target);
      return insideTrigger || insideMobile || insideDesktop;
    };
    const mouseHandler = (e: MouseEvent) => {
      if (!isInside(e.target as Node)) {
        setDropdownOpen(false);
        setSearchQuery("");
      }
    };
    const touchHandler = (e: TouchEvent) => {
      if (!isInside(e.target as Node)) {
        setDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", mouseHandler);
    document.addEventListener("touchstart", touchHandler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", mouseHandler);
      document.removeEventListener("touchstart", touchHandler);
    };
  }, [dropdownOpen]);

  /* Calculate desktop dropdown position when it opens */
  useEffect(() => {
    if (dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDesktopDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
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
    onCountryChange?.(c.code);
    // Re-emit value with new country code
    const currentLocalDigits = stripNonDigits(localDigits);
    if (currentLocalDigits) {
      onChange(toE164(c, currentLocalDigits));
    }
  }, [localDigits, onChange, onCountryChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const result = smartParse(raw, country);
    setLocalDigits(result.localDigits);
    // Auto-switch country if a different dial code was detected
    if (result.detectedCountryCode) {
      const newCountry = COUNTRY_MAP.get(result.detectedCountryCode)!;
      setCountryCode(newCountry.code);
      onCountryChange?.(newCountry.code);
      onChange(toE164(newCountry, result.localDigits));
    } else {
      onChange(toE164(country, result.localDigits));
    }
  }, [country, onChange, onCountryChange]);

  /** Handle paste with smart parsing - also auto-switches country */
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const result = smartParse(pastedText, country);
    setLocalDigits(result.localDigits);
    // Auto-switch country if a different dial code was detected
    if (result.detectedCountryCode) {
      const newCountry = COUNTRY_MAP.get(result.detectedCountryCode)!;
      setCountryCode(newCountry.code);
      onCountryChange?.(newCountry.code);
      onChange(toE164(newCountry, result.localDigits));
    } else {
      onChange(toE164(country, result.localDigits));
    }
  }, [country, onChange, onCountryChange]);

  const handleDropdownToggle = useCallback(() => {
    if (disabled) return;
    setDropdownOpen((prev) => !prev);
    setSearchQuery("");
  }, [disabled]);

  /* ── Derived state ── */
  const formattedDisplay = formatLocalNumber(localDigits, country);
  const isComplete = localDigits.length === country.localLength;
  const validationState = isValid !== undefined ? isValid : (localDigits.length === 0 || isComplete);

  /* ── Dropdown content (shared between desktop popover and mobile bottom sheet) ── */
  const dropdownContent = (
    <>
      {/* Search */}
      <div className="p-2 border-b border-border-soft">
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-page-strong/40">
          <Search className="w-3.5 h-3.5 text-text-soft flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country..."
            className="w-full bg-transparent text-sm text-text placeholder:text-text-soft focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-0.5 rounded text-text-soft hover:text-text"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Country list - custom scrollbar */}
      <div className="max-h-60 overflow-y-auto overscroll-contain"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-border-soft) transparent",
        }}
      >
        <style>{`
          .phone-country-list::-webkit-scrollbar { width: 4px; }
          .phone-country-list::-webkit-scrollbar-track { background: transparent; }
          .phone-country-list::-webkit-scrollbar-thumb {
            background: var(--color-border-soft);
            border-radius: 9999px;
          }
          .phone-country-list::-webkit-scrollbar-thumb:hover {
            background: var(--color-text-muted);
          }
        `}</style>
        <div className="phone-country-list max-h-60 overflow-y-auto overscroll-contain">
          {filteredCountries.map((c) => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={c.code === countryCode}
              onClick={() => handleCountrySelect(c)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left",
                "hover:bg-accent-soft/50 active:bg-accent-soft/70 transition-colors",
                c.code === countryCode && "bg-accent-soft/30",
              )}
            >
              <span className="text-lg leading-none" aria-hidden="true">{c.flag}</span>
              <span className="flex-1 truncate text-text">{c.name}</span>
              <span className="text-text-muted text-xs font-mono">{c.dialCode}</span>
              {c.code === countryCode && (
                <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              )}
            </button>
          ))}
          {filteredCountries.length === 0 && (
            <p className="px-3 py-6 text-sm text-text-soft text-center">No countries found</p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className={cn("max-w-full", className)}>
      <label htmlFor={inputId} className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>

      <div className={cn(
        "flex items-stretch rounded-xl border transition-colors max-w-full overflow-hidden",
        "bg-page-strong/40",
        validationState
          ? "border-border-soft focus-within:ring-2 focus-within:ring-accent/20 focus-within:border-accent/40"
          : "border-error/40 focus-within:ring-2 focus-within:ring-error/20 focus-within:border-error/40",
        disabled && "opacity-50 cursor-not-allowed",
      )}>
        {/* ── Country selector button ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            ref={triggerRef}
            type="button"
            onClick={handleDropdownToggle}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1 sm:gap-1.5 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 border-r border-border-soft",
              "text-sm font-medium text-text whitespace-nowrap",
              "hover:bg-page-strong/40 transition-colors rounded-l-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
              "h-full min-h-[44px]",
            )}
            aria-label={`Select country, currently ${country.name}`}
            aria-expanded={dropdownOpen}
          >
            <span className="text-base sm:text-lg leading-none" aria-hidden="true">{country.flag}</span>
            <span className="text-text-muted font-mono text-xs">{country.dialCode}</span>
            <ChevronDown className={cn(
              "w-3 h-3 text-text-soft transition-transform",
              dropdownOpen && "rotate-180",
            )} />
          </button>

          {/* ── Desktop dropdown (popover, portal-rendered to avoid overflow clipping) ── */}
          {dropdownOpen && createPortal(
            <div
              ref={desktopDropdownRef}
              className={cn(
                "hidden sm:block fixed z-[65]",
                "w-72 bg-surface border border-border-soft rounded-xl shadow-2xl",
                "animate-in fade-in slide-in-from-top-1 duration-150",
                "overflow-hidden",
              )}
              style={{
                top: desktopDropdownPosition.top,
                left: desktopDropdownPosition.left,
              }}
              role="listbox"
              aria-label="Select country"
            >
              {dropdownContent}
            </div>,
            document.body,
          )}
        </div>

        {/* ── Phone number input ── */}
        <input
          ref={inputRef}
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={formattedDisplay}
          onChange={handleInputChange}
          onPaste={handlePaste}
          required={required}
          disabled={disabled}
          placeholder={country.placeholder}
          className={cn(
            "flex-1 min-w-0 px-3.5 py-3 bg-transparent text-text text-sm",
            "placeholder:text-text-soft",
            "focus:outline-none rounded-r-xl",
            "min-h-[44px]",
          )}
        />
      </div>

      {/* ── Validation hint ── */}
      {!validationState && (
        <p className="mt-1 text-xs text-error">
          Enter a valid {country.localLength}-digit phone number
        </p>
      )}

      {/* ── Mobile bottom sheet for country selection ── */}
      {dropdownOpen && createPortal(
        <div className="sm:hidden fixed inset-0 z-[70] flex items-end" ref={mobileSheetRef}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setDropdownOpen(false); setSearchQuery(""); }}
            aria-hidden="true"
          />
          {/* Bottom sheet */}
          <div
            className="relative z-10 w-full bg-surface border-t border-border-soft rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[80dvh] flex flex-col"
            role="listbox"
            aria-label="Select country"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border-soft" />
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              {dropdownContent}
            </div>
            {/* Close button */}
            <div className="p-3 border-t border-border-soft">
              <button
                type="button"
                onClick={() => { setDropdownOpen(false); setSearchQuery(""); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-text-muted bg-page-strong/40 hover:bg-page-strong/60 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
