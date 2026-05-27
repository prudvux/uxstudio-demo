# Skeleton

## Description
A placeholder loading state that mimics the visual shape of content being fetched or processed. Reduces perceived loading time and prevents layout shift by reserving space before data arrives.

---

## Anatomy
```
Text line skeleton:
┌──────────────────────────────────────────────┐  height: 16px (h-4)
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  bg: var(--accent) = #e9ebef
└──────────────────────────────────────────────┘  border-radius: var(--radius-md)
                                                   animation: animate-pulse (CSS)

Avatar skeleton:
┌────┐
│    │  40×40px, border-radius: 50%
└────┘

Card skeleton:
┌─────────────────────────────────────────────┐
│  ┌────┐  ┌───────────────────────────────┐  │  ← avatar + title line
│  │    │  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
│  └────┘  └───────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │  ← description lines
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
│  └───────────────────────────────────────┘  │
│  ┌─────────────────────────┐               │  ← shorter last line
│  │░░░░░░░░░░░░░░░░░░░░░│               │
│  └─────────────────────────┘               │
└─────────────────────────────────────────────┘

Animation: pulse (opacity 1 → 0.5 → 1, 2s infinite)
```

---

## Structure
```html
<!-- Basic skeleton -->
<div
  [class]="computedClass"
  aria-hidden="true"
  class="ds-skeleton"
></div>

<!-- Skeleton card pattern -->
<div class="ds-skeleton-card">
  <div class="ds-skeleton-card__header">
    <div class="ds-skeleton ds-skeleton--avatar"></div>
    <div class="ds-skeleton-card__lines">
      <div class="ds-skeleton ds-skeleton--line ds-skeleton--line-full"></div>
      <div class="ds-skeleton ds-skeleton--line ds-skeleton--line-half"></div>
    </div>
  </div>
  <div class="ds-skeleton ds-skeleton--line ds-skeleton--line-full"></div>
  <div class="ds-skeleton ds-skeleton--line ds-skeleton--line-full"></div>
  <div class="ds-skeleton ds-skeleton--line ds-skeleton--line-3q"></div>
</div>
```

---

## Common Patterns

| Pattern | Height | Width | Border Radius |
|---------|--------|-------|---------------|
| Text line (full) | 16px | 100% | `var(--radius-md)` |
| Text line (3/4) | 16px | 75% | `var(--radius-md)` |
| Text line (half) | 16px | 50% | `var(--radius-md)` |
| Heading | 24px | 60% | `var(--radius-md)` |
| Avatar (circle) | 40×40px | 40px | 50% |
| Card | 120px+ | 100% | `var(--radius-lg)` |
| Button | 36px | 80px | `var(--radius-md)` |
| Image/Banner | custom | 100% | `var(--radius-md)` |
| Table row | 40px | 100% | 0 |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `string` | `'100%'` | Width (px, %, rem) |
| `height` | `string` | `'1rem'` | Height |
| `borderRadius` | `string` | `var(--radius-md)` | Border radius |
| `circle` | `boolean` | `false` | Circular skeleton (avatar) |

---

## Wireframe Skeleton

```
Profile card loading state:
┌──────────────────────────────────────────────┐
│  [████]  ░░░░░░░░░░░░░░░░░░░░░░░░           │  ← avatar + name skeleton
│          ░░░░░░░░░░░░░░░░               │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │  ← description line 1
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               │  ← description line 2 (shorter)
└──────────────────────────────────────────────┘

Table loading state:
┌───────────────────────────────────────────────────┐
│  ░░░░░░░░░░  ░░░░░░  ░░░░░░░░  ░░░░░░░░░░░░░░  │  ← header row
│  ░░░░░░░░░░  ░░░░░░  ░░░░░░░░  ░░░░░░░░░░░░░░  │  ← data row 1
│  ░░░░░░░░░░  ░░░░░░  ░░░░░░░░  ░░░░░░░░░░░░░░  │  ← data row 2
│  ░░░░░░░░░░  ░░░░░░  ░░░░░░░░  ░░░░░░░░░░░░░░  │  ← data row 3
└───────────────────────────────────────────────┘
```

---

## Usage Rules

1. All skeleton elements must have `aria-hidden="true"` — screen readers should not announce them.
2. Match skeleton shapes exactly to the content they replace — same dimensions, same border radius.
3. Remove skeletons immediately when data is available — no fade transition needed.
4. Use `animate-pulse` CSS animation (opacity cycle) — not shimmer/sweep animations.
5. Never show actual text in skeleton state — blank shapes only.
6. For tables, show 3–5 skeleton rows regardless of actual data count.
7. Group skeletons within the same card/section together — do not show mixed skeleton + loaded content within a single card.
