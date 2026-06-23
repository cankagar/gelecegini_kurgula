# widgets — FSD layer

Large **composite UI blocks** that combine features and entities into a
self-contained chunk of a page: navbar, footer, sidebars, headers, etc.

## Import direction

Layers import only from layers **below** them:

```
app → views → widgets → features → entities → shared
```

`widgets` may import from `features`, `entities`, and `shared`. It must **not** import
from `views` or `app`.

## Slice & segment convention

A **slice** is a widget folder inside the layer. Each slice groups code by **segment**:

```
src/widgets/
  navbar/               ← a slice (one composite block)
    ui/                 ← presentational components + their CSS modules
    model/              ← types, stores, business logic (optional)
    api/                ← data fetching (optional)
    lib/                ← slice-local helpers (optional)
    config/             ← slice-local constants (optional)
    index.ts            ← public API (the ONLY entry point)
```

Existing slices: `navbar/`, `footer/`.

## Public API rule

Every slice exposes a public API via `index.ts`. Import only from a slice's **root
index** — never reach into deep paths:

```ts
import Navbar from "@/widgets/navbar";            // ✅ public API
import Navbar from "@/widgets/navbar/ui/Navbar";  // ❌ deep import — forbidden
```
