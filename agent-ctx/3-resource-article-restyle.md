# Task 3 - ResourceArticlePage Restyle

## Task
Restyle the ResourceArticlePage (blog post reading page) with JOTOFA-style 2-column blog detail layout.

## Files Modified
1. `/src/exxonim/pages/ResourceArticlePage.tsx` — Complete rewrite with JOTOFA-style layout
2. `/src/app/globals.css` — Added `sidebar-scroll` CSS class

## Key Changes
- **Animated Back Button**: framer-motion `motion.a` with spring animation, ArrowLeft icon
- **Category Badge**: Color-coded pill with accent-soft bg, accent text, accent/20 border
- **Title**: Responsive sizing (2xl → 4xl)
- **Meta Row**: Author (User icon), Category pill, Read time (Clock), Date (Calendar), Like button (Heart)
- **Hero Image**: Rounded-2xl, responsive heights, gradient overlay, gradient placeholder fallback
- **2-Column Layout**: `grid lg:grid-cols-[2fr_1fr]` — article body left, sticky sidebar right
- **Article Body**: Enhanced prose with targeted CSS selectors for h2, h3, p, ul, ol, blockquote, strong, a, img
- **Sticky Sidebar**: Share buttons (X, LinkedIn, Copy), Tags (category-based), Related Articles (thumbnail+title+date), Newsletter Box
- **CTA Banner**: Teal gradient background, white text, two action buttons
- **Mobile**: Single column below lg, sidebar stacks below article

## Lint
Clean — no errors.

## Work Record
Written to `/home/z/my-project/worklog.md` under Task ID: 3.
