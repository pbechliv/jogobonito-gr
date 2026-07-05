# popover

2026-07-05 · transformation engine (legacy `new-york` style, no golden pair) · Radix Popover → Base UI Popover with the Portal → Positioner → Popup model.

## Changed

- `src/components/ui/popover.tsx`
  - Import `Popover as PopoverPrimitive` from `radix-ui` → `@base-ui/react/popover`.
  - `PopoverContent`: `Portal > Content` → `Portal > Positioner > Popup`. `align` and `sideOffset` are declared, destructured, and **forwarded to `Positioner`** (the Pick-means-forward rule); `...props` spread onto `Popup`. Positioner gets `className="isolate z-50"`.
  - Types: `React.ComponentProps<typeof PopoverPrimitive.Content>` → `PopoverPrimitive.Popup.Props & Pick<PopoverPrimitive.Positioner.Props, "align" | "sideOffset">`.
  - Class rewrites on the Popup: `origin-(--radix-popover-content-transform-origin)` → `origin-(--transform-origin)`; `outline-hidden` → `outline-none`; the `animate-in/out` + `fade`/`zoom` + per-side `slide-in-from-*` block → transition-based `transition-[transform,scale,opacity] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0`.
  - `PopoverAnchor`: Base UI has no Anchor part (anchoring is a Positioner `anchor` prop). Kept as an **inert `<span>` passthrough** so the existing export doesn't break. It no longer anchors anything.
- `src/components/tags-bar.tsx` (consumer)
  - `<PopoverTrigger asChild><button …/></PopoverTrigger>` → `<PopoverTrigger render={<button …/>}>{children}</PopoverTrigger>`.
  - `<PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>` → `initialFocus={false}` (Radix's "prevent auto-focus on open" maps to Base UI's `initialFocus`, which flows through `...props` onto the Popup). Same "don't steal focus" effect; hover-open/close timers unchanged.

Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|--radix-\|data-\[state=\|slide-in-from" src/components/ui/popover.tsx src/components/tags-bar.tsx` → no matches.

## Left alone

- The `open` / `onOpenChange` controlled state in tags-bar: passes through unchanged. `onOpenChange(open)` stays type-safe (Base UI adds an optional 2nd `eventDetails` arg the handler ignores).

## Behavior changes

- Open/close animation changed from slide+zoom+fade (keyframe `animate-in/out`) to a transform+scale+opacity **transition**. Visually similar (fade + slight scale); the directional slide-from-side is gone.
- `PopoverAnchor` is now inert. No consumer used it, but if one is added it will not position the popover — pass a Positioner `anchor` instead.
- `onOpenChange` now receives `(open, eventDetails)`; existing single-arg handler is unaffected.

## Verify by hand

- Hover "Περισσότερα" in the tags bar: popover opens after hover, stays open while the pointer is over the trigger or the popup, closes ~150ms after leaving both.
- Click the trigger toggles it. Opening does NOT yank focus into the popup (links inside stay reachable by Tab, but focus starts on the trigger).
- Popover is positioned below/centered on the trigger and flips on collision near the viewport edge.

## Follow-up (post-review, 2026-07-05)

- `PopoverAnchor` inert stub **deleted** (zero consumers; a silent no-op was a footgun). Anchoring is now available via a real `anchor` prop on `PopoverContent`, forwarded to the Positioner.
- `PopoverContent` now forwards all four positioning props (`align`, `sideOffset`, `side`, `alignOffset`) to the Positioner, matching dropdown-menu.
- tags-bar: manual hover state machine (close timer, mouse handlers, trigger onClick/aria-expanded) replaced by Base UI's native `openOnHover delay={0} closeDelay={150}` on PopoverTrigger; controlled `open` kept only for the chevron rotation and link-click close. Hover-driven opens skip the focus manager, so no focus return fires on mouse-away (the finalFocus concern is moot).
