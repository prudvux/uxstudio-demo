# Alert Dialog

## Description
A confirmation dialog for **destructive or irreversible actions**. Unlike Dialog, it cannot be dismissed by clicking the backdrop or pressing Escape — the user must make an explicit choice. Forces deliberate decision-making before permanent actions.

---

## Anatomy
```
┌─────────────────────────────────────────────────┐
│  Are you absolutely sure?                        │  ← AlertDialogTitle, text-lg font-semibold
│                                                 │
│  This action cannot be undone. This will        │  ← AlertDialogDescription, text-sm muted
│  permanently delete your account and remove     │
│  all associated data.                           │
│                                                 │
│  ─────────────────────────────────────────────  │
│  [Cancel]                      [Delete account] │  ← Footer: Cancel (outline) + Action (destructive)
└─────────────────────────────────────────────────┘

Differences from Dialog:
  - No ✕ close button
  - Backdrop click does NOT close
  - Escape key does NOT close
  - Footer always has explicit Cancel option
  - Action button is destructive variant (red)
  - Same dimensions, backdrop, and animation as Dialog
```

---

## Structure
```html
<ds-alert-dialog [open]="isOpen">
  <!-- Title -->
  <h2 alertTitle>Are you absolutely sure?</h2>

  <!-- Description -->
  <p alertDescription>
    This action cannot be undone. Your data will be permanently deleted.
  </p>

  <!-- Footer -->
  <div footer>
    <ds-button variant="outline" (clicked)="cancel()">Cancel</ds-button>
    <ds-button variant="destructive" (clicked)="confirm()">Delete account</ds-button>
  </div>
</ds-alert-dialog>
```

---

## States

Identical to Dialog but with backdrop interaction disabled.

| Trigger Event | Behaviour |
|--------------|-----------|
| Backdrop click | **No action** (dialog stays open) |
| Escape key | **No action** (dialog stays open) |
| Cancel button | Closes dialog, no action taken |
| Action button | Executes the destructive action, closes dialog |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `cancelled` | `void` | Cancel button clicked |
| `confirmed` | `void` | Action button clicked |

---

## Wireframe Skeleton

```
Delete confirmation:
┌─────────────────────────────────────────────────┐
│  Delete project?                                │
│                                                 │
│  This will permanently delete "My Project"      │
│  and all its files. This cannot be undone.      │
│                                                 │
│                   [Cancel]  [Delete project]    │
└─────────────────────────────────────────────────┘

Revoke access confirmation:
┌─────────────────────────────────────────────────┐
│  Revoke API key?                                │
│                                                 │
│  Applications using this key will stop          │
│  working immediately.                           │
│                                                 │
│                   [Cancel]    [Revoke key]      │
└─────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Use **only** for irreversible, destructive, or high-consequence actions (delete, revoke, reset, overwrite).
2. The action button label must explicitly name what will happen — "Delete project", "Revoke access", "Reset settings". Never use "OK" or "Confirm".
3. Cancel button is always the left/secondary option — action button is right/primary.
4. The description must clearly state the consequence and that it is irreversible.
5. Never use Alert Dialog for warnings or informational content — use Alert component inline or a standard Dialog instead.
6. Do not add a "don't show this again" checkbox — the friction is intentional.
