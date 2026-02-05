# CMS Backend MVP (Auth + Security)

## Gereksinimler
- Node.js 18+
- Postgres (Vercel Postgres)

## Kurulum
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

## Ortam Degiskenleri
```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET_KEY="super-secret"
DEFAULT_ADMIN_EMAIL="admin@company.com"
DEFAULT_ADMIN_NAME="Super Admin"
DEFAULT_SITE_NAME="Default Site"
DEFAULT_DEPARTMENT_NAME="General"

# Opsiyonel (legacy /api/login icin)
DEFAULT_ADMIN_EMAIL="admin@company.com"
```

## Ilk Admin Kullanici
Seed ile otomatik olusur:
```bash
npx prisma db seed
```
Komut sonunda gecici sifre terminale yazilir.

## Endpointler
### Auth
- `POST /api/auth/login` (email, password, device_label)
- `POST /api/auth/logout`
- `POST /api/auth/first-password` (email, temp_password, new_password, device_label)

### Me
- `GET /api/me`
- `PATCH /api/me/avatar`
- `POST /api/me/change-password`
- `GET /api/me/sessions`
- `DELETE /api/me/sessions/others`
- `POST /api/me/2fa`

## Guvenlik Notlari
- Session cookie: HttpOnly + SameSite=Strict
- JWT icinde `sid`, `siteId`, `role` tasinir
- API isteklerinde session dogrulama + DB session kontrolu
- IP conflict kurali (trusted_ips disi bloklanir)
- Rate limit (login + first-password): bellek ici limit
- IP kaynagi: `x-forwarded-for` header
- Device fingerprint: `x-device-fingerprint` header (SHA256)

## Baslatma
```bash
npm run dev
```
