# features — FSD layer

User-facing **interactions / use-cases**: a single thing the user can *do*
(e.g. `auth-login`, `submit-application`, `toggle-theme`). Features compose entities
to deliver a concrete interaction.

## Import direction

Layers import only from layers **below** them:

```
app → views → widgets → features → entities → shared
```

`features` may import from `entities` and `shared`. It must **not** import from
`widgets`, `views`, or `app`.

## Slice & segment convention

A **slice** is a use-case folder inside the layer. Each slice groups code by **segment**:

```
src/features/
  auth-login/           ← a slice (one interaction)
    ui/                 ← presentational components (the form, button, etc.)
    model/              ← types, stores, business logic
    api/                ← data fetching for this feature
    lib/                ← slice-local helpers (optional)
    config/             ← slice-local constants (optional)
    index.ts            ← public API (the ONLY entry point)
```

## Public API rule

Every slice exposes a public API via `index.ts`. Import only from a slice's **root
index** — never reach into deep paths:

```ts
import { LoginForm } from "@/features/auth-login";          // ✅ public API
import { LoginForm } from "@/features/auth-login/ui/LoginForm"; // ❌ deep import — forbidden
```
