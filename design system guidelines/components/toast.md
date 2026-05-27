# Toast (Sonner)

## Description
A transient, non-modal notification that appears at the edge of the viewport to confirm completed actions, communicate status updates, or report errors. Toasts auto-dismiss after a set duration and do not interrupt the user's flow.

---

## Anatomy
```
Position: bottom-right (default)
Stack direction: newest on top

┌───────────────────────────────────────────────┐
│  ✓  File saved successfully           [✕]     │  ← success toast
└───────────────────────────────────────────────┘
  ┌───────────────────────────────────────────────┐
  │  ℹ  Syncing in progress…             [✕]     │  ← info toast (slightly behind)
  └───────────────────────────────────────────────┘

Single toast:
┌───────────────────────────────────────────────────────────┐
│  [type icon]  Message text                     [✕] [Undo] │
└───────────────────────────────────────────────────────────┘
  max-width: 356px
  min-height: 48px
  padding: 12px 16px (px-4 py-3)
  border: 1px solid var(--border)
  border-radius: var(--radius-lg)
  bg: var(--card)
  shadow: shadow-lg
  font: text-sm

Enter: slide-in-from-bottom + fade-in (300ms)
Exit: slide-out-to-right + fade-out (300ms)
Auto-dismiss: 4000ms default
```

---

## Toast Types

| Type | Icon | Icon Colour | Use Case |
|------|------|------------|----------|
| `default` | none | — | Neutral information |
| `success` | `✓` | green | Action completed successfully |
| `error` | `✕` | `var(--destructive)` | Operation failed |
| `warning` | `⚠` | amber/yellow | Non-critical issue requiring attention |
| `info` | `ℹ` | blue | Informational update |
| `loading` | spinner | — | In-progress operation (update to success/error when done) |
| `promise` | spinner → success/error | — | Auto-resolves via promise |

---

## Structure
```typescript
// Angular toast service wrapper
@Injectable({ providedIn: 'root' })
export class ToastService {
  success(message: string, options?: ToastOptions) {
    toast.success(message, options);
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, options);
  }

  info(message: string, options?: ToastOptions) {
    toast.info(message, options);
  }

  warning(message: string, options?: ToastOptions) {
    toast.warning(message, options);
  }

  promise<T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) {
    return toast.promise(promise, messages);
  }

  dismiss(id?: string) {
    toast.dismiss(id);
  }
}
```

```html
<!-- In app root (app.component.html) -->
<ds-toaster position="bottom-right" [richColors]="true" [expand]="false"></ds-toaster>
```

---

## Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `4000` | Auto-dismiss delay in ms |
| `position` | `ToastPosition` | `'bottom-right'` | Viewport position |
| `action` | `{ label: string, onClick: fn }` | `undefined` | Optional action button |
| `cancel` | `{ label: string, onClick: fn }` | `undefined` | Optional cancel button |
| `id` | `string` | auto | For programmatic dismissal |
| `description` | `string` | `undefined` | Secondary text below message |
| `dismissible` | `boolean` | `true` | Show `✕` button |

---

## Toast Positions

```
'top-left'     'top-center'     'top-right'
     ┌──────────────────────────────────────┐
     │  TL                TC             TR │
     │                                      │
     │  BL                BC             BR │
     └──────────────────────────────────────┘
'bottom-left'  'bottom-center'  'bottom-right' (default)
```

---

## Wireframe Skeleton

```
Success:
┌──────────────────────────────────────────────┐
│  ✓  Changes saved                    [✕]     │
└──────────────────────────────────────────────┘

Error:
┌──────────────────────────────────────────────┐
│  ✕  Failed to upload file            [✕]     │
│     The file exceeds the 10MB limit.         │  ← description
└──────────────────────────────────────────────┘

With action:
┌──────────────────────────────────────────────┐
│  ✓  Message deleted         [Undo]   [✕]     │
└──────────────────────────────────────────────┘

Loading → Success:
┌──────────────────────────────────────────────┐
│  ⟳  Uploading file…               [✕]     │  ← loading state
└──────────────────────────────────────────────┘
  → resolves to:
┌──────────────────────────────────────────────┐
│  ✓  File uploaded successfully        [✕]    │  ← success
└──────────────────────────────────────────────┘
```

---

## Usage Rules

1. Use Toast only for feedback about completed or in-progress actions — not for information requiring a response (use Dialog or Alert).
2. Keep message text under 80 characters — one sentence maximum.
3. Do not show more than 3 toasts simultaneously — queue them.
4. Critical errors (data loss, authentication failure) must use `duration: Infinity` — users must manually dismiss them.
5. Destructive actions (delete, archive) should include an Undo action button with a matching `duration` window.
6. `loading` toasts must always resolve to either `success` or `error` — never leave a spinner running indefinitely.
7. Do not use `position: 'top-center'` unless the page content requires it (e.g. full-screen editors) — `'bottom-right'` is the default for all pages.
8. Toast messages must be written in past tense for completed actions ("Saved", "Deleted") and present progressive for in-progress ("Saving…", "Deleting…").
