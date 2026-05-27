# Label

## Description
Accessible text label paired with a form control. Provides the visible name for inputs, textareas, checkboxes, radio groups, and selects. Clicking the label should move focus to the associated control.

---

## Anatomy
```
[icon?]  Label text
          font: 16px / weight 500 / line-height 1.5
          color: var(--foreground)
          gap between icon and text: 8px (gap-2)
```

---

## Structure
```html
<label
  [for]="htmlFor"
  [class.ds-label--disabled]="disabled"
  class="ds-label"
>
  <ng-content select="[icon]"></ng-content>
  <ng-content></ng-content>
</label>
```

---

## States

| State | Visual Change |
|-------|--------------|
| **Default** | `color: var(--foreground)`, `font-weight: 500` |
| **Disabled** (paired control is disabled) | `opacity: 0.5`, `cursor: not-allowed` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `htmlFor` | `string` | `undefined` | The `id` of the associated form control |
| `disabled` | `boolean` | `false` | Mirrors the paired control's disabled state |
| `required` | `boolean` | `false` | Shows required indicator (`*`) when true |

---

## Wireframe Skeleton

```
Email address *           ← required indicator
┌────────────────────────┐
│                        │
└────────────────────────┘

🔒 Password
┌────────────────────────┐
│                        │
└────────────────────────┘

[ ]  Accept terms and conditions   ← label beside checkbox
```

---

## Angular Implementation

```typescript
@Component({
  selector: 'ds-label',
  template: `
    <label
      [attr.for]="htmlFor"
      class="ds-label"
      [class.ds-label--disabled]="disabled"
    >
      <ng-content select="[icon]"></ng-content>
      <ng-content></ng-content>
      <span *ngIf="required" class="ds-label__required" aria-hidden="true"> *</span>
    </label>
  `,
  styleUrls: ['./label.component.scss']
})
export class DsLabelComponent {
  @Input() htmlFor?: string;
  @Input() disabled = false;
  @Input() required = false;
}
```

```scss
.ds-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--foreground);
  cursor: pointer;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__required {
    color: var(--destructive);
    margin-left: 2px;
  }
}
```

---

## Usage Rules

1. Every form control (Input, Textarea, Checkbox, Radio, Select) must have a visible, associated Label.
2. Associate via `for`/`id` — do not rely on DOM nesting alone for accessibility.
3. The `disabled` prop on Label must mirror the `disabled` prop on the paired control.
4. Do not use placeholder text as a substitute for a label.
5. Required indicator `*` should be accompanied by a legend at the top of the form: "* Required field".
6. Labels wrap icons using the icon slot — the icon is decorative and `aria-hidden="true"`.
