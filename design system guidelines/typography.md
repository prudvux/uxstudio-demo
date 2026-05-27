# Typography

## Overview

The type system is built on a single typeface — **Inter** — loaded from Google Fonts. It relies on Tailwind v4's default fluid type scale with a 16px root size. Base HTML element styles (h1–h4, label, button, input) are set in `@layer base` so Tailwind utilities always take precedence.

---

## Font Family

| Role | Family | Fallback Stack |
|------|--------|----------------|
| All text | Inter | `ui-sans-serif, system-ui, -apple-system, sans-serif` |

### Loading in Angular

```scss
// styles.scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
}
```

---

## Root Font Size

```css
html {
  font-size: var(--font-size); /* = 16px */
}
```

All `rem` values below are relative to this 16px base.

---

## Type Scale

Tailwind v4 uses the following default scale (referenced via `--text-*` variables):

| Scale Key | CSS Variable | `rem` Value | `px` Equivalent |
|-----------|-------------|------------|-----------------|
| `xs` | `--text-xs` | `0.75rem` | 12px |
| `sm` | `--text-sm` | `0.875rem` | 14px |
| `base` | `--text-base` | `1rem` | 16px |
| `lg` | `--text-lg` | `1.125rem` | 18px |
| `xl` | `--text-xl` | `1.25rem` | 20px |
| `2xl` | `--text-2xl` | `1.5rem` | 24px |
| `3xl` | `--text-3xl` | `1.875rem` | 30px |
| `4xl` | `--text-4xl` | `2.25rem` | 36px |

---

## Font Weights

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Normal | `--font-weight-normal` | `400` | Body text, input values |
| Medium | `--font-weight-medium` | `500` | Headings, labels, buttons, interactive elements |
| Semi-bold | *(Tailwind utility)* | `600` | Sidebar group headings, emphasized labels |
| Bold | *(Tailwind utility)* | `700` | Rarely used; strong emphasis only |

---

## Line Height

| Context | Value | Notes |
|---------|-------|-------|
| All heading elements (h1–h4) | `1.5` | Consistent across all heading levels |
| Labels | `1.5` | Matches heading rhythm |
| Buttons | `1.5` | Prevents vertical alignment issues |
| Inputs | `1.5` | Comfortable reading in form fields |
| Body paragraphs | `1.5` (Tailwind default) | Readable prose line height |

---

## Heading Hierarchy

All heading styles are defined in `@layer base` in `theme.css`.

```
┌─────────────────────────────────────────────────────────────────────┐
│  h1  │  24px (1.5rem) │  weight: 500 │  line-height: 1.5            │
│      │  Usage: Page titles, hero headings                           │
├─────────────────────────────────────────────────────────────────────┤
│  h2  │  20px (1.25rem) │  weight: 500 │  line-height: 1.5           │
│      │  Usage: Section headings, dialog titles                      │
├─────────────────────────────────────────────────────────────────────┤
│  h3  │  18px (1.125rem) │  weight: 500 │  line-height: 1.5          │
│      │  Usage: Card titles, panel headings                          │
├─────────────────────────────────────────────────────────────────────┤
│  h4  │  16px (1rem) │  weight: 500 │  line-height: 1.5              │
│      │  Usage: Subsection labels, table headers, card action labels  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## UI Element Typography

| Element | Size | Weight | Line Height | Notes |
|---------|------|--------|-------------|-------|
| `label` | 16px (`--text-base`) | 500 | 1.5 | Form labels, always paired with inputs |
| `button` | 16px (`--text-base`) | 500 | 1.5 | All button variants share this base |
| `input` | 16px (`--text-base`) | 400 | 1.5 | Lighter weight than labels to differentiate |
| Placeholder | 16px | 400 | 1.5 | Colour: `var(--muted-foreground)` |
| Badge | 12px (`text-xs`) | 500 | 1 | Compact label in tight containers |
| Tooltip | 12px (`text-xs`) | 400 | *(default)* | Secondary information on hover |
| Menu Item | 14px (`text-sm`) | 400 | *(default)* | Dropdown, context menu, command palette |
| Table Cell | 14px (`text-sm`) | 400 | *(default)* | Data table body rows |
| Table Header | 14px (`text-sm`) | 500 | *(default)* | `<th>` elements in tables |
| Caption / Description | 14px (`text-sm`) | 400 | *(default)* | `var(--muted-foreground)` colour |

---

## Text Colour Roles

| Role | Token | Use Case |
|------|-------|----------|
| Primary text | `var(--foreground)` | Body copy, headings |
| Secondary text | `var(--muted-foreground)` | Descriptions, placeholders, captions |
| On-primary text | `var(--primary-foreground)` | Text on primary-coloured backgrounds |
| On-destructive text | `var(--destructive-foreground)` | Text on error/delete backgrounds |
| Disabled text | `var(--muted-foreground)` at 50% opacity | Disabled form elements |

---

## Angular Implementation

### 1. Global Typography Reset (styles.scss)

```scss
// styles.scss
html {
  font-size: 16px;
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
}

h1 { font-size: 1.5rem;   font-weight: 500; line-height: 1.5; }
h2 { font-size: 1.25rem;  font-weight: 500; line-height: 1.5; }
h3 { font-size: 1.125rem; font-weight: 500; line-height: 1.5; }
h4 { font-size: 1rem;     font-weight: 500; line-height: 1.5; }

label  { font-size: 1rem; font-weight: 500; line-height: 1.5; }
button { font-size: 1rem; font-weight: 500; line-height: 1.5; }
input  { font-size: 1rem; font-weight: 400; line-height: 1.5; }

p { line-height: 1.5; }
```

### 2. Component Usage Pattern

```scss
// Use utility classes or direct values — never hardcode font sizes
.card-title {
  font-size: 1rem;        // h4-equivalent
  font-weight: 500;
  line-height: 1;         // tight for card titles
}

.description {
  font-size: 0.875rem;    // text-sm
  color: var(--muted-foreground);
  line-height: 1.5;
}

.badge-label {
  font-size: 0.75rem;     // text-xs
  font-weight: 500;
  line-height: 1;
}
```

### 3. Angular Material Typography Override (if using Angular Material alongside)

```typescript
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

// Or define a custom typography config that aligns with Inter
const customTypography = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
};
```

---

## Typography Usage Rules

1. Use only **Inter** — do not introduce additional typefaces.
2. Maintain the heading hierarchy strictly: never skip levels (e.g. h1 → h3 without h2).
3. `font-weight: 500` is the default for all UI chrome (labels, buttons, headings). `font-weight: 400` is for data/content (body, inputs, table cells).
4. **Never** use `font-weight: 700` (bold) except for explicit high-emphasis cases reviewed in design.
5. `text-xs` (12px) is the **minimum** readable size — do not go smaller in any production UI.
6. Use `var(--muted-foreground)` for all secondary/supporting text — never use reduced opacity on `var(--foreground)` as a substitute.
7. Line height of `1.5` is the standard across all text roles — override only for compact UI elements (badge, table row, icon label) where `1` or `1.2` is appropriate.
8. Buttons must always have `font-weight: 500` regardless of variant (ghost, outline, destructive, etc.).
9. Do not use text decoration (underline) for navigation items — reserve it for the `link` button variant only.
10. Italic is not part of the type system — do not use it unless representing quoted/user-generated content.
