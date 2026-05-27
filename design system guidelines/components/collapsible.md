# Collapsible

## Description
A single expandable container — a simplified version of Accordion for a standalone show/hide interaction. Unlike Accordion, it has no structured list of items; it is simply a trigger + content pair.

---

## Anatomy
```
Collapsed:
[Trigger button ▾]
  (content hidden)

Expanded:
[Trigger button ▲]
┌────────────────────────────────────────┐
│  Revealed content                      │
│  Any content type is valid here        │
└────────────────────────────────────────┘
  Content: height transitions from 0 → auto (overflow-hidden)
```

---

## Structure
```html
<div class="ds-collapsible" [class.ds-collapsible--open]="open">
  <!-- Trigger (provided by consumer) -->
  <ng-content select="[collapsible-trigger]"></ng-content>

  <!-- Content -->
  <div
    [hidden]="!open"
    class="ds-collapsible__content"
    [@collapsible]="open ? 'open' : 'closed'"
  >
    <ng-content></ng-content>
  </div>
</div>
```

---

## States

| State | Content | Trigger Icon |
|-------|---------|-------------|
| **Closed** | Hidden | ▾ (chevron down) |
| **Open** | Visible | ▲ (chevron up) |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `openChange` | `boolean` | Emitted on toggle |

---

## Wireframe Skeleton

```
Advanced filters [▾]

Advanced filters [▲]
┌────────────────────────────────────────┐
│  Date range: [________] to [________] │
│  Status:     [● Active  ○ Inactive]   │
│  Category:   [Select ▾]               │
└────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Collapsible for a **single** expandable section. Use Accordion for 2+ structured sections.
2. The trigger must visually indicate open/closed state (chevron icon rotation, label change, or both).
3. Animation: content height should animate smoothly on open/close — never appear/disappear instantly.
4. Do not use Collapsible to hide essential content — only use it for secondary or optional content.
