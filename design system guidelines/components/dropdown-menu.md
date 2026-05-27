# Dropdown Menu

## Description
A contextual floating menu triggered by a button click. Provides a list of actions, options, or navigation items related to the trigger element. Closes when an item is selected, when clicking outside, or on Escape.

---

## Anatomy
```
[Trigger ▾]
┌──────────────────────────────────────────┐
│  Group Label (optional)                  │  ← text-xs, muted, px-2 py-1.5, non-interactive
│  [icon]  Menu Item A                     │  ← px-2 py-1.5, text-sm, rounded-sm
│  [icon]  Menu Item B                     │
│  [icon]  Menu Item C    shortcut ⌘K      │  ← shortcut: right-aligned, text-xs muted
│  ──────────────────────────────────────  │  ← Separator: -mx-1 my-1 h-px bg-border
│  [✓] Checkbox Item                      │  ← checked state
│  ──────────────────────────────────────  │
│  🗑  Delete              (destructive)   │  ← text-destructive
│  ▶  Sub-menu                            │  ← right arrow indicates submenu
└──────────────────────────────────────────┘

Container: bg-popover, border, rounded-md, p-1, shadow-md, z-50
Item: px-2 py-1.5, text-sm, rounded-sm
Item hover/focus: bg-accent, color-accent-foreground
Destructive item hover: bg-destructive/10, text-destructive
```

---

## Item Types

| Type | Description | Visual Indicator |
|------|-------------|-----------------|
| Regular item | Standard action | none |
| Checkbox item | Toggle on/off state | `✓` when checked |
| Radio item | Mutually exclusive option | `●` when selected |
| Sub-menu item | Opens nested menu | `▶` arrow right |
| Separator | Visual divider | 1px line |
| Label | Non-interactive group header | smaller, muted |
| Destructive item | Dangerous action | `text-destructive` colour |

---

## Structure
```html
<div class="ds-dropdown-container">
  <button
    [attr.aria-haspopup]="'menu'"
    [attr.aria-expanded]="open"
    (click)="toggle()"
    class="ds-dropdown-trigger"
  >
    <ng-content select="[trigger]"></ng-content>
  </button>

  <div
    *ngIf="open"
    role="menu"
    [attr.aria-label]="ariaLabel"
    class="ds-dropdown-content"
    (keydown.escape)="close()"
  >
    <ng-container *ngFor="let item of items">
      <!-- Separator -->
      <div *ngIf="item.type === 'separator'" role="separator" class="ds-dropdown-separator"></div>

      <!-- Label -->
      <div *ngIf="item.type === 'label'" class="ds-dropdown-label">{{ item.label }}</div>

      <!-- Item -->
      <button
        *ngIf="item.type === 'item'"
        role="menuitem"
        [disabled]="item.disabled"
        [class.ds-dropdown-item--destructive]="item.variant === 'destructive'"
        (click)="selectItem(item)"
        class="ds-dropdown-item"
      >
        <ds-icon *ngIf="item.icon" [name]="item.icon"></ds-icon>
        {{ item.label }}
        <span *ngIf="item.shortcut" class="ds-dropdown-shortcut">{{ item.shortcut }}</span>
      </button>
    </ng-container>
  </div>
</div>
```

---

## States

| State | Item Background | Text |
|-------|----------------|------|
| **Default** | transparent | `var(--foreground)` |
| **Hover / Focus** | `var(--accent)` | `var(--accent-foreground)` |
| **Active (pressed)** | `var(--accent)` darkened | — |
| **Disabled** | transparent | `var(--muted-foreground)`, `pointer-events: none` |
| **Destructive hover** | `color-mix(var(--destructive), 10%)` | `var(--destructive)` |
| **Checked (checkbox item)** | — | Checkmark shown left of label |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `DropdownItem[]` | `[]` | Menu item definitions |
| `open` | `boolean` | `false` | Controlled state |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred position |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment |
| `modal` | `boolean` | `true` | Modal behaviour (pointer events outside) |

```typescript
interface DropdownItem {
  type: 'item' | 'checkbox' | 'radio' | 'separator' | 'label' | 'submenu';
  label?: string;
  icon?: string;
  shortcut?: string;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  checked?: boolean;     // for checkbox/radio items
  value?: string;
  children?: DropdownItem[]; // for submenu
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `itemSelected` | `DropdownItem` | Emitted when item is clicked |
| `openChange` | `boolean` | Open/close state |

---

## Wireframe Skeleton

```
More options dropdown (⋮ trigger):
[⋮]
┌─────────────────────────────────────────┐
│  Edit                                   │
│  Duplicate                              │
│  ────────────────────────────────────   │
│  ✓ Pin to top                          │
│  ────────────────────────────────────   │
│  Archive                                │
│  🗑  Delete                             │  ← destructive, text-red
└─────────────────────────────────────────┘
```

---

## Usage Rules

1. Keep menus to 2–8 items — beyond 8, consider grouping with labels or splitting into sub-menus.
2. Destructive items (delete, remove) must always be the last item and visually separated by a separator.
3. Use shortcuts sparingly — only for frequently used actions that power users would benefit from.
4. Keyboard: Arrow keys navigate items; Enter/Space selects; Escape closes; Tab closes and moves focus out.
5. Sub-menus open on hover (desktop) or click — never more than 1 level of nesting.
6. Do not use dropdown menus for primary navigation — use Navigation Menu or Sidebar.
7. `modal: true` blocks pointer events outside the menu while open — required for accessibility.
