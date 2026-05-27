# Carousel

## Description
A horizontally or vertically scrollable content viewer for cycling through a set of items (images, cards, testimonials). Supports keyboard navigation, touch swipe, and auto-advance. Built on Embla Carousel.

---

## Anatomy
```
Horizontal carousel:
       ◀                                               ▶
        ┌──────────────────────────────────────────────┐
        │                                              │
        │  [Slide 1 content]                           │
        │                                              │
        └──────────────────────────────────────────────┘
              ↑ viewport (overflow: hidden)
        [slide1] [slide2] [slide3] ← scrolled track behind viewport

Previous/Next buttons:
  size-8 (32×32px), rounded-full
  bg: var(--background), border: 1px var(--border)
  shadow-md
  Position: absolute, -left-12 / -right-12 (outside slide area)
  When inside container: top-1/2, translateY(-50%)

Dot indicators (optional):
  ● ○ ○ ○   ← filled dot = current, outlined = others
  Centred below slides, gap-2
```

---

## Structure
```html
<div class="ds-carousel" [class.ds-carousel--vertical]="orientation === 'vertical'">
  <!-- Viewport -->
  <div class="ds-carousel__viewport" #viewport>
    <div class="ds-carousel__container">
      <div
        *ngFor="let slide of slides; let i = index"
        class="ds-carousel__slide"
        [attr.aria-label]="'Slide ' + (i + 1) + ' of ' + slides.length"
        role="group"
      >
        <ng-container *ngTemplateOutlet="slide.template"></ng-container>
      </div>
    </div>
  </div>

  <!-- Previous button -->
  <button
    (click)="prev()"
    [disabled]="!canScrollPrev"
    aria-label="Previous slide"
    class="ds-carousel__prev"
  >
    <ds-icon [name]="orientation === 'vertical' ? 'chevron-up' : 'chevron-left'"></ds-icon>
  </button>

  <!-- Next button -->
  <button
    (click)="next()"
    [disabled]="!canScrollNext"
    aria-label="Next slide"
    class="ds-carousel__next"
  >
    <ds-icon [name]="orientation === 'vertical' ? 'chevron-down' : 'chevron-right'"></ds-icon>
  </button>

  <!-- Dot indicators -->
  <div *ngIf="showDots" class="ds-carousel__dots" role="tablist" aria-label="Slides">
    <button
      *ngFor="let slide of slides; let i = index"
      role="tab"
      [attr.aria-selected]="currentSlide === i"
      [attr.aria-label]="'Go to slide ' + (i + 1)"
      [class.ds-carousel__dot--active]="currentSlide === i"
      (click)="scrollTo(i)"
      class="ds-carousel__dot"
    ></button>
  </div>
</div>
```

---

## States

| Element | State | Appearance |
|---------|-------|-----------|
| Prev/Next button | Default | `border`, `bg-background` |
| Prev/Next button | Hover | `bg-accent` |
| Prev/Next button | Disabled (end of list) | `opacity: 0.5`, `cursor: not-allowed` |
| Dot indicator | Inactive | `bg-muted`, size 8×8px |
| Dot indicator | Active | `bg-primary`, size 8×8px |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slides` | `CarouselSlide[]` | `[]` | Slide definitions |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll axis |
| `loop` | `boolean` | `false` | Loop at end |
| `autoPlay` | `boolean` | `false` | Auto-advance slides |
| `autoPlayInterval` | `number` | `3000` | Auto-advance delay in ms |
| `showDots` | `boolean` | `false` | Show dot indicators |
| `slidesPerView` | `number` | `1` | Visible slides at once |
| `spacing` | `number` | `16` | Gap between slides in px |

```typescript
interface CarouselSlide {
  id: string;
  template: TemplateRef<unknown>;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `slideChange` | `number` | Emitted with new slide index |

---

## Wireframe Skeleton

```
Image carousel:
       ◀  ┌──────────────────────────────────┐  ▶
          │  [Image 1]                       │
          └──────────────────────────────────┘
                      ● ○ ○ ○

Multi-card carousel (slidesPerView: 3):
       ◀  ┌────────┐  ┌────────┐  ┌────────┐  ▶
          │ Card 1 │  │ Card 2 │  │ Card 3 │
          └────────┘  └────────┘  └────────┘
```

---

## Usage Rules

1. Always provide accessible `aria-label` for each slide and for the Previous/Next buttons.
2. Pause auto-advance when the user hovers over or interacts with the carousel.
3. Do not auto-advance faster than 3000ms — rapid auto-advance is disorienting.
4. Loop mode (`loop: true`) is appropriate for image galleries; disable for content carousels where sequence matters.
5. On mobile, ensure slides are swipeable via touch — Embla handles this natively.
6. Keyboard: Arrow keys navigate; Tab moves focus to the buttons; Enter/Space activates the focused button.
7. Show dot indicators when there are 2–8 slides; hide them for more (use count "1 / 12" instead).
