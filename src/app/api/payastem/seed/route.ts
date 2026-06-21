import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Create or Find Teacher User
    let teacher = await prisma.user.findFirst({
      where: { role: "TEACHER" },
    });

    if (!teacher) {
      teacher = await prisma.user.create({
        data: {
          email: "ogretmen@payastem.com",
          username: "ogretmen",
          passwordHash: "$2b$10$t577zUq4RpeM4tU9Gge2oee3MspF7XJv99.k6Gf1XjC3Z/0CDeY3S", // "123456" hashed
          role: "TEACHER",
          name: "Dr. Ahmet Yılmaz",
        },
      });
      
      // Also create a profile
      await prisma.profile.create({
        data: {
          userId: teacher.id,
          fullName: "Dr. Ahmet Yılmaz",
          bio: "STEM ve Robotik Eğitmeni",
        }
      });
    }

    // 2. Seed Class Levels
    const levels = [
      { id: "junior-stem", name: "Junior STEM", description: "Okul öncesi ve ilkokul 1-2. sınıflar için eğlenceli bilim ve el becerisi etkinlikleri." },
      { id: "ilkokul-stem", name: "İlkokul STEM", description: "İlkokul 3-4. sınıflar için temel algoritma, basit devreler ve çevre bilimleri." },
      { id: "ortaokul-stem", name: "Ortaokul STEM", description: "Ortaokul düzeyindeki öğrenciler için robotik kodlama, 3D tasarım ve bilimsel projeler." },
      { id: "lise-stem", name: "Lise STEM", description: "Lise öğrencileri için ileri düzey yapay zeka, mühendislik çözümleri ve ulusal yarışma hazırlıkları." },
    ];

    for (const lvl of levels) {
      await prisma.classLevel.upsert({
        where: { id: lvl.id },
        update: { name: lvl.name, description: lvl.description },
        create: { id: lvl.id, name: lvl.name, description: lvl.description },
      });
    }

    // 3. Clear existing content to prevent duplicates (optional, for seeding clean state)
    await prisma.announcement.deleteMany({ where: { classLevelId: { in: levels.map(l => l.id) } } });
    await prisma.assignment.deleteMany({ where: { classLevelId: { in: levels.map(l => l.id) } } });
    await prisma.resource.deleteMany({ where: { classLevelId: { in: levels.map(l => l.id) } } });

    // 4. Seed level specific content
    // Junior STEM
    await prisma.announcement.create({
      data: {
        title: "Hoş Geldiniz Minik Kaşifler!",
        content: "Junior STEM macera dolu bir yıla başlıyor. Bu hafta basit makineleri tanıyacağız. Evdeki malzemelerle harika şeyler tasarlamaya hazır mısınız?",
        classLevelId: "junior-stem",
        authorId: teacher.id,
      }
    });
    await prisma.assignment.create({
      data: {
        title: "Kaldıraç ve Denge Deneyi",
        description: "Evdeki bir cetvel ve silgiyi kullanarak kendi kaldıracınızı kurun. Farklı ağırlıktaki nesneleri dengelemeye çalışın ve fotoğrafını bizimle paylaşın!",
        classLevelId: "junior-stem",
        teacherId: teacher.id,
        creditReward: 30,
      }
    });
    await prisma.resource.create({
      data: {
        title: "Basit Makineler Eğlenceli Çizgi Filmi",
        description: "Makinelerin nasıl çalıştığını anlatan kısa animasyon video.",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=kGo4yKwfGgM",
        classLevelId: "junior-stem",
      }
    });
    await prisma.resource.create({
      data: {
        title: "Kaldıraç Şablonu Boyama Sayfası (PDF)",
        description: "Evde çıktı alıp boyayabileceğiniz basit kaldıraç şemaları.",
        type: "PDF",
        url: "/docs/junior_stem_makineler.pdf",
        classLevelId: "junior-stem",
      }
    });

    // İlkokul STEM
    await prisma.announcement.create({
      data: {
        title: "Geri Dönüşüm Projesi Başlıyor!",
        content: "Çevremizi korumak için teknolojiyi nasıl kullanabiliriz? Bu ay sıfır atık ve geri dönüşüm odaklı akıllı sistemler üzerinde çalışacağız.",
        classLevelId: "ilkokul-stem",
        authorId: teacher.id,
      }
    });
    await prisma.assignment.create({
      data: {
        title: "Atık Malzemelerden Akıllı Çöp Kutusu Tasarımı",
        description: "Karton kutu ve evdeki pet şişeleri kullanarak geri dönüşüm kutusu yapın. Kutunun üzerine hangi atıkların nereye atılacağını gösteren bir kılavuz hazırlayın.",
        classLevelId: "ilkokul-stem",
        teacherId: teacher.id,
        creditReward: 40,
      }
    });
    await prisma.resource.create({
      data: {
        title: "Çevre ve Geri Dönüşüm Temelleri Videosu",
        description: "Geri dönüşümün doğaya etkileri ve akıllı şehirler hakkında anlatım.",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=Yy42h99B5Q0",
        classLevelId: "ilkokul-stem",
      }
    });
    await prisma.resource.create({
      data: {
        title: "Akıllı Çöp Kutusu Tasarım Kılavuzu (PDF)",
        description: "Adım adım tasarım adımları ve ipuçları içeren PDF dokümanı.",
        type: "PDF",
        url: "/docs/akilli_cop_kutusu.pdf",
        classLevelId: "ilkokul-stem",
      }
    });

    // Ortaokul STEM
    await prisma.announcement.create({
      data: {
        title: "Tinkercad ile 3D Tasarım Dersleri",
        content: "Bu hafta Tinkercad platformunu kullanarak kendi 3D modellerimizi oluşturacağız. Gelecek ders 3D yazıcıdan baskı alacağız!",
        classLevelId: "ortaokul-stem",
        authorId: teacher.id,
      }
    });
    await prisma.assignment.create({
      data: {
        title: "Kendi Anahtarlığını Tasarla ve Kodla",
        description: "Tinkercad üzerinde isminin yazılı olduğu özgün bir anahtarlık modeli tasarla ve modelin linkini ödev teslim alanına ekle.",
        classLevelId: "ortaokul-stem",
        teacherId: teacher.id,
        creditReward: 50,
      }
    });
    await prisma.resource.create({
      data: {
        title: "Tinkercad Sıfırdan Başlangıç Eğitim Videosu",
        description: "3D modelleme arayüzü ve temel geometrik şekillerle çalışma kılavuzu.",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=3V94jVdYJsw",
        classLevelId: "ortaokul-stem",
      }
    });
    await prisma.resource.create({
      data: {
        title: "3D Baskı Kuralları ve Dikkat Edilecekler (PDF)",
        description: "3D baskıda hata yapmamak için dikkat etmeniz gereken parametreler.",
        type: "PDF",
        url: "/docs/tinkercad_3d_baski.pdf",
        classLevelId: "ortaokul-stem",
      }
    });

    // Lise STEM
    await prisma.announcement.create({
      data: {
        title: "TEKNOFEST Yarışmaları Başvuruları!",
        content: "Yarışma takımları kurulmaya başladı. İHA, İnsansız Kara Aracı ve Akıllı Ulaşım kategorilerinde yarışmak isteyenlerin bu hafta öğretmenleriyle iletişime geçmesi rica olunur.",
        classLevelId: "lise-stem",
        authorId: teacher.id,
      }
    });
    await prisma.assignment.create({
      data: {
        title: "Python ile Basit Görüntü İşleme Projesi",
        description: "OpenCV kütüphanesini kullanarak kameradan alınan görüntüde kırmızı renkli nesneleri tespit eden bir Python betiği yazın ve kodlarınızı GitHub'a yükleyerek link atın.",
        classLevelId: "lise-stem",
        teacherId: teacher.id,
        creditReward: 80,
      }
    });
    await prisma.resource.create({
      data: {
        title: "OpenCV ile Renk Tespiti ve Takibi Dersi",
        description: "Python kullanarak gerçek zamanlı nesne tespiti video eğitimi.",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=mC94o7G6wJ8",
        classLevelId: "lise-stem",
      }
    });
    await prisma.resource.create({
      data: {
        title: "Python OpenCV Proje Dokümanı (PDF)",
        description: "Gerekli kütüphanelerin kurulumu ve temel OpenCV komutları el kitapçığı.",
        type: "PDF",
        url: "/docs/opencv_baslangic.pdf",
        classLevelId: "lise-stem",
      }
    });

    return NextResponse.json({
      success: true,
      message: "PayaSTEM database seeded successfully!",
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
