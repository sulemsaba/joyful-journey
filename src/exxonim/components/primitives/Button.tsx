import { cn } from '@/exxonim/utils/cn'
import { forwardRef, type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
 * Button — Exxonim Design System Primitive
 *
 * 4-tier sizing with 4 variant styles + disabled / loading states.
 * Replaces all hand-coded button classes across the site.
 *
 * TIERS (static heights, responsive padding):
 *   hero     — h-12 (48px) — Hero sections, page CTAs, form submits
 *   standard — h-10 (40px) — Inline CTAs, cookie consent, error recovery
 *   compact  — h-8  (32px) — Sidebar CTAs, mega menu, bottom bars
 *                            (invisible touch-target expansion on mobile)
 *   icon     — w-9 h-9 (36px) — Close, share, arrows, toggles
 *
 * VARIANTS:
 *   primary   — bg-accent text-accent-contrast (the main action)
 *   secondary — border border-border-soft bg-surface/80 text-text (alternative)
 *   outline   — border border-accent text-accent (less prominent)
 *   ghost     — bg-transparent text-text (subtle / contextual)
 *
 * USAGE:
 *   <Button size="hero" variant="primary" href="/contact">Contact Us</Button>
 *   <Button size="standard" variant="secondary" onClick={handleClick}>Cancel</Button>
 *   <Button size="icon" variant="ghost" aria-label="Close"><XIcon /></Button>
 * ═══════════════════════════════════════════════════════════════ */

type ButtonSize = 'hero' | 'standard' | 'compact' | 'icon'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

/** Props that Button consumes internally. */
interface ButtonOwnProps {
  /** Visual tier — controls height, padding, and typography. */
  size?: ButtonSize
  /** Color / style variant. */
  variant?: ButtonVariant
  /** If provided, renders as <a> instead of <button>. */
  href?: string
  /** Button content. */
  children: ReactNode
  /** Click handler — works on both <button> and <a> elements. */
  onClick?: React.MouseEventHandler<HTMLElement>
  /** Additional classes — merged last so they can override. */
  className?: string
  /** Whether the button is disabled. */
  disabled?: boolean
  /** Whether the button is in a loading state (shows spinner, disables interaction). */
  isLoading?: boolean
  /** HTML type attribute — defaults to "button" for <button>, ignored for <a>. */
  type?: 'button' | 'submit' | 'reset'
  /** HTML target attribute for <a> links. */
  target?: string
  /** HTML rel attribute for <a> links. */
  rel?: string
  /** ARIA label — required for icon-only buttons. */
  'aria-label'?: string
}

/** Extra HTML attributes (ARIA, data-*, etc.) passed through to the underlying element. */
type ButtonRestProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ButtonOwnProps | 'ref'
>

export type ButtonProps = ButtonOwnProps & ButtonRestProps

/* ── Size styles ─────────────────────────────────────────────── */
const sizeStyles: Record<ButtonSize, string> = {
  hero: cn(
    'h-12 px-5 sm:px-6 rounded-full',
    'text-sm font-extrabold tracking-wide',
  ),
  standard: cn(
    'h-10 px-4 sm:px-5 rounded-full',
    'text-sm font-bold',
  ),
  compact: cn(
    'h-8 px-3 sm:px-4 rounded-full',
    'text-xs font-bold',
    /* Touch-target expansion: visually 32px but tappable ~48px on mobile.
     * The ::before pseudo-element extends the hit area by 8px above/below
     * without affecting layout or visual appearance. */
    'relative before:absolute before:-top-2 before:-bottom-2 before:left-0 before:right-0',
  ),
  icon: cn(
    'w-9 h-9 rounded-full',
    /* No text sizing — icon only */
  ),
}

/* ── Variant styles ──────────────────────────────────────────── */
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-accent text-accent-contrast',
    'hover:bg-accent-hover',
  ),
  secondary: cn(
    'border border-border-soft bg-surface/80 text-text',
    'hover:bg-surface',
  ),
  outline: cn(
    'border border-accent text-accent',
    'hover:bg-accent-soft',
  ),
  ghost: cn(
    'bg-transparent text-text',
    'hover:bg-accent-soft',
  ),
}

/* ── Shared base styles ─────────────────────────────────────── */
const baseStyles = cn(
  'inline-flex items-center justify-center',
  'transition-all duration-200',
  'hover:-translate-y-0.5 active:translate-y-0',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
)

/* ── Loading spinner ─────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

/* ── Component ───────────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      size = 'hero',
      variant = 'primary',
      href,
      children,
      onClick,
      className,
      disabled = false,
      isLoading = false,
      type = 'button',
      target,
      rel,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || isLoading
    const classes = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className,
    )

    const content = isLoading ? (
      <span className="inline-flex items-center gap-2">
        <Spinner />
        {children}
      </span>
    ) : (
      children
    )

    if (href && !isDisabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={onClick}
          {...rest}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        className={classes}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {content}
      </button>
    )
  },
)
