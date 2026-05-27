# Sheet

## Description
A slide-over panel anchored to a viewport edge (right, left, top, or bottom). Provides secondary context, settings panels, or navigation drawers without fully leaving the current page. Less disruptive than a dialog — the main content remains partially visible.

---

## Anatomy
```
Right sheet (default):
┌──────────────────────────────┬────────────────────┐
│                              │  Sheet Title   [✕] │
│  Page content                │                    │  ← SheetHeader, px-6 pt-6
│  (bg-black/50 overlay)       │  Sheet description │
│                              │  ─────────────     │
│                              │  [Sheet content]   │
│                              │                    │
│                              │  ─────────────     │
│                              │  [Footer actions]  │  ← SheetFooter, px-6 pb-6
└──────────────────────────────┴────────────────────┘
                                 ↑ width: 75% up to 384px (w-3/4 sm:max-w-sm)
                                   shadow: shadow-lg
                                   bg: var(--card)

Bottom sheet:
┌──────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
├──────────────────────────────────────────────────────────┤
│  Sheet Title                                        [✕] │
│  [Content]                                              │
│  [Footer]                                               │
└──────────────────────────────────────────────────────────┘
  height: auto up to 96vh

Entrance animation (right): slide-in-from-right, 300ms ease-out
Entrance animation (bottom): slide-in-from-bottom, 300ms ease-out
Exit: reverse direction, 300ms ease-in
```

---

## Sub-Components

| Component | Notes |
|-----------|-------|
| `SheetTrigger` | Opens the sheet |
| `SheetContent` | The sliding panel, `side` prop drives animation direction |
| `SheetHeader` | `flex flex-col gap-2`, `px-6 pt-6` |
| `SheetFooter` | `flex flex-col-reverse sm:flex-row`, `px-6 pb-6` |
| `SheetTitle` | `text-lg font-semibold` |
| `SheetDescription` | `text-sm text-muted-foreground` |
| `SheetClose` | `✕` absolute button in header |

---

## Sides

| Side | Slide Direction | Width/Height |
|------|----------------|-------------|
| `right` (default) | Slides in from right | `w-3/4 sm:max-w-sm` (288px) |
| `left` | Slides in from left | `w-3/4 sm:max-w-sm` |
| `top` | Slides in from top | Full width, auto height |
| `bottom` | Slides in from bottom | Full width, auto height |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `side` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | Anchor edge |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `openChange` | `boolean` | Emitted on open/close |

---

## Wireframe Skeleton

```
Settings panel (right side):
Page content        │  Settings              [✕]
────────────────────│  ──────────────────────────
50% dark overlay    │  Appearance
                    │  ┌──────────────────────┐
                    │  │ Theme  [Light ▾]     │
                    │  └──────────────────────┘
                    │
                    │  Notifications
                    │  [✓] Email alerts
                    │  [ ] Push notifications
                    │  ──────────────────────────
                    │  [Cancel]      [Save changes]

Mobile navigation (left side):
│ [✕]              │  Page content
│ ─────────────    │
│ 🏠 Home          │  (80% dark overlay)
│ 📊 Dashboard     │
│ ⚙️ Settings      │
│ ─────────────    │
│ 👤 Profile       │
```

---

## Usage Rules

1. Use Sheet for supplementary tasks that don't need the full page (settings, filters, preview panels).
2. Use Dialog when the task requires full attention and a clear decision point.
3. Right sheet is the default — use bottom sheet on mobile for thumb-friendly access.
4. Left sheet is reserved for primary navigation drawers on mobile.
5. Focus must be trapped inside the sheet while open.
6. Clicking the backdrop closes the sheet by default — disable for multi-step flows where accidental dismissal would lose progress.
7. Sheet content should have a scrollable inner area if it may overflow the viewport height.
