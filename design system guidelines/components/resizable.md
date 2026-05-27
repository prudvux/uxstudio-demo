# Resizable

## Description
A panel layout where users can drag a handle to resize adjacent panels. Used for split-view layouts such as code editors, file explorers, and comparison views.

---

## Anatomy
```
Horizontal split:
┌──────────────────────┃──────────────────────────┐
│                      ┃                          │
│   Panel A            ┃   Panel B                │
│   (resizable)        ┃   (resizable)            │
│                      ┃                          │
└──────────────────────┃──────────────────────────┘
                       ↑ Handle: 4px wide, cursor: col-resize
                         bg: var(--border) on hover/drag

Vertical split:
┌──────────────────────────────────────────────────┐
│  Panel A                                         │
│  (resizable)                                     │
═══════════════════════════════════════════════════  ← Handle: 4px tall, cursor: row-resize
│  Panel B                                         │
└──────────────────────────────────────────────────┘

Handle states:
  Default: transparent (invisible, cursor: resize shows intent)
  Hover: bg: var(--border)
  Active/Drag: bg: var(--primary)
  With handle icon: centred ⋮⋮ or ═ icon, size 16px
```

---

## Structure
```html
<ds-resizable-panel-group
  [direction]="direction"
  class="ds-resizable"
>
  <ds-resizable-panel
    [defaultSize]="defaultSizeA"
    [minSize]="minSizeA"
  >
    <ng-content select="[panel-a]"></ng-content>
  </ds-resizable-panel>

  <ds-resizable-handle [withHandle]="true"></ds-resizable-handle>

  <ds-resizable-panel
    [defaultSize]="defaultSizeB"
    [minSize]="minSizeB"
  >
    <ng-content select="[panel-b]"></ng-content>
  </ds-resizable-panel>
</ds-resizable-panel-group>
```

---

## Properties

### PanelGroup @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split direction |
| `autoSaveId` | `string` | `undefined` | Persists panel sizes to localStorage |

### Panel @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultSize` | `number` | `50` | Default size (%) |
| `minSize` | `number` | `10` | Minimum size (%) |
| `maxSize` | `number` | `100` | Maximum size (%) |
| `collapsible` | `boolean` | `false` | Allow full collapse |
| `collapsedSize` | `number` | `0` | Size when collapsed |

### Handle @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `withHandle` | `boolean` | `false` | Show visible drag icon |
| `disabled` | `boolean` | `false` | Disable resizing |

---

## Wireframe Skeleton

```
File explorer + editor split:
┌────────────────────┃──────────────────────────────┐
│ 📁 src/            ┃  src/app/app.component.ts     │
│   📁 app/          ┃  ─────────────────────────    │
│     📄 app.ts  ┃  import { Component } from...│
│     📄 app.html┃  ...                         │
│   📁 styles/   ┃                              │
└────────────────────┃──────────────────────────────┘
  250px (default)     (flexible width)
```

---

## Usage Rules

1. Use `autoSaveId` to persist panel sizes in localStorage so users don't lose their preference on reload.
2. Set a meaningful `minSize` (e.g. 10–20%) to prevent panels from collapsing unintentionally.
3. The drag handle must have `cursor: col-resize` (horizontal) or `cursor: row-resize` (vertical).
4. Keyboard: Tab to focus handle; Arrow keys to resize; `Enter` resets to default.
5. Do not use Resizable for mobile layouts — use stacked panels with a toggle instead.
