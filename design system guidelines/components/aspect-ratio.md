# Aspect Ratio

## Description
A wrapper that maintains a fixed width-to-height ratio regardless of how wide the container is. Used for images, videos, maps, and embedded media to prevent layout shift.

---

## Anatomy
```
Container (width: flexible):
┌───────────────────────────────────────────┐
│                                           │  height = width × (1 / ratio)
│  [child content fills this area]          │
│                                           │
└───────────────────────────────────────────┘

Implementation: position: relative + padding-top hack
  Or CSS `aspect-ratio` property (preferred)

Child: position: absolute, inset: 0, width: 100%, height: 100%
```

---

## Common Ratios

| Ratio Value | Description | Use Case |
|-------------|-------------|----------|
| `16 / 9` | Widescreen | Video embeds, hero images |
| `4 / 3` | Classic | Legacy video, older photos |
| `1 / 1` | Square | Profile photos, thumbnails |
| `3 / 2` | Photography | Camera standard |
| `21 / 9` | Ultrawide | Cinematic banners |
| `9 / 16` | Portrait | Mobile video, stories |

---

## Structure
```html
<div
  class="ds-aspect-ratio"
  [style.aspect-ratio]="ratio"
>
  <ng-content></ng-content>
</div>
```

```scss
.ds-aspect-ratio {
  position: relative;
  width: 100%;

  > * {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // for images
  }
}
```

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `number` | `16 / 9` | Width/height ratio (e.g. `16/9 = 1.778`) |

---

## Wireframe Skeleton

```
16:9 video embed:
┌─────────────────────────────────────────────────┐
│                                                 │
│                  [Video content]                │  ← 56.25% height of width
│                                                 │
└─────────────────────────────────────────────────┘

1:1 image grid:
┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │
│ [Image]  │ │ [Image]  │ │ [Image]  │
│          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘
```

---

## Usage Rules

1. Always wrap `<img>` with `object-fit: cover` inside AspectRatio to prevent distortion.
2. Use for any media (images, videos, iframes, maps) where the height should be derived from width.
3. Do not use for text content — aspect ratios for text create accessibility issues on small screens.
