# Checkbox

## Description
Binary toggle for boolean options. Used individually for a single setting, or in groups for multi-select. Visually distinct from Switch — checkboxes are for form submissions; switches are for immediate-effect settings.

---

## Anatomy
```
┌──┐  Label text
│✓ │
└──┘
  ↑
  16×16px (size-4)
  border-radius: 4px
  border: 1px solid var(--border)
  shadow-xs

Checked:
  background: var(--primary) = #030213
  checkmark icon: white, centred

Indeterminate:
  background: var(--primary)
  horizontal dash: white, centred
```

---

## Structure
```html
<div class="ds-checkbox-wrapper">
  <button
    role="checkbox"
    [attr.aria-checked]="indeterminate ? 'mixed' : checked"
    [attr.aria-disabled]="disabled"
    [disabled]="disabled"
    [class.ds-checkbox--checked]="checked"
    [class.ds-checkbox--indeterminate]="indeterminate"
    [class.ds-checkbox--disabled]="disabled"
    (click)="toggle()"
    class="ds-checkbox"
  >
    <ds-icon *ngIf="checked && !indeterminate" name="check" size="12"></ds-icon>
    <ds-icon *ngIf="indeterminate" name="minus" size="12"></ds-icon>
  </button>
  <ds-label [htmlFor]="id" [disabled]="disabled">
    <ng-content></ng-content>
  </ds-label>
</div>
```

---

## States

| State | Background | Border | Icon |
|-------|-----------|--------|------|
| **Unchecked** | transparent / white | `var(--border)` | none |
| **Checked** | `var(--primary)` | `var(--primary)` | white checkmark |
| **Indeterminate** | `var(--primary)` | `var(--primary)` | white horizontal dash |
| **Hover (unchecked)** | `var(--accent)` | `var(--border)` | none |
| **Focus-visible** | — | — | 3px ring `var(--ring)/50` |
| **Disabled (unchecked)** | transparent | `var(--border)` at 50% | none |
| **Disabled (checked)** | `var(--primary)` at 50% | — | white checkmark |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate (mixed) state |
| `disabled` | `boolean` | `false` | Disabled |
| `id` | `string` | auto | For label association |
| `value` | `string` | `undefined` | Value when used in a group |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `checkedChange` | `boolean` | Emitted on toggle |

---

## Wireframe Skeleton

```
Individual:
[✓]  Enable notifications

Group (multi-select):
[✓]  Option A         ← checked
[ ]  Option B         ← unchecked
[—]  Option C         ← indeterminate (partial children selected)
[ ]  Option D (grey)  ← disabled
```

---

## Usage Rules

1. Use for form fields that require explicit Save/Submit — not for immediate-effect toggles (use Switch).
2. Group related checkboxes in a `<fieldset>` with a `<legend>` for screen reader context.
3. Indeterminate state is for "select all" controls only — when some but not all children are selected.
4. Clicking an indeterminate checkbox should check all children (not uncheck).
5. Minimum 8px gap between the checkbox and its label text.
6. Do not use checkboxes for navigation or triggering dialogs — use buttons.
