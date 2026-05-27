# Tooltip

## Description
A concise text label that appears near an interactive element to explain its purpose, provide a keyboard shortcut hint, or clarify an icon-only control. Tooltips appear on hover and focus, and contain only plain text — never interactive content.

---

## Anatomy
```
      ┌──────────────────────────┐
      │  Tooltip text             │  bg: var(--primary) = #030213
      └─────────▴────────────────┘  color: var(--primary-foreground) = white
                ↑ arrow triangle    padding: 6px 12px (py-1.5 px-3)
                  5×5px             font: text-xs (12px)
                  bg: primary fill  border-radius: var(--radius-md)
          [Icon button]

Arrow: 5×5px (size-2.5) triangle pointing toward trigger
Offset from trigger: 4px (via sideOffset)
z-index: 50

Enter: fade-in-0 + zoom-in-95, 150ms
Exit: fade-out-0 + zoom-out-95, 150ms
```

---

## Structure
```html
<div class="ds-tooltip-container">
  <!-- Trigger -->
  <ng-content select="[tooltip-trigger]"></ng-content>

  <!-- Tooltip (rendered in portal, appears on hover/focus) -->
  <div
    *ngIf="visible"
    role="tooltip"
    [id]="tooltipId"
    class="ds-tooltip"
    [class]="'ds-tooltip--' + side"
    [@tooltip]
  >
    {{ content }}
    <div class="ds-tooltip__arrow"></div>
  </div>
</div>
```

---

## Variants

| Property | Value | Notes |
|----------|-------|-------|
| Background | `var(--primary)` | Dark fill by default |
| Text | `var(--primary-foreground)` | White |
| Arrow | Matching primary fill | Points toward trigger |

---

## States

| Trigger Event | Tooltip Behaviour |
|--------------|------------------|
| Mouse hover | Opens after `delayDuration` ms |
| Mouse leave | Closes immediately |
| Focus (keyboard) | Opens immediately (`delayDuration: 0`) |
| Blur | Closes immediately |
| Escape key | Closes |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string` | required | Tooltip text |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along side axis |
| `sideOffset` | `number` | `4` | Gap in px from trigger |
| `delayDuration` | `number` | `0` | Hover open delay in ms |

---

## Wireframe Skeleton

```
Icon button with tooltip:

                Save file
                    ▼
              [💾 icon btn]

Multiple tooltips in toolbar:
        Bold        Italic      Underline
          ▼            ▼            ▼
         [B]          [I]          [U]

Keyboard shortcut hint:
           Copy  ⌘C
              ▼
        [📋 Copy button]
```

---

## Usage Rules

1. Tooltip text must be plain text only — no HTML, no interactive elements, no links.
2. Keep tooltip text under 80 characters. Anything longer belongs in a Popover.
3. Tooltips are **not accessible on touch screens** — never put essential information only in tooltips.
4. Icon-only buttons **must** have a tooltip (and `aria-label`) — it is the primary way to communicate the button's action.
5. Do not show tooltips on buttons that already have a visible text label — it is redundant.
6. Use `delayDuration: 0` for icon buttons (immediate feedback); use 500–700ms for inline text triggers to avoid flicker.
7. Tooltip trigger must set `aria-describedby` pointing to the tooltip `id` when it is visible.
8. Do not use tooltips to explain disabled states — show the disabled reason inline or with a helper text below the control.
