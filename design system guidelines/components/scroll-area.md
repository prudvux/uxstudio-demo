# Scroll Area

## Description
A scrollable container that replaces the native OS scrollbar with a thin, styled overlay scrollbar. Provides consistent cross-platform scrollbar appearance that matches the design system's visual language.

---

## Anatomy
```
┌────────────────────────────────────────────────┐
│  Scrollable content                         │  │  ← Scrollbar (vertical)
│  More content below the fold...             │  │    width: 6px
│  Even more content...                       │  │    bg: var(--border) on thumb
│  ...                                        │  │    appears on hover/scroll
│  ...                                        │  │    border-radius: full
│  ...                                        │  │    position: absolute, right 0
└────────────────────────────────────────────────┘
  overflow: hidden on viewport
  Custom scrollbar overlays content (does not reduce usable width)

Horizontal scrollbar (when applicable):
  Same styling but horizontal, at bottom of container, height: 6px
```

---

## Structure
```html
<div class="ds-scroll-area" [style.height]="height">
  <!-- Viewport -->
  <div class="ds-scroll-area__viewport">
    <ng-content></ng-content>
  </div>

  <!-- Vertical scrollbar -->
  <div class="ds-scroll-area__scrollbar ds-scroll-area__scrollbar--vertical">
    <div class="ds-scroll-area__thumb"></div>
  </div>

  <!-- Horizontal scrollbar -->
  <div class="ds-scroll-area__scrollbar ds-scroll-area__scrollbar--horizontal">
    <div class="ds-scroll-area__thumb"></div>
  </div>

  <!-- Corner (when both scrollbars visible) -->
  <div class="ds-scroll-area__corner"></div>
</div>
```

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'` | When scrollbar is visible |
| `scrollHideDelay` | `number` | `600` | Ms before scrollbar hides after scroll |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Scrollbar direction(s) |

---

## Wireframe Skeleton

```
Sidebar navigation list:
┌──────────────────────────┐
│  Home                 │  │
│  Dashboard            │  │  ← scrollbar (thin, 6px)
│  Projects             │▓ │  ← thumb (currently visible)
│  Settings             │  │
│  Analytics            │  │
│  Reports              │  │
│  Team                 │  │
│  ...                  │  │
└──────────────────────────┘
  Height: fixed container, content scrolls inside
```

---

## Usage Rules

1. Use Scroll Area when the native scrollbar appearance would be inconsistent with the design system (thick, OS-styled bars in sidebars, dialogs, or compact lists).
2. Always set a fixed height on the container — Scroll Area must have a constrained height to activate scrolling.
3. For simple content areas where native scroll is acceptable, use `overflow-y: auto` directly without this component.
4. The scrollbar overlays content — content is not pushed inward. Ensure important content is not hidden behind the thin scrollbar on hover.
5. `type: 'hover'` is the default and most appropriate — scrollbar appears on hover/scroll and hides after `scrollHideDelay`.
