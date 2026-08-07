---
name: design-system
description: Enforces PayaSTEM's design system (color tokens + component patterns extracted from auth and dashboard). Use for ANY new UI or UI edit in this project — buttons, cards, tables, forms, badges, sidebars, page shells.
---

# PayaSTEM Design System

## Renk token'ları

Tek kaynak: `src/app/globals.css` (`@theme`). Yeni UI'da **sadece bu token'ları** kullan — hardcoded hex yasak. Token isimleri kendini açıklıyor (`bg-bg`, `bg-surface`, `border-border`, `text-text`/`text-text-muted`, `bg-primary`/`primary-hover`/`primary-tint`, `text-accent`, `bg-success`/`success-bg`, `bg-danger`/`danger-bg`). Dosyayı aç, mevcut değerlere bak.

Mevcut dashboard kodunda hâlâ hardcoded hex kalmış olabilir (teknik borç) — kopyalama, gördüğün yerde en yakın token'a çevir.

## Önce shared/ui'a bak

Yeni bir UI parçası (kart, tablo, rozet, form alanı, buton...) yazmadan önce sırayla bak: önce `src/shared/ui/` altına (arama input'u, geri dön linki, ikon+daire rozet, avatar, ikon seti, vb. muhtemelen zaten var), sonra ilgili sayfanın kardeşi olan diğer `views/*` dosyalarına (aynı ihtiyaç orada zaten çözülmüş olabilir). İkisinde de yoksa sıfırdan yaz. Sıfırdan yazmak yerine var olanı kullan/genişlet — yoksa ve genel kullanım ihtimali varsa `shared/ui/<isim>/` altında yeni bir component olarak ekle (bkz. `AGENTS.md` — FSD public API kuralı: `index.ts` barrel).

Genel ikon ihtiyacı `lucide-react`'tan karşılanır (proje bağımlılığı). Proje-özel/illüstratif custom ikonlar `shared/ui/icons` altında.

## Tekrar eden UI = çıkar (extraction kuralı)

Bir view içinde yazdığın bir JSX bloğu (tablo satırı, rozet, kart, form alanı grubu...) başka bir `views/*` dosyasında da aynı veya çok benzer şekilde varsa, ya da üçüncü kez yazılıyorsa — kopyalama, `shared/ui/<isim>/` altına kendi component'i olarak çıkar. Bu proje içinde zaten doğru yapılmış bir örneği var: `widgets/auth-shell/ui/AuthShell.tsx` içindeki `AuthFieldLabel`, `AuthFormError`, `AuthFormSuccess`, `AuthSubmitButton` — hepsi küçük, tek işi yapan, props ile varyasyona açık, tekrar kullanılabilir parçalar. Yeni bir UI parçası yazarken bu örnekteki gibi düşün: parçayı küçük tut, tek sorumluluk ver, `className`/prop ile varyasyona aç.

Dashboard tarafında bu eksik — `views/dashboard-*` dosyalarında tablo/rozet markup'ı birden fazla yerde elle kopyalanmış durumda. Bunu görürsen ve dokunduğun kod bu tekrara giriyorsa, çıkarma zamanı gelmiştir. Hangi component'i ne zaman çıkaracağına dair sabit bir liste yok — kaç yerde tekrarlandığına ve prop farkının ne kadar küçük olduğuna göre karar ver.

## Sayfa kabuğu

- Dashboard sayfaları (`views/dashboard-*`) full-width: `w-full px-8 py-10 lg:px-12` — `mx-auto`/`max-w-*` ile ortalama, sidebar zaten yanda.
- Auth sayfaları `widgets/auth-shell` (`AuthShell`) kullanır — dashboard'dan tamamen farklı bir kabuk: ortalanmış, genişliği sınırlı (`max-w-[1240px] mx-auto`), iki panelli (sol tanıtım metni, sağ form kartı). Yeni bir auth sayfası eklerken bu kabuğu kullan, dashboard kabuğunu değil — ikisi birbirinin yerine geçmez.
- Tipografi: başlıklar `font-heading` + `font-bold` + negatif `tracking`; gövde `text-text-muted`.

## Kartlar: border değil, katmanlı bg kullan

Sınıf tekrar `border border-border` kutu içine kutu (nested border) koyma. Bunun yerine iki bg tonu ile katman ayrımı yap:

- Sayfa bg'si (`bg-bg`/gövde) üstünde bir bölüm/kart: `rounded-2xl bg-surface/50` (border yok).
- O kartın içindeki satır/alt-öğe (liste satırı, ödev kartı, davet satırı): `rounded-xl` / `rounded-2xl` `bg-bg` — daha açık ton, kart zeminden ayrışır ama çizgiyle değil, renkle ayrışır.
- Header, tab alanı, form bölümü gibi eş seviyedeki bloklar birbirinden `gap-6` ile ayrılan bağımsız `bg-surface/50` kartlardır — hepsini tek bir dış `border` kutusuna sarmıyoruz.
- Sekme/tab seçici: `border-b-2` altı çizili tab değil, `bg-surface/50` zemin üstünde `rounded-full` pill butonlar; aktif olan `bg-bg text-text`, pasif `text-text-muted`.
- İstisna: gerçekten geçici/floating bir öğe (arama dropdown'u, popover) sayfa üstünde yüzüyorsa orada `border-border` + `shadow-sm` kullanılabilir — o an bir "kart üstü kart" değil, bağımsız bir overlay.

Referans örnek: `widgets/classroom-detail/ui/ClassroomDetailShell.tsx` ve `views/dashboard-admin-classroom-edit/ui/DashboardAdminClassroomEditView.tsx` — sınıf detay/düzenle sayfaları bu pattern'e göre yeniden yazıldı, yeni kart/liste yazarken oradaki yapıyı taklit et.

## Kurallar

1. Renk/spacing/radius için sıfırdan karar vermeden önce `globals.css` + `shared/ui` + bu sayfanın kardeşi olan başka bir `views/dashboard-*` (veya auth sayfasıysa `widgets/auth-shell`) dosyasına bak, oradaki pattern'i tekrar kullan.
2. Aynı/benzer JSX bloğu ikinci-üçüncü kez yazılıyorsa kopyalama — yukarıdaki extraction kuralına göre `shared/ui`'a çıkar.
3. Hardcoded hex ekleme. İhtiyaç olan renk yoksa önce `globals.css`'e token ekle.
4. FSD katman kuralları (`AGENTS.md`) geçerli — bu skill sadece görsel tutarlılığı kapsar.
5. Mevcut, dokunmadığın kodu kullanıcı istemeden proaktif refactor etme — extraction kuralı (madde 2) yalnızca **yeni yazılan/değiştirilen** koda uygulanır. Eski bir sayfadaki tekrarı görüp çıkarmak istersen önce kullanıcıya sor.
6. Kart/bölüm ayrımı için `border` iç içe kutu yapma — yukarıdaki "Kartlar: border değil, katmanlı bg kullan" bölümündeki `bg-surface/50` + `bg-bg` katman pattern'ini kullan.
