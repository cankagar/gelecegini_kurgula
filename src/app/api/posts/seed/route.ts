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
          passwordHash: "$2b$10$t577zUq4RpeM4tU9Gge2oee3MspF7XJv99.k6Gf1XjC3Z/0CDeY3S", // "123456"
          role: "TEACHER",
          name: "Dr. Ahmet Yılmaz",
        },
      });
      await prisma.profile.create({
        data: {
          userId: teacher.id,
          fullName: "Dr. Ahmet Yılmaz",
          bio: "STEM ve Robotik Eğitmeni",
        }
      });
    }

    // 2. Create Student & Engineer Users for commenting
    let student = await prisma.user.findUnique({ where: { email: "ogrenci@payastem.com" } });
    if (!student) {
      student = await prisma.user.create({
        data: {
          email: "ogrenci@payastem.com",
          username: "ogrenci",
          passwordHash: "$2b$10$t577zUq4RpeM4tU9Gge2oee3MspF7XJv99.k6Gf1XjC3Z/0CDeY3S",
          role: "STUDENT",
          name: "Buse Demir",
        },
      });
      await prisma.profile.create({
        data: {
          userId: student.id,
          fullName: "Buse Demir",
          schoolLevel: "Ortaokul STEM",
        }
      });
    }

    let engineer = await prisma.user.findUnique({ where: { email: "muhendis@payastem.com" } });
    if (!engineer) {
      engineer = await prisma.user.create({
        data: {
          email: "muhendis@payastem.com",
          username: "muhendis_can",
          passwordHash: "$2b$10$t577zUq4RpeM4tU9Gge2oee3MspF7XJv99.k6Gf1XjC3Z/0CDeY3S",
          role: "STUDENT", // Standard role for guest/engineers
          name: "Can Tekin",
        },
      });
      await prisma.profile.create({
        data: {
          userId: engineer.id,
          fullName: "Can Tekin",
          bio: "Yazılım Mühendisi & STEM Meraklısı",
        }
      });
    }

    // 3. Clear existing posts and comments to avoid duplicates
    await prisma.comment.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.post.deleteMany({});

    // 4. Create Post 1
    const post1 = await prisma.post.create({
      data: {
        title: "Yapay Zeka ve Eğitimde Yeni Dönem",
        content: "Yapay zekanın eğitimdeki rolünü nasıl değerlendiriyorsunuz? ChatGPT, Gemini gibi araçlar öğrencilerin araştırma yeteneklerini köreltiyor mu yoksa onları geleceğin teknoloji liderleri olmaya mı hazırlıyor? Bence doğru yönlendirmeyle bir asistan olarak kullanılması harika sonuçlar veriyor.",
        tags: "Yapay Zeka,Eğitim Teknolojileri",
        authorId: teacher.id,
      }
    });

    // Add comments for Post 1
    await prisma.comment.create({
      data: {
        content: "Kesinlikle katılıyorum hocam. Ben projelerimde kod yazarken algoritma mantığını anlamak için yapay zekadan yararlanıyorum, çok hızlandırıyor.",
        postId: post1.id,
        authorId: engineer.id,
      }
    });

    await prisma.comment.create({
      data: {
        content: "Bence ödevlerimizi yapay zekaya yaptırmadığımız sürece, sadece fikir almak için kullandığımızda öğrenmeyi çok daha eğlenceli hale getiriyor.",
        postId: post1.id,
        authorId: student.id,
      }
    });

    // 5. Create Post 2
    const post2 = await prisma.post.create({
      data: {
        title: "Evde Yapılabilecek Basit Model Uydu Çalışmaları",
        content: "Amatör uydu yapımı ve uzay bilimleri sandığımız kadar uzak değil. ESP32 kontrolcüleri, basit barometre ve ivmeölçerler kullanarak 3D yazıcıdan bastığımız gövdelerle mini model uydular tasarlayabiliriz. Bu konuda Teknofest Model Uydu yarışmasını incelemenizi öneririm. Detaylı kaynakları yakında paylaşacağım.",
        tags: "Uzay,Mühendislik,ESP32",
        authorId: teacher.id,
      }
    });

    // Add comments for Post 2
    await prisma.comment.create({
      data: {
        content: "Hocam model uydu tasarımı için hangi 3D modelleme programını önerirsiniz? Tinkercad yeterli olur mu yoksa Fusion 360 mı öğrenmeliyiz?",
        postId: post2.id,
        authorId: student.id,
      }
    });

    await prisma.comment.create({
      data: {
        content: "Tinkercad başlangıç için harika ama montaj ve aerodinamik detaylar için Fusion 360 öğrenmek lise ve üniversite düzeyinde çok işe yarayacaktır Buse.",
        postId: post2.id,
        authorId: engineer.id,
      }
    });

    return NextResponse.json({
      success: true,
      message: "Serbest Kürsü posts and comments seeded successfully!",
    });
  } catch (error: any) {
    console.error("Posts Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
