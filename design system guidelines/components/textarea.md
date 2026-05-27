# Textarea

## Description
Multi-line text entry field for collecting longer user content such as notes, descriptions, comments, and messages. Shares the same visual language as the Input component but allows for vertical expansion.

---

## Anatomy
```
┌────────────────────────────────────────────┐
│  Placeholder or entered text               │
│                                            │
│  (expands vertically with content)         │
│                                            │
└────────────────────────────────────────────┘
  min-height: 64px (min-h-16)
  padding: 4px 12px (py-1 px-3)
  background: var(--input-background) = #f3f3f5
  border: 1px solid var(--border)
  border-radius: var(--radius-md) = 8px
  font: 16px / weight 400 / line-height 1.5
  resize: none (no manual resize handle)
```

---

## Structure
```html
<textarea
  [placeholder]="placeholder"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [rows]="rows"
  [attr.aria-invalid]="invalid ? 'true' : null"
  [attr.aria-describedby]="describedBy"
  [(ngModel)]="value"
  (ngModelChange)="valueChange.emit($event)"
  (blur)="blurred.emit()"
  class="ds-textarea"
  [class.ds-textarea--invalid]="invalid"
></textarea>
```

---

## States

| State | Background | Border | Ring | Notes |
|-------|-----------|--------|------|-------|
| **Default** | `var(--input-background)` | `var(--border)` | none | Resting |
| **Focus** | `var(--input-background)` | `var(--ring)` | `3px var(--ring)/50` | Full ring |
| **Filled** | `var(--input-background)` | `var(--border)` | none | Content entered |
| **Disabled** | `var(--input-background)` | `var(--border)` | none | `opacity: 0.5`, `cursor: not-allowed` |
| **Read-only** | `var(--input-background)` | `var(--border)` | none (no focus ring) | `cursor: default` |
| **Invalid** | `var(--input-background)` | `var(--destructive)` | `3px var(--destructive)/20` | Error state |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Current value |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `invalid` | `boolean` | `false` | Error styling |
| `rows` | `number` | `4` | Initial visible rows |
| `maxLength` | `number` | `undefined` | Character limit |
| `id` | `string` | auto | For label association |
| `describedBy` | `string` | `undefined` | `aria-describedby` |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | On input |
| `blurred` | `void` | On blur |

---

## Wireframe Skeleton

```
Label
┌──────────────────────────────────────────┐
│  Enter description here...               │   rows: 4, min-h: 64px
│                                          │
│                                          │
│                                          │
└──────────────────────────────────────────┘

With character count:
┌──────────────────────────────────────────┐
│  Hello world                             │
│                                          │
└──────────────────────────────────────────┘
                                    11/200 ← right-aligned, text-xs muted
```

---

## Usage Rules

1. Minimum visible area is 64px (2 rows) — never collapse below this.
2. Do not enable `resize` — height should grow programmatically as content grows (auto-resize pattern).
3. For auto-resize: bind `rows` to content line count or use CSS `field-sizing: content` (CSS4).
4. Always pair with a Label and optionally a character counter and FormMessage.
5. Do not use Textarea for structured data — if the user needs to fill multiple fields, use separate Input components.
6. Set `maxLength` and display a character counter when there is a known content limit.
