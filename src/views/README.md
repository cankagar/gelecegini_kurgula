# views — FSD layer (the FSD "pages" layer)

> Named `views` instead of `pages` to avoid colliding with Next.js's reserved
> routing terminology. This is the FSD **pages** layer.

Full **page compositions**: each view assembles widgets, features, and entities into
a complete page. A Next.js route (`src/app/**/page.tsx`) stays thin and simply renders
the matching view from here.

## Import direction

Layers import only from layers **below** them:

```
app → views → widgets → features → entities → shared
```

`views` may import from `widgets`, `features`, `entities`, and `shared`. It must
**not** import from `app`. Conversely, `app` routes import *from* `views`.

## Slice & segment convention

A **slice** is a page folder inside the layer. Each slice groups code by **segment**:

```
src/views/
  home/                 ← a slice (one page composition)
    ui/                 ← the page component(s)
    model/              ← types, stores, business logic (optional)
    api/                ← data fetching (optional)
    lib/                ← slice-local helpers (optional)
    config/             ← slice-local constants (optional)
    index.ts            ← public API (the ONLY entry point)
```

## Public API rule

Every slice exposes a public API via `index.ts`. Import only from a slice's **root
index** — never reach into deep paths:

```ts
import { HomeView } from "@/views/home";          // ✅ public API
import { HomeView } from "@/views/home/ui/HomeView"; // ❌ deep import — forbidden
```
