# Elevations

## Overview

Elevation communicates the hierarchical layering of UI surfaces. This system uses **box shadows**, **background opacity**, and **z-index stacking** to convey depth. Shadows follow a scale from subtle (`xs`) to prominent (`lg`). Overlays use semi-transparent black fills. Focus states use a dedicated ring system.

---

## Shadow Scale

Tailwind v4 default shadows are used without custom tokens. The scale below documents each level, its visual effect, and correct application.

### shadow-xs — Hairline Lift

```
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

| Property | Value |
|----------|-------|
| Offset Y | 1px |
| Blur | 2px |
| Spread | 0 |
| Opacity | 5% |

**Used by:** Checkbox, input field, form controls, switch track, icon buttons

**Perceived depth:** Element barely lifts from the page. Signals interactivity without visual noise.

---

### shadow-sm — Subtle Lift

```
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px -1px rgba(0, 0, 0, 0.1)
```

| Property | Value |
|----------|-------|
| Offset Y | 1–3px |
| Blur | 2–3px |
| Spread | 0 to -1px |
| Opacity | 10% |

**Used by:** Menubar, button (on hover), sidebar header

**Perceived depth:** Slightly elevated surface. Appropriate for chrome elements that sit above flat content.

---

### shadow-md — Floating

```
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1)
```

| Property | Value |
|----------|-------|
| Offset Y | 2–6px |
| Blur | 4–6px |
| Spread | -1px to -2px |
| Opacity | 10% |

**Used by:** Dropdown menus, select content, popover, hover card, command palette, context menu

**Perceived depth:** Clearly floating above page content. The default for all transient overlay surfaces.

---

### shadow-lg — Modal/Panel

```
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1)
```

| Property | Value |
|----------|-------|
| Offset Y | 4–15px |
| Blur | 6–15px |
| Spread | -3px to -4px |
| Opacity | 10% |

**Used by:** Dialog, sheet (slide-over), drawer, toast notifications

**Perceived depth:** Strong elevation for critical surfaces that require user attention or action.

---

## Elevation Hierarchy Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Layer 5 — Toast / Notification                  z-index: 100+     │
│  ┌───────────────────────────────────────┐                         │
│  │ "File saved successfully"    ✕        │  shadow-lg              │
│  └───────────────────────────────────────┘                         │
│                                                                     │
│  Layer 4 — Dialog / Sheet                        z-index: 50       │
│  ┌───────────────────────────────────────┐                         │
│  │          Modal Content                │  shadow-lg              │
│  │                                       │  (+ bg-black/50 scrim)  │
│  └───────────────────────────────────────┘                         │
│                                                                     │
│  Layer 3 — Dropdown / Popover / Tooltip          z-index: 50       │
│  ┌───────────────────────────────────┐                             │
│  │  Menu item                        │  shadow-md                  │
│  │  Menu item                        │                             │
│  └───────────────────────────────────┘                             │
│                                                                     │
│  Layer 2 — Cards / Sidebar                       z-index: 0        │
│  ┌──────────────────┐                                              │
│  │  Card Content    │  shadow-sm / no shadow                       │
│  └──────────────────┘                                              │
│                                                                     │
│  Layer 1 — Page / Background                     z-index: 0        │
│  (flat surface, var(--background))                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Overlay / Backdrop System

Modal-type components (Dialog, Alert Dialog, Sheet, Drawer) use a semi-transparent overlay to block the background and focus user attention on the foreground surface.

| Property | Value | Notes |
|----------|-------|-------|
| Position | `fixed inset-0` | Full viewport coverage |
| Z-index | `z-50` | Above all page content |
| Background | `rgba(0, 0, 0, 0.5)` (`bg-black/50`) | 50% black scrim |
| Animation | `fade-in-0` (enter), `fade-out-0` (leave) | Smooth appear/disappear |

```scss
// Angular overlay class
.ds-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 150ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## Focus Ring System

The focus ring is the primary accessibility affordance for keyboard navigation. It applies to all interactive elements.

### Specification

| Property | Value |
|----------|-------|
| Ring width | `3px` |
| Ring colour | `var(--ring)` = `oklch(0.708 0 0)` (light) / `oklch(0.439 0 0)` (dark) |
| Ring opacity | `50%` on all components (ring/50 in Tailwind) |
| Trigger | `:focus-visible` (keyboard only — not mouse click) |
| Offset | `2px` from element edge (outline-offset) |

### Validation / Error Focus Ring

When a form field is in an invalid state (`aria-invalid="true"`):

| Property | Value |
|----------|-------|
| Ring colour | `var(--destructive)` |
| Ring opacity | `20%` light / `40%` dark |
| Border colour | `var(--destructive)` |

### Focus Ring Implementation (Angular)

```scss
// Global focus mixin — add to styles.scss
@mixin focus-ring {
  &:focus-visible {
    outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
    outline-offset: 2px;
  }
}

// Or as a CSS class
.ds-focusable {
  &:focus-visible {
    outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
    outline-offset: 2px;
  }
}

// Invalid state
.ds-input[aria-invalid="true"] {
  border-color: var(--destructive);

  &:focus-visible {
    outline-color: color-mix(in oklch, var(--destructive) 20%, transparent);
  }
}
```

---

## Animation Specifications

All overlay entrance/exit animations follow a consistent pattern:

### Entrance

| Animation | Properties | Duration |
|-----------|-----------|----------|
| `fade-in-0` | `opacity: 0 → 1` | 150ms |
| `zoom-in-95` | `scale: 0.95 → 1` | 150ms |
| `slide-in-from-top` | `translateY(-100%) → 0` | 300ms |
| `slide-in-from-bottom` | `translateY(100%) → 0` | 300ms |
| `slide-in-from-left` | `translateX(-100%) → 0` | 300ms |
| `slide-in-from-right` | `translateX(100%) → 0` | 300ms |

### Exit

| Animation | Properties | Duration |
|-----------|-----------|----------|
| `fade-out-0` | `opacity: 1 → 0` | 150ms |
| `zoom-out-95` | `scale: 1 → 0.95` | 150ms |
| `slide-out-to-{side}` | Reverse of entrance | 300ms |

Sheet/Drawer animations use the longer 300–500ms duration to reinforce the physicality of a sliding panel.

---

## Angular Implementation

### 1. Shadow Utility Classes

```scss
// _elevation.scss
.ds-elevation-xs { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
.ds-elevation-sm { box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1); }
.ds-elevation-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
.ds-elevation-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
```

### 2. Angular CDK Overlay (for Dialogs / Sheets)

```typescript
// Using Angular CDK overlay for dialog-like surfaces
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

const overlayConfig = new OverlayConfig({
  hasBackdrop: true,
  backdropClass: 'ds-overlay',    // class defined above
  panelClass: 'ds-dialog-panel',
  positionStrategy: overlay.position().global().centerHorizontally().centerVertically(),
});
```

### 3. Animation with Angular Animations API

```typescript
// overlay.animation.ts
import { trigger, transition, style, animate, state } from '@angular/animations';

export const overlayAnimation = trigger('overlayState', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
]);

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
  ])
]);
```

---

## Elevation Usage Rules

1. **Never** use shadow to style decorative elements — shadows signal elevation/interactivity.
2. Use `shadow-md` for all floating surfaces (dropdowns, popovers, tooltips) consistently.
3. Use `shadow-lg` only for surfaces requiring full user focus (modals, sheets).
4. Cards and sidebar panels use **no shadow** by default — they rely on `border: 1px solid var(--border)` to define boundaries.
5. All backdrop overlays must use `bg-black/50` (50% opacity) — do not vary overlay darkness for aesthetic reasons.
6. Focus rings must be visible in **both** light and dark modes — test with the `.dark` class applied.
7. `:focus-visible` is required (not `:focus`) — mouse users must not see focus rings; keyboard users must always see them.
8. Avoid nesting multiple elevated surfaces (e.g. a dropdown inside a modal) — if unavoidable, the inner surface gets `shadow-md` and the outer stays `shadow-lg`.
9. Animations for overlays should stay ≤ 300ms — never use durations above 500ms for any transition.
10. The `z-50` stacking layer is shared — if conflicts arise, resolve by changing DOM order, not by escalating z-index values.
