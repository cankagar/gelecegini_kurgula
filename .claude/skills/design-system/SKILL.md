---
name: design-system
description: Enforces PayaSTEM's design system (color tokens + component patterns extracted from auth and dashboard). Use for ANY new UI or UI edit in this project — buttons, cards, tables, forms, badges, sidebars, page shells.
---

# PayaSTEM Design System

Tek kaynak: `src/app/globals.css` (`@theme`). Yeni UI yazarken **sadece bu token'ları** kullan — hardcoded hex yasak (mevcut dashboard'daki hex'ler teknik borç, kopyalama).

## Renk Token'ları (Tailwind class → CSS var)

```
bg-bg              #FCFCF9   sayfa arkaplanı
bg-bg-alt          #F7F7F2   ikincil arkaplan (header/footer/table head)
bg-surface         #F0EFE9   hover/alt yüzey

border-border      #E4E3DC   tüm border'lar

text-text          #1F1F1B   ana metin
text-text-muted    #69665F   ikincil metin

bg-primary         #CFA24D   marka rengi (CTA, aktif state, accent çizgi)
hover:bg-primary-hover #B88C39
bg-primary-tint    #FAF3E4   yumuşak vurgulu arkaplan
border-primary-border #E3C68B

text-cta-text      #FFFFFF   primary/accent üstü buton metni

text-accent        #B87342   ikincil marka/aksan (ör. icon rengi)

bg-success / text-success       #6A866D
bg-success-bg                   #EEF4EF
bg-danger / text-danger         #B64F4F
bg-danger-bg                    #F8ECEB
bg-warning / bg-warning-bg       = primary / primary-tint ile aynı
```

Hardcoded hex görürsen (`#EAEAEA`, `#FBFBFA`, `#111111`, `#787774`, `#F0EFEC`, `#E6F4EA`, `#1E7A34`, `#F3E8E8`, `#B3261E` — hepsi `dashboard-sidebar` ve `dashboard-admin-users`'ta mevcut, taklit etme) → en yakın token'a çevir:

| Hex (eski) | Token (yeni) |
|---|---|
| `#EAEAEA` | `border-border` |
| `#FBFBFA` | `bg-bg-alt` |
| `#111111` | `text-text` / `bg-text` |
| `#787774` | `text-text-muted` |
| `#F0EFEC` | `bg-surface` |
| `#E6F4EA` / `#1E7A34` | `bg-success-bg` / `text-success` |
| `#F3E8E8` / `#B3261E` | `bg-danger-bg` / `text-danger` |

## Tipografi

- Başlıklar: `font-heading` + `font-bold`/`font-black` + negatif `tracking` (`-0.02em` ~ `-0.035em`).
- Gövde metni: sistem fontu, `text-text-muted`, satır yüksekliği geniş (`leading-[1.7]` civarı).
- Boyutlar `clamp()` veya `text-[Xrem]` ile serbest ölçek — Tailwind'in standart `text-lg/xl` skalasına zorunlu bağlı kalma, ama tutarlı hiyerarşi kur (h1 > açıklama > label).

## Component Pattern'leri

### Sayfa kabuğu (auth tarzı, `widgets/auth-shell`)
- Ambient radial-gradient arkaplan (primary + ikincil ton, düşük opaklık, `pointer-events-none`).
- Framer Motion `fadeUp` girişi: `opacity 0→1`, `y 18→0`, `blur(6px)→0`, `duration 0.8`, custom ease `[0.16,1,0.3,1]`, kademeli `delay`.
- Form kartı: "double bezel" — dış `p-[3px] rounded-[2rem] bg-border`, iç `rounded-[calc(2rem-3px)] bg-bg` + `inset` box-shadow highlight.

### Dashboard liste sayfası (`views/dashboard-admin-*`, örnek: `dashboard-admin-users`, `dashboard-admin-classrooms`)
- Container: **full-width**, `mx-auto` YOK — `w-full px-8 py-10 lg:px-12` (sidebar zaten yanda, içerik ortalanıp sağdan/soldan boşluk bırakmamalı).
- Başlık bloğu: sade — `h1` (`font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]`) + alt açıklama (`text-[0.9rem] text-text-muted`). Eyebrow/badge ekleme ("Yönetim" tarzı pill kaldırıldı, kullanıcı istemedikçe ekleme).
- Stat bento kartları (opsiyonel, sayfada anlamlı 2-3 metrik varsa): `grid grid-cols-1 gap-4 sm:grid-cols-3`, her kart double-bezel — dış `rounded-2xl bg-border p-1.5`, iç `rounded-[calc(1rem-0.375rem)] bg-bg px-5 py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]` + solda `h-10 w-10 rounded-full bg-primary-tint text-accent` ikon rozeti, sağda `font-heading text-xl font-bold` değer + `text-[0.78rem] text-text-muted` etiket. Metrik yoksa zorla ekleme.
- Arama: proje içinde reusable arama input component'i varsa onu kullan (kendi input'unu sıfırdan yazma). Arama tetikleme davranışı sayfaya göre değişir: canlı/debounce (`useEffect` + `setTimeout(500)`) ya da submit-on-click (`<form>` + yanında "Ara" butonu `rounded-md border border-border px-3.5 py-2 text-[0.85rem] font-medium text-text-muted hover:text-text`) — hangisi olduğunu kullanıcıya sor/mevcut sayfadaki davranışa bak, varsayılan olarak tek bir yöne zorlama.
- Tablo: `rounded-md border border-border overflow-hidden`, `thead` → `bg-bg-alt text-text-muted`, satır hover → `hover:bg-surface`, satır border → `border-b border-border last:border-0`.
- Tab/segment: alt çizgi stili — aktif `border-b-2 border-primary text-text`, pasif `border-transparent text-text-muted`.
- Badge/status pill: `rounded-full px-2 py-0.5 text-[0.75rem] font-medium` + `bg-success-bg text-success` / `bg-danger-bg text-danger` çifti (hardcoded yeşil/kırmızı hex değil).
- Input: `rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem]`, focus → `focus:ring-2 focus:ring-primary/20`.
- Sidebar: sabit genişlik `w-60`, `border-r border-border bg-bg-alt`, aktif link `bg-text text-white` (ya da `bg-primary`), pasif `text-text-muted hover:bg-surface hover:text-text`.

### Buton
- Primary CTA: `rounded-full bg-primary hover:bg-primary-hover text-white px-6 py-3.5 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]`.
- Disabled: `disabled:opacity-60 disabled:cursor-not-allowed`.

### Durum mesajları (form error/success)
- `rounded-2xl border px-4 py-3 text-[0.82rem] font-medium`, error → `border-danger/20 bg-danger-bg text-danger`, success → `border-success/20 bg-success-bg text-success`.

## Kurallar

1. Yeni component yazarken önce yukarıdaki token/pattern tablosuna bak — renk/spacing/radius için sıfırdan karar verme.
2. Hardcoded hex ekleme. İhtiyaç olan renk yoksa önce `globals.css`'e token ekle, sonra kullan.
3. FSD katman kuralları (`AGENTS.md`) geçerli — bu skill sadece görsel tutarlılığı kapsar, dosya yerleşimini değiştirmez.
4. Mevcut dashboard hex'lerini refactor görevi gelirse yukarıdaki eşleme tablosunu kullan; aksi halde sadece yeni yazılan koda bu skill'i uygula (mevcut kodu proaktif refactor etme, kullanıcı istemedikçe).
