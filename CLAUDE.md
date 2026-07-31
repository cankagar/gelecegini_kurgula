@AGENTS.md

Asla over engineering yapma, senden istenilen yapıyı en profesyonel çalışan şekile getir, üzerine kullanıcı talep etmedikçe eklemeler yapma. Yazdığın bu yapıları da clean code ile yaz. Ölçeklenebilri bir proje yapıyoruz burada. WEb projesinin temel bilgileri zaten @AGENTS.md dosyasında yazıyor(/gelecegini_kurgula/AGENTS.md) buradaki FSD mimarisine sadık kal ve react component yapısına uygun şekilde yapılarımı da yönet. ortak bir standart yapıda ilerlemeliyiz

# API istekleri

Backend'e atılan her istek **TanStack Query** (`@tanstack/react-query`) üzerinden yapılmalı — `useQuery`/`useMutation` dışında elle `useEffect` + `useState` ile fetch/cache yazma. Provider zaten root layout'ta kurulu: `src/app/query-provider.tsx` (`QueryProvider`). Her query kendi `staleTime`'ını kendi tanımlar (global default yok, veri değişme sıklığına göre query bazında ayarlanır). Örnek: `src/entities/user/lib/useCurrentUserQuery.ts`.

# Route yönetimi

Tüm sayfa path'leri **tek kaynaktan**: `src/shared/lib/routes.ts` (`ROUTES` objesi). Yeni bir route/sayfa eklerken:

1. Path'i önce `ROUTES` içine ekle (statik path string, dinamik path ise `(id: string) => ...` fonksiyonu).
2. Yönlendirme yapılan her yerde (`router.push`, `<Link href>`, `redirect`) path'i elle yazma (`"/dashboard/admin/users/123"` ❌) — `ROUTES.ADMIN.CLASSROOM_DETAIL(id)` gibi `ROUTES` üzerinden kullan.
3. `ROUTES` grupları rol bazlı (`ADMIN`, `TEACHER`, `STUDENT`) — yeni route'u ilgili rol grubuna ekle, yoksa yeni grup aç.
4. Aynı domain modeli her rolde **aynı isimle** geçsin (örn. `classrooms` — `teacher/classes` gibi farklı isim ❌). İsim tutarsızlığı klasör/route/tip isimlerine sızar ve karışıklık yaratır.

# Rol bazlı (admin/teacher/student) sayfa tekrarı

`(admin)`, `(teacher)`, `(student)` route group'ları rol bazlı ayrım için doğru pattern — bunu değiştirme. Ama her rolün aynı domain için ayrı `page.tsx`'i olması, aynı JSX/logic'in (tab yapısı, liste, rol etiketleri, tarih formatlama) üç yerde elle tekrar yazılmasına yol açmamalı:

- Ortak görünüm/JSX → `widgets/<domain>-detail` gibi bir widget'a çıkar (örn. `widgets/classroom-detail`). Role özel kısımlar (aksiyon butonları, formlar) `ReactNode` prop/slot olarak dışarıdan geçilir; widget içine `if (role === ...)` yazma.
- Her `views/dashboard-<role>-...` dosyası ince kalır: veri çeker (`entities/*` query hook'u), widget'ı render eder, sadece role'e özel slot'ları doldurur.
- Tekrarlayan küçük yardımcılar (`formatDate`, `ROLE_LABELS` gibi) ait olduğu layer'a taşınır: generic date/format yardımcıları `shared/lib/`, domain'e ait sabitler (`ROLE_LABELS` gibi) ilgili `entities/<slice>` altına. Bir view içinde ikinci kez yazılan bir sabit/fonksiyon görürsen, kopyalama — mevcut olanı import et.
- `entities` katmanında slice'lar birbirini import edemez (örn. `entities/classroom` → `entities/user` yasak) — ortak noktaları `widgets` katmanında birleştir, çünkü widget her iki entity'den de aşağı yönlü import edebilir.