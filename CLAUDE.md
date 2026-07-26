@AGENTS.md

Asla over engineering yapma, senden istenilen yapıyı en profesyonel çalışan şekile getir, üzerine kullanıcı talep etmedikçe eklemeler yapma. Yazdığın bu yapıları da clean code ile yaz. Ölçeklenebilri bir proje yapıyoruz burada. WEb projesinin temel bilgileri zaten @AGENTS.md dosyasında yazıyor(/gelecegini_kurgula/AGENTS.md) buradaki FSD mimarisine sadık kal ve react component yapısına uygun şekilde yapılarımı da yönet. ortak bir standart yapıda ilerlemeliyiz

# API istekleri

Backend'e atılan her istek **TanStack Query** (`@tanstack/react-query`) üzerinden yapılmalı — `useQuery`/`useMutation` dışında elle `useEffect` + `useState` ile fetch/cache yazma. Provider zaten root layout'ta kurulu: `src/app/query-provider.tsx` (`QueryProvider`). Her query kendi `staleTime`'ını kendi tanımlar (global default yok, veri değişme sıklığına göre query bazında ayarlanır). Örnek: `src/entities/user/lib/useCurrentUserQuery.ts`.