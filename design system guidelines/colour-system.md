# Colour System

## Overview

The colour system is built on CSS custom properties (design tokens) defined at the `:root` level and overridden under a `.dark` class for dark mode. All tokens are surfaced through Tailwind v4's `@theme inline` block, making them available as utility classes (`bg-primary`, `text-muted-foreground`, etc.).

In Angular, import the token file into your global `styles.scss` and consume tokens via CSS variables or Tailwind utilities.

---

## Token Architecture

```
:root { ... }          ← light mode defaults
.dark { ... }          ← dark mode overrides (toggle by adding .dark to <html>)
@theme inline { ... }  ← maps CSS vars → Tailwind color utilities
```

---

## Semantic Colour Tokens

Each token is a **role**, not a raw colour. Never hardcode hex values in components — always reference the token.

### Surface & Background

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Background | `--background` | `#ffffff` | `oklch(0.145 0 0)` ≈ `#1a1a1a` | Page/app background |
| Card | `--card` | `#ffffff` | `oklch(0.145 0 0)` ≈ `#1a1a1a` | Card, panel, surface background |
| Popover | `--popover` | `oklch(1 0 0)` = `#ffffff` | `oklch(0.145 0 0)` ≈ `#1a1a1a` | Dropdown, tooltip, popover background |

### Text & Foreground

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Foreground | `--foreground` | `oklch(0.145 0 0)` ≈ `#1a1a1a` | `oklch(0.985 0 0)` ≈ `#fafafa` | Default body text |
| Card Foreground | `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text on card surfaces |
| Popover Foreground | `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text in dropdowns, tooltips |
| Muted Foreground | `--muted-foreground` | `#717182` | `oklch(0.708 0 0)` ≈ `#9e9e9e` | Placeholder text, descriptions, captions |

### Brand / Interactive

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Primary | `--primary` | `#030213` | `oklch(0.985 0 0)` ≈ `#fafafa` | Primary buttons, active states, brand accent |
| Primary Foreground | `--primary-foreground` | `oklch(1 0 0)` = `#ffffff` | `oklch(0.205 0 0)` ≈ `#2e2e2e` | Text/icons on primary background |
| Secondary | `--secondary` | `oklch(0.95 0.0058 264.53)` ≈ `#eff0f7` | `oklch(0.269 0 0)` ≈ `#3d3d3d` | Secondary buttons, tags |
| Secondary Foreground | `--secondary-foreground` | `#030213` | `oklch(0.985 0 0)` | Text on secondary background |

### Neutral / Subtle

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Muted | `--muted` | `#ececf0` | `oklch(0.269 0 0)` ≈ `#3d3d3d` | Disabled backgrounds, skeleton loaders, tab lists |
| Accent | `--accent` | `#e9ebef` | `oklch(0.269 0 0)` | Hover states, highlighted rows, focus containers |
| Accent Foreground | `--accent-foreground` | `#030213` | `oklch(0.985 0 0)` | Text on accent background |

### Destructive / Error

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Destructive | `--destructive` | `#d4183d` | `oklch(0.396 0.141 25.723)` ≈ `#7a2020` | Error states, delete actions, validation errors |
| Destructive Foreground | `--destructive-foreground` | `#ffffff` | `oklch(0.637 0.237 25.331)` ≈ `#e87070` | Text/icons on destructive background |

### Structural

| Token | CSS Variable | Light Value | Dark Value | Usage |
|-------|-------------|-------------|------------|-------|
| Border | `--border` | `rgba(0, 0, 0, 0.1)` | `oklch(0.269 0 0)` | Dividers, input borders, card borders |
| Input | `--input` | `transparent` | `oklch(0.269 0 0)` | Input border colour (separate from background) |
| Input Background | `--input-background` | `#f3f3f5` | *(no dark override — inherits muted)* | Input field fill |
| Switch Background | `--switch-background` | `#cbced4` | *(no dark override)* | Toggle/switch unchecked track |
| Ring | `--ring` | `oklch(0.708 0 0)` ≈ `#9e9e9e` | `oklch(0.439 0 0)` ≈ `#5e5e5e` | Focus outline ring colour |

---

## Sidebar Colour Tokens

Sidebar uses its own token set to allow independent theming.

| Token | CSS Variable | Light Value | Dark Value |
|-------|-------------|-------------|------------|
| Sidebar Background | `--sidebar` | `oklch(0.985 0 0)` ≈ `#fafafa` | `oklch(0.205 0 0)` ≈ `#2e2e2e` |
| Sidebar Foreground | `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| Sidebar Primary | `--sidebar-primary` | `#030213` | `oklch(0.488 0.243 264.376)` ≈ `#3b5bdb` |
| Sidebar Primary Foreground | `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` |
| Sidebar Accent | `--sidebar-accent` | `oklch(0.97 0 0)` ≈ `#f5f5f5` | `oklch(0.269 0 0)` |
| Sidebar Accent Foreground | `--sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| Sidebar Border | `--sidebar-border` | `oklch(0.922 0 0)` ≈ `#e5e5e5` | `oklch(0.269 0 0)` |
| Sidebar Ring | `--sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` |

---

## Chart Colour Palette

Used exclusively for data visualisation (bar charts, line charts, pie charts).

| Token | CSS Variable | Light Value | Dark Value | Approximate Hue |
|-------|-------------|-------------|------------|-----------------|
| Chart 1 | `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` | Orange / Blue |
| Chart 2 | `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` | Cyan / Green |
| Chart 3 | `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` | Dark Blue / Yellow |
| Chart 4 | `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` | Yellow-Green / Purple |
| Chart 5 | `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` | Orange-Yellow / Red |

---

## Border Radius Tokens

| Token | CSS Variable | Computed Value | Usage |
|-------|-------------|----------------|-------|
| Base | `--radius` | `0.625rem` (10px) | Base unit |
| Small | `--radius-sm` | `calc(--radius - 4px)` = 6px | Close buttons, small badges |
| Medium | `--radius-md` | `calc(--radius - 2px)` = 8px | Inputs, dropdowns |
| Large | `--radius-lg` | `0.625rem` = 10px | Cards, modals |
| XL | `--radius-xl` | `calc(--radius + 4px)` = 14px | Large containers, sheets |

Additional one-off values used in components:
- `border-radius: 0` — square (none)
- `border-radius: 2px` — extra small (close icon buttons)
- `border-radius: 4px` — small (menu items)
- `border-radius: 50%` / `9999px` — full circle (avatars, toggle thumbs)

---

## Angular Implementation

### 1. Global CSS Variables (styles.scss)

```scss
// styles.scss — import the token file first
@use 'default_shadcn_theme.css';  // or copy :root block here

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  // ... all tokens
}

.dark {
  --background: oklch(0.145 0 0);
  --primary: oklch(0.985 0 0);
  // ... dark overrides
}
```

### 2. Consuming Tokens in Components

```scss
// my-component.scss
.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);

  &:hover {
    background-color: color-mix(in oklch, var(--primary) 90%, transparent);
  }

  &:focus-visible {
    outline: 3px solid var(--ring);
    outline-offset: 2px;
  }
}

.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
```

### 3. Dark Mode Toggle (Angular Service)

```typescript
// theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = signal(false);

  toggleDark(): void {
    this.isDark.update(v => !v);
    document.documentElement.classList.toggle('dark', this.isDark());
  }
}
```

---

## Colour Usage Rules

1. **Never hardcode hex/rgb values in component stylesheets** — always use a CSS variable token.
2. **Primary** is used for the single most important action per section. Do not repeat primary CTAs.
3. **Destructive** is reserved for irreversible or dangerous actions (delete, remove, revoke). Do not use it for warnings.
4. **Muted foreground** is for supporting text (descriptions, placeholders, captions) — not for primary readable content.
5. **Accent** is for hover states and selected row backgrounds only — not for brand identity.
6. **Border** uses `rgba(0,0,0,0.1)` in light mode intentionally for a semi-transparent, adaptive separator.
7. Chart colours must stay in sequence (1→5) to maintain consistent data series colouring across all charts.
8. Sidebar tokens must always be used within the sidebar layout context — do not bleed into page-level content.
9. All interactive elements must have a visible focus ring using `var(--ring)` at 3px width, `50%` opacity.
10. Opacity modifiers on tokens (e.g. `var(--ring) / 50%` or `ring/50` in Tailwind) are permitted for softer focus/hover states.
