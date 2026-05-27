# Progress

## Description
A non-interactive visual indicator showing the completion percentage of a task or process. Used for file uploads, multi-step flows, loading states, and skill/quota displays.

---

## Anatomy
```
Track:
┌──────────────────────────────────────────────┐  height: 8px (h-2)
│████████████████████░░░░░░░░░░░░░░░░░░░░░░░│  border-radius: 9999px
└──────────────────────────────────────────────┘
  ↑ filled portion (indicator)        ↑ unfilled
  bg: var(--primary)                  bg: var(--primary)/20

Track background: 20% opacity of primary
Indicator: 100% opacity primary, width = value%
Animation: width transitions smoothly (transition: width 300ms ease)
```

---

## Structure
```html
<div
  role="progressbar"
  [attr.aria-valuemin]="0"
  [attr.aria-valuemax]="100"
  [attr.aria-valuenow]="value"
  [attr.aria-label]="ariaLabel"
  class="ds-progress"
>
  <div
    class="ds-progress__indicator"
    [style.transform]="'translateX(-' + (100 - value) + '%)'"
  ></div>
</div>
```

---

## States

| State | Indicator Width | Notes |
|-------|----------------|-------|
| **0%** | `width: 0` | Empty track — show loading label |
| **In progress** | `width: value%` | Smooth CSS transition on change |
| **100%** | `width: 100%` | Complete — optionally show success colour |
| **Indeterminate** | animated pulse | When progress value is unknown |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Completion percentage (0–100) |
| `indeterminate` | `boolean` | `false` | Animated pulse when value is unknown |
| `ariaLabel` | `string` | `'Progress'` | Accessible label |

---

## Wireframe Skeleton

```
File upload
██████████████████░░░░░░░░  72%

Multi-step (labelled):
Step 2 of 4
████████████░░░░░░░░░░░░░░  50%

Indeterminate (loading):
░░░░░░░░░░░░░░░░░░░░░░░░░░  ← animated shimmer sweep
```

---

## Usage Rules

1. Always include an `ariaLabel` describing what is being measured (e.g. "File upload progress").
2. Display a numeric percentage or step label alongside the bar for clarity.
3. Use `indeterminate` when the total duration is unknown — never show 0% for a long unknown period.
4. Do not use Progress for binary loaded/not-loaded states — use a Skeleton instead.
5. Transition the indicator width smoothly — avoid instant jumps that feel jarring.
