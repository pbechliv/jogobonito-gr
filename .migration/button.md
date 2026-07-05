# button

2026-07-05 · transformation engine (legacy `new-york` style, no golden pair) · migrated to the real `@base-ui/react/button` primitive.

## Changed

- `src/components/ui/button.tsx`
  - Import `Slot` from `radix-ui` → `Button as ButtonPrimitive` from `@base-ui/react/button` (button.tsx migrates to the REAL Base UI Button primitive, never a hand-rolled `useRender` wrapper).
  - Dropped the `asChild` / `Slot.Root` idiom. The component now renders `<ButtonPrimitive>` directly; polymorphism is available via Base UI's native `render` prop.
  - Props type: `React.ComponentProps<"button"> & { asChild }` → `Omit<React.ComponentProps<typeof ButtonPrimitive>, "className"> & VariantProps<...> & { className?: string }`. The `className` override keeps it a plain `string` so `cn(buttonVariants({ variant, size, className }))` still type-checks (Base UI's `className` also accepts a `(state) => string` function form, which cva cannot consume).
  - `buttonVariants` cva definition and all class strings kept verbatim — no `data-[state=…]` / radix CSS vars were present, so no class rewrites needed.
- Consumers using `<Button asChild>`: none. Triggers wrap Button via the trigger's `render` prop instead (see nav-dialog / theme-toggle reports).

Leftover scan clean: `grep -n "radix-ui\|@radix-ui" src/components/ui/button.tsx` → no matches.

## Left alone

Nothing adjacent. `cn` / `class-variance-authority` are unrelated to radix.

## Behavior changes

- `asChild` prop removed from the public API. It was never used by any consumer. Anyone adding polymorphism later must use `render={<a … />}` (plus `nativeButton={false}` for non-button elements), not `asChild`.

## Verify by hand

- Every button still renders as a `<button>` with correct variant/size classes (categories trigger, theme toggle, pagination is unaffected — it uses a plain div).
- Focus ring (`focus-visible:ring-*`) and `disabled` opacity still apply.
