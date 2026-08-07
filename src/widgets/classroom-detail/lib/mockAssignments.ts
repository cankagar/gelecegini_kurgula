import type { Assignment } from "../model/types";

// Ödev arayüzünün dolu haliyle nasıl göründüğünü göstermek için 3 örnek ödev.
export function createMockAssignments(): Assignment[] {
  const now = Date.now();

  return [
    {
      id: "mock-1",
      title: "Hücre Bölünmesi Raporu",
      description:
        "Mitoz ve mayoz evrelerini karşılaştıran ayrıntılı bir rapor hazırlayın. Raporda her iki bölünme türünün profaz, metafaz, anafaz ve telofaz evrelerini adım adım açıklayın, kromozom sayısındaki değişimi bir tablo ile gösterin ve mayozun canlılarda genetik çeşitliliğe nasıl katkı sağladığını en az iki örnekle destekleyin.\n\n" +
        "Ayrıca mitozun büyüme ve doku onarımındaki rolünü, mayozun ise üreme hücrelerinin oluşumundaki rolünü karşılaştırmalı olarak ele alın; hücre bölünmesi sırasında oluşabilecek hatalar (örneğin kromozom ayrılmama - nondisjunction) sonucunda ortaya çıkabilecek durumlara, bunların Down sendromu gibi genetik durumlarla ilişkisine kısaca değinin.\n\n" +
        "Raporun giriş bölümünde hücre döngüsünün genel aşamalarını (interfaz, G1-S-G2, M fazı) kısaca özetleyin. Gövde bölümünde mitoz ve mayozu evre evre karşılaştırırken her evrede kromozomların, iğ ipliklerinin ve hücre zarının durumunu ayrı ayrı belirtin; mayozda krossing-over (gen değiş tokuşu) olayının genetik çeşitliliğe katkısını mutlaka bir şema ile gösterin.\n\n" +
        "Sonuç bölümünde canlılarda üreme ve büyüme için neden iki farklı bölünme mekanizmasına ihtiyaç duyulduğunu kendi cümlelerinizle özetleyin. Rapor en az iki sayfa olmalı, en az bir el çizimi veya bilgisayar görseliyle desteklenmeli, APA formatında bir kaynakça eklenmeli ve teslimden önce yazım/dil bilgisi kontrolünden geçirilmelidir.",
      dueDate: new Date(now + 3 * 86_400_000).toISOString(),
    },
    {
      id: "mock-2",
      title: "Basit Devre Deneyi",
      description:
        "Seri ve paralel devrelerin gerilim-akım ilişkisini ölçüp tabloya işleyin. Deney setinde verilen dirençleri önce seri, sonra paralel bağlayarak her iki durumda da toplam direnci, devreden geçen akımı ve her direnç üzerindeki gerilim düşümünü multimetre ile ölçün.\n\n" +
        "Ölçüm sonuçlarını Ohm Kanunu (V = I × R) ile hesapladığınız teorik değerlerle karşılaştırıp aradaki yüzde farkı hesaplayın; farkın kaynağını (kablo direnci, multimetre iç direnci, ölçüm hassasiyeti gibi) tartışan bir hata analizi paragrafı yazın. En az üç farklı direnç kombinasyonu deneyip sonuçları ayrı ayrı tablolaştırın.\n\n" +
        "Deney sırasında kullandığınız devre şemasını elle çizip fotoğraflayın veya bir devre simülasyon programıyla çizip ekran görüntüsü alın. Her ölçüm adımında hangi güvenlik önlemlerini aldığınızı (devreyi kapatmadan önce gücü kesme, doğru multimetre kademesini seçme, ellerin kuru olması gibi) madde madde belirtin.\n\n" +
        "Son olarak seri ve paralel bağlantının günlük hayattaki kullanım örnekleriyle (ev tesisatındaki paralel bağlı prizler, tatil lambalarının eski tip seri bağlantısı, araç far sistemleri gibi) ilişkisini tartışan, neden bazı sistemlerde seri bazılarında paralel bağlantının tercih edildiğini açıklayan bir sonuç bölümü ekleyin. Raporu deney föyündeki şablona uygun şekilde teslim edin.",
      dueDate: new Date(now + 1 * 86_400_000).toISOString(),
    },
    {
      id: "mock-3",
      title: "Döngülerle Toplam Hesabı",
      description:
        "for ve while döngüleriyle 1'den 100'e kadar sayıların toplamını bulan bir program yazın. Aynı problemi hem for hem de while döngüsü kullanarak iki ayrı şekilde çözün ve iki yaklaşımın okunabilirlik açısından farkını bir yorum satırında kısaca değerlendirin.\n\n" +
        "Ardından sadece çift sayıların toplamını ve sadece tek sayıların toplamını hesaplayan iki ek fonksiyon daha yazın; bu fonksiyonların parametre olarak alt ve üst sınırı alacak şekilde genel amaçlı (yeniden kullanılabilir) tasarlanmasına dikkat edin, sabit değerleri fonksiyon içine gömmeyin.\n\n" +
        "Son olarak kullanıcıdan bir üst sınır (100 yerine) girmesini isteyen ve bu sınıra kadar olan sayıların toplamını, ortalamasını ve en büyük asal sayısını da hesaplayıp ekrana yazdıran bir bonus fonksiyon yazmayı deneyin; asal sayı kontrolü için ayrı bir yardımcı fonksiyon yazmanız beklenmektedir.\n\n" +
        "Kodun her adımını açıklayan yorum satırları bırakmayı unutmayın, değişken isimlerini anlamlı seçin (i, j gibi tek harfli isimler yerine toplam, sayac gibi) ve çalışan kodun terminal çıktısının ekran görüntüsünü de teslime ekleyin.",
      dueDate: new Date(now - 2 * 86_400_000).toISOString(),
    },
  ];
}
