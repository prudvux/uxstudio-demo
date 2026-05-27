# Select

## Description
A single-option picker from a predefined list. Replaces the native `<select>` element with a fully styled, accessible custom control. Best used when there are 7+ options — for fewer options, prefer Radio Group.

---

## Anatomy
```
Closed (trigger):
┌──────────────────────────────────────────┐
│  Selected option label               ▾  │  height: 36px (h-9)
└──────────────────────────────────────────┘  padding: 8px 12px (px-3 py-2)
  border: 1px solid var(--border)             border-radius: var(--radius-md)
  bg: var(--background)                       font: text-sm

Placeholder (no selection):
┌──────────────────────────────────────────┐
│  Select an option…                   ▾  │  text: muted-foreground
└──────────────────────────────────────────┘

Open (dropdown):
┌──────────────────────────────────────────┐
│  Group Label (text-xs muted)             │  ← SelectLabel: px-2 py-1.5
│    Option A                         ✓   │  ← SelectItem: py-1.5 pl-2 pr-8, check: absolute right-2
│    Option B                             │
│    Option C                             │
│  ──────────────────────────────────     │  ← Separator
│  Group 2                                │
│    Option D                             │
└──────────────────────────────────────────┘
  z-50, shadow-md, rounded-md, border, bg-popover
  Scrollable when items exceed max-height
  Checkmark icon: size-3.5 (14px), absolute right-2
```

---

## Structure
```html
<div class="ds-select" [class.ds-select--disabled]="disabled">
  <!-- Trigger -->
  <button
    role="combobox"
    [attr.aria-expanded]="open"
    [attr.aria-haspopup]="'listbox'"
    [attr.aria-labelledby]="labelId"
    [disabled]="disabled"
    (click)="toggle()"
    class="ds-select__trigger"
  >
    <span [class.ds-select__placeholder]="!value">
      {{ displayValue || placeholder }}
    </span>
    <ds-icon name="chevron-down" class="ds-select__chevron"></ds-icon>
  </button>

  <!-- Dropdown -->
  <div
    *ngIf="open"
    role="listbox"
    [attr.aria-label]="ariaLabel"
    class="ds-select__content"
  >
    <ng-container *ngFor="let group of groups">
      <div *ngIf="group.label" class="ds-select__group-label">{{ group.label }}</div>
      <div
        *ngFor="let option of group.options"
        role="option"
        [attr.aria-selected]="value === option.value"
        [attr.aria-disabled]="option.disabled"
        (click)="select(option)"
        class="ds-select__item"
        [class.ds-select__item--selected]="value === option.value"
        [class.ds-select__item--disabled]="option.disabled"
      >
        {{ option.label }}
        <ds-icon *ngIf="value === option.value" name="check" class="ds-select__check"></ds-icon>
      </div>
    </ng-container>
  </div>
</div>
```

---

## States

| State | Trigger Appearance |
|-------|------------------|
| **Default (empty)** | Placeholder text in `muted-foreground` |
| **Filled** | Selected label in `foreground` |
| **Focused** | `border: var(--ring)`, ring `3px var(--ring)/50` |
| **Open** | Chevron rotates 180° |
| **Hover (item)** | `bg: var(--accent)` |
| **Selected (item)** | Checkmark visible right side |
| **Disabled (trigger)** | `opacity: 0.5`, `cursor: not-allowed` |
| **Disabled (item)** | `opacity: 0.5`, `pointer-events: none` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `undefined` | Selected value |
| `placeholder` | `string` | `'Select…'` | Placeholder when empty |
| `groups` | `SelectGroup[]` | `[]` | Option groups |
| `disabled` | `boolean` | `false` | Disable trigger |
| `open` | `boolean` | `false` | Controlled open state |
| `ariaLabel` | `string` | `undefined` | Accessible label |

```typescript
interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | Emitted on selection |
| `openChange` | `boolean` | Emitted on open/close |

---

## Wireframe Skeleton

```
Country selector:
Country *
┌──────────────────────────────────────────┐
│  United States                       ▾  │
└──────────────────────────────────────────┘

Open state:
┌──────────────────────────────────────────┐
│  Popular                                 │
│    Australia                             │
│    Canada                                │
│    United Kingdom                        │
│    United States                    ✓   │
│  ─────────────────────────────────────  │
│  All countries                           │
│    Afghanistan                           │
│    Albania                               │
│    ...                                   │
└──────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Select when there are 7+ options — for 2–6 options, use Radio Group.
2. Group related options using `SelectGroup` with a label — do not create one flat list of 30+ items.
3. The placeholder text must be instructional, not a default value (e.g. "Select a country", not "Country").
4. Keyboard: Arrow keys navigate; Enter/Space selects; Escape closes; typing filters (typeahead).
5. Always associate a Label with the Select via `for`/`id`.
6. For searchable dropdowns (100+ options), use the Command component inside a Popover instead.
