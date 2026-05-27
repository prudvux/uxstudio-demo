# Command

## Description
A search-driven command interface for fast navigation, quick actions, and keyboard-first workflows. Renders a searchable list of commands that filters in real time as the user types. Typically opened via a keyboard shortcut (⌘K or Ctrl+K) in a Dialog or Popover.

---

## Anatomy
```
┌───────────────────────────────────────────────────────────┐
│  🔍  Type a command or search…                            │  ← CommandInput: h-9, border-b
├───────────────────────────────────────────────────────────┤
│  Pages                                                    │  ← CommandGroup heading: text-xs muted, px-2
│    🏠  Home                                               │  ← CommandItem: px-2 py-1.5, text-sm
│    📊  Dashboard                        Ctrl+D           │     shortcut: right-aligned, text-xs muted
│  ─────────────────────────────────────────────────────    │  ← CommandSeparator
│  Actions                                                  │
│    ✏️  New document                      Ctrl+N           │
│    📎  Upload file                                        │
│  ─────────────────────────────────────────────────────    │
│  Recent                                                   │
│    📄  Q3 Report.pdf                                      │
│    📄  Design System Guidelines                           │
└───────────────────────────────────────────────────────────┘

Container: bg-popover, rounded-lg, border, shadow-md
Input area: border-b, px-3, h-9
List: max-height 300px, overflow-y: auto
Item hover: bg-accent, color-accent-foreground
Empty state: "No results found." centered, text-sm muted
Loading state: spinner centred in list
```

---

## Structure
```html
<div class="ds-command">
  <!-- Search Input -->
  <div class="ds-command__input-wrapper">
    <ds-icon name="search" class="ds-command__search-icon"></ds-icon>
    <input
      type="text"
      [(ngModel)]="search"
      (ngModelChange)="filter()"
      placeholder="Type a command or search…"
      class="ds-command__input"
      role="combobox"
      [attr.aria-expanded]="true"
      aria-autocomplete="list"
    />
  </div>

  <!-- List -->
  <div role="listbox" class="ds-command__list">
    <!-- Empty state -->
    <div *ngIf="filteredGroups.length === 0" class="ds-command__empty">
      No results found.
    </div>

    <ng-container *ngFor="let group of filteredGroups">
      <div *ngIf="group.label" class="ds-command__group-heading">{{ group.label }}</div>
      <div role="separator" class="ds-command__separator" *ngIf="!isFirstGroup(group)"></div>

      <button
        *ngFor="let item of group.items"
        role="option"
        [attr.aria-selected]="activeItem === item"
        (click)="execute(item)"
        class="ds-command__item"
        [class.ds-command__item--active]="activeItem === item"
      >
        <ds-icon *ngIf="item.icon" [name]="item.icon"></ds-icon>
        <span>{{ item.label }}</span>
        <kbd *ngIf="item.shortcut" class="ds-command__shortcut">{{ item.shortcut }}</kbd>
      </button>
    </ng-container>
  </div>
</div>
```

---

## States

| State | Appearance |
|-------|-----------|
| **Empty input** | All groups and items visible |
| **Typing (filtering)** | List narrows to matching items in real time |
| **No results** | "No results found." message centred in list |
| **Item hover / arrow key** | `bg: var(--accent)` on highlighted item |
| **Item selected** | Action executes, dialog closes |
| **Loading** | Spinner shown while async results load |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `groups` | `CommandGroup[]` | `[]` | Grouped list of commands |
| `placeholder` | `string` | `'Type a command or search…'` | Input placeholder |
| `emptyMessage` | `string` | `'No results found.'` | No-results text |
| `loading` | `boolean` | `false` | Loading state |
| `filter` | `(value: string, search: string) => number` | built-in | Custom filter function |

```typescript
interface CommandGroup {
  label?: string;
  items: CommandItem[];
}

interface CommandItem {
  label: string;
  icon?: string;
  shortcut?: string;
  keywords?: string[];    // additional search terms
  onSelect: () => void;
}
```

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `itemSelected` | `CommandItem` | Emitted on item selection |

---

## Wireframe Skeleton

```
Global command palette (⌘K):
┌───────────────────────────────────────────────────────────┐
│  🔍  dash                                                 │  ← typing "dash"
├───────────────────────────────────────────────────────────┤
│  Pages                                                    │
│    ▶  Go to Dashboard                    Ctrl+D          │  ← highlighted (arrow key)
│  Actions                                                  │
│    📊  Open Dashboard panel                               │
└───────────────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Always render Command inside a Dialog or Popover — it has no built-in container or open/close behaviour.
2. Open with `⌘K` (Mac) / `Ctrl+K` (Windows) as the standard keyboard shortcut.
3. Always include a keyboard shortcut hint in the trigger button label: "Search commands ⌘K".
4. Keyboard navigation: Arrow Up/Down to move selection; Enter to execute; Escape to close.
5. Group related commands — ungrouped flat lists with 15+ items are hard to scan.
6. Include `keywords` for items that users might search with synonyms (e.g. "delete" → keywords: ["remove", "trash"]).
7. For large datasets (100+ items), use server-side search with `loading` state.
