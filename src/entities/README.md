# entities — FSD layer

Business **domain models**: the core concepts of the product (e.g. `user`, `course`,
`application`). Entities hold the data shape and the minimal UI/logic tied to a single
domain concept.

## Import direction

Layers import only from layers **below** them:

```
app → views → widgets → features → entities → shared
```

`entities` may import only from `shared`. It must **not** import from `features`,
`widgets`, `views`, or `app`.

## Slice & segment convention

A **slice** is a domain folder inside the layer. Each slice groups code by **segment**:

```
src/entities/
  user/                 ← a slice (one domain concept)
    ui/                 ← presentational components
    model/              ← types, stores, business logic
    api/                ← data fetching for this entity
    lib/                ← slice-local helpers (optional)
    config/             ← slice-local constants (optional)
    index.ts            ← public API (the ONLY entry point)
```

## Public API rule

Every slice exposes a public API via `index.ts`. Import only from a slice's **root
index** — never reach into deep paths:

```ts
import { User } from "@/entities/user";        // ✅ public API
import { User } from "@/entities/user/model/types"; // ❌ deep import — forbidden
```
