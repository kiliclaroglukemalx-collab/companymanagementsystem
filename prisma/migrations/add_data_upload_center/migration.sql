-- CreateEnum
CREATE TYPE "DataFileType" AS ENUM ('EXCEL', 'CSV', 'JSON');

-- CreateEnum
CREATE TYPE "AnalyticModule" AS ENUM ('FINANS', 'SPOR', 'BON', 'CASINO', 'GENEL');

-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "DataUpload" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "uploadedByEmail" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" "DataFileType" NOT NULL,
    "analyticModule" "AnalyticModule" NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "status" "UploadStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "metaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialFlow" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "dataUploadId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "totalIncome" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bankFees" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "withdrawals" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "operatingCosts" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cumulativeProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "month" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAnalysis" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "dataUploadId" TEXT,
    "analyticModule" "AnalyticModule" NOT NULL,
    "analysisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "model" TEXT NOT NULL DEFAULT 'gpt-4',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DataUpload_siteId_idx" ON "DataUpload"("siteId");

-- CreateIndex
CREATE INDEX "DataUpload_status_idx" ON "DataUpload"("status");

-- CreateIndex
CREATE INDEX "DataUpload_createdAt_idx" ON "DataUpload"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialFlow_siteId_date_key" ON "FinancialFlow"("siteId", "date");

-- CreateIndex
CREATE INDEX "FinancialFlow_siteId_month_idx" ON "FinancialFlow"("siteId", "month");

-- CreateIndex
CREATE INDEX "FinancialFlow_date_idx" ON "FinancialFlow"("date");

-- CreateIndex
CREATE INDEX "AIAnalysis_siteId_idx" ON "AIAnalysis"("siteId");

-- CreateIndex
CREATE INDEX "AIAnalysis_analyticModule_idx" ON "AIAnalysis"("analyticModule");

-- CreateIndex
CREATE INDEX "AIAnalysis_isPublished_idx" ON "AIAnalysis"("isPublished");

-- CreateIndex
CREATE INDEX "AIAnalysis_createdAt_idx" ON "AIAnalysis"("createdAt");

-- AddForeignKey
ALTER TABLE "DataUpload" ADD CONSTRAINT "DataUpload_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_dataUploadId_fkey" FOREIGN KEY ("dataUploadId") REFERENCES "DataUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_dataUploadId_fkey" FOREIGN KEY ("dataUploadId") REFERENCES "DataUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;
