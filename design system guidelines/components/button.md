# Button

## Description
The primary interactive control for triggering actions. Communicates affordance through shape, colour, and typography. All variants share the same size system, spacing rules, and font treatment.

---

## Anatomy
```
┌──────────────────────────────────────┐
│  [icon?]  [label text]  [icon?]      │
└──────────────────────────────────────┘
     ↑            ↑            ↑
  optional    required      optional
  16×16px     text          16×16px
              gap between icon + label: 8px (gap-2)
```

---

## Structure
```html
<button
  [type]="type"
  [disabled]="disabled"
  [attr.aria-disabled]="disabled"
  [class]="computedClasses"
  (click)="handleClick($event)"
>
  <ng-content select="[icon-left]"></ng-content>
  <ng-content></ng-content>
  <ng-content select="[icon-right]"></ng-content>
</button>
```

---

## Variants

| Variant | Background | Text Colour | Border | Use Case |
|---------|-----------|-------------|--------|----------|
| `default` | `var(--primary)` | `var(--primary-foreground)` | none | Main CTA, highest priority action on a page |
| `destructive` | `var(--destructive)` | `var(--destructive-foreground)` | none | Delete, remove, or irreversible actions |
| `outline` | `var(--background)` | `var(--foreground)` | `1px solid var(--border)` | Secondary action appearing alongside a primary |
| `secondary` | `var(--secondary)` | `var(--secondary-foreground)` | none | Supporting or alternative actions |
| `ghost` | `transparent` | `var(--foreground)` | none | Toolbar items, low-emphasis inline actions |
| `link` | `transparent` | `var(--primary)` | none (underline on hover) | Navigation-like inline text actions |

---

## Sizes

| Size | Height | Padding | Min Width | Icon Size |
|------|--------|---------|-----------|-----------|
| `sm` | 32px (`h-8`) | `0 12px` (`px-3`) | auto | 16×16px |
| `default` | 36px (`h-9`) | `0 12px` (`px-3`) | auto | 16×16px |
| `lg` | 40px (`h-10`) | `0 24px` (`px-6`) | auto | 16×16px |
| `icon` | 36×36px (`size-9`) | `0` | 36px | 16×16px |

---

## States

| State | Visual Change | Notes |
|-------|--------------|-------|
| **Default** | Base variant styles | Resting state |
| **Hover** | Background lightens/darkens ~10% | Use `color-mix` for derivative hover colour |
| **Focus-visible** | 3px ring `var(--ring)/50`, offset 2px | Keyboard navigation only (`:focus-visible`) |
| **Active / Pressed** | Background shifts slightly darker | Brief feedback during click hold |
| **Disabled** | `opacity: 0.5`, `cursor: not-allowed`, no pointer events | Applied via `[disabled]` attribute |
| **Loading** | Label replaced with spinner + "Loading…" | Handled externally — set `[disabled]="true"` while loading |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Dimension preset |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute |
| `ariaLabel` | `string` | `undefined` | Accessible label (required for icon-only) |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `clicked` | `MouseEvent` | Emitted on click (not emitted when disabled) |

---

## Wireframe Skeleton

```
Default / Primary:
┌──────────────────┐
│  ● Save Changes  │   bg: #030213 (primary)
└──────────────────┘   text: white, 16px/500, h-9

Outline:
┌──────────────────┐
│  ○ Cancel        │   bg: white, border: 1px, h-9
└──────────────────┘

Destructive:
┌──────────────────┐
│  🗑 Delete       │   bg: #d4183d, text: white, h-9
└──────────────────┘

Ghost (toolbar):
  [🖊]  [📋]  [🗑]     no background, icon-only size-9 each

Link:
  Save and continue →   underline on hover, no bg, primary colour
```

---

## Angular Implementation

```typescript
// button.component.ts
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'ds-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: { '[class]': 'hostClass' }
})
export class DsButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<MouseEvent>();

  get hostClass() {
    return `ds-btn ds-btn--${this.variant} ds-btn--${this.size}`;
  }

  handleClick(e: MouseEvent) {
    if (!this.disabled) this.clicked.emit(e);
  }
}
```

```scss
// button.component.scss
:host { display: inline-flex; }

.ds-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background-color 150ms, color 150ms, opacity 150ms;

  &:focus-visible {
    outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
    outline-offset: 2px;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  // Sizes
  &--default { height: 2.25rem; padding: 0 0.75rem; }
  &--sm      { height: 2rem;    padding: 0 0.75rem; }
  &--lg      { height: 2.5rem;  padding: 0 1.5rem;  }
  &--icon    { width: 2.25rem;  height: 2.25rem; padding: 0; }

  // Variants
  &--default     { background: var(--primary); color: var(--primary-foreground); }
  &--destructive { background: var(--destructive); color: var(--destructive-foreground); }
  &--outline     { background: var(--background); color: var(--foreground); border: 1px solid var(--border); }
  &--secondary   { background: var(--secondary); color: var(--secondary-foreground); }
  &--ghost       { background: transparent; color: var(--foreground); &:hover { background: var(--accent); } }
  &--link        { background: transparent; color: var(--primary); text-decoration: none;
                   &:hover { text-decoration: underline; } }
}
```

---

## Usage Rules

1. One `default` (primary) button per section maximum — do not repeat primary CTAs.
2. `destructive` variant requires a confirmation step (Alert Dialog) before the action executes.
3. Never use `link` variant for page navigation — use `<a [routerLink]>` instead.
4. Icon-only buttons (`size="icon"`) **must** have an `ariaLabel` for screen readers.
5. Buttons inside forms must have `type="submit"` or `type="button"` — never omit the type attribute.
6. Do not use `ghost` as a primary action — it must always accompany a higher-weight button.
7. Loading state: set `[disabled]="true"` and replace label content with a spinner.
8. Minimum touch target on mobile: 44×44px — override height for mobile-specific button rows.
