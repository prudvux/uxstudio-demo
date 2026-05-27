# Sidebar

## Description
A persistent vertical navigation panel for application-level navigation. Supports collapsed (icon-only) and expanded states. State persists via cookie between sessions. Contains grouped navigation items, a user profile section, and collapsible group headers.

---

## Anatomy

### Expanded State (300px)
```
┌────────────────────────────────────────────────┐
│  [Logo / Brand]                    [← Collapse]│  ← header, h-14, px-4, border-b
├────────────────────────────────────────────────┤
│                                                │
│  NAVIGATION GROUP (text-xs, uppercase, muted)  │  ← group label, px-4 py-2
│  ┌──────────────────────────────────────────┐  │
│  │ 🏠  Home                                 │  │  ← active item
│  └──────────────────────────────────────────┘  │    bg: #EBF3FC
│  ┌──────────────────────────────────────────┐  │    border-left: 3px #1F73CF
│  │ 📊  Analytics                            │  │    color: #1F73CF
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │  ← inactive item
│  │ ⚙️  Settings                             │  │    color: #6A757E
│  └──────────────────────────────────────────┘  │    hover: bg-[#F5F6F7]
│                                                │
│  ANOTHER GROUP ▾                              │  ← collapsible group
│  ┌──────────────────────────────────────────┐  │
│  │ 📋  Reports                              │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ── separator ──                               │
│                                                │
├────────────────────────────────────────────────┤
│  [Avatar]  User Name             [⋮ Menu]      │  ← user row, h-14, px-4, border-t
└────────────────────────────────────────────────┘

Width: 300px (expanded)
bg: white (#ffffff)
border-right: 1px solid #EAECEF

Nav item: height ~40px, px-3 py-2, border-radius 6px
  font: Inter 14px / weight 500
  active: bg #EBF3FC, color #1F73CF, border-left 3px solid #1F73CF
  inactive: color #6A757E, border-left 3px solid transparent
  hover: bg #F5F6F7
```

### Collapsed State (56px)
```
┌──────────┐
│   [≡]    │  ← expand toggle, centred
├──────────┤
│   [🏠]   │  ← icon only, 40×40px, rounded-md
│          │    active: bg #EBF3FC, icon #1F73CF
│   [📊]   │    tooltip on hover: item label
│          │
│   [⚙️]   │
│          │
├──────────┤
│   [👤]   │  ← avatar only, tooltip: user name
└──────────┘

Width: 56px
All icons: 20×20px, centred
Transition: width changes with 200ms ease
```

---

## Navigation Item Anatomy
```
┌─────────────────────────────────────────┐
│▌ [icon 20px]  Label text                │  ← active: 3px blue left border
└─────────────────────────────────────────┘
  padding: 8px 12px (py-2 px-3)
  gap between icon and label: 12px
  border-radius: 6px (inner content)
  transition: background 150ms
```

---

## Structure
```html
<aside
  class="ds-sidebar"
  [class.ds-sidebar--collapsed]="isCollapsed"
>
  <!-- Header -->
  <div class="ds-sidebar__header">
    <div *ngIf="!isCollapsed" class="ds-sidebar__logo">
      <ng-content select="[sidebar-logo]"></ng-content>
    </div>
    <button
      (click)="toggleCollapse.emit()"
      [attr.aria-label]="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      class="ds-sidebar__collapse-btn"
    >
      <ds-icon [name]="isCollapsed ? 'panel-left-open' : 'panel-left-close'"></ds-icon>
    </button>
  </div>

  <!-- Navigation -->
  <nav class="ds-sidebar__nav">
    <div *ngFor="let group of navGroups" class="ds-sidebar__group">

      <!-- Group label -->
      <button
        *ngIf="!isCollapsed && group.collapsible"
        (click)="toggleGroup(group.id)"
        class="ds-sidebar__group-header"
      >
        {{ group.label }}
        <ds-icon [name]="expandedGroups.has(group.id) ? 'chevron-up' : 'chevron-down'"></ds-icon>
      </button>
      <span *ngIf="!isCollapsed && !group.collapsible" class="ds-sidebar__group-label">
        {{ group.label }}
      </span>

      <!-- Items -->
      <ul *ngIf="!group.collapsible || expandedGroups.has(group.id)">
        <li *ngFor="let item of group.items">
          <ds-tooltip [content]="item.label" side="right" [disabled]="!isCollapsed">
            <a
              [routerLink]="item.href"
              routerLinkActive="ds-sidebar__item--active"
              [attr.aria-label]="isCollapsed ? item.label : null"
              class="ds-sidebar__item"
            >
              <ds-icon [name]="item.icon"></ds-icon>
              <span *ngIf="!isCollapsed">{{ item.label }}</span>
            </a>
          </ds-tooltip>
        </li>
      </ul>
    </div>
  </nav>

  <!-- User Profile -->
  <div class="ds-sidebar__footer">
    <ds-sidebar-user
      [user]="currentUser"
      [collapsed]="isCollapsed"
      (logout)="onLogout.emit()"
    ></ds-sidebar-user>
  </div>
</aside>
```

---

## States

| State | Description |
|-------|-------------|
| **Expanded** | Full width (300px), icon + label visible |
| **Collapsed** | Icon-only width (56px), labels hidden |
| **Group expanded** | Group items visible |
| **Group collapsed** | Group items hidden, chevron down |
| **Item active** | Blue left border, blue icon and text, light blue bg |
| **Item hover** | Light gray bg |
| **Profile menu open** | Dropdown above user row with account actions |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isCollapsed` | `boolean` | `false` | Collapsed state |
| `navGroups` | `SidebarGroup[]` | `[]` | Navigation structure |
| `currentUser` | `User` | required | Logged-in user info |
| `selectedItemId` | `string` | `undefined` | Active nav item ID |

```typescript
interface SidebarGroup {
  id: string;
  label: string;
  collapsible?: boolean;
  items: SidebarItem[];
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string | number;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `toggleCollapse` | `void` | Toggle collapsed state |
| `selectItem` | `string` | Item ID selected |
| `onHome` | `void` | Home item clicked |
| `onLogout` | `void` | Logout triggered |
| `onViewProfile` | `void` | View profile triggered |

---

## Width Constants

| State | Value | Used For |
|-------|-------|----------|
| Expanded | `300px` | App-level layout grid |
| Collapsed | `56px` (`SIDEBAR_WIDTH_ICON`) | Icon-only mode |
| Mobile expanded | `288px` (`SIDEBAR_WIDTH_MOBILE`) | Drawer mode on mobile |
| Tailwind constant | `16rem` (`SIDEBAR_WIDTH`) | CSS layout reference |

---

## Usage Rules

1. Sidebar width constants (`300px` expanded, `56px` collapsed) must not be changed — layout depends on them.
2. Active item is determined by router state (`routerLinkActive`) — do not set it manually.
3. Icon-only collapsed state must show tooltips for all navigation items.
4. Maximum 3 group headers in the main nav area.
5. Navigation item labels must be 1–3 words maximum.
6. On mobile (`< 768px`), render sidebar as a Sheet/Drawer — never as a persistent element.
7. User profile row is always pinned to the bottom — it should not scroll with nav items.
8. Badge counts on nav items (unread messages, notifications) should be `≤ 99` — show "99+" for larger counts.
