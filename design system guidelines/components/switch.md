# Switch

## Description
A binary on/off toggle for settings and preferences that take **immediate effect** without requiring form submission. Visually resembles a physical light switch to communicate its binary nature.

---

## Anatomy
```
OFF state:
┌────────┐
│ (○)    │    Track bg: var(--switch-background) = #cbced4
└────────┘    Thumb: white circle, translateX(0)

ON state:
┌────────┐
│    (●) │    Track bg: var(--primary) = #030213
└────────┘    Thumb: white circle, translateX(~16px)

Track:
  height: 18.4px (h-[1.15rem])
  width: 32px (w-8)
  border-radius: 9999px (pill)

Thumb:
  16×16px (size-4)
  background: white
  border-radius: 9999px
  box-shadow: subtle
  transition: transform 150ms ease
```

---

## Structure
```html
<button
  role="switch"
  [attr.aria-checked]="checked"
  [attr.aria-label]="ariaLabel"
  [disabled]="disabled"
  [class.ds-switch--on]="checked"
  [class.ds-switch--disabled]="disabled"
  (click)="toggle()"
  class="ds-switch"
>
  <span class="ds-switch__thumb"></span>
</button>
```

---

## States

| State | Track Colour | Thumb Position | Notes |
|-------|------------|----------------|-------|
| **Off** | `var(--switch-background)` = `#cbced4` | Left (translateX: 0) | Default off |
| **On** | `var(--primary)` | Right (translateX: ~16px) | Active/enabled |
| **Hover (off)** | `#b5b8be` (slightly darker) | Left | Subtle feedback |
| **Hover (on)** | `var(--primary)` slightly lighter | Right | — |
| **Focus-visible** | — | — | 3px ring on track |
| **Disabled (off)** | `var(--switch-background)` at 50% | Left | `opacity: 0.5` |
| **Disabled (on)** | `var(--primary)` at 50% | Right | `opacity: 0.5` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | On/off state |
| `disabled` | `boolean` | `false` | Disabled |
| `ariaLabel` | `string` | `undefined` | Accessible label (required when no visible label) |
| `id` | `string` | auto | For label association |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `checkedChange` | `boolean` | Emitted on toggle |

---

## Wireframe Skeleton

```
Setting label          [────(●)]   ← ON state
Description text

Another setting        [(○)────]   ← OFF state
Description text

Disabled setting       [(○)────]   ← OFF + disabled (50% opacity)
```

---

## Usage Rules

1. Use Switch for settings that take **immediate effect** — the change happens the moment the switch is toggled, with no Save button needed.
2. Use Checkbox for options that are part of a form submitted as a batch.
3. Always provide a visible label or `ariaLabel` describing what the switch controls.
4. The switch label should describe the feature, not the state (e.g. "Receive email notifications" not "Notifications on/off").
5. On mobile, ensure the touch target area extends beyond the visible switch to at least 44×44px.
6. Avoid placing more than 10 switches on one page — group into sections or use a different pattern if needed.
7. Keyboard: `Space` toggles; `Enter` also acceptable.
