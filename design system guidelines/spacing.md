# Spacing

## Overview

The spacing system is built on Tailwind v4's default scale, which uses a **4px base unit**. Every spacing value is a multiple of 4px. Spacing is applied via three mechanisms: `padding`, `margin`, and `gap` (flexbox/grid). Border radius values are defined as separate CSS tokens.

---

## Base Unit

```
1 spacing unit = 4px = 0.25rem
```

---

## Spacing Scale

| Scale | `rem` | `px` | Tailwind Class | Typical Use |
|-------|-------|------|----------------|-------------|
| 0 | 0 | 0 | `p-0`, `m-0`, `gap-0` | Reset / no space |
| 0.5 | `0.125rem` | 2px | `p-0.5`, `gap-0.5` | Micro gaps (icon button padding adjustment) |
| 1 | `0.25rem` | 4px | `p-1`, `gap-1` | Tight internal padding (badge, close button) |
| 1.5 | `0.375rem` | 6px | `p-1.5`, `gap-1.5` | Small padding inside compact components |
| 2 | `0.5rem` | 8px | `p-2`, `gap-2` | Icon-to-label gap, breadcrumb gap |
| 2.5 | `0.625rem` | 10px | `p-2.5`, `gap-2.5` | Slightly wider icon gaps |
| 3 | `0.75rem` | 12px | `p-3`, `gap-3` | Radio group / checkbox group gap |
| 4 | `1rem` | 16px | `p-4`, `gap-4` | Standard component padding, card content |
| 5 | `1.25rem` | 20px | `p-5` | Medium content sections |
| 6 | `1.5rem` | 24px | `p-6`, `gap-6` | Card header/footer padding, panel sections |
| 8 | `2rem` | 32px | `p-8`, `gap-8` | Large section padding |
| 10 | `2.5rem` | 40px | `p-10` | Page-level top/bottom padding |
| 12 | `3rem` | 48px | `p-12` | Hero / feature section spacing |

---

## Component-Level Spacing Conventions

### Buttons

```
┌─────────────────────────────────┐
│  Default (h-9):                 │
│  height: 36px                   │
│  padding: 0 12px (px-3)         │
│  gap (icon + label): 8px (gap-2) │
│                                 │
│  Small (h-8):                   │
│  height: 32px                   │
│  padding: 0 12px (px-3)         │
│                                 │
│  Large (h-10):                  │
│  height: 40px                   │
│  padding: 0 24px (px-6)         │
│                                 │
│  Icon (size-9):                 │
│  width: 36px, height: 36px      │
│  padding: 0 (square)            │
└─────────────────────────────────┘
```

### Inputs

```
height: 36px (h-9)
padding: 4px 12px (py-1 px-3)
```

### Cards

```
padding-horizontal: 24px (px-6)
padding-top (header): 24px (pt-6)
padding-bottom (footer): 24px (pb-6)
internal gap (between sections): 24px (gap-6)
```

### Dialogs / Modals

```
padding: 24px (p-6)
header-to-content gap: 16px (gap-4)
close button: top-4 right-4 (16px from edges)
```

### Dropdowns / Menus

```
container padding: 4px (p-1)
item padding: 6px 8px (py-1.5 px-2)
separator margin: 4px vertical, -4px horizontal (-mx-1 my-1)
label padding: 6px 8px (py-1.5 px-2)
```

### Form Groups

```
label-to-input gap: 8px (gap-2)
input-to-message gap: 6px (gap-1.5)
field-to-field gap: 16px (gap-4)
```

### Tooltips

```
padding: 6px 12px (py-1.5 px-3)
```

### Popovers

```
padding: 16px (p-4)
min-width: 288px (w-72)
offset from trigger: 4px (sideOffset: 4)
```

### Table

```
cell padding: 8px (p-2)
header height: 40px (h-10)
```

### Tabs

```
list height: 36px (h-9)
list padding: 3px (p-[3px])
trigger padding: matches list height (flex-centred)
```

### Sidebar

```
collapsed width: 56px (3.5rem)
expanded width: 300px (custom, not Tailwind)
SIDEBAR_WIDTH: 16rem (256px) — Tailwind constant
SIDEBAR_WIDTH_MOBILE: 18rem (288px)
SIDEBAR_WIDTH_ICON: 3rem (48px)
```

---

## Spacing Tokens — Border Radius

| Token | CSS Variable | Value | Use |
|-------|-------------|-------|-----|
| `--radius` | Base | `0.625rem` (10px) | Base; derived tokens depend on this |
| `--radius-sm` | Small | `calc(--radius - 4px)` = 6px | Small elements (close button, 2px radius inputs) |
| `--radius-md` | Medium | `calc(--radius - 2px)` = 8px | Inputs, selects, dropdowns |
| `--radius-lg` | Large | `0.625rem` (10px) | Cards, dialogs, tabs |
| `--radius-xl` | XL | `calc(--radius + 4px)` = 14px | Sheets, large overlays, toast |

Fixed non-token radii:
- `0px` — square (e.g. toggle group inner items)
- `2px` — micro (icon close buttons in badges)
- `4px` — menu items (rounded-sm)
- `9999px` / `50%` — pill/circle (avatar, switch thumb, radio, progress track)

---

## Z-Index Scale

Used for stacking overlays, dropdowns, and modals correctly:

| Level | Value | Used For |
|-------|-------|----------|
| Base | `0` | Normal content |
| Dropdown | `50` | Dropdowns, select menus, context menus |
| Overlay / Backdrop | `50` | Modal/dialog backdrop (`z-50`) |
| Modal / Dialog | `50` | Dialog content |
| Sheet | `50` | Slide-over panel |
| Tooltip | `50` | Tooltips |
| Toast / Sonner | `50+` | Toast notifications (above all) |

All overlay components use `z-50` consistently.

---

## Angular Implementation

### 1. CSS Custom Properties for Spacing (Optional Token Extension)

```scss
// styles.scss
:root {
  // Spacing tokens (4px base unit)
  --space-1:  0.25rem;   // 4px
  --space-2:  0.5rem;    // 8px
  --space-3:  0.75rem;   // 12px
  --space-4:  1rem;      // 16px
  --space-6:  1.5rem;    // 24px
  --space-8:  2rem;      // 32px

  // Border radius tokens
  --radius:    0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

### 2. Component Spacing Pattern

```scss
// card.component.scss
:host {
  display: block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;          // 24px
  display: flex;
  flex-direction: column;
  gap: 1.5rem;              // 24px between sections
}

.card-header {
  padding: 0;              // Header padding is on the card root
}

.card-footer {
  padding-top: 0;
  display: flex;
  align-items: center;
}
```

### 3. Button Sizing

```scss
// button.component.scss
.btn {
  height: 2.25rem;        // 36px (h-9)
  padding: 0 0.75rem;     // px-3
  gap: 0.5rem;            // gap-2
  border-radius: var(--radius-md);

  &.btn-sm {
    height: 2rem;         // 32px (h-8)
    padding: 0 0.75rem;
  }

  &.btn-lg {
    height: 2.5rem;       // 40px (h-10)
    padding: 0 1.5rem;    // px-6
  }

  &.btn-icon {
    width: 2.25rem;       // 36px (size-9)
    height: 2.25rem;
    padding: 0;
  }
}
```

---

## Spacing Usage Rules

1. All spacing values must be **multiples of 4px** — never use 3px, 5px, 7px, 9px, etc.
2. Use `gap` (flexbox/grid) for spacing **between** sibling elements; use `padding` for internal whitespace.
3. Do not use `margin` between flex/grid children — always use `gap` on the parent container instead.
4. Minimum touch target for interactive elements is **36×36px** (h-9 / size-9) on desktop; increase to 44×44px on mobile.
5. Consistent card anatomy: always 24px padding on all sides (`p-6`), 24px gap between header/body/footer.
6. Dialog/popover content should never touch the viewport edge — maintain at least 16px (`p-4`) clearance.
7. Icon-to-label gaps are always 8px (`gap-2`). Icon-only buttons have no padding gap.
8. Form field spacing: 8px between label and input, 24px between form rows.
9. Sidebar width constants (`SIDEBAR_WIDTH = 16rem`, `SIDEBAR_WIDTH_ICON = 3rem`) must not be modified — layout components depend on these exact values.
10. Border radius tokens are derived from `--radius` (10px base) — always use the derived tokens, never hardcode pixel values for radii.
