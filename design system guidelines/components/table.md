# Table

## Description
Structured data display in rows and columns. Used for presenting large datasets with sortable headers, row selection, hover highlighting, and inline actions. The table container handles horizontal scroll on small viewports.

---

## Anatomy
```
┌──────────────────────────────────────────────────────────────────────────┐
│  Name ↑           Status       Date       Amount      Actions            │  ← TableHead (th), h-10 px-2
├──────────────────────────────────────────────────────────────────────────┤
│  Item A           ● Active     Jan 1      $1,200       [Edit]  [⋮]      │  ← TableRow, hover:bg-muted/50
│  Item B           ○ Inactive   Jan 2        $800       [Edit]  [⋮]      │     border-b
│  Item C ☑ (sel)  ● Active     Jan 3      $2,100       [Edit]  [⋮]      │  ← selected: bg-muted
└──────────────────────────────────────────────────────────────────────────┘
│  Total                                   $4,100                          │  ← TableFooter, bg-muted/50, font-medium
└──────────────────────────────────────────────────────────────────────────┘

Container: overflow-x-auto (scrollable on mobile)
Header cell: h-10 (40px), px-2 (8px), text-sm font-medium, text-left, whitespace-nowrap
Body cell: p-2 (8px), align-middle, text-sm, whitespace-nowrap
Row: border-b, last row no border
Footer: border-t, bg-muted/50, font-medium
Caption: text-sm, muted-foreground, mt-4, text-center
```

---

## Sub-Components

| Component | Element | Notes |
|-----------|---------|-------|
| `TableComponent` | `<table>` | Sets `width: 100%`, `caption-bottom` |
| `TableHeaderComponent` | `<thead>` | `[&_tr]:border-b` |
| `TableBodyComponent` | `<tbody>` | `[&_tr:last-child]:border-0` |
| `TableFooterComponent` | `<tfoot>` | `bg-muted/50`, `border-t`, `font-medium` |
| `TableRowComponent` | `<tr>` | Hover + selected states |
| `TableHeadComponent` | `<th>` | Sort icon, align, truncation |
| `TableCellComponent` | `<td>` | Align, padding |
| `TableCaptionComponent` | `<caption>` | Screen reader + visible description |

---

## Structure
```html
<div class="ds-table-container">
  <table class="ds-table">
    <caption *ngIf="caption" class="ds-table__caption">{{ caption }}</caption>

    <thead class="ds-table__header">
      <tr>
        <!-- Checkbox column -->
        <th *ngIf="selectable" class="ds-table__head ds-table__head--checkbox">
          <ds-checkbox
            [checked]="allSelected"
            [indeterminate]="someSelected"
            (checkedChange)="toggleAll($event)"
          ></ds-checkbox>
        </th>

        <th
          *ngFor="let col of columns"
          class="ds-table__head"
          [class.ds-table__head--sortable]="col.sortable"
          [class.ds-table__head--right]="col.align === 'right'"
          (click)="col.sortable && sort(col.key)"
        >
          {{ col.label }}
          <ds-icon
            *ngIf="col.sortable"
            [name]="getSortIcon(col.key)"
            size="14"
          ></ds-icon>
        </th>
      </tr>
    </thead>

    <tbody class="ds-table__body">
      <tr
        *ngFor="let row of data"
        class="ds-table__row"
        [class.ds-table__row--selected]="selectedRows.has(row.id)"
        (click)="selectable && toggleRow(row.id)"
      >
        <td *ngIf="selectable" class="ds-table__cell">
          <ds-checkbox
            [checked]="selectedRows.has(row.id)"
            (checkedChange)="toggleRow(row.id)"
          ></ds-checkbox>
        </td>

        <td
          *ngFor="let col of columns"
          class="ds-table__cell"
          [class.ds-table__cell--right]="col.align === 'right'"
        >
          {{ row[col.key] }}
        </td>
      </tr>
    </tbody>

    <tfoot *ngIf="footer" class="ds-table__footer">
      <tr>
        <ng-content select="[table-footer]"></ng-content>
      </tr>
    </tfoot>
  </table>
</div>
```

---

## States

| State | Row Appearance |
|-------|---------------|
| **Default** | `bg: transparent`, `border-b: var(--border)` |
| **Hover** | `bg: var(--muted)/50` |
| **Selected** | `bg: var(--muted)` |
| **Selected + Hover** | `bg: var(--muted)` (same as selected) |
| **Disabled row** | `opacity: 0.5`, no hover |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `data` | `object[]` | `[]` | Row data |
| `selectable` | `boolean` | `false` | Enable row checkboxes |
| `caption` | `string` | `undefined` | Table caption |
| `sortKey` | `string` | `undefined` | Currently sorted column |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |

```typescript
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `sortChange` | `{ key: string, direction: 'asc' \| 'desc' }` | Sort column changed |
| `selectionChange` | `string[]` | Selected row IDs changed |
| `rowClick` | `object` | Row clicked (non-selectable mode) |

---

## Wireframe Skeleton

```
With sort + selection:
┌─────────────────────────────────────────────────────────────────┐
│ [ ]  Name ↑      Status      Date         Amount    Actions     │
├─────────────────────────────────────────────────────────────────┤
│ [✓]  Acme Corp   ● Active    Jan 5, 2026  $4,200    [Edit][⋮] │  ← selected row (bg-muted)
│ [ ]  Globex      ○ Inactive  Jan 3, 2026    $800    [Edit][⋮] │
│ [ ]  Initech     ● Active    Jan 1, 2026  $1,200    [Edit][⋮] │
├─────────────────────────────────────────────────────────────────┤
│                             Total         $6,200               │  ← footer
└─────────────────────────────────────────────────────────────────┘
  Showing 1–3 of 47 results    ← pagination below table
```

---

## Usage Rules

1. All cells are `whitespace-nowrap` by default — add text truncation only for known long-text columns.
2. Always wrap the table in an `overflow-x-auto` container for mobile compatibility.
3. Right-align numeric and currency columns (`align: 'right'`).
4. Sort indicators: ↑ ascending, ↓ descending, ↕ sortable (unsorted).
5. Column headers act as sort buttons — include `cursor: pointer` and hover state.
6. Empty table state: show "No results." in a single full-width cell with muted text.
7. Row selection checkboxes must be in the first column, before data columns.
8. Never use table for layout — only for actual tabular data.
