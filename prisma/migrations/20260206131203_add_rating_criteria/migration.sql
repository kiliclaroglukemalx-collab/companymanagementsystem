-- CreateTable
CREATE TABLE "RatingCriteria" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RatingCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RatingCriteria_departmentId_idx" ON "RatingCriteria"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "RatingCriteria_departmentId_name_key" ON "RatingCriteria"("departmentId", "name");

-- AddForeignKey
ALTER TABLE "RatingCriteria" ADD CONSTRAINT "RatingCriteria_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
