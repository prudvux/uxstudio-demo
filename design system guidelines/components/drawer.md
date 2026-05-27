# Drawer

## Description
A bottom or side panel optimised for mobile interactions. Built on the `vaul` library, it supports native-feeling drag-to-dismiss gestures with elastic rubber-band physics. Functionally similar to Sheet but with touch-first interaction.

---

## Anatomy
```
Mobile (bottom, default):
┌──────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← Overlay, bg-black/50
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
├──────────────────────────────────────────────────────────┤
│  ──── (drag handle bar, centred, 40×4px, rounded)        │  ← Visible drag affordance
│                                                          │
│  Drawer Title                                            │  ← DrawerHeader
│  Drawer Description                                      │
│                                                          │
│  [Content area]                                          │
│                                                          │
│  [Footer actions]                                        │  ← DrawerFooter
└──────────────────────────────────────────────────────────┘
  Drawer slides up from bottom
  Dragging down dismisses with elastic physics
  Can be dragged to snap points (e.g. half / full height)

Desktop: renders as a Dialog (full-screen modal)
```

---

## Structure
```html
<ds-drawer [open]="isOpen" (openChange)="isOpen = $event">
  <div trigger>
    <ds-button (clicked)="isOpen = true">Open Drawer</ds-button>
  </div>

  <div content>
    <div class="ds-drawer__handle"></div>

    <div class="ds-drawer__header">
      <h2>Drawer Title</h2>
      <p>Optional description</p>
    </div>

    <div class="ds-drawer__content">
      <ng-content></ng-content>
    </div>

    <div class="ds-drawer__footer">
      <ng-content select="[drawer-footer]"></ng-content>
    </div>
  </div>
</ds-drawer>
```

---

## Sides

| Side | Animation | Use Case |
|------|-----------|----------|
| `bottom` (default) | Slides up from bottom | Mobile actions, filters, detail views |
| `right` | Slides in from right | Same as Sheet on desktop |
| `left` | Slides in from left | Mobile navigation |
| `top` | Slides down from top | Notifications, system alerts |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `side` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Anchor edge |
| `snapPoints` | `number[]` | `[1]` | Height fractions for snap positions (0–1) |
| `dismissible` | `boolean` | `true` | Allow drag-to-dismiss |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `openChange` | `boolean` | Emitted on open/close |

---

## Wireframe Skeleton

```
Share action sheet (mobile bottom):
─────────────────────────────────────
          ──── (drag handle)

  Share via

  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │  📧 Mail │ │ 📎 Copy  │ │  More... │
  └──────────┘ └──────────┘ └──────────┘

                                [Cancel]
─────────────────────────────────────
```

---

## Usage Rules

1. Use Drawer as the mobile equivalent of Sheet — render Sheet on desktop, Drawer on mobile.
2. Always include the drag handle bar at the top of the drawer for discoverability.
3. For bottom drawers, the handle should be visible even in the initial closed state (peek pattern) if appropriate.
4. `snapPoints` allow intermediate heights (e.g. `[0.5, 1]` for half and full height snapping).
5. The `dismissible: false` option should be rare — only for critical flows where dismissal would lose data.
6. Do not use Drawer on desktop — use Sheet or Dialog.
