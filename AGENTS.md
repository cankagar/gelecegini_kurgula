<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture: Feature-Sliced Design (FSD)

All code under `src/`. Import via alias `@/*` → `./src/*` (no relative `../../` across layers).

## Layers (top → bottom — import ONLY from layers below)

| Layer | Purpose |
|-------|---------|
| `app/` | Next routing, layouts, providers, global styles. Route files stay thin → render a `view`. |
| `views/` | Full-page compositions (FSD "pages", renamed; Next reserves `pages`/`app`). |
| `widgets/` | Big composite UI blocks (navbar, footer). |
| `features/` | User interactions / use-cases. |
| `entities/` | Domain models (user, course). |
| `shared/` | Reusable, domain-agnostic code. Segments: `ui/ lib/ api/ config/ types/`. Imports nothing above. |

## Rules

- **Down only.** No same-layer cross-slice imports (widget↛widget). Need to share? Lift code down a layer.
- **Slices & segments.** `views/widgets/features/entities` → group by domain SLICE, then SEGMENT (`ui/ model/ api/ lib/ config/`). `app`/`shared` = segments, no slices.
- **Public API.** Each slice = one `index.ts` barrel. Import slice root `@/widgets/navbar` ✅ — never deep `@/widgets/navbar/ui/Navbar` ❌.
- **New code?** Route/layout→`app`; full page→`views`; big UI block→`widgets`; interaction→`features`; domain model→`entities`; reusable/generic→`shared/<segment>`.

## Example

```
src/widgets/navbar/
  index.ts        # export { default } from "./ui/Navbar";
  ui/Navbar.tsx
```
Migrated refs: `shared/ui/icons`, `widgets/navbar`, `widgets/footer`.
