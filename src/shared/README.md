# `shared` layer (Feature-Sliced Design)

The **bottom** layer of the FSD architecture.

```
app → views → widgets → features → entities → shared
```

## Rules

- **Imports nothing from upper layers.** `shared` may only depend on third-party
  packages and other code inside `shared`. It must never import from `entities`,
  `features`, `widgets`, `views`, or `app`.
- **Domain-agnostic.** Code here is reusable and carries no business/domain
  knowledge. Anything domain-specific belongs in `entities` or higher.
- **Public API via `index.ts`.** Import from a segment's barrel, not deep paths:

  ```ts
  // good
  import { SomeIcon } from "@/shared/ui/icons";
  import { SomeIcon } from "@/shared/ui";

  // avoid
  import { SomeIcon } from "@/shared/ui/icons/icons";
  ```

  There is intentionally **no** top-level `src/shared/index.ts` — consumers import
  from the relevant segment instead.

## Segments

| Segment   | Purpose                                                        |
| --------- | ------------------------------------------------------------- |
| `ui/`     | Presentational, domain-agnostic UI primitives + icons.        |
| `lib/`    | Helpers, utils, hooks.                                         |
| `api/`    | Base HTTP client / fetch wrappers.                            |
| `config/` | Environment configuration and app-wide constants.             |
| `types/`  | Shared TypeScript types.                                       |

Each segment exposes its public API through its own `index.ts` barrel.
