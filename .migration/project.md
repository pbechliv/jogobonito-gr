# Project migration: Radix UI → Base UI (whole project)

2026-07-05 · Greek sports blog (Next.js 16 App Router, SSG/ISR). Migrated all 5 shadcn wrappers and their consumers off `radix-ui` onto `@base-ui/react@1.6.0`.

## Strategy

Style is **`new-york`** — a legacy shadcn style with **no Base UI counterpart** (`base-new-york` returns 404; probed `base-default`, `base`, `base-neutral`, `base-new-york-v4`, `base-zinc` — all 404). Per the migration skill's legacy-style rule, this was a **transformation-engine** migration on the project's own files: primitives rewired, part renames applied, `data-[state=…]` / `--radix-*` class hooks and animation idioms rewritten, but **every existing class string and customization preserved** — the app's look is unchanged. No golden-pair replay (there is no base variant to retarget onto).

## Dependency swap

- `pnpm add @base-ui/react` → `@base-ui/react@1.6.0`.
- `pnpm remove radix-ui` (was `radix-ui@1.6.1`). Package manager: pnpm 11.10.0 via corepack.

## Components migrated (leaf-first order)

| Component | Base UI target | Notes |
|---|---|---|
| button | `@base-ui/react/button` (real primitive) | dropped `asChild`; see button.md |
| popover | `@base-ui/react/popover` | Portal→Positioner→Popup; Anchor now inert |
| sheet | `@base-ui/react/dialog` | Overlay→Backdrop, Content→Popup |
| tabs | `@base-ui/react/tabs` | Trigger→Tab, Content→Panel; **manual activation** delta |
| dropdown-menu | `@base-ui/react/menu` | renamed+restructured; `:focus`→`data-highlighted` |

## App-code sweep (consumers outside `src/components/ui`)

Swept for `asChild` + every consumer-prop token. Files changed:
- `src/components/nav-dialog.tsx` — SheetTrigger `asChild`→`render`; TabsTrigger `data-[state=active|inactive]` classes rewritten.
- `src/components/tags-bar.tsx` — PopoverTrigger `asChild`→`render`; PopoverContent `onOpenAutoFocus`→`initialFocus={false}`.
- `src/components/theme-toggle.tsx` — DropdownMenuTrigger `asChild`→`render`.
- `src/components/pagination.tsx` — **no change** (imports no UI wrapper; uses a plain `<div>` PageButton + lucide icons).

## Verification vs baseline

- Baseline (before touching deps): `tsc --noEmit` clean.
- Final: `tsc --noEmit` clean · `pnpm lint` clean · `pnpm build` succeeds, all 112 static pages generated. No regressions vs baseline.

## Flags / follow-ups

1. ~~`components.json` still says `"style": "new-york"`.~~ **Resolved 2026-07-05:** switched to `"style": "base-vega"` (chosen for `rounded-md` + `text-sm`, the closest match to the existing new-york look). Future `pnpm dlx shadcn add <component>` now delivers **Base UI** variants — no more Radix re-introduction. This is a CLI resolution setting only; it did not restyle any existing files. Other Base UI styles available: `base-nova` (rounded-lg), `base-mira` (compact text-xs), `base-lyra` (rounded-none).
2. **Behavior deltas** (all flagged, none patched): tabs manual activation; dropdown checkbox/radio items don't close on select; popover open no longer auto-focuses the popup. Full details in each component's report.
3. `radix-ui` is fully removed and no `@radix-ui`/`radix-ui` import remains anywhere in `src`.

## Status derived from disk

`grep -rn "radix-ui\|@radix-ui" src` → **0 wrappers remain on Radix.**
