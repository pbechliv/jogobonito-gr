# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Dev server with Turbopack on port 4000
yarn build        # Production build (SSG)
yarn start        # Production server on port 4000
yarn lint         # ESLint
```

Package manager: **yarn 4.12.0**. Use `yarn add` for dependencies.

shadcn components: `npx shadcn@latest add <component>` (uses `components.json` config with `@jogo/*` aliases).

## Architecture

Greek-language sports blog built with **Next.js 16** (App Router, SSG/ISR) and **Contentful CMS**.

### Data Flow

Content is fetched from Contentful's GraphQL API (`src/lib/api.ts`) at build time. Pages use `generateStaticParams()` for static generation with 60-second ISR revalidation (`next: { revalidate: 60 }` on the fetch). Rich text content is rendered via `@contentful/rich-text-react-renderer` with custom handlers for embedded images, YouTube/Facebook embeds, and hyperlinks.

Queries are assembled from reusable GraphQL field fragments exported as template strings in `src/definitions/objects.fields.ts` (`PostFields`, `TagFields`, `PostWithContentFields`) — interpolated into query bodies in `api.ts`. `PostWithContentFields` extends `PostFields` with the rich text `content` block and its linked assets. When adding a field to a query, edit the fragment, not the query. Matching TypeScript types live in `objects.interface.ts` (entities) and `responses.interface.ts` (GraphQL response envelopes); all are re-exported from `@jogo/definitions`.

`fetchGraphQL` accepts a `preview` flag that switches to `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, but no page currently uses it — all reads are published content.

### Path Alias

`@jogo/*` maps to `./src/*` (configured in `tsconfig.json`).

### Routing

- `/` and `/page/[page]` — Paginated post listing (10 per page)
- `/post/[slug]` — Single post with rich text body
- `/tag/[slug]/[page]` — Posts filtered by tag

`/page/0` and `/page/1` redirect to `/` via `next.config.ts`.

### Tag System

Tags have an `isMain` boolean. Main tags display in a fixed order defined in `src/lib/main-tag-names-sorted.ts`. Secondary tags sort alphabetically by Greek locale. On desktop they appear in a Popover dropdown; on mobile in tabbed Sheet drawer.

### Styling & Theming

**Tailwind CSS v4** with shadcn/ui components. Colors use CSS custom properties (oklch) in `src/styles/globals.css` — `:root` for light theme, `.dark` for dark theme. The yellow accent palette (`--primary` = yellow-200, `--secondary` = yellow-100) is the brand identity.

Dark mode via `next-themes` with `attribute="class"`. Theme toggle offers Light/Dark/System.

All UI text is in **Greek** — keep labels, aria attributes, and user-facing strings in Greek.

### Key Conventions

- **Arrow functions for components**: Use `export const Component = (props: Props) => { ... }` for all custom components. Exception: page default exports use `export default function` (Next.js convention). Don't modify shadcn/ui generated components in `src/components/ui/`.
- **Props parameter**: Accept `props` as a single typed parameter — do not destructure props in the function signature. Destructure inside the function body if needed.
- Server Components by default; `"use client"` only where needed (nav-dialog, tags-bar, pagination, theme-toggle)
- Semantic color classes (`bg-primary`, `text-muted-foreground`, `bg-secondary`) instead of hardcoded Tailwind colors — enables dark mode
- `prose dark:prose-invert` for rich text content blocks
- Fonts: Inter (body, Latin+Greek), Rubik Vinyl (logo only)

## Environment Variables

Defined in `.env.local`:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
