# Chart

## Description
Data visualisation components built on Recharts. The ChartContainer handles theme-aware colour application, responsive sizing, and tooltip formatting. Charts use the design system's chart colour tokens (chart-1 through chart-5) automatically.

---

## Anatomy

### ChartContainer
```
┌─────────────────────────────────────────────────────────┐
│  Chart title (optional, h4 outside container)           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [ResponsiveContainer]                          │   │  height: set via class (h-[200px], h-[300px])
│  │    [Recharts chart component]                   │   │  width: 100%
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
  Tooltip: themed popup on hover, bg-popover, border, shadow-md
  Legend: optional, below chart
```

### ChartTooltip
```
  ┌────────────────────────────────┐
  │  January 2026                  │  ← label: text-sm muted-foreground
  │  ● Revenue    $4,200           │  ← series indicator dot + label + value
  │  ● Expenses   $2,800           │
  └────────────────────────────────┘
  bg: var(--popover), border, rounded-lg, px-3 py-2, shadow-md
```

---

## Chart Types

| Type | Component | Best For |
|------|-----------|----------|
| Bar | `<BarChart>` | Comparing discrete categories |
| Line | `<LineChart>` | Trends over time |
| Area | `<AreaChart>` | Trends with volume emphasis |
| Pie | `<PieChart>` | Part-to-whole proportions (max 5 slices) |
| Radial / Gauge | `<RadialBarChart>` | Single metric progress |
| Radar | `<RadarChart>` | Multi-axis comparison |
| Composed | `<ComposedChart>` | Bar + Line combination |

---

## Colour Token Mapping

```
Series 1 → var(--chart-1)  ≈ orange (light) / blue (dark)
Series 2 → var(--chart-2)  ≈ cyan (light) / green (dark)
Series 3 → var(--chart-3)  ≈ dark blue (light) / yellow (dark)
Series 4 → var(--chart-4)  ≈ yellow-green (light) / purple (dark)
Series 5 → var(--chart-5)  ≈ orange-yellow (light) / red (dark)
```

Always assign series in order (1→5). Never skip or reorder.

---

## Structure
```typescript
// chart-config.ts
const chartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
};
```

```html
<!-- bar-chart.component.html -->
<ds-chart-container [config]="chartConfig" class="h-[300px]">
  <recharts-responsive-container width="100%" height="100%">
    <recharts-bar-chart [data]="chartData">
      <recharts-cartesian-grid strokeDasharray="3 3" stroke="var(--border)" />
      <recharts-x-axis
        dataKey="month"
        tick-line="false"
        axis-line="false"
        tick-style="fill: var(--muted-foreground); font-size: 12px"
      />
      <recharts-y-axis
        tick-line="false"
        axis-line="false"
        tick-style="fill: var(--muted-foreground); font-size: 12px"
      />
      <recharts-tooltip content="ds-chart-tooltip" />
      <recharts-legend content="ds-chart-legend" />
      <recharts-bar dataKey="revenue" fill="var(--chart-1)" radius="[4, 4, 0, 0]" />
      <recharts-bar dataKey="expenses" fill="var(--chart-2)" radius="[4, 4, 0, 0]" />
    </recharts-bar-chart>
  </recharts-responsive-container>
</ds-chart-container>
```

---

## Properties

### @Input (ChartContainerComponent)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `ChartConfig` | required | Chart series configuration |

```typescript
interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: string;
  };
}
```

---

## Wireframe Skeleton

```
Bar chart:
  ┌─────────────────────────────────────────────────────┐
  │                                            ■ Revenue │
  │  $5k                                       ■ Expenses│
  │                   ██                               │
  │  $4k              ██  ██                           │
  │               ██  ██  ██  ██                        │
  │  $3k          ██  ██  ██  ██  ██                    │
  │           ██  ██  ██  ██  ██  ██                    │
  │  $2k      ██  ██  ██  ██  ██  ██                    │
  │      Jan  Feb Mar Apr May Jun                       │
  └─────────────────────────────────────────────────────┘

Line chart:
  ┌─────────────────────────────────────────────────────┐
  │                                 ╭───────            │
  │          ╭──────────────────────              │
  │    ──────╯                                          │
  │   Jan   Feb   Mar   Apr   May   Jun                 │
  └─────────────────────────────────────────────────────┘
```

---

## Usage Rules

1. Always use `ds-chart-container` — do not use Recharts `ResponsiveContainer` directly.
2. Set a fixed height via class (e.g. `class="h-[300px]"`) — never let charts auto-size their height.
3. Always include accessible text alternatives: a title above the chart, and a data table below (collapsible) for screen readers.
4. Pie charts: maximum 5 segments — more than 5 creates unreadable charts. Group remaining into "Other".
5. Axis labels must use `var(--muted-foreground)` at `12px` — never use foreground colour.
6. Grid lines use `var(--border)` — never solid dark lines.
7. Tooltips are always visible on hover — never remove the tooltip from charts.
8. Legend labels match the `config` label values — never hardcode different labels in the legend.
