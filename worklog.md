---
Task ID: 1
Agent: main
Task: Implement all audit fixes for Track Your Consultation page

Work Log:
- Added `--color-warning` and `--color-warning-soft` CSS tokens to globals.css in all 5 required locations: @property registration, @theme block, :root light mode, html[data-theme="dark"] dark mode, and html.theme-transition transition list
- Rewrote TrackConsultationPage.tsx implementing 22 audit fixes:
  - #1 (Critical): warning/warning-soft CSS tokens now defined (amber/brown for light, yellow for dark)
  - #2: Added scroll-to-result via scrollIntoView after lookup
  - #3: Rejected client-side format validation (security decision) — generic "Enter your 6-character tracking code" aria-label
  - #4: Removed autoFocus from input
  - #5: Added empty state placeholder card ("Your tracking result will appear here")
  - #6: Progress bar color now matches status (accent/success/warning)
  - #7: Added "Look up another code" button on success and "Try Again" button on not-found
  - #8: Not applicable for this phase (shadcn migration deferred)
  - #9: Replaced gimmicky "0 Logins / 1 Code / ∞" stats with icon-led "No Account Needed / Instant Results / WhatsApp Updates"
  - #10: Demo hint now env-gated (NEXT_PUBLIC_SHOW_DEMO_HINT), shown as clickable chips
  - #11: Timeline connector shows intermediate style (dashed accent) between completed→current
  - #12: Detail grid changed to grid-cols-1 sm:grid-cols-2 md:grid-cols-4
  - #13: Added "Press Enter to check" hint when canSearch is true
  - #14: Error alert now has dismiss (X) button
  - #15: formatDate now shows relative time (<7 days) with absolute date in tooltip
  - #16: Hero gradient replaced hsl() with color-mix() for correct token reference
  - #17: Custom SVG icons replaced with Lucide: Search, ShieldCheck, Bell, Clock, UserRoundX, MessageCircle, X, RotateCcw
  - #18: Already covered by #4 (autoFocus removal)
  - #19: Page content wrapped in <main> landmark
  - #20: CTA style verified and fixed (hsl→color-mix)
  - #21: Fixed double-alpha on text-text-muted/70 — now uses plain text-text-muted class
  - #22: Added skeleton loading card with shimmer animation
  - #23: Removed redundant .trim() from canSearch check
  - #24: Changed "Encrypted" label to "Secure Lookup" on security visual
  - #25: Fixed by #9 (infinity symbol removed)
- SECURITY: TrackingNotFound now shows completely generic message with no format hints
- Not-found card has "Try Again" (resets input) and "Forgot Your Code?" (links to contact)
- Lint passes clean, no runtime errors, all three demo codes verified working

Stage Summary:
- globals.css: Added warning/warning-soft tokens (light: amber #b45309, dark: yellow #fbbf24)
- TrackConsultationPage.tsx: Complete rewrite with 22 audit fixes implemented
- All changes verified in browser (dark mode, light mode, mobile viewport)
- No console errors, no lint issues, page renders correctly
