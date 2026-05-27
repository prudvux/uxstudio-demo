# Context Menu

## Description
A menu that appears at the cursor position on right-click (desktop) or long-press (mobile). Provides contextual actions for the element or region that was right-clicked. Visually identical to Dropdown Menu — differs only in trigger mechanism and positioning.

---

## Anatomy
```
[User right-clicks on a row/element]

    ↓ cursor position
┌─────────────────────────────────────────┐
│  Open                                   │  ← bg-popover, border, rounded-md
│  Edit                                   │  ← shadow-md, p-1, z-50
│  Duplicate                             │
│  ────────────────────────────────────   │
│  ✓ Pin to top                          │
│  ────────────────────────────────────   │
│  🗑  Delete                             │  ← destructive
└─────────────────────────────────────────┘

Appears at: cursor X/Y position
Adjusts: flips if too close to viewport edge
All item styles identical to Dropdown Menu
```

---

## Structure
```html
<div
  class="ds-context-menu-wrapper"
  (contextmenu)="onContextMenu($event)"
>
  <!-- Trigger area (the right-clickable region) -->
  <ng-content></ng-content>

  <!-- Menu (portal, positioned at cursor) -->
  <div
    *ngIf="open"
    role="menu"
    [style.top.px]="position.y"
    [style.left.px]="position.x"
    class="ds-context-menu"
    (keydown.escape)="close()"
    (clickOutside)="close()"
  >
    <ng-container *ngFor="let item of items">
      <div *ngIf="item.type === 'separator'" role="separator" class="ds-dropdown-separator"></div>
      <button
        *ngIf="item.type === 'item'"
        role="menuitem"
        [class.ds-dropdown-item--destructive]="item.variant === 'destructive'"
        [disabled]="item.disabled"
        (click)="selectItem(item)"
        class="ds-dropdown-item"
      >
        <ds-icon *ngIf="item.icon" [name]="item.icon"></ds-icon>
        {{ item.label }}
      </button>
    </ng-container>
  </div>
</div>
```

---

## States

Identical to Dropdown Menu item states (default, hover/focus, disabled, destructive).

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `DropdownItem[]` | `[]` | Menu item definitions (same type as Dropdown Menu) |
| `disabled` | `boolean` | `false` | Disable context menu (right-click has no effect) |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `itemSelected` | `DropdownItem` | Emitted on item click |
| `openChange` | `boolean` | Open/close state |

---

## Wireframe Skeleton

```
Table row context menu:
┌──────────────────────────────────────────────────────┐
│  Name          Status     Date           Actions      │
│  Item A        Active     Jan 1          [Edit][Del]  │  ← right-click anywhere on row
└──────────────────────────────────────────────────────┘
          ↓
     ┌──────────────────────────┐
     │  Open item               │  ← appears near cursor
     │  Edit item               │
     │  ─────────────────────   │
     │  Copy link               │
     │  ─────────────────────   │
     │  🗑  Delete              │
     └──────────────────────────┘
```

---

## Usage Rules

1. Context menus **supplement** — they must never be the only way to access a feature.
2. Keep items to 2–8; sub-menus in context menus are acceptable but limited to one level.
3. Destructive items must be last and visually separated.
4. Provide visual affordance when context menus are available (e.g. cursor change to `context-menu`).
5. On mobile, trigger via long-press and render as a bottom Sheet or Drawer, not as a floating menu at position.
6. The menu must close on Escape, on item selection, and on click outside.
