# Hover Card

## Description
A floating preview card that appears when hovering over a trigger element (typically a link, username, or reference). Always read-only — contains no interactive elements. Used to provide supplementary context without navigation.

---

## Anatomy
```
  [Hover trigger — e.g. @username link]
         ↓ (opens after hover delay)
  ┌──────────────────────────────────────┐
  │  [Avatar]  Display Name             │  width: 256px (w-64)
  │            @username                │  padding: 16px (p-4)
  │  ───────────────────────────────── │  border: 1px solid var(--border)
  │  Bio or description text here.     │  border-radius: var(--radius-md)
  │  Joined March 2022 · 142 posts     │  shadow: shadow-md
  └──────────────────────────────────────┘  bg: var(--popover)

  sideOffset: 4px
  Opens on hover (no delay by default)
  Closes when mouse leaves trigger AND card
```

---

## Structure
```html
<div class="ds-hover-card-container"
  (mouseenter)="startOpen()"
  (mouseleave)="startClose()"
>
  <!-- Trigger -->
  <span class="ds-hover-card-trigger">
    <ng-content select="[hover-trigger]"></ng-content>
  </span>

  <!-- Panel -->
  <div
    *ngIf="open"
    class="ds-hover-card"
    [@hoverCard]
    (mouseenter)="cancelClose()"
    (mouseleave)="startClose()"
  >
    <ng-content></ng-content>
  </div>
</div>
```

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `openDelay` | `number` | `700` | ms before opening on hover |
| `closeDelay` | `number` | `300` | ms before closing after hover leaves |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment |
| `sideOffset` | `number` | `4` | Gap from trigger |

---

## Wireframe Skeleton

```
Text with hover preview:
  Created by @janedoe 3 days ago

             ↓ hover triggers preview
  ┌────────────────────────────────────┐
  │  👤  Jane Doe                      │
  │      @janedoe                      │
  │  ─────────────────────────────    │
  │  Product designer at Acme Corp.   │
  │  Joined Jan 2021 · 847 followers  │
  └────────────────────────────────────┘
```

---

## Usage Rules

1. Hover Card content must be **read-only** — do not place buttons, links, or form elements inside.
2. Do not rely on Hover Card for touch/mobile users — provide an alternative way to access the same info.
3. Use an `openDelay` of at least 500ms to avoid cards flickering when users briefly pass over the trigger.
4. Keep content concise — a Hover Card is a preview, not a full detail page.
5. If the information needs interaction (follow button, view profile), use a Popover instead.
