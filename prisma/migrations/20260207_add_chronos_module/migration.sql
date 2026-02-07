-- CreateEnum for ShiftApprovalStatus
CREATE TYPE "ShiftApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateTable: ShiftApprovalRequest
CREATE TABLE "ShiftApprovalRequest" (
    "id" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "departmentId" TEXT,
    "reason" TEXT NOT NULL,
    "requestedStartHour" INTEGER NOT NULL,
    "requestedEndHour" INTEGER NOT NULL,
    "status" "ShiftApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftApprovalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable: MasterPanelSettings
CREATE TABLE "MasterPanelSettings" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "minEditableHour" INTEGER NOT NULL DEFAULT 6,
    "maxEditableHour" INTEGER NOT NULL DEFAULT 23,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT true,
    "editingDurationMinutes" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterPanelSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ShiftDefinition
CREATE TABLE "ShiftDefinition" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Shift
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "shiftDefinitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastModifiedById" TEXT,
    "lastModifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShiftApprovalRequest_requestedById_idx" ON "ShiftApprovalRequest"("requestedById");
CREATE INDEX "ShiftApprovalRequest_siteId_idx" ON "ShiftApprovalRequest"("siteId");
CREATE INDEX "ShiftApprovalRequest_status_idx" ON "ShiftApprovalRequest"("status");
CREATE INDEX "ShiftApprovalRequest_approvedById_idx" ON "ShiftApprovalRequest"("approvedById");

CREATE UNIQUE INDEX "MasterPanelSettings_siteId_key" ON "MasterPanelSettings"("siteId");
CREATE INDEX "MasterPanelSettings_siteId_idx" ON "MasterPanelSettings"("siteId");

CREATE UNIQUE INDEX "ShiftDefinition_siteId_name_key" ON "ShiftDefinition"("siteId", "name");
CREATE INDEX "ShiftDefinition_siteId_idx" ON "ShiftDefinition"("siteId");

CREATE INDEX "Shift_siteId_idx" ON "Shift"("siteId");
CREATE INDEX "Shift_departmentId_idx" ON "Shift"("departmentId");
CREATE INDEX "Shift_userId_idx" ON "Shift"("userId");
CREATE INDEX "Shift_date_idx" ON "Shift"("date");
CREATE INDEX "Shift_shiftDefinitionId_idx" ON "Shift"("shiftDefinitionId");

-- AddForeignKey
ALTER TABLE "ShiftApprovalRequest" ADD CONSTRAINT "ShiftApprovalRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ShiftApprovalRequest" ADD CONSTRAINT "ShiftApprovalRequest_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ShiftApprovalRequest" ADD CONSTRAINT "ShiftApprovalRequest_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ShiftApprovalRequest" ADD CONSTRAINT "ShiftApprovalRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "MasterPanelSettings" ADD CONSTRAINT "MasterPanelSettings_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ShiftDefinition" ADD CONSTRAINT "ShiftDefinition_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Shift" ADD CONSTRAINT "Shift_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_shiftDefinitionId_fkey" FOREIGN KEY ("shiftDefinitionId") REFERENCES "ShiftDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_lastModifiedById_fkey" FOREIGN KEY ("lastModifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
