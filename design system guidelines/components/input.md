# Input

## Description
Single-line text entry field for collecting user data in forms, search bars, and filter controls. Styled to integrate with the design system's token system. Always used in conjunction with a Label and optionally a FormMessage.

---

## Anatomy
```
┌──────────────────────────────────────────────┐
│  [placeholder text or entered value]          │
└──────────────────────────────────────────────┘
  height: 36px (h-9)
  padding: 4px 12px (py-1 px-3)
  background: var(--input-background) = #f3f3f5
  border: 1px solid var(--border) = rgba(0,0,0,0.1)
  border-radius: var(--radius-md) = 8px
  font: 16px / weight 400 / line-height 1.5
  color: var(--foreground)
```

---

## Structure
```html
<input
  [type]="type"
  [placeholder]="placeholder"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [value]="value"
  [attr.aria-invalid]="invalid ? 'true' : null"
  [attr.aria-describedby]="describedBy"
  (input)="onInput($event)"
  (blur)="onBlur()"
  class="ds-input"
/>
```

---

## Types

The `type` property maps directly to HTML input types. Commonly used values:

| Type | Usage |
|------|-------|
| `text` | General text input (default) |
| `email` | Email address |
| `password` | Masked password entry |
| `number` | Numeric values |
| `search` | Search queries |
| `url` | URL input |
| `tel` | Phone number |
| `file` | File upload (additional styles: `cursor-pointer`, remove border) |

---

## States

| State | Background | Border | Ring | Text |
|-------|-----------|--------|------|------|
| **Default** | `var(--input-background)` = `#f3f3f5` | `var(--border)` | none | `var(--foreground)` |
| **Focus** | `var(--input-background)` | `var(--ring)` | `3px var(--ring)/50` | `var(--foreground)` |
| **Hover** | `var(--input-background)` | `var(--border)` darkened slightly | none | — |
| **Filled** | `var(--input-background)` | `var(--border)` | none | `var(--foreground)` |
| **Disabled** | `var(--input-background)` | `var(--border)` | none | `var(--muted-foreground)` at 50% opacity |
| **Read-only** | `var(--input-background)` | `var(--border)` | none (no focus ring) | `var(--foreground)` |
| **Invalid** | `var(--input-background)` | `var(--destructive)` | `3px var(--destructive)/20` | `var(--foreground)` |
| **Placeholder** | — | — | — | `var(--muted-foreground)` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Current value (two-way via `ngModel`) |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `invalid` | `boolean` | `false` | Triggers error styling |
| `id` | `string` | auto-generated | For label `for` association |
| `name` | `string` | `undefined` | Form field name |
| `autocomplete` | `string` | `undefined` | Browser autocomplete hint |
| `describedBy` | `string` | `undefined` | `aria-describedby` for helper/error text |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | Emitted on input change |
| `blurred` | `void` | Emitted on blur |

---

## Wireframe Skeleton

```
Label text
┌────────────────────────────────────────┐
│  Placeholder text                       │   default state
└────────────────────────────────────────┘

Label text
┌────────────────────────────────────────┐
│  user@example.com                      │   filled state, border highlight
└────────────────────────────────────────┘
 ╔══════════════════════════════════════╗   focus ring (3px, ring/50)

Label text
┌────────────────────────────────────────┐
│  Placeholder text                       │   invalid state
└────────────────────────────────────────┘
 ║ border: destructive
  Enter a valid email address.            ← FormMessage, text-destructive text-sm
```

---

## Angular Implementation

```typescript
// input.component.ts
@Component({
  selector: 'ds-input',
  template: `
    <input
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readOnly]="readOnly"
      [attr.aria-invalid]="invalid ? 'true' : null"
      [(ngModel)]="value"
      (ngModelChange)="valueChange.emit($event)"
      (blur)="blurred.emit()"
      class="ds-input"
      [class.ds-input--invalid]="invalid"
    />
  `,
  styleUrls: ['./input.component.scss']
})
export class DsInputComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() readOnly = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();
}
```

```scss
// input.component.scss
.ds-input {
  display: flex;
  width: 100%;
  height: 2.25rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--foreground);
  outline: none;
  transition: border-color 150ms, box-shadow 150ms;

  &::placeholder {
    color: var(--muted-foreground);
  }

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[readonly] {
    cursor: default;
  }

  &--invalid {
    border-color: var(--destructive);

    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent);
    }
  }
}
```

---

## Usage Rules

1. Always pair with a `ds-label` component linked via `for`/`id`.
2. Always pair with a `ds-form-message` to show validation feedback.
3. Use `invalid` binding — never change border colour manually in consuming components.
4. File inputs require `type="file"` and get `cursor-pointer` styling; the border is removed.
5. Do not set a fixed width on the input — it should fill its container (`width: 100%`).
6. Password inputs must include a visibility toggle button beside them (not built into this component).
7. Number inputs should include `min`, `max`, and `step` attributes for proper browser behaviour.
8. Never use `disabled` for read-only content presentation — use `readOnly` instead.
