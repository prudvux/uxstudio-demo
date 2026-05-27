# Breadcrumb

## Description
Secondary navigation showing the user's current location within a site hierarchy. Allows users to understand their position and navigate back to parent pages.

---

## Anatomy
```
Home  /  Section  /  Subsection  /  Current Page
  ↑      ↑                           ↑
 link  separator                  current (not a link)
 text-sm                           text-sm foreground
 text-muted-foreground             font-weight: normal
 hover: text-foreground            no underline

Items:
  gap between items: 6px (sm:gap-2.5)
  flex, items-center, flex-wrap

Separator:
  / character or › icon (ChevronRight)
  text-muted-foreground
  icon size: 14px ([&>svg]:size-3.5)

Ellipsis (…) for truncation:
  Shown when path is too long (3+ middle levels)
  Expands on click to show hidden levels
```

---

## Structure
```html
<nav aria-label="Breadcrumb" class="ds-breadcrumb">
  <ol class="ds-breadcrumb__list">
    <li
      *ngFor="let item of items; let last = last; let i = index"
      class="ds-breadcrumb__item"
    >
      <!-- Ellipsis for truncated middle items -->
      <button
        *ngIf="item.ellipsis"
        (click)="expand()"
        aria-label="Show more breadcrumbs"
        class="ds-breadcrumb__ellipsis"
      >
        ···
      </button>

      <!-- Link item -->
      <a
        *ngIf="!last && !item.ellipsis"
        [routerLink]="item.href"
        class="ds-breadcrumb__link"
      >
        {{ item.label }}
      </a>

      <!-- Current page (non-link) -->
      <span
        *ngIf="last"
        aria-current="page"
        class="ds-breadcrumb__page"
      >
        {{ item.label }}
      </span>

      <!-- Separator (not after last item) -->
      <span
        *ngIf="!last"
        aria-hidden="true"
        class="ds-breadcrumb__separator"
      >
        /
      </span>
    </li>
  </ol>
</nav>
```

---

## States

| Part | Colour |
|------|--------|
| Link | `var(--muted-foreground)` |
| Link hover | `var(--foreground)` (transition 150ms) |
| Current page | `var(--foreground)` |
| Separator | `var(--muted-foreground)` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Ordered list of pages in path |
| `maxItems` | `number` | `undefined` | Max visible items before truncation |
| `separator` | `'slash' \| 'chevron'` | `'slash'` | Separator style |

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;        // undefined = current page (non-link)
  ellipsis?: boolean;   // placeholder for truncated items
}
```

---

## Wireframe Skeleton

```
Standard breadcrumb:
Home  /  Products  /  Electronics  /  Headphones

Truncated breadcrumb:
Home  /  ···  /  Subcategory  /  Current page

Mobile (limited width):
···  /  Subcategory  /  Current page
```

---

## Usage Rules

1. Show breadcrumbs only when the content hierarchy is 2 or more levels deep.
2. The current page (last item) must NOT be a link — it uses `aria-current="page"`.
3. The root/home item is always a link.
4. Wrap in `<nav aria-label="Breadcrumb">` for screen reader context.
5. Use `<ol>` (ordered list) internally — the order of breadcrumb items is semantically meaningful.
6. Truncate at the start of a long path (keep root and last 2 items visible), never at the end.
7. On mobile, reduce to the single parent level: `← Parent page` link only.
