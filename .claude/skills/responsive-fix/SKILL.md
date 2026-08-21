---
name: responsive-fix
description: Makes an existing PayaSTEM page, modal, widget, or component properly responsive across mobile/tablet/desktop (Tailwind breakpoints). Use whenever the user reports something looks broken/taşıyor/kırık/bozuk on phone or tablet, asks to make a page/modal/sidebar/table "responsive" or "mobile uyumlu", pastes a screenshot of overflow/wrapping/cut-off UI, or asks to fix a specific screen size. Also trigger proactively for any brand-new page/modal build in this project — check it works at all breakpoints before calling the UI done, even if the user only asked for the desktop look. Covers Next.js App Router pages, modals (`src/shared/ui/modal`), tables, sidebars, forms, and dashboard/auth shells.
---

# Responsive Fix (PayaSTEM Frontend)

Bu proje Next.js 16 + Tailwind CSS v4 + FSD mimarisi kullanıyor. Bu skill, kullanıcının belirttiği (veya ekran görüntüsüyle gösterdiği) sayfa/modal/component'i mobil, tablet ve desktop'ta doğru çalışacak şekilde düzeltir.

**Önce oku:** `.claude/skills/design-system/SKILL.md` zaten yüklüyse token/kart/spacing kurallarına oradan uy — bu skill sadece responsive davranışa odaklanır, renk/spacing sıfırdan icat etmez.

## 1. Ne düzeltileceğini netleştir

Kullanıcı zaten net bir dosya/sayfa/ekran görüntüsü verdiyse adım atlanır. Ama şunlardan biri belirsizse **işe başlamadan önce sor** — yanlış dosyayı düzeltip zaman kaybetmemek için:

- **Hangi sayfa/component?** ("dashboard admin kullanıcılar tablosu" gibi bir isim / route yeterli, dosyayı sen bul).
- **Hangi cihaz/genişlikte bozuk?** Sadece mobil mi (< 768px), sadece tablet mi (768–1024px), yoksa ikisi de mi? Kullanıcı "telefonda kayıyor" dediyse mobile-first düşün ama tablet'i de kontrol et.
- **Belirti ne?** Yatay scroll/taşma mı, üst üste binen elementler mi, okunmayan küçük yazı mı, modal ekrandan taşıyor mu, tablo mu kırılıyor? Ekran görüntüsü varsa doğrudan ondan oku, yoksa kısa sor.

Bunları `AskUserQuestion` ile sormak yerine, kullanıcı zaten "X sayfası telefonda bozuk" gibi somut bir şey söylediyse direkt koda geç — soru sadece gerçekten belirsizken.

## 2. Dosyayı FSD'ye göre bul

`AGENTS.md` yapısına göre:
- Tam sayfa → `src/views/<view-adı>/ui/*.tsx` (route dosyası `src/app/.../page.tsx` sadece bu view'i render eder, thin).
- Modal → genelde `src/shared/ui/modal` üzerine kurulu, ilgili feature/view klasöründe kullanılıyor.
- Tekrar eden büyük blok (navbar, sidebar, footer) → `src/widgets/<slice>`.
- Küçük tekil bileşen (kart, buton, badge) → `src/shared/ui/<isim>`.

Route'tan dosyaya gitmek için `src/shared/lib/routes.ts` içindeki `ROUTES` ile eşleştir, sonra `src/app` altında ilgili `page.tsx`'i bul, oradan `views/` içindeki gerçek component'e in.

## 3. Tailwind v4 breakpoint referansı

Proje custom breakpoint tanımlamıyorsa Tailwind v4 default'ları geçerli:

| Prefix | Min genişlik | Tipik cihaz |
|--------|-------------|-------------|
| (none) | 0px | mobil (mobile-first taban stil) |
| `sm:`  | 640px | büyük telefon / küçük tablet dikey |
| `md:`  | 768px | tablet |
| `lg:`  | 1024px | küçük laptop |
| `xl:`  | 1280px | desktop |
| `2xl:` | 1536px | geniş desktop |

Mobile-first yaz: taban class'lar en dar ekran için, büyüdükçe `sm:`/`md:`/`lg:` ile override et. Sona `lg:hidden` gibi "masaüstünü mobile göre eklercesine" ters mantık kurma.

## 4. Sık kırılma noktaları ve düzeltmeleri

Dosyayı okurken şu pattern'leri ara — genelde asıl sorun bunlardan biri:

**Sabit genişlik/yükseklik (px)**
`w-[420px]`, `w-96` gibi sabit değerler dar ekranda taşırır. `w-full` + `max-w-*` (`md:max-w-md lg:max-w-lg` gibi) kombinasyonuna çevir. Yükseklikte sabit `h-[600px]` yerine `min-h-*` veya `max-h-[80vh] overflow-y-auto` (özellikle modal içeriği için) kullan.

**Flex/grid wrap eksikliği**
Yan yana dizilen elementler (`flex` ama `flex-wrap` yok, ya da `grid-cols-3` sabit) dar ekranda üst üste biner/taşar. `flex-col md:flex-row` veya `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` gibi kademeli class'a çevir.

**Modal'lar (`src/shared/ui/modal`)**
Modal içeriği masaüstünde tasarlanıp mobilde ekrandan taşan en klasik durum. Kontrol et: modal genişliği `w-full max-w-[…]` mi yoksa sabit px mi, dış padding mobilde yeterince küçük mü (`p-4 sm:p-6` gibi), içerik uzunsa `max-h-[85vh] overflow-y-auto` var mı, kapatma butonu küçük ekranda erişilebilir mi (min 40px dokunma alanı).

**Tablo/liste görünümleri**
Tablolar mobilde en çok sorun çıkaran öğe. İki seçenek: (a) `overflow-x-auto` sarmalayıcı ile yatay scroll'a izin ver (hızlı çözüm, veri kaybı yok), (b) mobilde tabloyu kart listesine çevir (`hidden md:table` + mobil için ayrı kart render, daha çok iş ama daha iyi UX). Hangisini seçeceğin kullanıcının önceliğine bağlı — hızlı fix isteniyorsa (a), "gerçekten iyi görünsün" deniyorsa (b); emin değilsen sor.

**Sidebar/navbar**
Masaüstü sabit-genişlik sidebar mobilde tüm ekranı kaplamamalı — `lg:` üzerinde görünür sabit sidebar, altında ya tamamen gizli+hamburger/drawer, ya da alt tab bar'a dönüşür. Bu proje `widgets/navbar` kullanıyor — orada zaten bir mobil pattern var mı kontrol et, yoksa aynı widget içinde genişlet (yeni ayrı bir MobileNavbar component'i açma, tek widget içinde responsive class'larla çöz).

**Yazı boyutu / satır uzunluğu**
Masaüstü için ayarlanmış büyük başlıklar (`text-4xl`) mobilde satırı kırıp taşabilir veya orantısız durabilir. `text-2xl sm:text-3xl lg:text-4xl` gibi kademeli ölçeklendir. Body metni mobilde `text-sm`/`text-base` altına inmesin (okunabilirlik).

**Görsel/ikon boyutları**
Sabit `w-[300px] h-[300px]` görseller mobilde taşar. `w-full max-w-[300px] h-auto` veya `aspect-*` ile orantılı küçült.

**Yatay taşma (genel teşhis)**
Belirti "sayfa yana kayıyor" ise tek tek elemanı aramak yerine önce şüpheli genişlik kaynaklarını grep'le:
```bash
grep -rn "w-\[" src/views/<ilgili-view>
grep -rn "min-w-\[" src/views/<ilgili-view>
```
Genelde suçlu: negatif margin, sabit `min-w`, veya `whitespace-nowrap` ile taşan bir metin/tablo.

## 5. Uygularken uy

- **Mevcut pattern'i taklit et.** Aynı view'in kardeşi olan başka bir `views/dashboard-*` dosyasında zaten çözülmüş bir responsive pattern varsa (örn. sidebar collapse, kart grid'i) onu kopyala — sıfırdan farklı bir yaklaşım icat etme (design-system skill'indeki "önce shared/ui'a bak" kuralıyla aynı mantık).
- **Over-engineering yapma.** Kullanıcı sadece tek bir sayfanın mobil görünümünü istemişse, dokunmadığı diğer sayfaları veya component'leri proaktif "responsive'e çevirme" — CLAUDE.md'deki genel kural burada da geçerli.
- **FSD katman kurallarını boz­ma.** Responsive fix bir yeniden mimarileme değil; component'i taşıma, yeni layer icat etme — sadece class/markup düzelt. Gerçekten yeni bir paylaşılan component gerekiyorsa (örn. tekrar eden bir mobil kart pattern'i üçüncü kez yazılıyorsa) design-system skill'indeki extraction kuralına göre `shared/ui`'a çıkar.
- **Tailwind class'larını satır içi tut**, ayrı bir CSS dosyasına media query yazma — proje zaten utility-first.

## 6. Doğrulama (dev server ÇALIŞTIRMA)

Bu projede dev server başlatmak yasak (kullanıcı talimatı — sandbox/izin sorunları var). Bu yüzden görsel doğrulamayı **statik olarak** yap:

1. Değişikliği yaptıktan sonra dosyayı tekrar oku, her breakpoint için zihinde satırı çalıştır: en dar (0px) → `sm` → `md` → `lg` sırayla, her adımda taşma/üst-üste binme ihtimali kalmadığından emin ol.
2. `grep -rn "w-\[" <dosya>` ile kalan sabit genişlikleri son bir kez tara.
3. TypeScript/lint hatası olmadığından emin olmak için gerekiyorsa `npx tsc --noEmit` veya `npm run lint` çalıştırabilirsin (bunlar dev server değil, derleme kontrolü — yasak değil).
4. Kullanıcıya net söyle: "Dev server başlatamadığım için görsel doğrulamayı statik kod incelemesiyle yaptım — cihazında/tarayıcında hızlıca kontrol edip söyle, hâlâ taşan bir yer varsa ekran görüntüsüyle belirt."

Kullanıcı ayrıca kendi ortamında (Vercel preview, zaten açık bir `npm run dev`, vb.) bir link/ekran görüntüsü paylaşırsa, o zaman gerçek görsel geri bildirimle iterasyon yap.
