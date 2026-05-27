# Tabs

## Description
A navigation control that switches the visible content between multiple panels within the same page area. Only one panel is visible at a time. Used for organising related content into distinct categories or views.

---

## Anatomy
```
TabsList (the tab bar):
┌────────┬────────┬────────┐
│  Tab 1 │  Tab 2 │  Tab 3 │
└────────┴────────┴────────┘
  bg: var(--muted) = #ececf0
  height: 36px (h-9)
  padding: 3px (p-[3px])
  border-radius: 12px (rounded-xl)
  gap: 0 (tabs are flush)

Active tab (TabsTrigger):
  bg: var(--card) = white
  box-shadow: shadow-sm
  border-radius: 9px (slightly less than container)
  color: var(--foreground)

Inactive tab:
  bg: transparent
  color: var(--muted-foreground)

TabsContent (panel below):
  Appears directly under the TabsList
  No built-in padding — content sets its own
```

---

## Structure
```html
<div class="ds-tabs">
  <!-- Tab Bar -->
  <div role="tablist" [attr.aria-label]="ariaLabel" class="ds-tabs__list">
    <button
      *ngFor="let tab of tabs"
      role="tab"
      [id]="'tab-' + tab.value"
      [attr.aria-controls]="'panel-' + tab.value"
      [attr.aria-selected]="activeTab === tab.value"
      [attr.tabindex]="activeTab === tab.value ? 0 : -1"
      [class.ds-tabs__trigger--active]="activeTab === tab.value"
      [disabled]="tab.disabled"
      (click)="setActive(tab.value)"
      (keydown)="onKeyDown($event, tab.value)"
      class="ds-tabs__trigger"
    >
      {{ tab.label }}
    </button>
  </div>

  <!-- Tab Panels -->
  <div
    *ngFor="let tab of tabs"
    role="tabpanel"
    [id]="'panel-' + tab.value"
    [attr.aria-labelledby]="'tab-' + tab.value"
    [hidden]="activeTab !== tab.value"
    class="ds-tabs__content"
  >
    <ng-container *ngTemplateOutlet="tab.template"></ng-container>
  </div>
</div>
```

---

## States

| State | Background | Text | Shadow |
|-------|-----------|------|--------|
| **Active tab** | `var(--card)` = white | `var(--foreground)` | `shadow-sm` |
| **Inactive tab** | transparent | `var(--muted-foreground)` | none |
| **Hover (inactive)** | `var(--accent)` | `var(--accent-foreground)` | none |
| **Focus-visible** | — | — | 3px ring |
| **Disabled** | transparent | `var(--muted-foreground)` at 50% | none |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Array of tab definitions |
| `value` | `string` | `undefined` | Active tab value (controlled) |
| `defaultValue` | `string` | first tab | Initial active tab (uncontrolled) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab list direction |
| `ariaLabel` | `string` | required | Accessible name for tab list |

```typescript
interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  template: TemplateRef<unknown>;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `valueChange` | `string` | Emitted when active tab changes |

---

## Wireframe Skeleton

```
Horizontal tabs (page sections):
┌──────────┬──────────┬──────────┐
│ Overview │ Activity │ Settings │   ← TabsList, bg muted
└──────────┴──────────┴──────────┘
  ↑ active: white bg, shadow-sm

  ──────────────────────────────────
  Overview content panels here
  ──────────────────────────────────

Vertical tabs (settings sidebar):
┌──────────┐  ┌──────────────────────────────┐
│ Profile  │  │  Profile settings content    │
│ Account  │  │                              │
│ Security │  │                              │
│ Billing  │  │                              │
└──────────┘  └──────────────────────────────┘
```

---

## Usage Rules

1. Tab labels must be concise (1–3 words) — use nouns, not verbs.
2. Never use tabs for sequential steps — use a stepper/wizard component instead.
3. Do not use tabs for content that users would want to compare side-by-side.
4. Always have a pre-selected default tab — never show an empty panel.
5. Disabled tabs should be rare — if content is unavailable, explain why in a tooltip on the tab.
6. Keyboard: Arrow keys navigate between tabs; `Enter`/`Space` activates; `Tab` moves to the panel content.
7. Maximum 6–7 tabs in a single tab bar — beyond that, use a different navigation pattern (sidebar, navigation menu).
