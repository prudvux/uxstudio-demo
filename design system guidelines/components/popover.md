# Popover

## Description
A non-modal floating panel anchored to a trigger element. Unlike Dialog, the user can interact with the rest of the page while the popover is open. Used for rich contextual content, forms, settings snippets, and colour pickers.

---

## Anatomy
```
         ┌─────────────────────────────────────┐
         │  Popover content                    │  width: 288px (w-72)
         │                                     │  padding: 16px (p-4)
         │  [Any content: form, list, etc.]    │  border: 1px solid var(--border)
         │                                     │  border-radius: var(--radius-md) = 8px
         └─────────────────────────────────────┘  shadow: shadow-md
               ↑ 4px offset from trigger          bg: var(--popover)
         [Trigger button]

Positioning:
  Default: bottom, center-aligned to trigger
  Auto-flips when near viewport edge
  sideOffset: 4px (gap between trigger and popover)

Enter: fade-in-0 + zoom-in-95, 150ms
Exit: fade-out-0 + zoom-out-95, 150ms
```

---

## Structure
```html
<div class="ds-popover-container">
  <!-- Trigger -->
  <button #trigger (click)="toggle()" class="ds-popover-trigger">
    <ng-content select="[popover-trigger]"></ng-content>
  </button>

  <!-- Panel (rendered in portal) -->
  <div
    *ngIf="open"
    class="ds-popover"
    [style]="positionStyles"
    [@popoverState]
    (keydown.escape)="close()"
  >
    <ng-content></ng-content>
  </div>
</div>
```

---

## States

| State | Visibility | Animation |
|-------|-----------|-----------|
| **Closed** | Hidden | — |
| **Opening** | Visible | fade-in-0 + zoom-in-95 (150ms) |
| **Open** | Visible | — |
| **Closing** | Fading | fade-out-0 + zoom-out-95 (150ms) |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the side axis |
| `sideOffset` | `number` | `4` | Gap in px between trigger and popover |
| `closeOnOutsideClick` | `boolean` | `true` | Close on click outside |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `openChange` | `boolean` | Emitted on open/close |

---

## Wireframe Skeleton

```
Settings popover:
[⚙️ Settings ▾]
┌──────────────────────────────────────┐
│  Appearance                          │
│  ○ Light  ●  Dark  ○ System          │
│  ──────────────────────────────────  │
│  Language                            │
│  [English (US)                    ▾] │
│  ──────────────────────────────────  │
│                     [Apply changes]  │
└──────────────────────────────────────┘

Date filter popover:
[📅 May 2026 ▾]
┌────────────────────────────────────────┐
│  ◀  May 2026  ▶                        │
│  Mo Tu We Th Fr Sa Su                  │
│   1  2  3  4  5  6  7                  │
│   8  9 10 11 12 13 14                  │
│  ...                                   │
└────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Popover for **rich content** (forms, pickers, multi-line info) — use Tooltip for simple text labels.
2. Popover width is fixed at 288px — do not widen or constrain it per usage.
3. Always close on Escape key and on click outside the popover.
4. Do not use Popover for critical information that must be acknowledged — use Dialog.
5. Popovers must auto-flip position when near the viewport edge.
6. If popover content has interactive elements (forms, buttons), ensure they are keyboard-accessible and focus is managed correctly on open.
