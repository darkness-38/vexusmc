import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding işlemi başlıyor...");

  // Veritabanını temizlemek istersen bu yorum satırlarını kaldırabilirsin:
  // await prisma.order.deleteMany();
  // await prisma.transaction.deleteMany();
  // await prisma.penalty.deleteMany();
  // await prisma.leaderboardEntry.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.user.deleteMany();

  // Örnek Ürün Ekleme:
  // await prisma.product.create({
  //   data: {
  //     name: "Örnek VIP",
  //     description: "Örnek VIP üyeliği.",
  //     price: 50,
  //     category: "rank",
  //     icon: "👑",
  //     order: 1
  //   }
  // });

  console.log("Seeding tamamlandı.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

