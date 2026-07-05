# tabs

2026-07-05 · transformation engine (legacy `new-york` style, no golden pair) · Radix Tabs → Base UI Tabs (Trigger→Tab, Content→Panel).

## Changed

- `src/components/ui/tabs.tsx`
  - Import `Tabs as TabsPrimitive` from `radix-ui` → `@base-ui/react/tabs`.
  - Part renames: `TabsPrimitive.Trigger` → `Tab`, `TabsPrimitive.Content` → `Panel`. Root/List unchanged.
  - Types: `React.ComponentProps<typeof TabsPrimitive.X>` → `TabsPrimitive.Root.Props` / `List.Props` / `Tab.Props` / `Panel.Props`.
  - Class rewrites (all in the Tab className): every `data-[state=active]:` → `data-active:`, including the `group-data-[variant=…]/tabs-list:data-[state=active]:*`, `dark:…:data-[state=active]:*`, and `…:data-[state=active]:after:opacity-100` compound variants. `data-[orientation=…]` selectors kept (still parameterized in Base UI). `tabsListVariants` cva kept verbatim.
- `src/components/nav-dialog.tsx` (consumer, Tabs side)
  - TabsTrigger className `data-[state=active]:bg-primary data-[state=inactive]:bg-background` → `bg-background data-active:bg-primary`. Base UI has no `data-inactive` (inactive = absence of `data-active`), so the inactive style becomes the base class and active overrides it.

Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|data-\[state=" src/components/ui/tabs.tsx src/components/nav-dialog.tsx` → no matches.

## Left alone

- `variant` (default/line) custom prop and the `group/tabs` + `group/tabs-list` orientation machinery: project customizations, preserved.
- `defaultValue="main"` in nav-dialog: valid unchanged (Base UI `defaultValue` accepts the string).

## Behavior changes

- **Activation mode: Base UI Tabs default to MANUAL activation; Radix defaulted to automatic.** With arrow keys, the panel now changes only on Enter/Space (or click), not on focus. Flagged, not patched — this matches the shadcn Base UI registry, which accepts the manual default and does not add `activateOnFocus`. If you want the old auto-activate feel, add `activateOnFocus` to `TabsList`.
- `data-[state=inactive]` styling in nav-dialog was reframed as a base class (see above) — same visual result (inactive tab has `bg-background`, active has `bg-primary`).

## Verify by hand

- Open the categories sheet, switch between "Βασικές" / "Περισσότερα": clicking a tab shows the right category list, active tab gets the yellow (`bg-primary`) pill, inactive stays `bg-background`.
- Keyboard: focus a tab, press ← / →, then Enter — the panel switches on Enter (manual activation).
