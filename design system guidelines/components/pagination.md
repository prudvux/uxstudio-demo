# Pagination

## Description
A navigation control for splitting large data sets across multiple pages. Provides previous/next controls and numbered page buttons for direct access to any page.

---

## Anatomy
```
← Previous  [1] [2] [3] ··· [8] [9]  Next →
  ↑                    ↑                ↑
  Previous btn     Ellipsis         Next btn
  px-2.5, gap-1    text-muted       px-2.5, gap-1
  ghost variant    size-9           ghost variant

Active page:  [3]  bg-primary, text-primary-foreground, rounded-md
Other pages:  [2]  ghost variant
All buttons:  minimum size-9 (36×36px), rounded-md

Ellipsis: size-9, centered "···", no border
```

---

## Structure
```html
<nav role="navigation" aria-label="Pagination" class="ds-pagination">
  <ul class="ds-pagination__list">

    <!-- Previous -->
    <li>
      <a
        [class.ds-pagination__prev--disabled]="currentPage === 1"
        [attr.aria-disabled]="currentPage === 1"
        (click)="goTo(currentPage - 1)"
        class="ds-pagination__prev"
        aria-label="Go to previous page"
      >
        ← Previous
      </a>
    </li>

    <!-- Page numbers -->
    <li *ngFor="let page of visiblePages">
      <!-- Ellipsis -->
      <span *ngIf="page === '...'" class="ds-pagination__ellipsis" aria-hidden="true">···</span>

      <!-- Page button -->
      <a
        *ngIf="page !== '...'"
        [class.ds-pagination__link--active]="page === currentPage"
        [attr.aria-current]="page === currentPage ? 'page' : null"
        [attr.aria-label]="'Go to page ' + page"
        (click)="goTo(page)"
        class="ds-pagination__link"
      >
        {{ page }}
      </a>
    </li>

    <!-- Next -->
    <li>
      <a
        [class.ds-pagination__next--disabled]="currentPage === totalPages"
        [attr.aria-disabled]="currentPage === totalPages"
        (click)="goTo(currentPage + 1)"
        class="ds-pagination__next"
        aria-label="Go to next page"
      >
        Next →
      </a>
    </li>

  </ul>
</nav>
```

---

## States

| Element | State | Appearance |
|---------|-------|-----------|
| Page button | Default | `ghost` variant |
| Page button | Active | `bg-primary`, `text-primary-foreground` |
| Page button | Hover | `bg-accent` |
| Previous/Next | Default | `ghost` variant with icon |
| Previous/Next | Disabled | `opacity: 0.5`, `pointer-events: none` |

---

## Visible Pages Algorithm

For 9+ total pages, show: first, last, current ± 1, and ellipsis where gaps exist.

| Total | Current | Visible |
|-------|---------|---------|
| 5 | 3 | 1 2 **3** 4 5 |
| 10 | 1 | **1** 2 3 ··· 10 |
| 10 | 5 | 1 ··· 4 **5** 6 ··· 10 |
| 10 | 10 | 1 ··· 8 9 **10** |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentPage` | `number` | `1` | Active page |
| `totalPages` | `number` | required | Total page count |
| `siblingCount` | `number` | `1` | Pages shown each side of current |
| `showFirstLast` | `boolean` | `true` | Always show first and last page buttons |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `pageChange` | `number` | Emitted when page changes |

---

## Wireframe Skeleton

```
Standard:
← Previous   1  2  [3]  4  5  ···  12   Next →

First page:
← Previous   [1]  2  3  ···  12   Next →
  (disabled)

Last page:
← Previous   1  ···  10  11  [12]   Next →
                                     (disabled) →

Few pages:
← Previous   1  [2]  3   Next →
```

---

## Usage Rules

1. Always wrap in `<nav aria-label="Pagination">` for screen readers.
2. Mark the current page with `aria-current="page"`.
3. Disable Previous on page 1 and Next on the last page — do not hide them.
4. Show page count context nearby: "Showing 21–30 of 147 results".
5. On mobile, simplify to just Previous and Next buttons — hide numbered pages below the `md` breakpoint.
6. Always scroll to top of list on page change.
