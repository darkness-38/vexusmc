# VexusMC Web

Next.js 14 + TypeScript tabanli, tamamen Turkce VexusMC web sitesi.

## Teknolojiler
- Next.js 14 (App Router)
- Tailwind CSS v3 + Framer Motion
- NextAuth v5 (Credentials)
- Prisma + SQLite
- Zustand, React Hook Form, Zod, Sonner

## Kurulum
```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

## Test Kullanici Bilgileri
- `testoyuncu / test123`
- `vipuser / vip123`
- `mvpuser / mvp123`

## Notlar
- Korunan rotalar: `/hesabim/*`, `/bakiye-yukle`
- Minotar avatar endpointleri kullanilir.

## Smoke Test Checklist
- [ ] Bagimliliklar ve Prisma adimlari tamamlandi
- [ ] Uygulama lint/build adimlarini hatasiz geciyor
- [ ] Ana sayfa, magaza, liderlik ve iletisim sayfalari aciliyor
- [ ] Giris akisi calisiyor (`testoyuncu / test123`)
- [ ] Korumali rota yonlendirmesi dogru (`/hesabim` -> `/giris`)
- [ ] API endpointleri 200 donuyor

```powershell
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run lint
npm run build
```

```powershell
npm run dev
```

Tek komut smoke test:

```powershell
npm run smoke
```

Kontrol URL'leri:
- `http://localhost:3000/`
- `http://localhost:3000/magaza`
- `http://localhost:3000/liderlik`
- `http://localhost:3000/iletisim`
- `http://localhost:3000/api/liderlik?mode=genel`
- `http://localhost:3000/api/magaza/urunler`
