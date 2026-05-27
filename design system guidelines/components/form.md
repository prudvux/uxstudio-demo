# Form

## Description
A compositional wrapper that orchestrates the layout and accessibility linkage between a Label, a form control (Input, Textarea, Select, Checkbox, etc.), and a validation message. The Form component itself provides the structure; it does not own the form state — that is handled by a form library (Angular Reactive Forms or Template-Driven Forms).

---

## Anatomy
```
┌────────────────────────────────────────────────┐
│  Label text                          (required*)│  ← FormLabel (ds-label)
│  ┌──────────────────────────────────────────┐  │
│  │  Input / Textarea / Select / etc.        │  │  ← FormControl
│  └──────────────────────────────────────────┘  │
│  Helper or error message                       │  ← FormMessage
└────────────────────────────────────────────────┘

Spacing:
  Label to Control: 8px (gap-2)
  Control to Message: 6px (gap-1.5)
  Field to Field: 16–24px (gap-4 or gap-6)

FormMessage colours:
  Helper text: var(--muted-foreground), text-sm
  Error text: var(--destructive), text-sm
```

---

## Structure
```html
<!-- Form Field Unit -->
<div class="ds-form-item">
  <ds-label [htmlFor]="controlId" [required]="required" [disabled]="control.disabled">
    {{ label }}
  </ds-label>

  <!-- Form Control slot -->
  <ng-content></ng-content>

  <!-- Message slot -->
  <p
    *ngIf="message"
    [id]="messageId"
    class="ds-form-message"
    [class.ds-form-message--error]="hasError"
    [attr.aria-live]="hasError ? 'polite' : null"
  >
    {{ message }}
  </p>
</div>
```

---

## Sub-Components

| Component | Element | Role |
|-----------|---------|------|
| `DsFormItemComponent` | `<div>` | Layout wrapper for the field group |
| `DsLabelComponent` | `<label>` | Visible label (see Label component) |
| `DsFormMessageComponent` | `<p>` | Helper or validation message |

---

## States

| State | Control Border | Message |
|-------|---------------|---------|
| **Default** | `var(--border)` | Helper text in `var(--muted-foreground)` |
| **Focused** | `var(--ring)` + ring | Helper text unchanged |
| **Error** | `var(--destructive)` + ring | Error text in `var(--destructive)` |
| **Valid** | `var(--border)` | Optional success message |
| **Disabled** | `var(--border)` | All text at 50% opacity |

---

## Properties

### @Input (DsFormItemComponent)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | required | Label text |
| `required` | `boolean` | `false` | Shows required indicator |
| `message` | `string` | `undefined` | Helper or error message |
| `hasError` | `boolean` | `false` | Switches message to error styling |
| `controlId` | `string` | auto | Links label to control via `for`/`id` |
| `disabled` | `boolean` | `false` | Cascades to label |

---

## Wireframe Skeleton

```
Full form layout:

Email address *
┌──────────────────────────────────────────┐
│  user@example.com                        │
└──────────────────────────────────────────┘
  We'll never share your email.

Password *
┌──────────────────────────────────────────┐
│  ••••••••                                │
└──────────────────────────────────────────┘
  Must be at least 8 characters.

Username
┌──────────────────────────────────────────┐
│  @johndoe                               │
└──────────────────────────────────────────┘
  ⚠ Username is already taken.             ← error state: red text + red border

                          [Cancel]  [Save] ← form footer actions
```

---

## Angular Reactive Forms Integration

```typescript
// my-form.component.ts
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ds-form-item
        label="Email address"
        [required]="true"
        [message]="emailMessage"
        [hasError]="emailError"
        controlId="email"
      >
        <ds-input
          id="email"
          type="email"
          formControlName="email"
          [invalid]="emailError"
          [attr.aria-describedby]="emailError ? 'email-message' : null"
        ></ds-input>
      </ds-form-item>

      <ds-button type="submit" [disabled]="form.invalid">Submit</ds-button>
    </form>
  `
})
export class MyFormComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailError() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  get emailMessage() {
    return this.emailError ? 'Please enter a valid email address.' : '';
  }
}
```

---

## Usage Rules

1. Every form control must be wrapped in a `ds-form-item` for consistent spacing and accessibility linkage.
2. Validation messages must only be shown after the user has interacted with the field (on blur or on submit) — not on initial render.
3. Error messages must be associated with their input via `aria-describedby` so screen readers announce them.
4. Success states (green border, checkmark) are optional — only use when validation feedback adds meaningful reassurance (e.g. password strength, username availability check).
5. Form actions (Submit/Cancel buttons) always go in the form footer, right-aligned, with the primary action last (rightmost).
6. Use `aria-live="polite"` on the error message container so errors are announced without interrupting the user.
