-- Arena Lig Sistemi Migration
-- PDF: Şampiyonlar Ligi için tablolar

-- Enums
CREATE TYPE "LeagueCategory" AS ENUM (
  'USTAT', 'ELMAS_1', 'ELMAS_2', 'ALTIN_1', 'ALTIN_2',
  'GUMUS_1', 'GUMUS_2', 'BRONZ_1', 'BRONZ_2', 'DEMIR'
);

CREATE TYPE "PersonelType" AS ENUM (
  'PERSONEL', 'ADMIN', 'BIRIM_MUDURU', 'GENEL_MUDUR'
);

-- MonthlyScore: Aylık kümülatif puanlar
CREATE TABLE "MonthlyScore" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "departmentId" TEXT NOT NULL,
  "personelType" "PersonelType" NOT NULL DEFAULT 'PERSONEL',
  "month" TEXT NOT NULL,
  "totalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "ratingCount" INTEGER NOT NULL DEFAULT 0,
  "lastRatedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FK_MonthlyScore_User" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_MonthlyScore_Site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_MonthlyScore_Department" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "MonthlyScore_userId_month_key" ON "MonthlyScore"("userId", "month");
CREATE INDEX "MonthlyScore_siteId_month_idx" ON "MonthlyScore"("siteId", "month");
CREATE INDEX "MonthlyScore_departmentId_month_idx" ON "MonthlyScore"("departmentId", "month");
CREATE INDEX "MonthlyScore_personelType_month_idx" ON "MonthlyScore"("personelType", "month");

-- LeagueRanking: Lig sıralamaları
CREATE TABLE "LeagueRanking" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "departmentId" TEXT NOT NULL,
  "personelType" "PersonelType" NOT NULL DEFAULT 'PERSONEL',
  "month" TEXT NOT NULL,
  "category" "LeagueCategory" NOT NULL,
  "rank" INTEGER NOT NULL,
  "totalScore" DOUBLE PRECISION NOT NULL,
  "percentage" DOUBLE PRECISION NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FK_LeagueRanking_User" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_LeagueRanking_Site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_LeagueRanking_Department" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "LeagueRanking_userId_month_personelType_key" ON "LeagueRanking"("userId", "month", "personelType");
CREATE INDEX "LeagueRanking_siteId_month_idx" ON "LeagueRanking"("siteId", "month");
CREATE INDEX "LeagueRanking_category_month_idx" ON "LeagueRanking"("category", "month");
CREATE INDEX "LeagueRanking_personelType_month_idx" ON "LeagueRanking"("personelType", "month");

-- MonthlyChampion: Ay sonu şampiyonlar arşivi
CREATE TABLE "MonthlyChampion" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "siteId" TEXT NOT NULL,
  "departmentId" TEXT NOT NULL,
  "personelType" "PersonelType" NOT NULL,
  "month" TEXT NOT NULL,
  "category" "LeagueCategory" NOT NULL,
  "rank" INTEGER NOT NULL,
  "totalScore" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "FK_MonthlyChampion_User" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_MonthlyChampion_Site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "FK_MonthlyChampion_Department" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "MonthlyChampion_userId_month_personelType_key" ON "MonthlyChampion"("userId", "month", "personelType");
CREATE INDEX "MonthlyChampion_siteId_month_idx" ON "MonthlyChampion"("siteId", "month");
CREATE INDEX "MonthlyChampion_category_month_idx" ON "MonthlyChampion"("category", "month");
