# Separator

## Description
A thin decorative line used to visually divide content sections. Communicates a thematic break or logical grouping boundary. Can be oriented horizontally (between sections) or vertically (between inline elements).

---

## Anatomy
```
Horizontal:
──────────────────────────────────────────
  height: 1px
  width: 100%
  background: var(--border) = rgba(0,0,0,0.1)

Vertical:
│
  width: 1px
  height: 100% (fills parent height)
  background: var(--border)
```

---

## Structure
```html
<div
  role="separator"
  [attr.aria-orientation]="orientation"
  [class.ds-separator--vertical]="orientation === 'vertical'"
  class="ds-separator"
></div>
```

---

## Variants

| Variant | Orientation | Height | Width |
|---------|------------|--------|-------|
| `horizontal` (default) | Horizontal | 1px | 100% |
| `vertical` | Vertical | 100% | 1px |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the line |
| `decorative` | `boolean` | `true` | When true, hidden from screen readers (`role` removed) |

---

## Wireframe Skeleton

```
Horizontal (between content sections):
  Section A content
  ──────────────────────────────────────────
  Section B content

Vertical (in a menu or toolbar):
  [Action A]  │  [Action B]  │  [Action C]
```

---

## Usage Rules

1. Use `decorative="true"` (default) when the separator is purely visual — screen readers will not announce it.
2. Use `decorative="false"` only when the separator carries semantic meaning (e.g. separating distinct regions in a dialog).
3. In dropdown menus, separators use negative horizontal margin (`-mx-1`) to bleed to the edges of the container, plus `my-1` vertical margin.
4. Do not use multiple consecutive separators — that signals a layout/grouping problem.
5. Separators should never be styled with custom colours — they always use `var(--border)`.
