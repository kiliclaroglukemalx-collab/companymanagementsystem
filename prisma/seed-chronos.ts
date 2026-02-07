/**
 * Chronos Module Seed Script
 * Seeds initial shift definitions and Master Panel settings
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedChronosModule() {
  console.log('🚀 Seeding Chronos Module...')

  // Get all sites
  const sites = await prisma.site.findMany()

  for (const site of sites) {
    console.log(`  📍 Setting up Chronos for site: ${site.name}`)

    // 1. Create Master Panel Settings
    const masterPanelSettings = await prisma.masterPanelSettings.upsert({
      where: { siteId: site.id },
      update: {},
      create: {
        siteId: site.id,
        minEditableHour: 6,  // 06:00
        maxEditableHour: 23, // 23:00
        requiresApproval: true,
        editingDurationMinutes: 30,
      },
    })
    console.log(`    ✅ Master Panel Settings created`)

    // 2. Create default shift definitions
    const shiftDefinitions = [
      {
        name: 'Sabah',
        startHour: 8,
        endHour: 16,
        color: '#34d399', // Green
      },
      {
        name: 'Ogle',
        startHour: 16,
        endHour: 0,
        color: '#60a5fa', // Blue
      },
      {
        name: 'Gece',
        startHour: 0,
        endHour: 8,
        color: '#a78bfa', // Purple
      },
    ]

    for (const shift of shiftDefinitions) {
      await prisma.shiftDefinition.upsert({
        where: {
          siteId_name: {
            siteId: site.id,
            name: shift.name,
          },
        },
        update: {
          startHour: shift.startHour,
          endHour: shift.endHour,
          color: shift.color,
          isActive: true,
        },
        create: {
          siteId: site.id,
          name: shift.name,
          startHour: shift.startHour,
          endHour: shift.endHour,
          color: shift.color,
          isActive: true,
        },
      })
    }
    console.log(`    ✅ Shift Definitions created (${shiftDefinitions.length})`)
  }

  console.log('✨ Chronos Module seeding completed!')
}

// Run seed if called directly
if (require.main === module) {
  seedChronosModule()
    .catch((e) => {
      console.error('❌ Error seeding Chronos Module:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export { seedChronosModule }
