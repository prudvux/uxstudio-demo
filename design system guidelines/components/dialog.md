# Dialog

## Description
A modal overlay that interrupts the current workflow to focus the user's attention on critical information or a required interaction. The page behind is blocked — the user must engage with the dialog before returning to normal flow.

---

## Anatomy
```
Full screen with overlay:
┌──────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← Backdrop: bg-black/50, fixed inset-0
│░░░░┌──────────────────────────────────────────┐░░░░░░░░│
│░░░░│  Dialog Title                       [✕] │░░░░░░░░│  ← Close: absolute top-4 right-4
│░░░░│  ─────────────────────────────────────── │░░░░░░░░│
│░░░░│  Dialog description text in              │░░░░░░░░│  ← text-sm, muted-foreground
│░░░░│  muted style below the title.            │░░░░░░░░│
│░░░░│                                          │░░░░░░░░│
│░░░░│  [Content area — form, text, etc.]       │░░░░░░░░│
│░░░░│                                          │░░░░░░░░│
│░░░░│  ─────────────────────────────────────── │░░░░░░░░│
│░░░░│  [Cancel / Secondary]   [Primary Action] │░░░░░░░░│  ← DialogFooter
│░░░░└──────────────────────────────────────────┘░░░░░░░░│
└──────────────────────────────────────────────────────────┘

Dialog panel:
  max-width: 512px (max-w-lg)
  width: 100% (full on mobile)
  padding: 24px (p-6)
  border-radius: 10px (rounded-lg)
  border: 1px solid var(--border)
  background: var(--card)
  shadow: shadow-lg

Enter: fade-in-0 + zoom-in-95, 150ms ease-out
Exit: fade-out-0 + zoom-out-95, 150ms ease-in
```

---

## Sub-Components

| Component | Notes |
|-----------|-------|
| `DialogTrigger` | Button/element that opens the dialog |
| `DialogContent` | The dialog panel itself |
| `DialogHeader` | `flex flex-col gap-2`, contains Title + Description |
| `DialogFooter` | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| `DialogTitle` | `h2` semantics, `text-lg font-semibold` |
| `DialogDescription` | `text-sm text-muted-foreground` |
| `DialogClose` | `✕` button, absolute top-right |

---

## Structure
```html
<!-- Trigger -->
<ds-button (clicked)="dialog.open()">Open Dialog</ds-button>

<!-- Dialog -->
<ds-dialog #dialog [open]="isOpen" (openChange)="isOpen = $event">
  <div header>
    <h2>Dialog Title</h2>
    <p>Optional description text for context.</p>
  </div>

  <!-- Content -->
  <div content>
    <ng-content></ng-content>
  </div>

  <div footer>
    <ds-button variant="outline" (clicked)="dialog.close()">Cancel</ds-button>
    <ds-button (clicked)="confirm()">Confirm</ds-button>
  </div>
</ds-dialog>
```

---

## States

| State | Backdrop | Panel |
|-------|---------|-------|
| **Closed** | hidden | hidden |
| **Opening** | fade-in-0 (150ms) | zoom-in-95 + fade-in (150ms) |
| **Open** | `bg-black/50` | fully visible |
| **Closing** | fade-out-0 (150ms) | zoom-out-95 + fade-out (150ms) |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `closeOnOverlayClick` | `boolean` | `true` | Close when backdrop clicked |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `openChange` | `boolean` | Emitted on open/close |

---

## Wireframe Skeleton

```
Edit profile dialog:
┌─────────────────────────────────────────────────┐
│  Edit Profile                              [✕]  │
│  Update your profile information.               │
│  ─────────────────────────────────────────────  │
│  Display name                                   │
│  ┌───────────────────────────────────────────┐  │
│  │  John Doe                                 │  │
│  └───────────────────────────────────────────┘  │
│  Email                                          │
│  ┌───────────────────────────────────────────┐  │
│  │  john@example.com                         │  │
│  └───────────────────────────────────────────┘  │
│  ─────────────────────────────────────────────  │
│  [Cancel]                         [Save changes]│
└─────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Dialog for interactions that require the user's complete attention before proceeding.
2. Always provide a close button (`✕`) in the top-right corner AND close on Escape key.
3. Close on backdrop click for informational dialogs; consider disabling (`closeOnOverlayClick: false`) for destructive or multi-step dialogs where accidental dismissal would lose data.
4. Focus must be trapped inside the dialog while it's open — keyboard Tab cycles within the dialog only.
5. On close, focus must return to the trigger element that opened the dialog.
6. Scroll dialog content (not the page) when content exceeds dialog height.
7. Do not stack multiple dialogs — use a wizard/stepper flow instead.
8. Dialog title is required — `aria-labelledby` must point to the title element.
