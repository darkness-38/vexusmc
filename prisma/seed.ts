import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.penalty.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const [testPass, vipPass, mvpPass] = await Promise.all([
    bcrypt.hash("test123", 10),
    bcrypt.hash("vip123", 10),
    bcrypt.hash("mvp123", 10),
  ]);

  const [testUser, vipUser, mvpUser] = await Promise.all([
    prisma.user.create({
      data: {
        username: "testoyuncu",
        password: testPass,
        email: "test@vexusmc.tech",
        balance: 250,
        rank: "Oyuncu",
      },
    }),
    prisma.user.create({
      data: {
        username: "vipuser",
        password: vipPass,
        email: "vip@vexusmc.tech",
        balance: 1200,
        rank: "VIP+",
      },
    }),
    prisma.user.create({
      data: {
        username: "mvpuser",
        password: mvpPass,
        email: "mvp@vexusmc.tech",
        balance: 3200,
        rank: "MVP",
      },
    }),
  ]);

  const products = await Promise.all([
    prisma.product.create({ data: { name: "VIP", description: "Renkli nick ve özel prefix.", price: 29, category: "rank", icon: "👑", featured: false, order: 1 } }),
    prisma.product.create({ data: { name: "VIP+", description: "Lobby fly ve öncelikli giriş.", price: 59, category: "rank", icon: "✨", featured: true, order: 2 } }),
    prisma.product.create({ data: { name: "MVP", description: "En güçlü rank ayrıcalıkları.", price: 99, category: "rank", icon: "💎", featured: true, order: 3 } }),
    prisma.product.create({ data: { name: "Savaş Kılıcı", description: "+7 hasar bonuslu özel item.", vcPrice: 250, price: 49, category: "item", icon: "⚔️", order: 4 } }),
    prisma.product.create({ data: { name: "Koruma Zırhı", description: "PvP için dayanıklı ekipman.", vcPrice: 300, price: 55, category: "item", icon: "🛡️", order: 5 } }),
    prisma.product.create({ data: { name: "Kasa Anahtarı x5", description: "Nadir ödül şansı.", vcPrice: 150, price: 25, category: "item", icon: "🗝️", order: 6 } }),
    prisma.product.create({ data: { name: "Spawner Paketi", description: "Ekonomine ivme katar.", vcPrice: 500, price: 79, category: "item", icon: "📦", order: 7 } }),
    prisma.product.create({ data: { name: "XP Boost 2x", description: "1 saat boyunca 2x XP.", vcPrice: 100, price: 19, category: "boost", icon: "⚡", order: 8 } }),
    prisma.product.create({ data: { name: "Coin Boost 3x", description: "30 dakika boyunca 3x coin.", vcPrice: 180, price: 29, category: "boost", icon: "💰", order: 9 } }),
    prisma.product.create({ data: { name: "Parti Boost", description: "Takımınla bonus kazan.", vcPrice: 220, price: 35, category: "boost", icon: "🎉", order: 10 } }),
  ]);

  await Promise.all([
    prisma.order.create({
      data: {
        userId: testUser.id,
        productId: products[0].id,
        amount: 29,
        status: "tamamlandi",
      },
    }),
    prisma.order.create({
      data: {
        userId: vipUser.id,
        productId: products[7].id,
        amount: 19,
        status: "tamamlandi",
      },
    }),
    prisma.transaction.create({
      data: {
        userId: testUser.id,
        type: "yukleme",
        amount: 50,
        vcAmount: 250,
        method: "papara",
        status: "tamamlandi",
      },
    }),
    prisma.transaction.create({
      data: {
        userId: vipUser.id,
        type: "harcama",
        amount: 29,
        vcAmount: 150,
        method: "vc",
        status: "tamamlandi",
      },
    }),
  ]);

  await prisma.penalty.create({
    data: {
      userId: mvpUser.id,
      username: "mvpuser",
      type: "mute",
      reason: "Sohbet spamı",
      duration: "1 gün",
      isActive: true,
    },
  });

  const boardData = [
    { username: "SkyLord", gameMode: "survival", score: 12540, rank: "MVP" },
    { username: "AdaUstasi", gameMode: "skyblock", score: 11820, rank: "VIP+" },
    { username: "BedKral", gameMode: "bedwars", score: 10910, rank: "VIP" },
    { username: "PvPCanavar", gameMode: "kitpvp", score: 9860, rank: "MVP" },
    { username: "VexusLegend", gameMode: "genel", score: 14120, rank: "MVP" },
  ];

  await prisma.leaderboardEntry.createMany({ data: boardData });

  console.log("Seed tamamlandi.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

