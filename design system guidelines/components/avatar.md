# Avatar

## Description
A circular image representing a user, entity, or organisation. When the image fails to load or is not provided, displays a fallback of the user's initials or a generic person icon. Used in user profiles, comment threads, mentions, and navigation.

---

## Anatomy
```
With image:                    With initials fallback:
┌─────┐                        ┌─────┐
│ 👤  │  ← actual photo        │ JD  │  ← initials, bg: var(--muted)
└─────┘                        └─────┘
  40×40px (size-10)              font: text-sm, weight 500
  border-radius: 50%             color: var(--muted-foreground)
  overflow: hidden
  aspect-ratio: 1/1
```

---

## Structure
```html
<div
  class="ds-avatar"
  [class]="sizeClass"
>
  <!-- Image -->
  <img
    *ngIf="src"
    [src]="src"
    [alt]="alt"
    class="ds-avatar__image"
    (error)="onImageError()"
    [hidden]="imageError"
  />

  <!-- Fallback -->
  <div
    *ngIf="!src || imageError"
    class="ds-avatar__fallback"
    [attr.aria-label]="alt"
  >
    {{ initials || '?' }}
  </div>
</div>
```

---

## Sizes

| Size | Dimensions | Font Size | Use Case |
|------|-----------|-----------|----------|
| `xs` | 24×24px | text-xs | Inline mentions, compact tables |
| `sm` | 32×32px | text-sm | Comment threads, list items |
| `default` | 40×40px (size-10) | text-sm | Standard sidebar, card headers |
| `lg` | 56×56px | text-lg | Profile pages, dialog headers |
| `xl` | 80×80px | text-2xl | Settings profile page |

---

## States

| State | Appearance |
|-------|-----------|
| **Image loaded** | Photo shown, circular |
| **Image failed / no src** | Initials on `var(--muted)` background |
| **Loading** | Skeleton pulse in circular shape |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | `undefined` | Image URL |
| `alt` | `string` | `''` | Alt text (user's full name) |
| `fallback` | `string` | `undefined` | Initials text (e.g. `'JD'`) |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size preset |

---

## Wireframe Skeleton

```
Standard avatar:
  ┌────┐
  │ JD │  40×40, circular, initials fallback
  └────┘

Avatar with status indicator:
  ┌────┐
  │ 👤 │  ← image
  └────┘●  ← 10×10 green dot, border-2 white, bottom-right position

Avatar group (stack):
  ┌────┐
  │ A  │
  └────┘
    ┌────┐
    │ B  │  ← offset -12px, ring-2 ring-background
    └────┘
      ┌────┐
      │ C  │
      └────┘
        ┌────┐
        │+3  │  ← overflow count
        └────┘
```

---

## Usage Rules

1. Always provide `alt` text with the user's full name for screen readers.
2. Fallback initials should be max 2 characters: first + last initial.
3. Never show an empty avatar — always use the initials fallback.
4. Avatar sizes must be used consistently within a context (all avatars in a comment thread are the same size).
5. For avatar stacks (groups), apply a `ring-2 ring-background` (2px white ring) between overlapping avatars.
6. Overflow count (`+3` etc.) in avatar groups uses `secondary` badge styling.
7. Do not use the `xl` size anywhere outside profile and settings pages.
