# Accordion

## Description
A vertically stacked list of sections that expand and collapse to reveal content. Reduces visual clutter on content-heavy pages by hiding secondary information behind progressive disclosure.

---

## Anatomy
```
Collapsed state:
┌──────────────────────────────────────────────┐
│  Section Title A                          ▾  │  ← Trigger: py-4, text-sm font-medium
└──────────────────────────────────────────────┘
  ───────────────────────── (border-b)

┌──────────────────────────────────────────────┐
│  Section Title B                          ▾  │
└──────────────────────────────────────────────┘
  ─────────────────────────

Expanded state (Section B open):
┌──────────────────────────────────────────────┐
│  Section Title A                          ▾  │
└──────────────────────────────────────────────┘
  ─────────────────────────

┌──────────────────────────────────────────────┐
│  Section Title B                          ▲  │  ← Chevron rotates 180°
├──────────────────────────────────────────────┤
│  Section B content text here.                │  ← Content: pb-4 pt-0 text-sm
│  Additional content as needed.               │
└──────────────────────────────────────────────┘
  ─────────────────────────

Item border: bottom only (border-b), except last item (no border-b)
Chevron animation: rotate(0°) → rotate(180°) on open (150ms ease)
Content animation: height 0 → auto (overflow-hidden)
```

---

## Structure
```html
<div class="ds-accordion" [attr.data-type]="type">
  <div
    *ngFor="let item of items"
    class="ds-accordion__item"
    [class.ds-accordion__item--open]="isOpen(item.value)"
  >
    <h3 class="ds-accordion__header">
      <button
        [attr.aria-expanded]="isOpen(item.value)"
        [attr.aria-controls]="'content-' + item.value"
        [id]="'trigger-' + item.value"
        (click)="toggleItem(item.value)"
        class="ds-accordion__trigger"
      >
        {{ item.title }}
        <ds-icon name="chevron-down" class="ds-accordion__chevron"></ds-icon>
      </button>
    </h3>

    <div
      [id]="'content-' + item.value"
      [attr.aria-labelledby]="'trigger-' + item.value"
      role="region"
      [hidden]="!isOpen(item.value)"
      class="ds-accordion__content"
    >
      <div class="ds-accordion__content-inner">
        <ng-container *ngTemplateOutlet="item.template"></ng-container>
      </div>
    </div>
  </div>
</div>
```

---

## Types

| Type | Behaviour |
|------|-----------|
| `single` | Only one item open at a time. Opening one closes the previous. |
| `multiple` | Multiple items can be open simultaneously. |

---

## States

| State | Visual |
|-------|--------|
| **Collapsed** | Content hidden, chevron at 0° |
| **Expanded** | Content visible, chevron at 180° |
| **Hover (trigger)** | Trigger text underlines or darkens slightly |
| **Focus-visible** | 3px ring on the trigger button |
| **Disabled (item)** | Trigger `opacity: 0.5`, `cursor: not-allowed` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `AccordionItem[]` | `[]` | Array of accordion sections |
| `type` | `'single' \| 'multiple'` | `'single'` | Collapse behaviour |
| `value` | `string \| string[]` | `undefined` | Open item(s) — controlled |
| `defaultValue` | `string \| string[]` | `undefined` | Initially open item(s) |
| `collapsible` | `boolean` | `false` | Allow closing active item in `single` mode |

```typescript
interface AccordionItem {
  value: string;
  title: string;
  disabled?: boolean;
  template: TemplateRef<unknown>;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string \| string[]` | Emitted when open items change |

---

## Wireframe Skeleton

```
FAQ accordion (single mode):
┌───────────────────────────────────────────────────┐
│  What is your refund policy?                   ▾  │
└───────────────────────────────────────────────────┘
  ────────────────────────────────────────────
┌───────────────────────────────────────────────────┐
│  How do I cancel my subscription?              ▲  │  ← open
├───────────────────────────────────────────────────┤
│  You can cancel anytime from Account Settings.    │
│  Changes take effect at end of billing period.    │
└───────────────────────────────────────────────────┘
  ────────────────────────────────────────────
┌───────────────────────────────────────────────────┐
│  Do you offer enterprise plans?                ▾  │
└───────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Use `single` mode for FAQs and help content where users read one answer at a time.
2. Use `multiple` mode for settings panels or filters where users configure several items simultaneously.
3. Accordion titles must be self-explanatory — users decide whether to open based on the title alone.
4. Do not put critical information (required reading) inside collapsed accordion items — it may be missed.
5. Keep content sections concise — if content is longer than ~200 words, consider a dedicated page instead.
6. Nested accordions are not permitted.
7. The chevron icon is always right-aligned in the trigger row.
