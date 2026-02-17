CREATE TABLE "DataUploadAssignment" (
    "id" TEXT NOT NULL,
    "dataUploadId" TEXT NOT NULL,
    "analyticModule" "AnalyticModule" NOT NULL,
    "fileRole" TEXT NOT NULL DEFAULT 'UNSPECIFIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataUploadAssignment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "DataUploadAssignment_dataUploadId_idx" ON "DataUploadAssignment"("dataUploadId");
CREATE INDEX "DataUploadAssignment_analyticModule_idx" ON "DataUploadAssignment"("analyticModule");
CREATE UNIQUE INDEX "DataUploadAssignment_dataUploadId_analyticModule_fileRole_key" ON "DataUploadAssignment"("dataUploadId", "analyticModule", "fileRole");

ALTER TABLE "DataUploadAssignment" ADD CONSTRAINT "DataUploadAssignment_dataUploadId_fkey"
FOREIGN KEY ("dataUploadId") REFERENCES "DataUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
