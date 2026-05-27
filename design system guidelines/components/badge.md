# Badge

## Description
A compact, inline label used to convey status, counts, or category tags. Non-interactive — for actions, use a Button instead. Badges are always concise and appear inline with content.

---

## Anatomy
```
┌───────────────┐
│  Label text   │  height: auto (content-driven)
└───────────────┘  padding: 2px 8px (py-0.5 px-2)
                   font: text-xs (12px) / weight 500
                   border-radius: var(--radius-md) = 8px
                   white-space: nowrap

Icon badge (with icon):
┌──────────────────┐
│  ● Label text    │  icon: 12×12px, gap: 4px
└──────────────────┘
```

---

## Variants

| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| `default` | `var(--primary)` | `var(--primary-foreground)` | none | High-emphasis status (New, Featured) |
| `secondary` | `var(--secondary)` | `var(--secondary-foreground)` | none | Neutral category or count |
| `destructive` | `var(--destructive)/10` | `var(--destructive)` | `1px var(--destructive)/20` | Error, danger, critical status |
| `outline` | transparent | `var(--foreground)` | `1px solid var(--border)` | Low-emphasis label or tag |

---

## Structure
```html
<span
  class="ds-badge"
  [class]="'ds-badge--' + variant"
>
  <ds-icon *ngIf="icon" [name]="icon" size="12"></ds-icon>
  <ng-content></ng-content>
</span>
```

---

## States

Badges are static — they have no hover, focus, or active states. They are not interactive.

If a badge needs to be clickable (e.g. a filter chip), use a Button with `size="sm"` and `variant="outline"` instead.

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Visual style |
| `icon` | `string` | `undefined` | Optional leading icon name |

---

## Wireframe Skeleton

```
Status badges in a table:
  Item A    [Active]       ← default variant (primary)
  Item B    [Inactive]     ← secondary variant
  Item C    [⚠ Overdue]    ← destructive variant
  Item D    [Draft]        ← outline variant

Category tags:
  [React]  [TypeScript]  [Angular]   ← outline badges

Count badge in nav:
  Messages  [12]  ← secondary badge (notification count)

Feature tag beside heading:
  Analytics Dashboard  [New]  ← default badge
```

---

## Usage Rules

1. Keep badge text under 20 characters — badges are not for sentences.
2. Never stack more than 3 badges inline in a single row.
3. Do not use badges for actions — they are read-only status indicators.
4. Avoid using `default` (primary/dark) badges for simple category tags — use `outline` or `secondary`.
5. For notification counts in navigation, use `secondary` variant; switch to `destructive` for urgent/error counts.
6. Badge text should be title-cased for status labels ("Active", "Draft") and lowercase for tags ("react", "typescript").
