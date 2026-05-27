# Navigation Menu

## Description
Top-level site navigation with support for mega menus and animated flyout panels. Used as the primary navigation in page headers. Built for desktop-first layouts where hover or click reveals grouped sub-navigation content.

---

## Anatomy
```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]  Products ▾  Solutions ▾  Resources  Pricing  Blog   │  ← NavigationMenuList
└──────────────────────────────────────────────────────────────┘
            ↓ hover/click "Products"

┌──────────────────────────────────────────────────────────────┐
│  Featured                         Popular                    │  ← NavigationMenuContent
│  ┌────────────────────────┐        ○ Feature A               │
│  │ [Featured product img] │        ○ Feature B               │
│  │ Product description    │        ○ Feature C               │
│  └────────────────────────┘                                  │
│  [View all products →]                                       │
└──────────────────────────────────────────────────────────────┘
  Panel slides in from active item, full-width or fixed-width
  Active indicator: thin underline animates to follow hovered item

Trigger states:
  Default: text, hover shows indicator underline
  Active/open: bg-accent, indicator visible
  Focus-visible: ring
```

---

## Structure
```html
<nav aria-label="Main navigation" class="ds-nav-menu">
  <ul class="ds-nav-menu__list">
    <li *ngFor="let item of items" class="ds-nav-menu__item">

      <!-- Simple link (no submenu) -->
      <a
        *ngIf="!item.children"
        [routerLink]="item.href"
        routerLinkActive="ds-nav-menu__link--active"
        class="ds-nav-menu__link"
      >
        {{ item.label }}
      </a>

      <!-- Trigger with submenu -->
      <button
        *ngIf="item.children"
        [attr.aria-expanded]="openItem === item.id"
        [attr.aria-haspopup]="'true'"
        (click)="toggle(item.id)"
        class="ds-nav-menu__trigger"
        [class.ds-nav-menu__trigger--open]="openItem === item.id"
      >
        {{ item.label }}
        <ds-icon name="chevron-down" class="ds-nav-menu__chevron"></ds-icon>
      </button>

      <!-- Submenu panel -->
      <div
        *ngIf="item.children && openItem === item.id"
        class="ds-nav-menu__content"
        [@contentAnimation]
      >
        <ng-container *ngTemplateOutlet="item.contentTemplate"></ng-container>
      </div>
    </li>
  </ul>

  <!-- Animated underline indicator -->
  <div class="ds-nav-menu__indicator"></div>
</nav>
```

---

## States

| State | Trigger | Indicator |
|-------|---------|-----------|
| **Default** | `text-foreground/60` | Hidden |
| **Hover** | `text-foreground` | Slides to item position |
| **Active/Open** | `bg-accent/50` | Visible at item position |
| **Focus-visible** | `bg-accent/50` + ring | Visible |
| **Disabled** | `opacity: 0.5` | None |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `NavMenuItem[]` | `[]` | Menu item definitions |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Menu axis |

```typescript
interface NavMenuItem {
  id: string;
  label: string;
  href?: string;
  children?: boolean;
  contentTemplate?: TemplateRef<unknown>;
  disabled?: boolean;
}
```

---

## Wireframe Skeleton

```
Simple header nav:
[Logo]  Home  Products ▾  Pricing  About  [Sign in]

"Products" open (viewport-wide panel):
┌──────────────────────────────────────────────────────────────┐
│  By use case             Platform                            │
│  ─────────────           ─────────────                       │
│  🎨 Design               API                                │
│  💻 Development          SDK                                │
│  📊 Analytics            Integrations                       │
│                          [View all →]                       │
└──────────────────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Navigation Menu for primary site-level navigation only.
2. Keep top-level items to 5–8 — beyond 8 items, restructure the information architecture.
3. Mega menu panels should have clear visual hierarchy: grouped items with labels, featured items, and a "see all" link.
4. On mobile (< 768px), replace Navigation Menu with a Sheet-based mobile drawer.
5. Panel open animation must be `≤ 200ms` — navigation should feel snappy, not heavy.
6. Keyboard: Arrow keys navigate between triggers; Enter/Space opens panel; Escape closes; Tab moves through panel links.
7. The active page's parent item should have a persistent active indicator.
