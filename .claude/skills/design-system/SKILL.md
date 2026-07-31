---
name: design-system
description: Enforces PayaSTEM's design system (color tokens + component patterns extracted from auth and dashboard). Use for ANY new UI or UI edit in this project — buttons, cards, tables, forms, badges, sidebars, page shells.
---

# PayaSTEM Design System

## Renk token'ları

Tek kaynak: `src/app/globals.css` (`@theme`). Yeni UI'da **sadece bu token'ları** kullan — hardcoded hex yasak. Token isimleri kendini açıklıyor (`bg-bg`, `bg-surface`, `border-border`, `text-text`/`text-text-muted`, `bg-primary`/`primary-hover`/`primary-tint`, `text-accent`, `bg-success`/`success-bg`, `bg-danger`/`danger-bg`). Dosyayı aç, mevcut değerlere bak.

Mevcut dashboard kodunda hâlâ hardcoded hex kalmış olabilir (teknik borç) — kopyalama, gördüğün yerde en yakın token'a çevir.

## Önce shared/ui'a bak

Yeni bir UI parçası yazmadan önce `src/shared/ui/` altına bak — aynı ihtiyacı karşılayan component muhtemelen zaten var (arama input'u, geri dön linki, ikon+daire rozet, avatar, ikon seti, vb.). Sıfırdan yazmak yerine var olanı kullan/genişlet. Yoksa ve birden fazla yerde tekrar edecekse `shared/ui/<isim>/` altında yeni bir component olarak ekle (bkz. `AGENTS.md` — FSD public API kuralı: `index.ts` barrel).

Genel ikon ihtiyacı `lucide-react`'tan karşılanır (proje bağımlılığı). Proje-özel/illüstratif custom ikonlar `shared/ui/icons` altında.

## Sayfa kabuğu

- Dashboard sayfaları (`views/dashboard-*`) full-width: `w-full px-8 py-10 lg:px-12` — `mx-auto`/`max-w-*` ile ortalama, sidebar zaten yanda.
- Auth sayfaları (`widgets/auth-shell`) farklı bir kabuk kullanır — o dizine bak.
- Tipografi: başlıklar `font-heading` + `font-bold` + negatif `tracking`; gövde `text-text-muted`.

## Kurallar

1. Renk/spacing/radius için sıfırdan karar vermeden önce `globals.css` + `shared/ui` + bu sayfanın kardeşi olan başka bir `views/dashboard-*` dosyasına bak, oradaki pattern'i tekrar kullan.
2. Hardcoded hex ekleme. İhtiyaç olan renk yoksa önce `globals.css`'e token ekle.
3. FSD katman kuralları (`AGENTS.md`) geçerli — bu skill sadece görsel tutarlılığı kapsar.
4. Mevcut kodu kullanıcı istemedikçe proaktif refactor etme; sadece yeni yazılan/değiştirilen koda bu skill'i uygula.
