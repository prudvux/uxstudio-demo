# Menubar

## Description
A horizontal application-level menu bar, similar to desktop application menus (File, Edit, View, Help). Each top-level item is a trigger that opens a dropdown menu. Used for app-wide navigation and commands in dense application UIs.

---

## Anatomy
```
┌──────────────────────────────────────────────────────────────┐
│  File   Edit   View   Insert   Format   Help                 │  ← MenubarMenu triggers
└──────────────────────────────────────────────────────────────┘
  height: 36px (h-9)
  bg: var(--background)
  border: 1px solid var(--border)
  border-radius: var(--radius-md)
  padding: 4px (p-1)
  shadow: shadow-xs

Active/open trigger:
  bg: var(--accent), color: var(--accent-foreground)

Dropdown (same as Dropdown Menu):
┌────────────────────────────────────────┐
│  New file                  Ctrl+N      │
│  Open                      Ctrl+O      │
│  ───────────────────────────────────   │
│  Save                      Ctrl+S      │
│  Save As…                             │
│  ───────────────────────────────────   │
│  Exit                                  │
└────────────────────────────────────────┘
```

---

## Structure
```html
<div role="menubar" class="ds-menubar">
  <div
    *ngFor="let menu of menus"
    class="ds-menubar__menu"
    [class.ds-menubar__menu--open]="openMenu === menu.id"
  >
    <button
      role="menuitem"
      [attr.aria-haspopup]="'menu'"
      [attr.aria-expanded]="openMenu === menu.id"
      (click)="toggleMenu(menu.id)"
      (keydown)="onKeyDown($event, menu.id)"
      class="ds-menubar__trigger"
    >
      {{ menu.label }}
    </button>

    <!-- Dropdown -->
    <div
      *ngIf="openMenu === menu.id"
      role="menu"
      class="ds-menubar__dropdown"
    >
      <ng-container *ngFor="let item of menu.items">
        <div *ngIf="item.type === 'separator'" role="separator" class="ds-dropdown-separator"></div>
        <button
          *ngIf="item.type === 'item'"
          role="menuitem"
          [disabled]="item.disabled"
          (click)="execute(item)"
          class="ds-dropdown-item"
        >
          {{ item.label }}
          <kbd *ngIf="item.shortcut" class="ds-command__shortcut">{{ item.shortcut }}</kbd>
        </button>
      </ng-container>
    </div>
  </div>
</div>
```

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `menus` | `MenubarMenu[]` | `[]` | Top-level menu definitions |

```typescript
interface MenubarMenu {
  id: string;
  label: string;
  items: DropdownItem[];  // Same type as Dropdown Menu
}
```

---

## Wireframe Skeleton

```
Full menubar:
┌────────────────────────────────────────────────────────────┐
│  File ▾  Edit ▾  View ▾  Help ▾                           │
└────────────────────────────────────────────────────────────┘

"File" menu open:
┌─────────────────────────┐
│  New                ⌘N  │
│  Open               ⌘O  │
│  ──────────────────────  │
│  Save               ⌘S  │
│  Save As…  ⌘⇧S          │
│  ──────────────────────  │
│  Close window       ⌘W  │
└─────────────────────────┘
```

---

## Usage Rules

1. Use Menubar only for dense, application-like UIs (editors, design tools, admin panels) — not for typical web pages.
2. Top-level menu labels should be single words (File, Edit, View, Insert, Format, Tools, Help).
3. Each menu dropdown follows all Dropdown Menu rules.
4. Keyboard: Arrow Left/Right moves between top-level menus; Arrow Down opens a menu; Escape closes.
5. Opening one menu automatically closes the previously open menu.
6. Do not place more than 6–7 top-level menus in the menubar.
