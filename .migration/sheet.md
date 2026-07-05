# sheet

2026-07-05 · transformation engine (legacy `new-york` style, no golden pair) · Radix Dialog → Base UI Dialog (Overlay→Backdrop, Content→Popup).

## Changed

- `src/components/ui/sheet.tsx`
  - Import `Dialog as SheetPrimitive` from `radix-ui` → `@base-ui/react/dialog`.
  - Part renames: `SheetPrimitive.Overlay` → `Backdrop`, `SheetPrimitive.Content` → `Popup`. Root/Trigger/Close/Portal/Title/Description unchanged. `data-slot` values kept (`sheet-overlay`, `sheet-content`, …).
  - Types: every `React.ComponentProps<typeof SheetPrimitive.X>` → `SheetPrimitive.X.Props`.
  - Sheet is a side-anchored modal → Popup used **without a Positioner** (correct for dialogs).
  - Overlay/Backdrop animation: `data-[state=*]:animate-out/in fade-*` → `transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0`.
  - Content/Popup animation: `transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500` → `transition ease-in-out data-starting-style:duration-500 data-ending-style:duration-300`. Per-side `slide-in-from-*`/`slide-out-to-*` → `data-starting-style:translate-*-full data-ending-style:translate-*-full` (right → `translate-x-full`, left → `-translate-x-full`, top → `-translate-y-full`, bottom → `translate-y-full`). Added `outline-none`.
  - Close button: `data-[state=open]:bg-secondary` → `data-open:bg-secondary`.
- `src/components/nav-dialog.tsx` (consumer, Sheet side)
  - `<SheetTrigger asChild><Button …/></SheetTrigger>` → `<SheetTrigger render={<Button …/>}>{children}</SheetTrigger>`.

Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|data-\[state=\|slide-" src/components/ui/sheet.tsx` → no matches.

## Left alone

- `showCloseButton` / `side` custom props: preserved as-is (project customizations, not radix).

## Behavior changes

- Slide-in/out is now a CSS **transition** on `translate` driven by `data-starting-style`/`data-ending-style` rather than keyframe `animate-in/out`. The drawer still slides from the chosen side; easing/duration preserved (500ms in, 300ms out).
- `Close`'s `data-open:bg-secondary` never matches (a Close button has no open state) — this was already dead styling in the Radix version; carried over verbatim, not newly broken.
- `onOpenChange` (if added) now takes `(open, eventDetails)`.

## Verify by hand

- Tap "Κατηγορίες" (mobile): the sheet slides in from the right, backdrop fades in.
- Close via the X button or backdrop click / Escape: sheet slides back out to the right, backdrop fades. Focus returns to the trigger.
- Confirm the sheet content (tabs + social links) scrolls and the close button sits top-right.

## Follow-up (post-review, 2026-07-05)

- Enter duration fix: `data-starting-style:duration-500` never governed the enter transition (the attribute is removed after one frame; CSS reads duration from the after-change style), so the sheet opened at Tailwind's 150ms default. Now `duration-500` sits in the base classes with `data-ending-style:duration-300` overriding for exit — actual 500ms in / 300ms out.
- Dead `data-open:bg-secondary` on the Close button removed (Base UI's Close only ever gets `data-disabled`; was dead under Radix too).
- Close button sr-only label translated: "Close" → "Κλείσιμο" (all-Greek UI rule).
