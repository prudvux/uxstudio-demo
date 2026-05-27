# Alert

## Description
An inline feedback banner providing contextual information, warnings, or error messages within the page flow. Unlike Toast (which is transient), Alert persists on the page until the condition resolves or the user dismisses it.

---

## Anatomy
```
Default variant:
┌──────────────────────────────────────────────────────────────┐
│  ℹ️  Alert Title                                             │  ← font-medium, col-start-2
│      Alert description providing context or instructions.    │  ← text-sm, muted-foreground, col-start-2
└──────────────────────────────────────────────────────────────┘
  bg: var(--card) = white
  border: 1px solid var(--border)
  border-radius: 8px (rounded-lg)
  padding: 12px 16px (px-4 py-3)
  display: grid (icon col 1, text col 2)
  icon size: 16px, aligned to first text line

Destructive variant:
┌──────────────────────────────────────────────────────────────┐
│  ⚠️  Error Title                                             │  ← color: var(--destructive)
│      Error description or validation summary.                │  ← text-sm
└──────────────────────────────────────────────────────────────┘
  bg: var(--card)
  border-color: var(--destructive)/50
  title + icon: color var(--destructive)
  description: text-sm muted-foreground (same as default)
```

---

## Variants

| Variant | Border | Icon/Title Colour | Background | Use Case |
|---------|--------|------------------|------------|----------|
| `default` | `var(--border)` | `var(--foreground)` | `var(--card)` | Information, tips, notices |
| `destructive` | `var(--destructive)/50` | `var(--destructive)` | `var(--card)` | Errors, failed operations, critical warnings |

---

## Structure
```html
<div
  role="alert"
  [attr.aria-live]="variant === 'destructive' ? 'assertive' : 'polite'"
  class="ds-alert"
  [class.ds-alert--destructive]="variant === 'destructive'"
>
  <!-- Optional icon slot -->
  <div *ngIf="icon" class="ds-alert__icon">
    <ds-icon [name]="icon" size="16"></ds-icon>
  </div>

  <!-- Content -->
  <div class="ds-alert__body">
    <div *ngIf="title" class="ds-alert__title">{{ title }}</div>
    <div class="ds-alert__description">
      <ng-content></ng-content>
    </div>
  </div>

  <!-- Optional dismiss button -->
  <button
    *ngIf="dismissible"
    (click)="dismiss()"
    aria-label="Dismiss alert"
    class="ds-alert__dismiss"
  >
    <ds-icon name="x" size="16"></ds-icon>
  </button>
</div>
```

---

## States

Alert itself is static. However:

| State | Behaviour |
|-------|-----------|
| **Visible** | Displayed inline in the document flow |
| **Dismissed** | Removed from DOM (when `dismissible: true`) |
| **Entering** | Optionally animate in from top (200ms) |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment |
| `title` | `string` | `undefined` | Alert heading |
| `icon` | `string` | `undefined` | Icon name (e.g. `'info'`, `'alert-triangle'`) |
| `dismissible` | `boolean` | `false` | Show dismiss (`✕`) button |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `dismissed` | `void` | Emitted when dismiss button clicked |

---

## Wireframe Skeleton

```
Informational alert:
┌───────────────────────────────────────────────────────────┐
│  ℹ️  Your subscription renews in 3 days                   │
│      Manage your plan in Billing Settings.                │
└───────────────────────────────────────────────────────────┘

Error alert (form submission failed):
┌───────────────────────────────────────────────────────────┐
│  ⚠️  Failed to save changes                               │
│      Please check your connection and try again.          │
└───────────────────────────────────────────────────────────┘

Dismissible info alert:
┌───────────────────────────────────────────────────────────┐
│  ℹ️  Feature preview: New dashboard is available           │  [✕]
│      Try it now and share your feedback.                  │
└───────────────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Place Alerts at the top of the relevant form, section, or page — not at the bottom where they may be missed.
2. Use `role="alert"` with `aria-live="assertive"` for errors; `aria-live="polite"` for information.
3. An Alert with no title is valid — use when the description is self-sufficient.
4. Use `destructive` only for actual errors — not for warnings or informational messages.
5. Do not use Alert as a substitute for inline form validation messages — use FormMessage beside the field.
6. Keep alert messages action-oriented where possible: state the problem AND what the user can do.
7. `dismissible` should only be enabled for informational or promotional alerts — error alerts should persist until resolved.
