# Input OTP

## Description
A specialised input for one-time password (OTP) or verification code entry. Each character is entered in its own slot, providing clear visual feedback and reducing input errors for codes like 2FA tokens, SMS PINs, and email verification codes.

---

## Anatomy
```
6-digit code with separator:
┌───┐ ┌───┐ ┌───┐  ──  ┌───┐ ┌───┐ ┌───┐
│ 4 │ │ 8 │ │ 2 │      │   │ │   │ │   │
└───┘ └───┘ └───┘      └───┘ └───┘ └───┘
  ↑ each slot: 36×36px (h-9 w-9)
  border: 1px solid var(--border)
  bg: var(--input-background)
  font: 16px / weight 400 / centred

Active slot:
  border: var(--ring)
  ring: 3px var(--ring)/50
  caret: blinking line (animate-caret-blink, 1000ms period)

Separator: "–" or custom divider between slot groups
```

---

## Structure
```html
<div
  class="ds-otp"
  [class.ds-otp--invalid]="invalid"
  role="group"
  [attr.aria-label]="ariaLabel"
>
  <ng-container *ngFor="let slot of slots; let i = index">
    <!-- Separator before group boundary -->
    <span *ngIf="isSeparatorPosition(i)" class="ds-otp__separator">–</span>

    <div
      class="ds-otp__slot"
      [class.ds-otp__slot--active]="activeIndex === i"
      [class.ds-otp__slot--filled]="values[i]"
      [class.ds-otp__slot--first]="isGroupStart(i)"
      [class.ds-otp__slot--last]="isGroupEnd(i)"
    >
      {{ values[i] || '' }}
      <span *ngIf="activeIndex === i && !values[i]" class="ds-otp__caret"></span>
    </div>
  </ng-container>

  <!-- Hidden real input for keyboard events -->
  <input
    class="ds-otp__input"
    [attr.inputmode]="pattern === 'digits' ? 'numeric' : 'text'"
    [maxlength]="maxLength"
    (input)="onInput($event)"
    (keydown)="onKeyDown($event)"
    (paste)="onPaste($event)"
    autocomplete="one-time-code"
  />
</div>
```

---

## States

| State | Slot Appearance |
|-------|----------------|
| **Empty / Inactive** | `bg: var(--input-background)`, `border: var(--border)` |
| **Active (cursor)** | `border: var(--ring)`, `ring: 3px var(--ring)/50`, blinking caret |
| **Filled** | Character visible, normal border |
| **Invalid** | All slots: `border: var(--destructive)`, `ring: var(--destructive)/20` |
| **Disabled** | All slots: `opacity: 0.5`, `cursor: not-allowed` |
| **Complete** | All slots filled — optionally auto-submit |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `maxLength` | `number` | `6` | Total number of digits/characters |
| `pattern` | `'digits' \| 'alphanumeric'` | `'digits'` | Allowed character set |
| `value` | `string` | `''` | Current code value |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Error state |
| `autoSubmit` | `boolean` | `false` | Auto-emit on completion |
| `ariaLabel` | `string` | `'One-time code'` | Accessible group label |
| `separatorAfter` | `number[]` | `[]` | Slot indices after which to show separator |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | Emitted on each character entry |
| `completed` | `string` | Emitted when all slots are filled |

---

## Wireframe Skeleton

```
Enter your verification code

┌───┐ ┌───┐ ┌───┐  ──  ┌───┐ ┌───┐ ┌───┐
│   │ │   │ │   │      │   │ │   │ │   │
└───┘ └───┘ └───┘      └───┘ └───┘ └───┘
  ↑ first slot active (ring visible)

Filling in:
┌───┐ ┌───┐ ┌───┐  ──  ┌───┐ ┌───┐ ┌───┐
│ 4 │ │ 8 │ │ 2 │      │   │ │   │ │   │
└───┘ └───┘ └───┘      └───┘ └───┘ └───┘
                              ↑ active
```

---

## Usage Rules

1. Set `autocomplete="one-time-code"` on the hidden input to enable browser/OS autofill from SMS.
2. Set `inputmode="numeric"` for digit-only codes to show the numeric keyboard on mobile.
3. Always display the separator to match the code format users receive (e.g. 3-3 or 4-4 grouping).
4. Auto-advancing focus between slots happens automatically — do not require users to Tab between them.
5. Paste support is required — users often copy-paste codes from emails/SMS.
6. On completion with `autoSubmit: true`, verify server-side before navigating — show a loading state.
7. Provide a "Resend code" action below the OTP input with a cooldown timer.
