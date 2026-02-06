/**
 * Arena Events Seeder
 * Creates demo arena events for testing
 * 
 * ⚠️ WARNING: This script is for DEVELOPMENT/DEMO purposes only!
 * DO NOT run in production - it creates fake test data.
 * 
 * Usage:
 *   node scripts/seed-arena-events.js
 * 
 * Prerequisites:
 *   - Database must be accessible
 *   - ArenaEvent model must exist in schema
 *   - At least one Site must exist in database
 */

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const EVENT_TEMPLATES = {
  RATING_GIVEN: [
    { title: "Ali rated Ayşe", message: "Performance rating: 4.5/5.0" },
    { title: "Mehmet rated Can", message: "Quality rating: 5.0/5.0" },
    { title: "Zeynep rated Fatma", message: "Communication rating: 4.8/5.0" },
    { title: "Burak rated Elif", message: "Efficiency rating: 4.2/5.0" },
    { title: "Selin rated Murat", message: "Teamwork rating: 4.9/5.0" },
  ],
  LEADER_CHANGED: [
    { title: "New leader in Sales", message: "Ayşe climbed to #1 position" },
    { title: "Marketing leadership change", message: "Can overtook previous leader" },
    { title: "Customer Service top spot", message: "Elif is now the department leader" },
    { title: "Finance department update", message: "Murat reached first place" },
    { title: "IT Department shake-up", message: "Burak took the lead" },
  ],
  RATING_PROGRESS: [
    { title: "Daily rating 85% complete", message: "17 out of 20 ratings submitted today" },
    { title: "Weekly target reached", message: "100% of required ratings completed" },
    { title: "Monthly milestone", message: "Department rating completion: 92%" },
    { title: "Rating participation high", message: "Active participation: 88% this week" },
    { title: "Daily progress update", message: "Current completion: 73%" },
  ],
  SECURITY_ALERT: [
    { title: "IP conflict detected", message: "Multiple logins from different locations" },
    { title: "Failed login attempt", message: "3 consecutive failed password attempts" },
    { title: "Suspicious activity", message: "Unusual access pattern detected" },
    { title: "Session timeout", message: "Auto-logout due to inactivity" },
    { title: "Security check passed", message: "2FA verification successful" },
  ],
  USER_CREATED: [
    { title: "New team member", message: "Ahmet joined as Staff" },
    { title: "New manager onboarded", message: "Deniz joined as Manager" },
    { title: "Welcome aboard", message: "Ece joined the team" },
    { title: "Team expansion", message: "Kerem joined as Staff" },
    { title: "New hire", message: "Leyla joined the organization" },
  ],
  USER_JOINED: [
    { title: "First login", message: "Ahmet completed their first login" },
    { title: "Profile setup", message: "Deniz set up their profile" },
    { title: "Onboarding complete", message: "Ece completed onboarding steps" },
    { title: "Training started", message: "Kerem began training modules" },
    { title: "Welcome flow finished", message: "Leyla completed welcome wizard" },
  ],
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomDate(daysAgo) {
  const now = new Date()
  const randomHours = Math.floor(Math.random() * (daysAgo * 24))
  return new Date(now.getTime() - randomHours * 60 * 60 * 1000)
}

async function main() {
  console.log("🌱 Seeding Arena Events...")
  
  // Get all sites
  const sites = await prisma.site.findMany()
  
  if (sites.length === 0) {
    console.error("❌ No sites found. Please seed sites first.")
    process.exit(1)
  }
  
  console.log(`📍 Found ${sites.length} site(s)`)
  
  // Clear existing arena events
  const deleted = await prisma.arenaEvent.deleteMany({})
  console.log(`🗑️  Cleared ${deleted.count} existing events`)
  
  // Create events for each site
  let totalCreated = 0
  
  for (const site of sites) {
    console.log(`\n🏢 Creating events for site: ${site.name}`)
    
    const eventTypes = Object.keys(EVENT_TEMPLATES)
    const eventsToCreate = []
    
    // Create 40-60 random events per site (distributed over last 7 days)
    const eventCount = 40 + Math.floor(Math.random() * 21) // 40-60
    
    for (let i = 0; i < eventCount; i++) {
      const eventType = getRandomItem(eventTypes)
      const template = getRandomItem(EVENT_TEMPLATES[eventType])
      const createdAt = getRandomDate(7) // Last 7 days
      
      eventsToCreate.push({
        siteId: site.id,
        type: eventType,
        title: template.title,
        message: template.message,
        metaJson: {
          generated: true,
          seed: true,
          timestamp: createdAt.toISOString(),
        },
        createdAt,
      })
    }
    
    // Bulk create
    const created = await prisma.arenaEvent.createMany({
      data: eventsToCreate,
    })
    
    console.log(`   ✅ Created ${created.count} events`)
    totalCreated += created.count
  }
  
  console.log(`\n✨ Successfully seeded ${totalCreated} arena events across ${sites.length} site(s)!`)
  
  // Show distribution
  console.log("\n📊 Event Type Distribution:")
  const distribution = await prisma.arenaEvent.groupBy({
    by: ["type"],
    _count: { type: true },
  })
  
  for (const item of distribution) {
    console.log(`   ${item.type}: ${item._count.type} events`)
  }
  
  // Show recent events
  console.log("\n🔥 5 Most Recent Events:")
  const recentEvents = await prisma.arenaEvent.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { site: { select: { name: true } } },
  })
  
  for (const event of recentEvents) {
    const timeAgo = Math.floor((Date.now() - event.createdAt.getTime()) / 60000)
    console.log(`   • [${event.site.name}] ${event.title} (${timeAgo}m ago)`)
  }
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:")
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
