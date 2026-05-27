# Calendar

## Description
A date picker calendar UI rendered as a grid of days. Used standalone as a date display, or embedded inside a Popover to build a DatePicker component. Supports single date selection, date range selection, and multiple non-consecutive dates.

---

## Anatomy
```
┌──────────────────────────────────────────────┐
│  ◀  May 2026  ▶                              │  ← header: month/year nav
├──────────────────────────────────────────────┤
│  Mo  Tu  We  Th  Fr  Sa  Su                 │  ← day-of-week labels: text-muted-foreground text-xs
│                   1   2   3                 │
│   4   5   6   7   8   9  10                 │  ← day cells: size-8 (32×32px) buttons
│  11  12  13 [14] 15  16  17                 │     selected: bg-primary, text-primary-foreground
│  18  19  20  21  22  23  24                 │     today: bg-accent, text-accent-foreground
│  25  26  27  28  29  30  31                 │     outside month: opacity-50, text-muted-foreground
└──────────────────────────────────────────────┘  disabled: opacity-50, cursor-not-allowed

Range selection:
│   7   8   9  [10──────────────17]  18      │
                ↑ start           ↑ end
  Start/end: bg-primary, full border-radius
  In-range: bg-primary/20, no border-radius (square bridge)
```

---

## Structure
```html
<div class="ds-calendar">
  <!-- Header: month navigation -->
  <div class="ds-calendar__header">
    <button
      (click)="prevMonth()"
      aria-label="Go to previous month"
      class="ds-calendar__nav-btn"
    >
      <ds-icon name="chevron-left"></ds-icon>
    </button>

    <span class="ds-calendar__title">{{ currentMonth | date:'MMMM yyyy' }}</span>

    <button
      (click)="nextMonth()"
      aria-label="Go to next month"
      class="ds-calendar__nav-btn"
    >
      <ds-icon name="chevron-right"></ds-icon>
    </button>
  </div>

  <!-- Day labels -->
  <div class="ds-calendar__weekdays">
    <span *ngFor="let day of weekdays" class="ds-calendar__weekday">{{ day }}</span>
  </div>

  <!-- Day grid -->
  <div class="ds-calendar__grid">
    <button
      *ngFor="let day of calendarDays"
      [disabled]="isDisabled(day)"
      [attr.aria-label]="day | date:'MMMM d, yyyy'"
      [attr.aria-pressed]="isSelected(day)"
      [attr.aria-current]="isToday(day) ? 'date' : null"
      [class.ds-calendar__day--today]="isToday(day)"
      [class.ds-calendar__day--selected]="isSelected(day)"
      [class.ds-calendar__day--in-range]="isInRange(day)"
      [class.ds-calendar__day--range-start]="isRangeStart(day)"
      [class.ds-calendar__day--range-end]="isRangeEnd(day)"
      [class.ds-calendar__day--outside]="isOutsideMonth(day)"
      (click)="selectDay(day)"
      class="ds-calendar__day"
    >
      {{ day | date:'d' }}
    </button>
  </div>
</div>
```

---

## Selection Modes

| Mode | Description | `value` Type |
|------|-------------|-------------|
| `single` | One date selected | `Date` |
| `range` | Start + end date | `{ from: Date, to?: Date }` |
| `multiple` | Multiple non-consecutive dates | `Date[]` |

---

## States

| Day State | Background | Radius | Text |
|-----------|-----------|--------|------|
| **Default** | transparent | `var(--radius-md)` | `var(--foreground)` |
| **Hover** | `var(--accent)` | `var(--radius-md)` | `var(--accent-foreground)` |
| **Today** | `var(--accent)` | `var(--radius-md)` | `var(--accent-foreground)` |
| **Selected (single)** | `var(--primary)` | `var(--radius-md)` | `var(--primary-foreground)` |
| **Range start** | `var(--primary)` | `rounded-l-md` | `var(--primary-foreground)` |
| **Range end** | `var(--primary)` | `rounded-r-md` | `var(--primary-foreground)` |
| **In range** | `var(--primary)/20` | `0` (square) | `var(--foreground)` |
| **Outside month** | transparent | — | `var(--muted-foreground)` at 50% |
| **Disabled** | transparent | — | `opacity: 0.5`, `cursor: not-allowed` |

---

## Properties

### @Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `selected` | `Date \| DateRange \| Date[]` | `undefined` | Selected date(s) |
| `defaultMonth` | `Date` | current month | Initial month shown |
| `disabled` | `(date: Date) => boolean` | `undefined` | Disable specific dates |
| `fromDate` | `Date` | `undefined` | Earliest selectable date |
| `toDate` | `Date` | `undefined` | Latest selectable date |
| `weekStartsOn` | `0 \| 1` | `1` (Monday) | Week start day |
| `showOutsideDays` | `boolean` | `true` | Show days from adjacent months |

### @Output

| Event | Payload | Description |
|-------|---------|-------------|
| `selectedChange` | `Date \| DateRange \| Date[]` | Emitted on day selection |
| `monthChange` | `Date` | Emitted when month changes |

---

## DatePicker Pattern

Calendar is embedded in a Popover to create a DatePicker:

```html
<!-- DatePicker pattern -->
<ds-popover [(open)]="pickerOpen">
  <button popover-trigger class="ds-input" style="width: 240px; text-align: left;">
    <ds-icon name="calendar" size="16"></ds-icon>
    {{ selectedDate ? (selectedDate | date:'MMM d, yyyy') : 'Pick a date' }}
  </button>

  <ds-calendar
    mode="single"
    [selected]="selectedDate"
    (selectedChange)="selectedDate = $event; pickerOpen = false"
  ></ds-calendar>
</ds-popover>
```

---

## Usage Rules

1. Calendar should not be rendered directly on a page unless used as a full date-picker panel — embed in a Popover for inline date selection.
2. Always set `fromDate` and `toDate` bounds when the date selection has known constraints (e.g. can't book in the past).
3. Use `range` mode for date range pickers — render two Calendar components side by side for a wider range picker.
4. Disabled dates should have a tooltip explaining why they are unavailable.
5. Keyboard: Arrow keys navigate days; PageUp/PageDown navigate months; Enter selects; Escape closes the popover.
