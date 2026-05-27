# Slider

## Description
A draggable control for selecting a numerical value or range along a continuous track. Used for settings like volume, brightness, price range filters, and opacity controls.

---

## Anatomy
```
Horizontal:
○─────────────────────●───────────────
│                     │
│                     Thumb: 16×16px, border-2 border-primary, bg-background
│                     shadow-xs
│
Track: h-2 (8px), bg: var(--muted), border-radius: 9999px
Range (filled): bg: var(--primary), same height as track

Vertical:
   │  ← track
   │
   ●  ← thumb
   │
   │  ← range (filled, below thumb)
```

---

## Structure
```html
<div
  class="ds-slider"
  [class.ds-slider--vertical]="orientation === 'vertical'"
  [class.ds-slider--disabled]="disabled"
  role="slider"
  [attr.aria-valuemin]="min"
  [attr.aria-valuemax]="max"
  [attr.aria-valuenow]="value"
  [attr.aria-disabled]="disabled"
  [attr.aria-orientation]="orientation"
>
  <div class="ds-slider__track">
    <div class="ds-slider__range" [style.width.%]="percentage"></div>
  </div>
  <div
    class="ds-slider__thumb"
    [style.left.%]="percentage"
    (keydown)="onKeyDown($event)"
    tabindex="0"
  ></div>
</div>
```

---

## States

| State | Track | Range | Thumb |
|-------|-------|-------|-------|
| **Default** | `var(--muted)` | `var(--primary)` | white, `border-primary` |
| **Hover (thumb)** | — | — | Slight scale up |
| **Focus-visible (thumb)** | — | — | 3px ring `var(--ring)/50` |
| **Disabled** | `var(--muted)` at 50% | `var(--primary)` at 50% | `opacity: 0.5` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number \| [number, number]` | `0` | Current value (single or range) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Increment per step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Track direction |
| `disabled` | `boolean` | `false` | Disabled state |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `number \| [number, number]` | Emitted on drag |
| `valueCommit` | `number \| [number, number]` | Emitted on drag end (mouse/touch up) |

---

## Wireframe Skeleton

```
Single value:
Volume
○──────────────●────────────────  72%

Range (price filter):
Price range
●──────────────────●──────────
$20                           $80

Vertical (orientation):
100 ─
     │
  72 ─ ●
     │
   0 ─
```

---

## Usage Rules

1. Always display the current value near the slider (label, tooltip, or input field alongside).
2. For precise entry, pair with a number Input field that syncs with the slider value.
3. Step size must be meaningful — too many steps makes dragging imprecise; too few reduces resolution.
4. Range sliders (two thumbs) must ensure the lower thumb cannot exceed the upper thumb.
5. Vertical sliders are appropriate for audio mixing panels or value scales where vertical metaphor matches the domain.
6. Keyboard: Arrow keys adjust value by one step; Page Up/Down by 10 steps; Home/End jump to min/max.
