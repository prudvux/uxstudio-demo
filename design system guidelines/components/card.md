# Card

## Description
A contained surface for grouping logically related content and actions. Cards create visual separation from the page background and establish a clear content unit. Cards are composed of up to five named sub-regions: Header, Title, Description, Content, and Footer.

---

## Anatomy
```
┌─────────────────────────────────────────────────────────┐
│  Card Header                                   [Action] │  ← pt-6 px-6
│  Card Title                                            │     h4, font-semibold, leading-none
│  Card Description text goes here                       │     text-sm, muted-foreground
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Card Content                                           │  ← px-6
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Secondary Action]                 [Primary Action]    │  ← px-6 pb-6, flex items-center
└─────────────────────────────────────────────────────────┘

border: 1px solid var(--border) = rgba(0,0,0,0.1)
border-radius: var(--radius-lg) = 10px
background: var(--card) = #ffffff
gap between sections: 24px (gap-6)
padding all sides: 24px (px-6, pt-6, pb-6)
```

---

## Sub-Components

| Component | Element | CSS / Layout |
|-----------|---------|-------------|
| `CardComponent` | `<div>` | `flex flex-col gap-6`, `bg-card`, `border`, `rounded-xl` |
| `CardHeaderComponent` | `<div>` | `@container/card-header`, grid layout, `px-6 pt-6` |
| `CardTitleComponent` | `<div>` (h4 semantics) | `leading-none`, `font-semibold` |
| `CardDescriptionComponent` | `<div>` (p semantics) | `text-sm`, `text-muted-foreground` |
| `CardContentComponent` | `<div>` | `px-6` padding only, no top/bottom padding |
| `CardFooterComponent` | `<div>` | `flex items-center px-6 pb-6` |
| `CardActionComponent` | `<div>` | `col-start-2 row-span-2 self-start` — top-right of header |

---

## Structure
```html
<div class="ds-card">
  <div class="ds-card__header">
    <div class="ds-card__header-main">
      <div class="ds-card__title">
        <ng-content select="[card-title]"></ng-content>
      </div>
      <div class="ds-card__description">
        <ng-content select="[card-description]"></ng-content>
      </div>
    </div>
    <div class="ds-card__action">
      <ng-content select="[card-action]"></ng-content>
    </div>
  </div>

  <div class="ds-card__content">
    <ng-content></ng-content>
  </div>

  <div class="ds-card__footer">
    <ng-content select="[card-footer]"></ng-content>
  </div>
</div>
```

---

## States

Cards themselves are not interactive. Child elements carry their own states (buttons, inputs, etc.). However:

| State | Visual Change |
|-------|--------------|
| **Default** | Static surface |
| **Hover (when card is clickable)** | Subtle shadow increase or border darkening |
| **Selected (in card grid)** | `border: var(--primary)`, optional ring |

---

## Variants / Compositions

| Pattern | Description |
|---------|-------------|
| **Content card** | Header + Content only. No footer. |
| **Action card** | Header + Content + Footer with CTA buttons. |
| **Stat card** | Header + large number/value in Content, small trend in Footer. |
| **Media card** | Image at top (outside Card component) + CardContent below. |
| **Form card** | Header + form fields in Content + submit actions in Footer. |

---

## Properties

### @Input (CardComponent)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `clickable` | `boolean` | `false` | Adds hover state and pointer cursor |
| `selected` | `boolean` | `false` | Adds selected border/ring |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `cardClicked` | `MouseEvent` | Emitted when `clickable` is true |

---

## Wireframe Skeleton

```
Standard Action Card:
┌───────────────────────────────────────────────────┐
│  Monthly Revenue                      [⋮ Options] │
│  Your earnings for this billing period            │
├───────────────────────────────────────────────────┤
│                                                   │
│  $12,450.00                                       │
│  +8.2% from last month                            │
│                                                   │
├───────────────────────────────────────────────────┤
│  [View details]                    [Export CSV]   │
└───────────────────────────────────────────────────┘

Stat card (compact):
┌──────────────────────┐
│  Total Users  [📊]   │
│  1,284               │
│  ▲ 12% this week     │
└──────────────────────┘
```

---

## Usage Rules

1. Cards always have all four sides padded at 24px (`px-6`, `pt-6`, `pb-6`) — do not reduce padding for "compact" cards; instead remove sections.
2. Never nest cards inside cards.
3. The `CardAction` slot is positioned top-right of the header and is reserved for a single icon button (more options `⋮`, close `✕`, or an inline action).
4. Footer should only contain actions (buttons/links) — never body text.
5. `CardTitle` maps to h3/h4 semantically — ensure heading hierarchy is maintained in the page context.
6. Cards in a grid layout should have equal widths and natural height (no forced equal height — let content drive height).
7. Avoid placing more than 3 primary actions in a card footer.
