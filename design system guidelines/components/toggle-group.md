# Toggle Group

## Description
A set of connected Toggle buttons functioning as a segmented control or toolbar. Items share borders and form a visual unit. Supports single-select (like radio buttons) and multi-select (like checkboxes) modes.

---

## Anatomy
```
┌──────────┬──────────┬──────────┐
│  Option A│  Option B│  Option C│
└──────────┴──────────┴──────────┘
  ↑ rounded-l-md   no radius   ↑ rounded-r-md
  (first item)   (inner items)  (last item)

Active item: bg var(--accent), color var(--accent-foreground)
Inactive item: transparent bg

Items are visually joined — no gap between them.
```

---

## Structure
```html
<div
  role="group"
  [attr.aria-label]="ariaLabel"
  class="ds-toggle-group"
  [class.ds-toggle-group--single]="type === 'single'"
>
  <button
    *ngFor="let item of items; let first = first; let last = last"
    [attr.aria-pressed]="isSelected(item.value)"
    [disabled]="disabled || item.disabled"
    [class.ds-toggle-group__item--first]="first"
    [class.ds-toggle-group__item--last]="last"
    [class.ds-toggle-group__item--active]="isSelected(item.value)"
    class="ds-toggle-group__item"
    (click)="toggle(item.value)"
  >
    <ng-container *ngTemplateOutlet="item.template"></ng-container>
    {{ item.label }}
  </button>
</div>
```

---

## Types

| Type | Behaviour | Analogy |
|------|-----------|---------|
| `single` | One item selected at a time | Radio group |
| `multiple` | Multiple items selectable | Checkboxes |

---

## Sizes

Inherits from Toggle: `sm` (32px), `default` (36px), `lg` (40px).

---

## States

| State | Background | Border |
|-------|-----------|--------|
| **Inactive** | transparent | shared border between items |
| **Active** | `var(--accent)` | same |
| **Hover** | `var(--muted)` | same |
| **Focus-visible** | — | 3px ring on focused item |
| **Disabled (item)** | — | `opacity: 0.5` |
| **Disabled (group)** | — | All items at 50% |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `value` | `string \| string[]` | `undefined` | Selected value(s) |
| `items` | `ToggleGroupItem[]` | `[]` | Items to render |
| `disabled` | `boolean` | `false` | Disable all items |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size |
| `ariaLabel` | `string` | required | Accessible group label |

```typescript
interface ToggleGroupItem {
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string \| string[]` | Emitted on selection change |

---

## Wireframe Skeleton

```
Single-select (view switcher):
┌──────────┬──────────┬──────────┐
│ ▦ Grid   │ ≡ List   │ 📋 Table │
└──────────┴──────────┴──────────┘
     ↑ active (accent bg)

Multi-select (text formatting):
┌──────┬──────┬──────┬──────┐
│  B   │  I   │  U   │  S   │
└──────┴──────┴──────┴──────┘
   ↑     ↑  both active (accent bg)
```

---

## Usage Rules

1. Always provide `ariaLabel` on the group — it is the accessible name for the entire control.
2. In `single` mode, if the active item is clicked again, it remains selected (not deselected) — use a standalone Toggle for deselectable single toggles.
3. Items must have either a visible label or an `aria-label` attribute.
4. Do not mix items with and without icons in the same group.
5. Keep all items the same width whenever possible to create a balanced segmented appearance.
