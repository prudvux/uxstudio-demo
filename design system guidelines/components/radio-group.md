# Radio Group

## Description
A set of mutually exclusive options where only one can be selected at a time. Used when the user must choose exactly one from a small, visible set of options (typically 2–6).

---

## Anatomy
```
(●)  Option A    ← selected: filled inner circle
( )  Option B    ← unselected: empty ring
( )  Option C

Each radio item:
  Outer ring: 16×16px, border-radius: 50%, border: 1px solid
  Inner circle (when selected): 8×8px, bg: var(--primary), centred
  gap between items: 12px (gap-3)
  gap between radio and label: 8px
```

---

## Structure
```html
<div
  role="radiogroup"
  [attr.aria-labelledby]="labelId"
  [attr.aria-orientation]="orientation"
  class="ds-radio-group"
  [class.ds-radio-group--horizontal]="orientation === 'horizontal'"
>
  <div *ngFor="let item of items" class="ds-radio-item">
    <button
      role="radio"
      [attr.aria-checked]="value === item.value"
      [disabled]="disabled || item.disabled"
      [class.ds-radio--checked]="value === item.value"
      [class.ds-radio--disabled]="disabled || item.disabled"
      (click)="select(item.value)"
      class="ds-radio"
    >
      <span *ngIf="value === item.value" class="ds-radio__indicator"></span>
    </button>
    <ds-label [disabled]="disabled || item.disabled">{{ item.label }}</ds-label>
  </div>
</div>
```

---

## States

| State | Outer Ring | Inner Fill | Notes |
|-------|-----------|------------|-------|
| **Unselected** | `var(--border)` | none | Default |
| **Selected** | `var(--primary)` | `var(--primary)` | Filled dot centred |
| **Hover (unselected)** | `var(--border)` darker | `var(--accent)` | Subtle fill |
| **Focus-visible** | — | — | 3px ring on outer element |
| **Disabled** | `var(--border)` at 50% | — | `opacity: 0.5` whole item |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `undefined` | Currently selected value |
| `items` | `RadioItem[]` | `[]` | Array of options |
| `disabled` | `boolean` | `false` | Disables entire group |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `labelId` | `string` | `undefined` | `aria-labelledby` for group |

```typescript
interface RadioItem {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | Emitted when selection changes |

---

## Wireframe Skeleton

```
Vertical (default):
  Notification frequency

  (●)  Immediately
  ( )  Daily digest
  ( )  Weekly summary
  ( )  Never

Horizontal:
  Size:  ( ) Small  (●) Medium  ( ) Large
```

---

## Usage Rules

1. Use radio groups when there are 2–6 mutually exclusive options that can all be shown at once.
2. For 7+ options, use a Select component instead to save space.
3. Always wrap in a `<fieldset>` with `<legend>` when used in a form for screen reader context.
4. One option must always be pre-selected as a default (radio groups should not start empty).
5. Arrange vertically when option labels are longer than 2–3 words.
6. Arrange horizontally only when options are short (1–2 words) and there are ≤4 items.
7. Keyboard navigation: Arrow keys cycle through options; Tab moves focus in/out of the group.
