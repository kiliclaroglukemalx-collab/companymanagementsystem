-- Add Rating relations to existing models
ALTER TABLE "Site" ADD COLUMN IF NOT EXISTS "ratings" TEXT[];
ALTER TABLE "Department" ADD COLUMN IF NOT EXISTS "ratings" TEXT[];

-- Add rating relations to User (if not exists)
-- Note: These are handled by Prisma relations, no actual columns needed

-- Update RatingCriteria to add relation
-- ALTER TABLE "RatingCriteria" already exists, just adding relation

-- CreateTable Rating
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "raterUserId" TEXT NOT NULL,
    "ratedUserId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable RatingScore
CREATE TABLE "RatingScore" (
    "id" TEXT NOT NULL,
    "ratingId" TEXT NOT NULL,
    "criteriaId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (Unique constraint: same person, same day, same rater)
CREATE UNIQUE INDEX "Rating_raterUserId_ratedUserId_date_key" ON "Rating"("raterUserId", "ratedUserId", "date");

-- CreateIndex
CREATE INDEX "Rating_siteId_idx" ON "Rating"("siteId");
CREATE INDEX "Rating_departmentId_idx" ON "Rating"("departmentId");
CREATE INDEX "Rating_date_idx" ON "Rating"("date");
CREATE INDEX "Rating_ratedUserId_idx" ON "Rating"("ratedUserId");

-- CreateIndex
CREATE INDEX "RatingScore_ratingId_idx" ON "RatingScore"("ratingId");
CREATE INDEX "RatingScore_criteriaId_idx" ON "RatingScore"("criteriaId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_raterUserId_fkey" FOREIGN KEY ("raterUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ratedUserId_fkey" FOREIGN KEY ("ratedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingScore" ADD CONSTRAINT "RatingScore_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RatingScore" ADD CONSTRAINT "RatingScore_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "RatingCriteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
