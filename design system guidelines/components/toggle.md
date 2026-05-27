# Toggle

## Description
A button that maintains a pressed/active state between interactions. Commonly used for formatting controls (bold, italic), view switches (grid/list), and filter activations. Unlike a button which resets after a click, a toggle retains its on/off state.

---

## Anatomy
```
Off state:
┌──────────────────┐
│   [icon/text]    │   bg: transparent (default) or border (outline)
└──────────────────┘   color: var(--muted-foreground)

On state:
┌──────────────────┐
│   [icon/text]    │   bg: var(--accent), color: var(--accent-foreground)
└──────────────────┘
```

---

## Structure
```html
<button
  role="button"
  [attr.aria-pressed]="pressed"
  [disabled]="disabled"
  [class.ds-toggle--on]="pressed"
  [class.ds-toggle--outline]="variant === 'outline'"
  [class.ds-toggle--sm]="size === 'sm'"
  [class.ds-toggle--lg]="size === 'lg'"
  class="ds-toggle"
  (click)="toggle()"
>
  <ng-content></ng-content>
</button>
```

---

## Variants

| Variant | Off Background | Off Border | On Background |
|---------|---------------|------------|---------------|
| `default` | `transparent` | none | `var(--accent)` |
| `outline` | `transparent` | `1px solid var(--border)` | `var(--accent)` |

---

## Sizes

| Size | Height | Padding |
|------|--------|---------|
| `sm` | 32px (h-8) | `0 12px` |
| `default` | 36px (h-9) | `0 12px` |
| `lg` | 40px (h-10) | `0 12px` |

---

## States

| State | Background | Notes |
|-------|-----------|-------|
| **Off** | transparent | Default resting state |
| **On** | `var(--accent)` | Active/pressed |
| **Hover (off)** | `var(--muted)` | Subtle hover fill |
| **Hover (on)** | `var(--accent)` slightly darker | — |
| **Focus-visible** | — | 3px ring `var(--ring)/50` |
| **Disabled** | — | `opacity: 0.5` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pressed` | `boolean` | `false` | On/off state |
| `variant` | `'default' \| 'outline'` | `'default'` | Visual style |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size preset |
| `disabled` | `boolean` | `false` | Disabled |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `pressedChange` | `boolean` | Emitted on toggle |

---

## Wireframe Skeleton

```
Formatting toolbar:
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  B  │ │  I  │ │  U  │ │  S  │   ← outline variant
└─────┘ └─────┘ └─────┘ └─────┘
   ↑ pressed: filled accent bg

View toggle:
┌──────────┐ ┌──────────┐
│ ▦ Grid   │ │ ≡ List   │   ← default variant, one pressed at a time
└──────────┘ └──────────┘
```

---

## Usage Rules

1. Use `aria-pressed` to communicate toggle state to screen readers — always set this attribute.
2. For mutually exclusive toggles (only one active at a time), use Toggle Group instead.
3. Icon-only toggles must have `aria-label` describing the action and state (e.g. "Bold — active").
4. Do not use Toggle for navigation — it implies reversibility, not destination.
5. State should persist until explicitly changed — never auto-reset like a button.
