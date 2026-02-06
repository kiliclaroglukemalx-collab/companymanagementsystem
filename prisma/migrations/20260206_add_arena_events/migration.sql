-- CreateEnum
CREATE TYPE "ArenaEventType" AS ENUM ('RATING_GIVEN', 'LEADER_CHANGED', 'RATING_PROGRESS', 'SECURITY_ALERT', 'USER_CREATED', 'USER_JOINED');

-- CreateTable
CREATE TABLE "ArenaEvent" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "type" "ArenaEventType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "metaJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArenaEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArenaEvent_siteId_createdAt_idx" ON "ArenaEvent"("siteId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ArenaEvent_type_idx" ON "ArenaEvent"("type");

-- AddForeignKey
ALTER TABLE "ArenaEvent" ADD CONSTRAINT "ArenaEvent_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
