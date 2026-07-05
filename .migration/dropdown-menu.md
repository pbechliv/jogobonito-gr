# dropdown-menu

2026-07-05 · transformation engine (legacy `new-york` style, no golden pair) · Radix DropdownMenu → Base UI **Menu** (renamed + restructured).

## Changed

- `src/components/ui/dropdown-menu.tsx` (rewritten)
  - Import `DropdownMenu as DropdownMenuPrimitive` from `radix-ui` → `Menu as DropdownMenuPrimitive` from `@base-ui/react/menu`.
  - Part renames: `Content` → `Portal > Positioner > Popup`; `Label` → `GroupLabel`; `ItemIndicator` → `CheckboxItemIndicator` / `RadioItemIndicator` (split by parent); `Sub` → `SubmenuRoot`; `SubTrigger` → `SubmenuTrigger`. Root/Portal/Trigger/Group/Item/CheckboxItem/RadioGroup/RadioItem/Separator unchanged names.
  - Types: `React.ComponentProps<typeof …>` → `DropdownMenuPrimitive.<Part>.Props` throughout.
  - `DropdownMenuContent`: now declares/destructures/**forwards** `sideOffset`, `align`, `alignOffset`, `side` to `Positioner` (Pick-means-forward — critical because theme-toggle passes `align="end"`, which must land on Positioner, not Popup). Positioner `className="isolate z-50 outline-none"`; Popup keeps `z-50 outline-none`.
  - Class rewrites on the Popup: `max-h-(--radix-dropdown-menu-content-available-height)` → `max-h-(--available-height)`; `origin-(--radix-dropdown-menu-content-transform-origin)` → `origin-(--transform-origin)`; `animate-in/out` + `fade`/`zoom` + per-side `slide-in-from-*` → `transition-[transform,scale,opacity] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0`.
  - **Highlight styling: `focus:bg-accent focus:text-accent-foreground` → `data-highlighted:bg-accent data-highlighted:text-accent-foreground`** on Item, CheckboxItem, RadioItem, and SubmenuTrigger. Radix highlighted the item via DOM `:focus`; Base UI marks it with `data-highlighted`. Destructive variant's `…:focus:*` likewise → `…:data-highlighted:*`.
  - SubmenuTrigger open marker: `data-[state=open]:bg-accent …` → `data-popup-open:bg-accent data-popup-open:text-accent-foreground`.
  - `DropdownMenuSubContent`: recomposed to wrap the public `DropdownMenuContent` with the submenu defaults `align="start" alignOffset={-3} side="right" sideOffset={0}` (per the skill's fallback shape; no golden pair to copy). `shadow-lg` preserved via className.
  - `data-[disabled]:` and `data-[inset]:` / `data-[variant=…]` selectors kept (unchanged in Base UI). `DropdownMenuShortcut` (plain `<span>`) unchanged.
- `src/components/theme-toggle.tsx` (consumer)
  - `<DropdownMenuTrigger asChild><Button …/></DropdownMenuTrigger>` → `<DropdownMenuTrigger render={<Button …/>}>{icons}</DropdownMenuTrigger>`.
  - `<DropdownMenuContent align="end">` and `DropdownMenuItem onClick={…}` unchanged (align now correctly forwarded; Item `onClick` + default `closeOnClick` preserve close-on-select).

Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|--radix-\|data-\[state=\|slide-in-from" src/components/ui/dropdown-menu.tsx src/components/theme-toggle.tsx` → no matches.

## Left alone

- `inset` / `variant` custom props on Item/Label/SubTrigger: project customizations, preserved.
- `DropdownMenuShortcut`: not a radix part, untouched.

## Behavior changes

- **CheckboxItem / RadioItem no longer close the menu on select** (Base UI `closeOnClick` defaults to `false` on those parts; Radix closed by default). Not patched. No consumer uses checkbox/radio items today; if added and you want Radix behavior, set `closeOnClick`. Plain `Item` still closes on click (default `true`), so the theme toggle behaves exactly as before.
- Item highlight is driven by `data-highlighted` (keyboard nav + hover) instead of `:focus`. Hover + arrow-key highlight styling is preserved; there is no longer a reliance on the item holding DOM focus.
- `DropdownMenuLabel` now renders Base UI `GroupLabel`, which is meant to live inside a `DropdownMenuGroup` (it wires `aria-labelledby`). Radix `Label` could float freely. Wrap labels in a group if you add them.
- Open/close animation restated as a transform+scale+opacity transition (see popover).

## Verify by hand

- Click the theme toggle: menu opens aligned to the trigger's right edge (`align="end"`), animates in.
- Hover / arrow-key through Φωτεινό / Σκοτεινό / Σύστημα: highlighted row gets the accent background.
- Click a theme item: theme changes AND the menu closes. Escape and outside-click also close it, returning focus to the toggle.
